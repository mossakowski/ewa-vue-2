<template>
    <vue-autosuggest
        :id="createAutosuggestId"
        class="autosuggest"                      
        @input="filterResults"      
        v-model="query"
        :suggestions="suggestionsDisplay"
        :inputProps="inputProps"
        :sectionConfigs="sectionConfigs">
            <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
                <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.name}}</div>
            </div>      
    </vue-autosuggest>   
</template>

<script>
import typeTasksArr from './typeTasksArr'
import { VueAutosuggest } from "vue-autosuggest";

export default {
    name: 'AccordionTaskAutosuggest',
    components: {
        VueAutosuggest
    },
    props: {
        statusTask: {
            type: String,
            require: true,
            validation : function(value) {
                return ['doneTasks', 'progressTasks', 'unrealizedTasks'].indexOf(value) !== -1;
            }
        },
        idTask: {
            type: Number,
            require: true,
        },
    },    
    data() {
        return {
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
                        console.log(selected);
                        this.updateSelectedTypeTask(selected)
                        }
                }
            }             
        }
    },
    methods: {
        filterResults() {
            this.suggestionsDisplay = [];
            this.suggestions.filter(itemSuggestions => {
                let suggestionItem = {};                
                suggestionItem.name = itemSuggestions.name;
                suggestionItem.data = [];    
                itemSuggestions.data.filter(item => {
                    if(item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                        suggestionItem['data'].push(item)
                    }
                })
                suggestionItem.data.length && this.suggestionsDisplay.push(suggestionItem);
            })
        },
        updateSelectedTypeTask({item: { newClient, toggleNewClient,togglePaid, typeTask, name }}) {
            this.$store.dispatch('accordionTask/updateSelectedTypeTask', {
                'typeTaskTitle' : name,
                'typeTask' : typeTask,
                'indexTask' :  this.idTask,
                'statusTask' : this.statusTask,
                'togglePaid' : togglePaid,
                'toggleNewClient' : toggleNewClient,
                'newClient' : newClient
            });

        },        
    },         
    computed : {
        createAutosuggestId() {
            return `autosuggest-${this.statusTask}-${this.indexTask}`;           
        },        
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
        .form-control {
            width: 100%;
        }   
        .autosuggest { 
            position: relative;
            width: 100%; 
            display: block;
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

            #autosuggest-autosuggest__results{
                position: absolute;
                z-index: 9999;
                background: #fff;
                width: 100%;
                border-radius: 10px;
                border-left: solid 1px #ced4da;
                border-right: solid 1px #ced4da;
            }

            .autosuggest__results-item--highlighted {
                background-color: rgba(51, 217, 178,0.2);
            } 
        }
    }
 
</style> 