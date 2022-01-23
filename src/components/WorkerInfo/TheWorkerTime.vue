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
                        @change="onChangeStartWork"
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
                        @change="onChangeEndWork"
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
                        @change="onChangeDateWork"
                        :format="formatDate"
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
                    @change="onChangeLateovertimeWorker"
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
                    @change="onChangeLateovertimeWorker"  
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                 
                    :sync="true"
                    :color="toggleColor"
                    :labels="toggleText" /> 
            </b-col>
            <b-col md="3">
                Czas pracy: {{(durationWork === 'undefined:undefined') ? 'Popraw czas' : durationWork}}
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
            durationWork : '08:00',
            formatTime : "hh:mm",
            formatDate: 'DD-MM-YYYY',
            toggleColor : '#ffc107',
            toggleText : {checked: 'Tak', unchecked: 'Nie'},
            inputWidth: '100%'
        }
    },
    methods: {
        onChangeDateWork(dateWork) {
            this.$store.commit('updateDateWork',{date: dateWork});
        },
        onChangeStartWork(e) {
            let validateStartWork = e.displayTime.split(':');
            if(validateStartWork[0] === 'HH' || validateStartWork[1] === 'mm') {
                this.$store.commit('updateTimeWork',{
                    startWork : '',
                    endWork : this.$store.state.timeDateWork.endWork
                })                
            } else {
                this.$store.commit('updateTimeWork',{
                    startWork : e.displayTime,
                    endWork : this.$store.state.timeDateWork.endWork,
                })                
            }

            let startWorkTime = moment(this.$store.state.timeDateWork.startWork, this.formatTime);
            //Change value on true in toggle lateWorker when late's worker
            if(startWorkTime.isAfter(moment('09:00', this.formatTime))) {
                this.$store.commit('updateOvertimeLateWorker', {
                    late: true,
                    overtime: this.$store.state.timeDateWork.overtime
                })                
            }            
        },
        onChangeEndWork(e) {
            let valdiateEndWork = e.displayTime.split(':');
            if(valdiateEndWork[0] === 'HH' || valdiateEndWork[1] === 'mm') {
                this.$store.commit('updateTimeWork',{
                    startWork : this.$store.state.timeDateWork.startWork,
                    endWork : ''
                })                
            } else {
                this.$store.commit('updateTimeWork',{
                    startWork : this.$store.state.timeDateWork.startWork,
                    endWork : e.displayTime,
                })
                    let endWorkTime = moment(this.$store.state.timeDateWork.endWork, this.formatTime)
                    //Change value on true in toggle overtimeWorker when overtime's worker
                    if(endWorkTime.isAfter(moment('17:00', this.formatTime))) {
                    this.$store.commit('updateOvertimeLateWorker', {
                        late: this.$store.state.timeDateWork.late,
                        overtime: true
                        })                        
                    }                                
            }             
        },
        onChangeWorkTime() {
            //Convert to moment format
            let endWork = moment(this.endWork, this.formatTime)
            let startWork = moment(this.startWork, this.formatTime)

            //Calculate duration time
            let durationWork = moment.duration(endWork.diff(startWork));
            let hoursWork = parseInt(durationWork.asHours());
            let minutesWork = parseInt(durationWork.asMinutes()) - hoursWork * 60;
            this.durationWork = `${moment(hoursWork, 'HH').format('HH')}:${moment(minutesWork, 'mm').format('mm') }`
            
            let checkStartWork = this.startWork.split(':')
            let checkEndWork = this.endWork.split(':')

            if(checkStartWork[0] === 'HH' || checkStartWork[1] === 'mm' || checkEndWork[0] === 'HH' || checkEndWork[1] === 'mm') {
                this.$store.commit('updateTimeWork',{
                    startWork : '',
                    endWork : '',
                    durationWork: ''
                })                
            } else {
                this.$store.commit('updateTimeWork',{
                    startWork : this.startWork,
                    endWork : '17:11',
                    durationWork: this.durationWork
                })                
            }            

            },
        onChangeLateovertimeWorker(e) {
            if(e.srcEvent.target.parentElement.id === 'toggleLate') {
                this.$store.commit('updateOvertimeLateWorker', {
                    late: !this.$store.state.timeDateWork.late,
                    overtime: this.$store.state.timeDateWork.overtime
                })                
            }
            if(e.srcEvent.target.parentElement.id === 'toggleOvertime') {
                this.$store.commit('updateOvertimeLateWorker', {
                    late: this.$store.state.timeDateWork.late,
                    overtime: !this.$store.state.timeDateWork.overtime
                })                
            }
        },
    },
    mounted() {
        moment.updateLocale(moment.locale(), { invalidDate: null })
        this.$store.commit('updateDateWork',{date: moment().format('DD-MM-YYYY')});
    }
}
</script>
