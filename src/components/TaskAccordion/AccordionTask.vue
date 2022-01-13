<template>
    <div class="b-card-container">
        <b-card no-body class="mb-1">
            <b-card-header v-b-toggle='"accordion-" + statusTask + "-" + indexTask' header-tag="header" style="cursor: pointer" class="bg-info hover-pointer text-light p-1 px-3 d-flex align-items-center justify-content-between" role="tab">
                <span>#{{indexTask +1}} {{$store.state[statusTask][indexTask].typeWorkTitle}}</span>
                <btn-remove-task :statusTask="statusTask" :idTask="indexTask"></btn-remove-task>
            </b-card-header>
            <b-collapse :id='"accordion-" + statusTask + "-" + indexTask' visible :data-index='indexTask' :accordion="myAccordion" role="tabpanel">
                <b-card-body>
                    <b-form-group label="Rodzaj pracy:">
                            <vue-autosuggest                      
                                @input="filterResults"      
                                v-model="query"
                                :suggestions="suggestionsDisplay"
                                :inputProps="inputProps"
                                :sectionConfigs="sectionConfigs">
                                    <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
                                        <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.name}}</div>
                                    </div>      
                            </vue-autosuggest>                                        
                    </b-form-group>

                <b-form-group label="Imię i nazwisko klienta/ nazwa firmy/ miejsce:">
                        <b-form-input
                            @keyup="updateTask($event, indexTask, statusTask, 'nameCustomer')"
                            type="text"
                            placeholder="Wpisz dane"
                            :value="$store.state[statusTask][indexTask].nameCustomer"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group v-if="showToggleNewClient" label="Nowy klient?">
                        <toggle-button
                            ref="toggle-button" 
                            v-model="newClient"
                            @change="updateNewClient" 
                            :width="$store.state.widthHeigthComponents.toggle.width" 
                            :height="$store.state.widthHeigthComponents.toggle.heigth" 
                            :labels="{checked: 'Tak', unchecked: 'Nie'}"/> 
                    </b-form-group>

                    <b-form-group label="Opis zdarzenia">
                        <b-form-textarea
                            @keyup="updateTask($event, indexTask, statusTask, 'description')"
                            placeholder="Opisz zdarzenie"
                            :value="$store.state[statusTask][indexTask].description"
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>                
                    </b-form-group>

                    <b-form-group v-if="showTogglePaid" label="Płatne?">
                        <toggle-button 
                            v-model="paidTask" 
                            @change="resetPaidCost" 
                            :width="$store.state.widthHeigthComponents.toggle.width" 
                            :height="$store.state.widthHeigthComponents.toggle.heigth" 
                            :labels="{checked: 'Tak', unchecked: 'Nie'}"/>             
                    </b-form-group>
                    <b-input-group v-if="paidTask" size="sm" append="zł">
                            <b-form-input v-model="paidCost" type="number" @keyup="updatePaidTask($event)"></b-form-input>
                        </b-input-group>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div> 
</template>

<script>
import BtnRemoveTask from './BtnRemoveTask.vue';
import { ToggleButton } from 'vue-js-toggle-button';
import { VueAutosuggest } from "vue-autosuggest";
import typeWorksArr from './typeWorksArr'
export default {
    name : 'AccordionTask',
    components : {
        BtnRemoveTask,
        ToggleButton,
        VueAutosuggest
    },
    props: {
        indexTask: Number,
        statusTask: String
    },
    data() {
        return {
            myAccordion: `my-accordion-${this.statusTask}`,
            query: 'Serwis',
            newClient : this.$store.state[this.statusTask][this.indexTask].newClient,
            showToggleNewClient : this.$store.state[this.statusTask][this.indexTask].toggleNewClient,
            showTogglePaid : this.$store.state[this.statusTask][this.indexTask].togglePaid,
            paidTask : this.$store.state[this.statusTask][this.indexTask].paidTask,
            paidCost : this.$store.state[this.statusTask][this.indexTask].paidCost,
            selected: null,
            inputProps: {
                id: `autosuggest__input_${this.indexTask}`,
                placeholder: "Wybierz rodzaj pracy",
                class: "form-control"
            },
            suggestions: typeWorksArr,
            suggestionsDisplay: [],
            sectionConfigs: {
                instalacje: {
                limit: 6,
                label: "Instalacje",
                onSelected: selected => {
                    this.onSelectedTypeWork(selected)
                    }
                },
                networkBulding: {
                limit: 6,
                label: "Budowa sieci",
                onSelected: selected => {
                    this.onSelectedTypeWork(selected)
                    }
                },
                office: {
                limit: 6,
                label: "Biuro",
                onSelected: selected => {
                    this.onSelectedTypeWork(selected)
                    }
                },
                serwis: {
                limit: 6,
                label: "Serwis",
                onSelected: selected => {
                    this.onSelectedTypeWork(selected)
                    }
                }
            }        
        }
    },
    methods: {
        onSelectedTypeWork(selected) {
            this.toggleNewClient = selected.item.toggleNewClient;
            this.showToggleNewClient = selected.item.toggleNewClient;
            this.showTogglePaid = selected.item.togglePaid;
            this.$store.commit('updateSelectedTypeWork', {
                'typeWorkTitle' : selected.item.name,
                'typeWork' : selected.item.type,
                'indexTask' :  this.indexTask,
                'statusTask' : this.statusTask,

                'togglePaid' : selected.item.togglePaid,
                'toggleNewClient' : selected.item.toggleNewClient
            })

        },
        updateTask(e, indexTask, statusTask, propertyObj) {
            this.$store.commit('updateTask', {
                'text' : e.target.value,
                'indexTask' : indexTask,
                'statusTask' : statusTask,
                'propertyObj' : propertyObj
            })
        },
        updatePaidTask(e) {
            this.$store.commit('updatePaidTask', {
                'indexTask' : this.indexTask,
                'statusTask' : this.statusTask,                
                'paidCost' : e.target.value
            })
        },
        updateNewClient() {
            this.$store.commit('updateNewClient', {
                'indexTask' : this.indexTask,
                'statusTask' : this.statusTask,                
                'newClient' : this.newClient
            })            
        },
        resetPaidCost() {
            if(!this.paidTask) {
                this.$store.commit('updatePaidTask', {
                    'indexTask' : this.indexTask,
                    'statusTask' : this.statusTask,                
                    'paidCost' : '0'                
                })                
            }
        },
        filterResults() {

            this.suggestionsDisplay = [];
            this.suggestions.filter(itemSuggestions => {
                let obj = {};                
                obj.name = itemSuggestions.name;
                obj.data = [];
                
                itemSuggestions.data.filter(item => {
                    if(item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                        obj['data'].push(item)
                    }
                })
                obj.data.length && this.suggestionsDisplay.push(obj);
            })
        }
    },
    mounted() {
        this.suggestionsDisplay = this.suggestions;
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

.b-card-container >>> .autosuggest__results {
    border-radius: solid 1px #ced4da;
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
 
.b-card-container >>> .b-card-container {
    display: flex;
    justify-content: center;
    border-radius: 10px;
}
 
.b-card-container >>> #autosuggest-autosuggest__results{
    position: absolute;
    z-index: 9999;
    background: #fff;
    width: 100%;
    border-radius: 10px;
}

.b-card-container >>> #autosuggest { 
    position: relative;
    width: 100%; 
    display: block;
}
.b-card-container  >>> .autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178,0.2);
}
</style> 