<template>
    <div class="b-card-container">
    <b-card no-body class="mb-1">
        <b-card-header v-b-toggle='statusTask + "-" + indexAccordion' header-tag="header" style="cursor: pointer" class="bg-info hover-pointer text-light p-1 px-3 d-flex align-items-center justify-content-between" role="tab">
            <span>#{{indexAccordion +1}} {{typeWork}}</span>
            <btn-remove-task :statusTask="statusTask" :idTask="indexAccordion"></btn-remove-task>
        </b-card-header>
            You have selected:
                <code><pre>{{JSON.stringify(selected, null, 4)}}</pre></code>
        <b-collapse :id='statusTask + "-" + indexAccordion' visible :data-index='indexAccordion' accordion="my-accordion" role="tabpanel">
            <b-card-body>
                <b-form-group label="Rodzaj pracy:">
                        <vue-autosuggest      
                            ref="autocomplete"
                            v-model="query"
                            :suggestions="suggestions"
                            :inputProps="inputProps"
                            :sectionConfigs="sectionConfigs">
                                <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
                                    <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.name}}</div>
                                </div>      
                        </vue-autosuggest>                                        
                </b-form-group>

            <b-form-group label="Imię i nazwisko klienta/ nazwa firmy/ miejsce:">
                    <b-form-input
                        @keyup="updateTask($event, indexAccordion, statusTask, 'nameCustomer')"
                        type="text"
                        placeholder="Wpisz dane"
                    >
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Nowy klient?">
                    <toggle-button 
                        v-model="toggleNewClient" 
                        :width="$store.state.widthHeigthComponents.toggle.width" 
                        :height="$store.state.widthHeigthComponents.toggle.heigth" 
                        :labels="{checked: 'Tak', unchecked: 'Nie'}"/> 
                </b-form-group>

                <b-form-group label="Opis zdarzenia">
                    <b-form-textarea
                        @keyup="updateTask($event, indexAccordion, statusTask, 'description')"
                        placeholder="Opisz zdarzenie"
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>                
                </b-form-group>

                <b-form-group label="Płatne?">
                    <toggle-button 
                        v-model="paidTask" 
                        @change="resetPaidCost" 
                        :width="$store.state.widthHeigthComponents.toggle.width" 
                        :height="$store.state.widthHeigthComponents.toggle.heigth" 
                        :labels="{checked: 'Tak', unchecked: 'Nie'}"/>             
                </b-form-group>
                <b-input-group v-if="paidTask" size="sm" append="zł">
                        <b-form-input v-model="paidCost" @keyup="updatePaidTask(indexAccordion, statusTask)"></b-form-input>
                    </b-input-group>
            </b-card-body>
        </b-collapse>
    </b-card>
    </div> 
</template>

<script>
import BtnRemoveTask from './BtnRemoveTask.vue'
import { ToggleButton } from 'vue-js-toggle-button'
import { VueAutosuggest } from "vue-autosuggest";
export default {
    name : 'AccordionItem',
    components : {
        BtnRemoveTask,
        ToggleButton,
        VueAutosuggest
    },
    props: {
        nameCustomer: String,
        typeWork: String,
        description: String,
        paid: Boolean,
        indexAccordion: Number,
        statusTask: String
    },
    data() {
        return {
            query: "Serwis",
            selected: null,
            inputProps: {
                id: "autosuggest__input",
                placeholder: "Wybierz rodzaj pracy",
                class: "form-control",
                name: "hello"
            },
            suggestions: [
                {
                    data: [
                        { name: 'Serwis', type: 'serwis', paid: true, newClient: false },
                        { name: 'Awaria', type: 'serwis', paid: true, newClient: false }
                    ],
                    name: 'serwis'
                },
                {
                    data : [
                        { name: 'Instalacja światłowodowa', type: 'installation', paid: true, newClient: true },
                        { name: 'Instalacja radiowa', type: 'installation', paid: true, newClient: true }
                    ],
                    name: 'instalacje'
                }
            ],
            sectionConfigs: {
                instalacje: {
                limit: 6,
                label: "Instalacje",
                onSelected: selected => {
                    this.selected = selected.item;
                }
                },
                serwis: {
                limit: 6,
                label: "Serwis",
                onSelected: selected => {
                    this.selected = selected.item;
                }
                }
            }        
        }
    },
    methods: {
        //If worker choice typeWork installation, then display toggle newClient
        //And create new property in vuex- newClient
        // displayToggleNewClient(e,indexAccordion, statusTask)
        displayToggleNewClient(e) {
            if(e.target.selectedOptions[0].dataset.type === 'installation') {
                this.showToggleClient = true;

            } else {
                this.showToggleClient = false                 
            }
        },
        updateTask(e, indexAccordion, statusTask, propertyObj) {
            this.$store.commit('updateTask', {
                'text' : e.target.value,
                'indexAccordion' : indexAccordion,
                'statusTask' : statusTask,
                'propertyObj' : propertyObj
            })
        },
        updateSelectedTypeWork(indexAccordion, statusTask) {            
            this.$store.commit('updateSelectedTypeWork', {
                'selectedTypeWork' : this.selectedTypeWork,
                'indexAccordion' : indexAccordion,
                'statusTask' : statusTask
            })
        },
        updatePaidTask(indexAccordion, statusTask) {
            this.$store.commit('updatePaidTask', {
                'indexAccordion' : indexAccordion,
                'statusTask' : statusTask,                
                'paidCost' : this.paidCost
            })
            console.log(this.$store.state.accordionDoneTask);
        },
        resetPaidCost() {
            this.paidCost = '0'
        }
    }
}
</script>

<style scoped>

.b-card-container >>> input {
    padding: 0.5rem;
    border-radius: 10px;
    width: 100%;
}
 
.b-card-container >>> ul {
    width: 100%;
    color: rgba(30, 39, 46,1.0);
    list-style: none;
    margin: 0;
    padding: 0.5rem 0 .5rem 0;
}
.b-card-container >>> li {
    margin: 0 0 0 0;
    border-radius: 5px;
    padding: 0.75rem 0 0.75rem 0.75rem;
    display: flex;
    align-items: center;
}

.b-card-container >>> .autosuggest__results-before:hover {
    cursor: default;
}
.b-card-container >>> .autosuggest__results-before {
    color: rgb(128, 128, 128);
    margin: 0 0 0 0;
    border-radius: 5px;
    padding: 0.75rem 0 0.75rem 0.35rem;
    display: flex;
    align-items: center;
}

.b-card-container >>> li:hover {
    cursor: pointer;
}
 
.container >>> .b-card-container {
    display: flex;
    justify-content: center;
    border-radius: 10px;
}
 
.container >>> #autosuggest-autosuggest__results{
    position: absolute;
    z-index: 9999;
    background: #fff;
    width: 100%;
}

.b-card-container >>> #autosuggest { width: 100%; display: block;}
.b-card-container  >>> .autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178,0.2);
}
</style> 