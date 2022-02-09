<template>
    <div>
        <b-row class="mb-1">
            <b-col lg="2" md="3">
                <label>Rozpoczęcie pracy: </label>
            </b-col>
            <b-col md="2">
                <ValidationProvider :rules="{required: true, regex: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/}" v-slot="{ errors }"> 
                    <VueTimepicker
                        :value="workerInfo.timeDateWork.startWork"                
                        @change="updateStartWork"
                        hour-interval="1"
                        minute-interval="5"
                        autocomplete="on"
                        :input-width="inputWidth"
                        auto-scroll                        
                        hide-clear-button>
                    </VueTimepicker>
                    <br>
                    <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>                
            </b-col>
        </b-row>
        <b-row class="mb-1">
            <b-col lg="2" md="3">
                <label>Koniec pracy: </label>
            </b-col>
            <b-col md="2">
                <ValidationProvider :rules="{required: true, regex: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/}" v-slot="{ errors }"> 
                    <VueTimepicker
                        :value="workerInfo.timeDateWork.endWork"
                        @change="updateEndWork"
                        hour-interval="1"
                        minute-interval="5"         
                        autocomplete="on"
                        :input-width="inputWidth" 
                        auto-scroll
                        hide-clear-button>
                    </VueTimepicker>
                    <br>
                    <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="2" md="3">
                Data:
            </b-col>
            <b-col md="2">
                <ValidationProvider :rules="{required: true}" v-slot="{ errors }">                 
                    <date-picker
                        :value="workerInfo.timeDateWork.dateWork"
                        @change="updateDateWork"
                        :format="DATE_FULL_FORMAT"
                        value-type="format"              
                        type="date"
                        style="width:100%"
                        placeholder="Wybierz datę"
                    ></date-picker>
                    <br>
                    <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>                   
            </b-col>  
        </b-row>

        <b-row class="mt-2">
            <b-col md="3">
                Spóźnienie?
                <toggle-button
                    id="toggleLate"                
                    :value="workerInfo.timeDateWork.late" 
                    @change="updateLateOvertimeWorker"
                    :width="constants.toggle.width" 
                    :height="constants.toggle.heigth" 
                    :sync="true"
                    :color="toggleColor"
                    :labels="toggleText"/>
            </b-col>
            <b-col md="3">
                Nadgodziny?
                <toggle-button
                    id="toggleOvertime"
                    :value="workerInfo.timeDateWork.overtime"
                    @change="updateLateOvertimeWorker"  
                    :width="constants.toggle.width" 
                    :height="constants.toggle.heigth"                 
                    :sync="true"
                    :color="toggleColor"
                    :labels="toggleText" /> 
            </b-col>
            <b-col md="3">
                Czas pracy: {{(workerInfo.timeDateWork.durationWork === 'undefined:undefined') ? 'Popraw czas' : workerInfo.timeDateWork.durationWork}}
            </b-col>               
        </b-row>
    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import DatePicker from 'vue2-datepicker';
import { ToggleButton } from 'vue-js-toggle-button';
import { ValidationProvider, extend } from 'vee-validate';
import { required, regex } from 'vee-validate/dist/rules';
import { DATE_FULL_FORMAT } from '../../../common/constants/date';
import { TIME_START_WORK, TIME_END_WORK } from '../../../common/constants/time'
import { mapState } from 'vuex';
import { compareTime, calcDurrationTime, isValidTime } from '../../../common/adapters/adapterTime'

extend('required', {
    ...required,
    message: 'Pole wymagane!'
})

extend('regex', {
    ...regex,
    message: 'Niepoprawny format!'
})

export default {
    name: 'TimeWorker',
    components : {
        VueTimepicker,
        ToggleButton,
        DatePicker,
        ValidationProvider
    },
    data(){
        return {
            DATE_FULL_FORMAT,
            toggleColor : '#ffc107',
            toggleText : {checked: 'Tak', unchecked: 'Nie'},
            inputWidth: '100%'
        }
    },
    computed: mapState({
        workerInfo : state => state.workerInfo,
        constants : state => state.constants,
    }),        
    methods: {
        updateDateWork(dateWork) {
            this.$store.dispatch('workerInfo/updateDateWork',{date: dateWork});
        },
        updateStartWork(e) {
            let validateStartWork = e.displayTime.split(':');
            if(validateStartWork[0] === 'HH' || validateStartWork[1] === 'mm') {
                this.$store.dispatch('workerInfo/updateTimeWork',{
                    startWork : '',
                    endWork : this.workerInfo.timeDateWork.endWork
                })                
            } else {
                this.$store.dispatch('workerInfo/updateTimeWork',{
                    startWork : e.displayTime,
                    endWork : this.workerInfo.timeDateWork.endWork,
                })                
            }

            //Change value on true in toggle lateWorker when late's worker
            if(compareTime(TIME_START_WORK, this.workerInfo.timeDateWork.startWork)) {
                this.$store.dispatch('workerInfo/updateOvertimeLateWorker', {
                    late: true,
                    overtime: this.workerInfo.timeDateWork.overtime
                })                
            }
            this.calcWorkTime();            
        },
        updateEndWork(e) {
            let valdiateEndWork = e.displayTime.split(':');
            if(valdiateEndWork[0] === 'HH' || valdiateEndWork[1] === 'mm') {
                this.$store.dispatch('workerInfo/updateTimeWork',{
                    startWork : this.workerInfo.timeDateWork.startWork,
                    endWork : ''
                })                
            } else {
                this.$store.dispatch('workerInfo/updateTimeWork',{
                    startWork : this.workerInfo.timeDateWork.startWork,
                    endWork : e.displayTime,
                })

                    //Change value on true in toggle overtimeWorker when overtime's worker                    
                    if(compareTime(TIME_END_WORK, this.workerInfo.timeDateWork.endWork)) {
                    this.$store.dispatch('workerInfo/updateOvertimeLateWorker', {
                        late: this.workerInfo.timeDateWork.late,
                        overtime: true
                        })                        
                    }
                    this.calcWorkTime();                              
            }             
        },
        calcWorkTime() {
            //Calculate duration time
            let durationWork = calcDurrationTime(this.workerInfo.timeDateWork.startWork, this.workerInfo.timeDateWork.endWork);

            if(isValidTime(this.workerInfo.timeDateWork.startWork) && isValidTime(this.workerInfo.timeDateWork.endWork)) {
                this.$store.dispatch('workerInfo/updateDurationWork',{
                    durationWork: durationWork
                }) 
            } else {
                this.$store.dispatch('workerInfo/updateDurationWork',{
                    durationWork: 'Nie prawidłowy czas'
                })                 
            }            
        },
        updateLateOvertimeWorker(e) {
            if(e.srcEvent.target.parentElement.id === 'toggleLate') {
                this.$store.dispatch('workerInfo/updateOvertimeLateWorker', {
                    late: !this.workerInfo.timeDateWork.late,
                    overtime: this.workerInfo.timeDateWork.overtime
                })                
            }
            if(e.srcEvent.target.parentElement.id === 'toggleOvertime') {
                this.$store.dispatch('workerInfo/updateOvertimeLateWorker', {
                    late: this.workerInfo.timeDateWork.late,
                    overtime: !this.workerInfo.timeDateWork.overtime
                })                
            }
        },
    }
}
</script>
