<template>
    <div class="b-card-container">
        <b-card no-body class="mb-1">
            <b-card-header v-b-toggle='createAccordionId' header-tag="header" class="bg-info hover-pointer text-light p-1 px-3 d-flex align-items-center justify-content-between" role="tab">
                <span>#{{indexTask +1}} {{accordionTask[statusTask][indexTask].typeTaskTitle}}</span>
                <btn-remove-task :statusTask="statusTask" :idTask="indexTask"></btn-remove-task>
            </b-card-header>
            <b-collapse :id='createAccordionId' visible :accordion="accordionGroupName" role="tabpanel">
                <b-card-body>
                    <b-form-group label="Rodzaj pracy:"> {{query}}
                            <vue-autosuggest                      
                                @input="filterResults"      
                                v-model="query"
                                :suggestions="suggestionsDisplay"
                                :inputProps="inputProps"
                                :sectionConfigs="sectionConfigs">
                                    <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
                                        <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.nameTask}}</div>
                                    </div>      
                            </vue-autosuggest>                                        
                    </b-form-group>

                    <b-form-group label="Imię i nazwisko klienta/ nazwa firmy/ miejsce:">
                        <b-form-input
                            @input="updateTask($event, indexTask, statusTask, 'nameCustomer')"
                            type="text"
                            placeholder="Wpisz dane"
                            :value="accordionTask[statusTask][indexTask].nameCustomer">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group v-if="accordionTask[statusTask][indexTask].toggleNewClient" label="Nowy klient?">
                        <toggle-button
                            :value="accordionTask[statusTask][indexTask].newClient"
                            @change="updateNewClient" 
                            :width="$store.state.widthHeigthComponents.toggle.width" 
                            :height="$store.state.widthHeigthComponents.toggle.heigth" 
                            :sync="true"
                            :labels="{checked: 'Tak', unchecked: 'Nie'}"/> 
                    </b-form-group>

                    <b-form-group label="Opis zdarzenia">
                        <b-form-textarea
                            @input="updateTask($event, indexTask, statusTask, 'description')"
                            placeholder="Opisz zdarzenie"
                            :value="accordionTask[statusTask][indexTask].description"
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>                
                    </b-form-group>

                    <b-form-group v-if="accordionTask[statusTask][indexTask].togglePaid" label="Płatne?">
                        <toggle-button                         
                            :value="accordionTask[statusTask][indexTask].paidTask"
                            @change="updatePaidTask" 
                            :width="$store.state.widthHeigthComponents.toggle.width" 
                            :height="$store.state.widthHeigthComponents.toggle.heigth" 
                            :labels="{checked: 'Tak', unchecked: 'Nie'}"/>             
                    </b-form-group>

                    <b-input-group v-if="accordionTask[statusTask][indexTask].paidTask">
                        <ValidationProvider ref="refValidationCost" immediate rules="numeric|required" v-slot="{ errors }">
                            Cena:
                            <b-form-input style="width:100px"  :value="accordionTask[statusTask][indexTask].paidCost" @input="updatePaidTask($event), validateCost()"></b-form-input>
                            <span class="text-danger">{{ errors[0] }}</span> 
                        </ValidationProvider>
                    </b-input-group>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div> 
</template>

<script>
import BtnRemoveTask from './AccordionTaskBtnRemoveTask.vue';
import { ToggleButton } from 'vue-js-toggle-button';
import { VueAutosuggest } from "vue-autosuggest";
import typeTasksArr from './typeTasksArr'
import { ValidationProvider, extend } from 'vee-validate';
import { numeric, required } from 'vee-validate/dist/rules';
import { mapState } from 'vuex';

extend('numeric', {
    ...numeric,
    message: 'Pole musi zawierać liczbę!'
})

extend('required', {
    ...required,
    message: 'Pole wymagane'
})

export default {
    name : 'AccordionTask',
    components : {
        BtnRemoveTask,
        ToggleButton,
        VueAutosuggest,
        ValidationProvider
    },
    props: {
        indexTask: {
            type : Number,
            require: true,
        },
        statusTask: {
            type: String,
            require: true,
            validation : function(value) {
                return ['doneTasks', 'progressTasks', 'unrealizedTasks'].indexOf(value) !== -1;
            }
        }
    },
    data() {
        return {
            accordionGroupName: `my-accordion-${this.statusTask}`,
            query: 'Serwis',
            selected: null,
            inputProps: {
                id: `autosuggest__input_${this.indexTask}`,
                placeholder: "Wybierz rodzaj pracy",
                class: "form-control"
            },
            suggestions: typeTasksArr,
            suggestionsDisplay: [],
            sectionConfigs: {
                instalacje: {
                limit: 6,
                label: "Instalacje",
                onSelected: selected => {
                    this.updateSelectedTypeTask(selected)
                    }
                },
                networkBulding: {
                    limit: 6,
                    label: "Budowa sieci",
                    onSelected: selected => {
                        this.updateSelectedTypeTask(selected)
                        }
                },
                office: {
                    limit: 6,
                    label: "Biuro",
                    onSelected: selected => {
                        this.updateSelectedTypeTask(selected)
                        }
                },
                serwis: {
                    limit: 6,
                    label: "Serwis",
                    onSelected: selected => {
                        this.updateSelectedTypeTask(selected)
                        }
                }
            }        
        }
    },  
    methods: {
        async validateCost() {
            let validationCost = await this.$refs.refValidationCost.validate();
                this.$store.dispatch('accordionTask/updatePaidCostValid', {
                    paidCostValid : validationCost.valid
                });
        },    
        updatePaidTask(e) {         
            if(e.value) {   
                this.$store.dispatch('accordionTask/updatePaidTask', {
                    'indexTask' : this.indexTask,
                    'statusTask' : this.statusTask,                
                    'paidCost' : '0',
                    'paidTask' : true
                })
                this.$store.dispatch('accordionTask/updatePaidCostValid', {
                    paidCostValid : false
                });                                 
            } else {
                this.$store.dispatch('accordionTask/updatePaidCostValid', {
                    paidCostValid : true
                });
                this.$store.dispatch('accordionTask/updatePaidTask', {
                    'indexTask' : this.indexTask,
                    'statusTask' : this.statusTask,                
                    'paidCost' : '0',
                    'paidTask' : false
                })                 
            }
        },        
        updateSelectedTypeTask({item: { newClient, toggleNewClient,togglePaid, typeTask, nameTask }}) {
            console.log(nameTask);
            this.$store.dispatch('accordionTask/updateSelectedTypeTask', {
                'typeTaskTitle' : nameTask,
                'typeTask' : typeTask,
                'indexTask' :  this.indexTask,
                'statusTask' : this.statusTask,
                'togglePaid' : togglePaid,
                'toggleNewClient' : toggleNewClient,
                'newClient' : newClient
            });

        },
        updateTask(value, indexTask, statusTask, propertySuggestionItem) {
            this.$store.dispatch('accordionTask/updateTask', {
                'text' : value,
                'indexTask' : indexTask,
                'statusTask' : statusTask,
                'propertysuggestionItem' : propertySuggestionItem
            })
        },
        updateNewClient(e) {
            this.$store.dispatch('accordionTask/updateNewClient', {
                'indexTask' : this.indexTask,
                'statusTask' : this.statusTask,                
                'newClient' : e.value
            })            
        },
        filterResults() {
            this.suggestionsDisplay = [];
            this.suggestions.filter(itemSuggestions => {
                let suggestionItem = {};                
                suggestionItem.name = itemSuggestions.name;
                suggestionItem.data = [];    
                itemSuggestions.data.filter(item => {
                    if(item.nameTask.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                        suggestionItem['data'].push(item)
                    }
                })
                suggestionItem.data.length && this.suggestionsDisplay.push(suggestionItem);
            })
        }
    },
    computed: {
        createAccordionId() {
            return `accordion-${this.statusTask}-${this.indexTask}`;           
        },
        ...mapState([
            'accordionTask'
            ]),        
    },
    mounted() {
        this.suggestionsDisplay = this.suggestions;
    }
}
</script>

<style lang="scss">

.b-card-container {
    .card-header {
        cursor: pointer;
    }
    input {
        padding: 0.5rem;
        border-radius: 10px;
        width: 100%;
    }
    ul {
        width: 100%;
        color: rgba(30, 39, 46,1.0);
        list-style: none;
        margin: 0;
        padding: 0.5rem 0 .5rem 0;
    }
    li {
        margin: 0 0 0 0;
        border-radius: 5px;
        padding: 0.75rem 0 0.75rem 0.75rem;
        display: flex;
        align-items: center;
    }

    .autosuggest__results {
        border-radius: solid 1px #ced4da;
    }


    .autosuggest__results-before:hover {
        cursor: default;
    }
    .autosuggest__results-before {
        color: rgb(128, 128, 128);
        margin: 0 0 0 0;
        border-radius: 5px;
        padding: 0.75rem 0 0.75rem 0.35rem;
        display: flex;
        align-items: center;
    }

    li:hover {
        cursor: pointer;
    }

    .form-control {
        width: 100%;
    }

    .b-card-container {
        display: flex;
        justify-content: center;
        border-radius: 10px;
    }
    
    #autosuggest-autosuggest__results{
        position: absolute;
        z-index: 9999;
        background: #fff;
        width: 100%;
        border-radius: 10px;
        border-left: solid 1px #ced4da;
        border-right: solid 1px #ced4da;
    }

    #autosuggest { 
        position: relative;
        width: 100%; 
        display: block;
    }

    .autosuggest__results-item--highlighted {
    background-color: rgba(51, 217, 178,0.2);
    }
}
 
</style> 