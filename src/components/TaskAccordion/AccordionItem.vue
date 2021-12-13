<template>
    <div>
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
                <!-- '"accordion-" + indexAccordion' -->
            <b-button block v-b-toggle='statusTask + "-" + indexAccordion' variant="info">#{{indexAccordion +1}} {{typeWork}} 
                <btn-remove-task :statusTask="statusTask" :idTask="indexAccordion"></btn-remove-task>
            </b-button> 
        </b-card-header>

        <b-collapse :id='statusTask + "-" + indexAccordion' :data-index='indexAccordion' accordion="my-accordion" role="tabpanel">
            <b-card-body>
                <b-form-group label="Rodzaj pracy:">
                    <b-form-select @change="updateSelectedTypeWork(indexAccordion, statusTask)" v-model="selectedTypeWork" :options="optionsTypeWork" data-test="elo"></b-form-select>
                </b-form-group>

            <b-form-group label="Imię i nazwisko klienta/ nazwa firmy/ miejsce:">
                    <b-form-input
                        @keyup="updateInput($event, indexAccordion, statusTask, 'nameCustomer')"
                        type="text"
                        placeholder="Wpisz dane"
                    >
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Opis zdarzenia">
                    <b-form-textarea
                        @keyup="updateInput($event, indexAccordion, statusTask, 'description')"
                        placeholder="Opisz zdarzenie"
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>                
                </b-form-group>

                <b-form-group label="Płatne?">
                    <toggle-button v-model="paidTask" @change="resetPaidCost" :labels="{checked: 'Tak', unchecked: 'Nie'}"/>             
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
export default {
    name : 'AccordionItem',
    components : {
        BtnRemoveTask,
        ToggleButton
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
            selectedTypeWork : 'Serwis',
            optionsTypeWork : [
                {
                    label: 'Serwis',
                    options: [
                        { value: 'Serwis', text: 'Serwis' },
                        { value: { foo: 'bar', baz: true } , text: 'Awaria' }
                    ]
                },
                {
                    label: 'Instalacje',
                    options: [
                        { value: 'Instalacja światłowodowa', text: 'Światłowodowa' },
                        { value: 'Instalacja radiowa', text: 'Radiowa' }
                    ]
                }                
            ],
            paidTask: false,
            paidCost : '0'
        }
    },
    methods: {
        updateInput(e, indexAccordion, statusTask, propertyObj) {
            this.$store.commit('updateTask', {
                'text' : e.target.value,
                'indexAccordion' : indexAccordion,
                'statusTask' : statusTask,
                'propertyObj' : propertyObj,
                'selectedTypeWork' : this.selectedTypeWork
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
