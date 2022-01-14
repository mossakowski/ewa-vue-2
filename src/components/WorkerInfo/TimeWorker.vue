<template>
    <div>
        <b-row>
            <b-col md="4">
                <label>Rozpoczęcie pracy: </label>
                <ValidationProvider :rules="{required: true, regex: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/}" v-slot="{ errors }"> 
                <VueTimepicker
                    v-model="startWork"                  
                    @change="onChangedWorkTime"
                    class="ml-1"
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
            <b-col md="4">
                <label>Koniec pracy: </label>
                <ValidationProvider :rules="{required: true, regex: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/}" v-slot="{ errors }"> 
                <VueTimepicker
                    v-model="endWork"
                    @change="onChangedWorkTime"
                    class="ml-1"
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
            <b-col md="4">
                Data:
                <ValidationProvider :rules="{required: true}" v-slot="{ errors }">                 
                <date-picker
                    v-model="dateWork"
                    @change="onChangedDateWork"
                    :format="formatDate"
                    value-type="format"              
                    type="date"
                    class="ml-2"
                    placeholder="Wybierz datę"
                ></date-picker>
                <br>
                <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>                   
            </b-col>  
        </b-row>

        <b-row class="mt-2">
            <b-col md="2">
            Spóźnienie?
            <toggle-button 
                @change="onChangeLateovertimeWorker"
                :width="$store.state.widthHeigthComponents.toggle.width" 
                :height="$store.state.widthHeigthComponents.toggle.heigth" 
                :sync="true"
                :color="toggleColor"
                :labels="toggleText"/>
            </b-col>
            <b-col md="2">
            Nadgodziny?
            <toggle-button
                @change="onChangeLateovertimeWorker"  
                v-model="overtimeWorker"
                :width="$store.state.widthHeigthComponents.toggle.width" 
                :height="$store.state.widthHeigthComponents.toggle.heigth"                 
                :sync="true"
                :color="toggleColor"
                :labels="toggleText" /> 
            </b-col>
            <b-col md="2">
                Czas pracy: {{(durationWork === 'undefined:undefined') ? 'Popraw czas' : durationWork}}
            </b-col>               
        </b-row>
    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
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
            dateWork : moment().format('DD-MM-YYYY'),
            startWork : this.$store.state.timeDateWork.startWork,
            endWork : '17:00',
            durationWork : '08:00',
            formatTime : "hh:mm",
            formatDate: 'DD-MM-YYYY',
            lateWorker : false,
            overtimeWorker : false,
            toggleColor : '#ffc107',
            toggleText : {checked: 'Tak', unchecked: 'Nie'},
            inputWidth: '100px'
        }
    },
    methods: {
        onChangedDateWork() {
            this.$store.commit('updateDateWork',{date: this.dateWork});
        },
        onChangedWorkTime() {

            let endWork = moment(this.endWork, this.formatTime)
            let startWork = moment(this.startWork, this.formatTime)

            //Change value on true in toggle lateWorker
            if(startWork.isAfter(moment('09:00', this.formatTime))) {
                this.lateWorker = true
            }
            //Change value on true in toggle overtimeWorker
            if(endWork.isAfter(moment('17:00', this.formatTime))) {
                this.overtimeWorker = true
            }

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
                    endWork : this.endWork,
                    durationWork: this.durationWork
                })                
            }            

            },
        onChangeLateovertimeWorker() {
            this.$store.commit('updateOvertimeLateWorker', {
                late: this.lateWorker,
                overtime: this.overtimeWorker
            })
        },
    },
    mounted() {
        moment.updateLocale(moment.locale(), { invalidDate: null })
        this.$store.commit('updateDateWork',{date: moment().format('DD-MM-YYYY')});
    }
}
</script>
