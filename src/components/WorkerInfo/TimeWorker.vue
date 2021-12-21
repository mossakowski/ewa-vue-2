<template>
    <div>
        <b-row>
            <b-col md="4">
                <label>Rozpoczęcie pracy: </label>
                <VueTimepicker
                    v-model="startWork"                    
                    @change="changedWorkTime"
                    class="ml-1"
                    hour-interval="1"
                    minute-interval="5"
                    autocomplete="on"
                    :input-width="inputWidth"
                    auto-scroll
                    hide-clear-button>
                </VueTimepicker>
            </b-col>
            <b-col md="4">
                <label>Koniec pracy: </label>
                <VueTimepicker
                    v-model="endWork"
                    @change="changedWorkTime"
                    class="ml-1"
                    hour-interval="1"
                    minute-interval="5"         
                    autocomplete="on"
                    :input-width="inputWidth" 
                    auto-scroll
                    hide-clear-button>
                </VueTimepicker>
            </b-col>
            <b-col md="4">
                <i>(Czas pracy: {{durationWork}})</i>
            </b-col>  
        </b-row>

        <b-row class="mt-2">
            <b-col md="2">
            Spóźnienie?
            <toggle-button 
                @change="changedLateWork"                
                v-model="lateWork"
                :width="$store.state.widthHeigthComponents.toggle.width" 
                :height="$store.state.widthHeigthComponents.toggle.heigth" 
                :sync="true"
                :color="toggleColor"
                :labels="toggleText"/>
            </b-col>
            <b-col md="2">
            Nadgodziny? 
            <toggle-button
                @change="changedOvertimeWork"  
                v-model="overtimeWork"
                :width="$store.state.widthHeigthComponents.toggle.width" 
                :height="$store.state.widthHeigthComponents.toggle.heigth"                 
                :sync="true"
                :color="toggleColor"
                :labels="toggleText" /> 
            </b-col>               
        </b-row>
    </div>
</template>

<script>
//Autocomplete jest spoko
//changeEvent
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import moment from 'moment'
import { ToggleButton } from 'vue-js-toggle-button'
export default {
    name: 'TimeWorker',
    components : {
        VueTimepicker,
        ToggleButton
    },
    data(){
        return {
            startWork : '09:00',
            endWork : '17:00',
            durationWork : '08:00',
            formatTime : "hh:mm",
            lateWork : false,
            overtimeWork : false,
            toggleColor : '#ffc107',
            toggleText : {checked: 'Tak', unchecked: 'Nie'},
            inputWidth: '100px'
        }
    },
    methods: {
        changedWorkTime() {
            let endWork = moment(this.endWork, this.formatTime)
            let startWork = moment(this.startWork, this.formatTime)
            //Change value on true in toggle lateWork
            if(startWork.isAfter(moment('09:00', this.formatTime))) {
                this.lateWork = true
            }

            //Change value on true in toggle overtimeWork
            if(endWork.isAfter(moment('17:00', this.formatTime))) {
                this.overtimeWork = true
            }

            let durationWork = moment.duration(endWork.diff(startWork));

            let hoursWork = parseInt(durationWork.asHours());
            let minutesWork = parseInt(durationWork.asMinutes()) - hoursWork * 60;

            this.durationWork = `${moment(hoursWork, 'HH').format('HH')}:${moment(minutesWork, 'mm').format('mm') }`
            this.$store.state.durationWork = this.durationWork

            },
        changedOvertimeWork() {
            this.overtimeWork != this.overtimeWork
        },
        changedLateWork() {
            this.lateWork != this.lateWork
        }
        

    }
}
</script>
