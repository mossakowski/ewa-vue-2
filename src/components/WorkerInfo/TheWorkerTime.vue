<template>
    <div>
        <b-row class="mb-1">
            <b-col lg="2" md="3">
                <label>Rozpoczęcie pracy: </label>
            </b-col>
            <b-col md="2">
                <ValidationProvider :rules="{required: true, regex: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/}" v-slot="{ errors }"> 
                    <VueTimepicker
                        :value="$store.state.timeDateWork.startWork"                
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
                        :value="$store.state.timeDateWork.endWork"
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
                        :value="$store.state.timeDateWork.dateWork"
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
                    :value="$store.state.timeDateWork.late" 
                    @change="updateLateOvertimeWorker"
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth" 
                    :sync="true"
                    :color="toggleColor"
                    :labels="toggleText"/>
            </b-col>
            <b-col md="3">
                Nadgodziny?
                <toggle-button
                    id="toggleOvertime"
                    :value="$store.state.timeDateWork.overtime"
                    @change="updateLateOvertimeWorker"  
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                 
                    :sync="true"
                    :color="toggleColor"
                    :labels="toggleText" /> 
            </b-col>
            <b-col md="3">
                Czas pracy: {{($store.state.timeDateWork.durationWork === 'undefined:undefined') ? 'Popraw czas' : $store.state.timeDateWork.durationWork}}
            </b-col>               
        </b-row>
    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import { ToggleButton } from 'vue-js-toggle-button';
import { ValidationProvider, extend } from 'vee-validate';
import { required, regex } from 'vee-validate/dist/rules';
import { DATE_FULL_FORMAT } from '../../../common/constants/date';
import { TIME_HOUR_MINUTES_FORMAT, TIME_HOUR_FORMAT, TIME_MINUTES_FORMAT } from '../../../common/constants/time'

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
            dateWork : this.$store.state.timeDateWork.dateWork,
            DATE_FULL_FORMAT,
            toggleColor : '#ffc107',
            toggleText : {checked: 'Tak', unchecked: 'Nie'},
            inputWidth: '100%'
        }
    },
    methods: {
        updateDateWork(dateWork) {
            this.$store.dispatch('updateDateWork',{date: dateWork});
        },
        updateStartWork(e) {
            let validateStartWork = e.displayTime.split(':');
            if(validateStartWork[0] === 'HH' || validateStartWork[1] === 'mm') {
                this.$store.dispatch('updateTimeWork',{
                    startWork : '',
                    endWork : this.$store.state.timeDateWork.endWork
                })                
            } else {
                this.$store.dispatch('updateTimeWork',{
                    startWork : e.displayTime,
                    endWork : this.$store.state.timeDateWork.endWork,
                })                
            }

            let startWorkTime = moment(this.$store.state.timeDateWork.startWork, TIME_HOUR_MINUTES_FORMAT);
            //Change value on true in toggle lateWorker when late's worker
            if(startWorkTime.isAfter(moment('09:00', TIME_HOUR_MINUTES_FORMAT))) {
                this.$store.dispatch('updateOvertimeLateWorker', {
                    late: true,
                    overtime: this.$store.state.timeDateWork.overtime
                })                
            }
            this.calcWorkTime();            
        },
        updateEndWork(e) {
            let valdiateEndWork = e.displayTime.split(':');
            if(valdiateEndWork[0] === 'HH' || valdiateEndWork[1] === 'mm') {
                this.$store.dispatch('updateTimeWork',{
                    startWork : this.$store.state.timeDateWork.startWork,
                    endWork : ''
                })                
            } else {
                this.$store.dispatch('updateTimeWork',{
                    startWork : this.$store.state.timeDateWork.startWork,
                    endWork : e.displayTime,
                })
                    let endWorkTime = moment(this.$store.state.timeDateWork.endWork, TIME_HOUR_MINUTES_FORMAT)
                    //Change value on true in toggle overtimeWorker when overtime's worker
                    if(endWorkTime.isAfter(moment('17:00', TIME_HOUR_MINUTES_FORMAT))) {
                    this.$store.dispatch('updateOvertimeLateWorker', {
                        late: this.$store.state.timeDateWork.late,
                        overtime: true
                        })                        
                    }
                    this.calcWorkTime();                              
            }             
        },
        calcWorkTime() {
            //Create moment object           
            let startWork = moment(this.$store.state.timeDateWork.startWork, TIME_HOUR_MINUTES_FORMAT);
            let endWork = moment(this.$store.state.timeDateWork.endWork, TIME_HOUR_MINUTES_FORMAT);            
            //Calculate duration time
            let durationMoments = moment.duration(endWork.diff(startWork));
            let hoursWork = parseInt(durationMoments.asHours());
            let minutesWork = parseInt(durationMoments.asMinutes()) - hoursWork * 60;
  
            let durationWork = `${moment(hoursWork, TIME_HOUR_FORMAT).format(TIME_HOUR_FORMAT)}:${moment(minutesWork, TIME_MINUTES_FORMAT).format(TIME_MINUTES_FORMAT) }`;

            if(startWork.isValid() && endWork.isValid()) {
                this.$store.dispatch('updateDurationWork',{
                    durationWork: durationWork
                }) 
            } else {
                this.$store.dispatch('updateDurationWork',{
                    durationWork: 'Nie prawidłowy czas'
                })                 
            }            
        },
        updateLateOvertimeWorker(e) {
            if(e.srcEvent.target.parentElement.id === 'toggleLate') {
                this.$store.dispatch('updateOvertimeLateWorker', {
                    late: !this.$store.state.timeDateWork.late,
                    overtime: this.$store.state.timeDateWork.overtime
                })                
            }
            if(e.srcEvent.target.parentElement.id === 'toggleOvertime') {
                this.$store.dispatch('updateOvertimeLateWorker', {
                    late: this.$store.state.timeDateWork.late,
                    overtime: !this.$store.state.timeDateWork.overtime
                })                
            }
        },
    },
    mounted() {
        moment.updateLocale(moment.locale(), { invalidDate: null })
        this.$store.dispatch('updateDateWork',{date: moment().format(DATE_FULL_FORMAT)});
    }
}
</script>

<style lang="scss">
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}    
</style>