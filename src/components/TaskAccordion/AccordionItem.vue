<template>
    <div>
        <b-card no-body class="mb-1">
            <b-card-header v-b-toggle='statusTask + "-" + indexAccordion' header-tag="header" style="cursor: pointer" class="bg-info hover-pointer text-light p-1 px-3 d-flex align-items-center justify-content-between" role="tab">
                <span>#{{indexAccordion +1}} {{typeWork}}</span>
                <btn-remove-task :statusTask="statusTask" :idTask="indexAccordion"></btn-remove-task>
            </b-card-header>

            <b-collapse :id='statusTask + "-" + indexAccordion' visible :data-index='indexAccordion' accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <b-form-group label="Rodzaj pracy:">
                         <select @change="updateSelectedTypeWork($event, indexAccordion, statusTask), displayToggleNewClient($event)" v-model="selectedTypeWork" class="custom-select">
                            <optgroup label="Serwis">
                                <option value="Serwis">Serwis</option>
                                <option value="Awaria">Awaria</option>
                                <option value="Przedłużenie umowy">Przedłużenie umowy</option>
                            </optgroup>
                            <optgroup label="Instalacje">
                                <option value="Instalacja światłowodowa" data-type="installation" data-method='fiber'>Instalacja światłowodowa</option>
                                <option value="Instalacja Radiowa" data-type="installation" data-method='radio'>Instalacja Radiowa</option>
                                <option value="Instalacja Blok" data-type="installation" data-method='fiber'>Instalacja Blok</option>
                                <option value="Instalacja Zbiorcza" data-type="installation" data-method='fiber'>Instalacja Zbiorcza</option>
                                <option value="Instalacja TV">Instalacja TV</option>
                            </optgroup>
                            <optgroup label="Budowa sieci">
                                <option value="Budowa sieci">Budowa</option>
                                <option value="Budowa sieci">Przebudowa</option>
                                <option value="Budowa sieci">Wywiad techniczny (napisz czy są możliwości)</option>
                            </optgroup>
                            <optgroup label="Biuro">
                                <option value="Prace biurowe">Prace biurowe</option>                                
                                <option value="Sprzątanie">Sprzątanie</option>                                
                                <option value="Inne">Inne</option>                                
                            </optgroup>
                        </select>                                         
                    </b-form-group>

                <b-form-group label="Imię i nazwisko klienta/ nazwa firmy/ miejsce:">
                        <b-form-input
                            @keyup="updateTask($event, indexAccordion, statusTask, 'nameCustomer')"
                            type="text"
                            placeholder="Wpisz dane"
                        >
                        </b-form-input>
                    </b-form-group>

                    <b-form-group v-if="showToggleClient" label="Nowy klient?">
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
            paidCost : '0',
            showToggleClient : false,
            toggleNewClient : false         
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
