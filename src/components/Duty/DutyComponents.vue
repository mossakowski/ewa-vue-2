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
                    :value="$store.state.dutyProperties.activeWeek"
                    :sync="true"
                    id="toggleDutyWeek"
                    @change="onChangeUpdateDuty"
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                     
                    :labels="{checked: 'Tak', unchecked: 'Nie'}"/>
            </b-col>

            <b-col sm="12">
            Dyżur świąteczny:
                <toggle-button
                    :value="$store.state.dutyProperties.activeHoliday"
                    :sync="true"
                    id="toggleDutyHoliday"
                    @change="onChangeUpdateDuty"
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                     
                    :labels="{checked: 'Tak', unchecked: 'Nie'}"/>
                    <span v-if="$store.state.dutyProperties.activeHoliday">
                        <date-picker
                            @change="onChangeDutyHolidayDateRange"                        
                            :value="$store.state.dutyProperties.holidayRangeDate"                   
                            type="date"
                            class="ml-2"
                            range
                            :clearable="false"
                            :sync="true"
                            :format="formatDatePicker"
                            placeholder="Wybierz przedział czasowy">
                        </date-picker>
                        <span class="text-danger ml-1" v-if="($store.state.dutyProperties.holidayRangeDate.length === 0 || $store.state.dutyProperties.holidayRangeDate[0] === null || $store.state.dutyProperties.holidayRangeDate[1] === null)">Uzupełnij pole</span>
                    </span>
            </b-col>
            <b-col sm="12">
                Dodatkowy czas pracy z ostatniego dyżuru:
                <ValidationProvider ref="refValidationTimeInLastDuty" :rules="{required: true, regex: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/}" v-slot="{ errors }">  
                    <VueTimepicker
                        :value="$store.state.dutyProperties.additionalTimeInLastDuty"                 
                        @change="onChangeAdditionalTimeInLastDuty"  
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
            dutyWeek: false,
            dutyHoliday: false,
            dutyDateRange : [],
            additionalTimeInLastDuty : '00:00',
            formatTimePicker: 'HH:mm',
            formatDatePicker : 'DD-MM-YYYY'                      
        }
    },
    methods: {
        onChangeDutyHolidayDateRange(e) {
            this.$store.commit('updateDutyHolidayDateRange', {
                holidayRangeDateStart : moment(e[0]),
                holidayRangeDateEnd : moment(e[1])
            });            
        },
        async onChangeAdditionalTimeInLastDuty(e) {
            let validationInput = await this.$refs.refValidationTimeInLastDuty.validate();           
            this.$store.commit('updateAdditionalTimeInDuty', {
                additionalTimeInLastDuty : e.displayTime,
                additionalTimeInLastDutyValidation : validationInput.valid
                
            })
        },
        onChangeUpdateDuty(e) {
            if(e.srcEvent.target.parentElement.id === 'toggleDutyWeek') {
                this.$store.commit('updateDuty', {
                    dutyWeek : !this.$store.state.dutyProperties.activeWeek,
                    dutyHoliday : this.$store.state.dutyProperties.activeHoliday,
                })                 
            }
            if(e.srcEvent.target.parentElement.id === 'toggleDutyHoliday') {
                if(!e.value) {
                    this.$store.commit('updateDutyHolidayDateRange', {
                        holidayRangeDateStart : '',
                        holidayRangeDateEnd : ''
                    });                     
                }
                this.$store.commit('updateDuty', {
                    dutyWeek : this.$store.state.dutyProperties.activeWeek,
                    dutyHoliday : !this.$store.state.dutyProperties.activeHoliday,
                })
            }
            
        }
    }
}
</script>
