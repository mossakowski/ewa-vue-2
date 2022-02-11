<template>
    <div>
        <b-row class="mb-1">

            <b-col lg="2" md="3">
                <label>Rozpoczęcie pracy: </label>
            </b-col>

            <b-col md="2">
                <form-time-picker
                    :valueTimepicker="workerInfo.timeDateWork.startWork"
                    @updateValueForm="[updateStartWork($event)]">             
                </form-time-picker>
            </b-col>

        </b-row>
        <b-row class="mb-1">

            <b-col lg="2" md="3">
                <label>Koniec pracy: </label>
            </b-col>

            <b-col md="2">
                <form-time-picker
                    :valueTimepicker="workerInfo.timeDateWork.endWork"
                    @updateValueForm="updateEndWork">             
                </form-time-picker>
            </b-col>

        </b-row>
        <b-row>

            <b-col lg="2" md="3">
                Data:
            </b-col>

            <b-col md="2">
                <form-date-picker
                    :dateValue="workerInfo.timeDateWork.dateWork"
                    @updateDate="updateDateWork"
                    >                    
                </form-date-picker>  

            </b-col>  

        </b-row>
        <b-row class="mt-2">

            <b-col md="3">
                Spóźnienie?
                <toggle-button
                    :valueToggleProp="workerInfo.timeDateWork.late"
                    :key="workerInfo.timeDateWork.late"
                    :colorToggleChecked="COLOR_TOGGLE_CHECKED"
                    @updateValueToggle="updateLateWorker">
                </toggle-button>
            </b-col>

            <b-col md="3">              
                Nadgodziny?
                <toggle-button
                    :valueToggleProp="workerInfo.timeDateWork.overtime"
                    :key="workerInfo.timeDateWork.overtime"
                    :colorToggleChecked="COLOR_TOGGLE_CHECKED"
                    @updateValueToggle="updateOvertimeWorker">
                </toggle-button>                  
            </b-col>

            <b-col md="3">
                Czas pracy: {{showWorkTime}}
            </b-col>   
                        
        </b-row>
    </div>
</template>

<script>
import FormTimePicker from '../ui/FormTimePicker.vue';
import FormDatePicker from '../ui/FormDatePicker.vue';
import { TIME_START_WORK, TIME_END_WORK } from '../../../common/constants/time'
import { mapState } from 'vuex';
import { compareTime, calcDurrationTime, isValidTime } from '../../../common/adapters/adapterTime'
import { COLOR_TOGGLE_CHECKED } from '../../../common/constants/colors';
import ToggleButton from '../ui/ToggleButton.vue';

export default {
    name: 'TimeWorker',
    components : {
        ToggleButton,
        FormTimePicker,
        FormDatePicker
    },
    data(){
        return {
            COLOR_TOGGLE_CHECKED,
            colorToggleChecked : '#ffc107',
            toggleText : {checked: 'Tak', unchecked: 'Nie'},
            inputWidth: '100%'
        }
    },
    computed: mapState({
        workerInfo : state => state.workerInfo,
        constants : state => state.constants,
        showWorkTime() {
            return this.workerInfo.timeDateWork.durationWork === 'undefined:undefined' ? 'Popraw czas' : this.workerInfo.timeDateWork.durationWork;
        }
    }),        
    methods: {

        updateLateWorker(value) {
            this.$store.dispatch('workerInfo/updateOvertimeLateWorker', {
                late: value,
                overtime: this.workerInfo.timeDateWork.overtime
            });   
        },

        updateOvertimeWorker(value) {
            this.$store.dispatch('workerInfo/updateOvertimeLateWorker', {
                late: this.workerInfo.timeDateWork.late,
                overtime: value
            });             
        },

        updateDateWork(dateWork) {
            this.$store.dispatch('workerInfo/updateDateWork',{date: dateWork});
        },

        updateStartWork(time) {
            if(!isValidTime(time)) {
                this.$store.dispatch('workerInfo/updateTimeWork',{
                startWork : '',
                endWork : this.workerInfo.timeDateWork.endWork
            })                
            } else {              
                this.$store.dispatch('workerInfo/updateTimeWork',{
                startWork : time,
                endWork : this.workerInfo.timeDateWork.endWork,
                })                
            }

            this.calcWorkTime();

            // Change value on true in toggle lateWorker when late's worker
            if(compareTime(TIME_START_WORK, this.workerInfo.timeDateWork.startWork)) {
                this.$store.dispatch('workerInfo/updateOvertimeLateWorker', {
                late: true,
                overtime: this.workerInfo.timeDateWork.overtime
                })                
            }

        },
        updateEndWork(time) {
            if(!isValidTime(time)) {
                this.$store.dispatch('workerInfo/updateTimeWork',{
                    startWork : this.workerInfo.timeDateWork.startWork,
                    endWork : ''
            })                
            } else {
                this.$store.dispatch('workerInfo/updateTimeWork',{
                    startWork : this.workerInfo.timeDateWork.startWork,
                    endWork : time,
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
        }
    }
}
</script>
