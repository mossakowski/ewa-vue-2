<template>
    <div class="b-card-container">
        <b-card no-body class="mb-1">

            <b-card-header v-b-toggle='createAccordionId' header-tag="header" class="bg-info hover-pointer text-light p-1 px-3 d-flex align-items-center justify-content-between" role="tab">
                <span>#{{indexTask +1}} {{accordionTask[statusTask][indexTask].typeTaskTitle}}</span>
                <btn-remove-task :statusTask="statusTask" :idTask="indexTask"></btn-remove-task>
            </b-card-header>

            <b-collapse :id='createAccordionId' visible :accordion="createAccordionGroupName" role="tabpanel">
                <b-card-body>

                    <b-form-group label="Rodzaj pracy:">
                        <AccordionTaskAutosuggest :idTask="indexTask" :statusTask="statusTask"/>                                       
                    </b-form-group>

                    <b-form-group label="Imię i nazwisko klienta/ nazwa firmy/ miejsce:">
                        <b-form-input
                            @input="updateTask($event, indexTask, statusTask, 'nameCustomer')"
                            type="text"
                            placeholder="Wpisz dane"
                            :value="accordionTask[statusTask][indexTask].nameCustomer">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group v-if="showToggleNewClient" label="Nowy klient?">
                        <AccordionTaskToggle 
                            :valueToggleProp="accordionTask[statusTask][indexTask].newClient"
                            @updateValueToggle="updateNewClient"/>
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

                    <b-form-group v-if="showTogglePaid" label="Płatne?">
                        <AccordionTaskToggle 
                            :valueToggleProp="accordionTask[statusTask][indexTask].paidTask"
                            @updateValueToggle="updatePaidTask"/>           
                    </b-form-group>

                    <b-input-group v-if="showTogglePaidForm">
                        <ValidationProvider ref="refValidationCost" immediate rules="numeric|required" v-slot="{ errors }">
                            Cena:
                            <b-form-input style="width:100px" :value="accordionTask[statusTask][indexTask].paidCost" @input="updatePaidTask($event), validateCost()"></b-form-input>
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
import AccordionTaskAutosuggest from './AccordionTaskAutosuggest.vue';
import AccordionTaskToggle from './../ui/ToggleButton.vue';
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
        ValidationProvider,
        AccordionTaskAutosuggest,
        AccordionTaskToggle
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
    methods: {
        async validateCost() {
            let validationCost = await this.$refs.refValidationCost.validate();
                this.$store.dispatch('accordionTask/updatePaidCostValid', {
                    paidCostValid : validationCost.valid
                });
        },    
        updatePaidTask(value) {         
            if(value) {   
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
        updateTask(value, indexTask, statusTask, propertySuggestionItem) {
            console.log(propertySuggestionItem);
            this.$store.dispatch('accordionTask/updateTask', {
                'text' : value,
                'indexTask' : indexTask,
                'statusTask' : statusTask,
                'propertySuggestionItem' : propertySuggestionItem
            })
        },
        updateNewClient(value) {
            this.$store.dispatch('accordionTask/updateNewClient', {
                'indexTask' : this.indexTask,
                'statusTask' : this.statusTask,                
                'newClient' : value
            })            
        }
    },
    computed: {
        ...mapState([
            'accordionTask',
            'constants'
        ]),
        createAccordionGroupName() {
            return `my-accordion-${this.statusTask}`;
        },
        createAccordionId() {
            return `accordion-${this.statusTask}-${this.indexTask}`;           
        },
        showToggleNewClient() {
            return this.accordionTask[this.statusTask][this.indexTask].toggleNewClient;
        },
        showTogglePaid() {
            return this.accordionTask[this.statusTask][this.indexTask].togglePaid;
        },
        showTogglePaidForm() {
            return this.accordionTask[this.statusTask][this.indexTask].paidTask;            
        }          
    }
}
</script>
