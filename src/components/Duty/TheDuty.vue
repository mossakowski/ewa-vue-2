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
                    :value="duty.activeWeek"
                    :sync="true"
                    id="toggleDutyWeek"
                    @change="updateDutyWorker"
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                     
                    :labels="{checked: 'Tak', unchecked: 'Nie'}"/>
            </b-col>

            <b-col sm="12">
            Dyżur świąteczny:
                <toggle-button
                    :value="duty.activeHoliday"
                    :sync="true"
                    id="toggleDutyHoliday"
                    @change="updateDutyWorker"
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                     
                    :labels="{checked: 'Tak', unchecked: 'Nie'}"/>

                <span v-if="duty.activeHoliday">
                    <date-picker
                        @change="onChangeDutyHolidayDateRange"                        
                        :value="duty.holidayRangeDate"                   
                        type="date"
                        class="ml-2"
                        range
                        :clearable="false"
                        :sync="true"
                        :format="DATE_FULL_FORMAT"
                        placeholder="Wybierz przedział czasowy">
                    </date-picker>
                    <span class="text-danger ml-1" v-if="(duty.holidayRangeDate.length === 0 || duty.holidayRangeDate[0] === null || duty.holidayRangeDate[1] === null)">Uzupełnij pole</span>
                </span>
            </b-col>

            <b-col sm="12">
                Dodatkowy czas pracy z ostatniego dyżuru:
                <ValidationProvider ref="refValidationTimeInLastDuty" :rules="{required: true, regex: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/}" v-slot="{ errors }">  
                    <VueTimepicker
                        :value="duty.additionalTimeInLastDuty"                 
                        @change="updateAdditionalTimeInLastDuty"  
                        input-width="85px"
                        minute-interval="5" 
                        hide-clear-button>
                    </VueTimepicker>
                    <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider> 
            </b-col>                
        </b-row>
    </div>
</template>

<script>
import moment from 'moment'
import { ToggleButton } from 'vue-js-toggle-button'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/pl';
import { ValidationProvider, extend } from 'vee-validate';
import { regex } from 'vee-validate/dist/rules';
import { DATE_FULL_FORMAT } from './../../../common/constants/date';
import { mapState } from 'vuex';

extend('regex', {
    ...regex,
    message: 'Niepoprawny format!'
})

export default {
    name: 'DutyComponents',
    components: {
        ToggleButton,
        VueTimepicker,
        DatePicker,
        ValidationProvider
    },
    data() {
        return {
            DATE_FULL_FORMAT                   
        }
    },
    computed: mapState({
        duty : state => state.duty
    }),      
    methods: {
        updateDateRangeDutyHoliday(e) {
            this.$store.dispatch('updateDateRangeDutyHoliday', {
                holidayRangeDateStart : moment(e[0]),
                holidayRangeDateEnd : moment(e[1])
            })
        },
        onChangeDutyHolidayDateRange(e) {
            this.$store.dispatch('duty/updateDutyHolidayDateRange', {
                holidayRangeDateStart : moment(e[0]),
                holidayRangeDateEnd : moment(e[1])
            });            
        },
        async updateAdditionalTimeInLastDuty(e) {
            let validationInput = await this.$refs.refValidationTimeInLastDuty.validate();           
            this.$store.dispatch('duty/updateAdditionalTimeInDuty', {
                additionalTimeInLastDuty : e.displayTime,
                additionalTimeInLastDutyValidation : validationInput.valid                
            })
        },
        updateDutyWorker(e) {
            if(e.srcEvent.target.parentElement.id === 'toggleDutyWeek') {
                this.$store.dispatch('duty/updateDuty', {
                    dutyWeek : !this.duty.activeWeek,
                    dutyHoliday : this.duty.activeHoliday,
                })                 
            }
            if(e.srcEvent.target.parentElement.id === 'toggleDutyHoliday') {
                if(!e.value) {
                    this.$store.dispatch('duty/updateDutyHolidayDateRange', {
                        holidayRangeDateStart : '',
                        holidayRangeDateEnd : ''
                    });                     
                }
                this.$store.dispatch('duty/updateDuty', {
                    dutyWeek : this.duty.activeWeek,
                    dutyHoliday : !this.duty.activeHoliday,
                })
            }
        }
    }
}
</script>