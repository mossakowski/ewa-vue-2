<template>
    <div>

        <b-row>            
            <b-col>
                <h2>5. Dyżury</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="12">
                Dyżur tygodniowy:
                <toggle-button
                    :valueToggleProp="duty.activeWeek"
                    :key="duty.activeWeek" 
                    @updateValueToggle="updateDutyWeekWorker">            
                </toggle-button>
            </b-col>

            <b-col sm="12">
                Dyżur świąteczny:
                <toggle-button 
                    :valueToggleProp="duty.activeHoliday"
                    :key="duty.activeHoliday" 
                    @updateValueToggle="updateDutyHolidayWorker">
                </toggle-button>
                
                <form-date-range-picker
                    @updateValueDateRange="updateDutyHolidayDateRange">
                </form-date-range-picker>
            </b-col>

            <b-col sm="12">
                Dodatkowy czas pracy z ostatniego dyżuru:
                <form-time-picker
                    :valueTimepicker="duty.additionalTimeInLastDuty"
                    @updateValueForm="updateAdditionalTimeInLastDuty">
                </form-time-picker>
            </b-col> 
        </b-row>
        
    </div>
</template>

<script>
import FormTimePicker from '../ui/FormTimePicker.vue';
import FormDateRangePicker from '../ui/FormDateRangePicker.vue';
import ToggleButton  from '../ui/ToggleButton.vue';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/pl';
import { isValidTime } from '../../../common/adapters/adapterTime'
import { mapState } from 'vuex';

export default {
    name: 'DutyComponents',
    components: {
        FormTimePicker,
        ToggleButton,
        FormDateRangePicker
    },
    computed: mapState({
        duty : 'duty',
        constants : 'constants'
    }),      
    methods: {
        updateDutyHolidayDateRange(rangeTime) {
            this.$store.dispatch('duty/updateDutyHolidayDateRange', {
                holidayRangeDateStart : rangeTime[0],
                holidayRangeDateEnd : rangeTime[1]
            });            
        },
        updateAdditionalTimeInLastDuty(time) {
            this.$store.dispatch('duty/updateAdditionalTimeInDuty', {
                additionalTimeInLastDuty : time,
                additionalTimeInLastDutyValidation : isValidTime(time)               
            })
        },
        updateDutyHolidayWorker(value) {
            this.$store.dispatch('duty/updateDuty', {
                dutyWeek : this.duty.activeWeek,
                dutyHoliday : value,
            })
        },
        updateDutyWeekWorker(value) {
            this.$store.dispatch('duty/updateDuty', {
                dutyWeek : value,
                dutyHoliday : this.duty.activeHoliday,
            })
        }
    }
}
</script>