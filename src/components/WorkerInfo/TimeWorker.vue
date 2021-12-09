<template>
 
    <div>
        <div>
        <label>Rozpoczęcie pracy: </label>
        <VueTimepicker
            v-model="startWork"
            @change="changedWorkTime"
            :hour-interval="1"
            :minute-interval="5"
            autocomplete="on" 
            auto-scroll>
        </VueTimepicker>
        <br>
        <label>Koniec pracy: </label>
        <VueTimepicker
            v-model="endWork"
            @change="changedWorkTime(); eloelo()"
            :hour-interval="1"
            :minute-interval="5"         
            autocomplete="on" 
            auto-scroll>
        </VueTimepicker>
        <p>Czas pracy: {{durationWork}}</p>  
        </div>
        <div>
            Spóźnienie? 
            <toggle-button
                @change="changedLateWork"                
                v-model="lateWork" 
                :value="false"
                :sync="true"
                :color="toggleColor"
                :labels="toggleText"/>
            Nadgodziny? 
            <toggle-button
                @change="changedOvertimeWork"  
                v-model="overtimeWork" 
                :value="false"
                :sync="true"
                :color="toggleColor"
                :labels="toggleText" />                
        </div>
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
            formatTime : "HH:mm",
            lateWork : false,
            overtimeWork : false,
            toggleColor : '#ffc107',
            toggleText : {checked: 'Tak', unchecked: 'Nie'},
        }
    },
    methods: {
        eloelo() {
            console.log('siema');
        },
        changedWorkTime() {
            let endWork = moment(this.endWork, this.formatTime)
            let startWork = moment(this.startWork, this.formatTime)

            let durationWork = moment.duration(endWork.diff(startWork));
            // let durationWork2 = moment(durationWork,this.formatTime)
            
            // let timeAfter  = moment("08:01", this.formatTime)


            let hoursWork = parseInt(durationWork.asHours());
            let minutesWork = parseInt(durationWork.asMinutes()) - hoursWork * 60;

            this.durationWork = `${moment(hoursWork, 'HH').format('HH')}:${moment(minutesWork, 'mm').format('mm') }`

            // console.log(durationWork + ' ' + timeAfter);
            // console.log(durationWork.isBefore(timeAfter));

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
