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
                    v-model="dutyWeek"
                    @change="onChangedUpdateDuty"
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                     
                    :labels="{checked: 'Tak', unchecked: 'Nie'}"/>
            </b-col>
            <b-col sm="12">
            Dyżur świąteczny:
                <toggle-button
                    v-model="dutyHoliday"
                    @change="onChangedUpdateDuty"
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                     
                    :labels="{checked: 'Tak', unchecked: 'Nie'}"/>
                    <span v-if="dutyHoliday">
                        <date-picker                        
                            @change="onChangedUpdateDuty"
                            v-model="dutyDateRange"                    
                            type="date"
                            class="ml-2"
                            range
                            :clearable="false"
                            placeholder="Wybierz przedział czasowy">
                        </date-picker>
                        <span class="text-danger" v-if="(dutyDateRange.length === 0 || dutyDateRange[0] === null || dutyDateRange[1] === null)">Uzupełnij pole</span>
                    </span>
            </b-col>
            <b-col sm="12">
                Dodatkowy czas pracy z ostatniego dyżuru: 
                <VueTimepicker 
                    :format="formatTimePicker" 
                    @change="onChangedUpdateDuty"
                    v-model="additionalTimeInLastDuty" 
                    input-width="85px" 
                    hide-clear-button/>
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

export default {
    name: 'DutyComponents',
    components: {
        ToggleButton,
        VueTimepicker,
        DatePicker
    },
    data() {
        return {
            dutyWeek: false,
            dutyHoliday: false,
            dutyDateRange : [],
            additionalTimeInLastDuty : '00:00',
            formatTimePicker: 'HH:mm',
            defaultTime: {
                HH: '00',
                mm: '00'
            },                      
        }
    },
    methods: {
        onChangedUpdateDuty() {
            let rangeDutyHoliday = [];
            if(this.dutyHoliday) {
                if(this.dutyDateRange.length === 0 || this.dutyDateRange[0] === null) {                    
                    rangeDutyHoliday = [];
                } else {
                    rangeDutyHoliday= moment(this.dutyDateRange[0]).format('DD-MM-YYYY') + ' - ' + moment(this.dutyDateRange[1]).format('DD-MM-YYYY');
                }
            } else {
                this.rangeDutyHoliday = [];
                rangeDutyHoliday = [];
            }

            this.$store.commit('updateDuty', {
                dutyWeek : this.dutyWeek,
                dutyHoliday : this.dutyHoliday,
                dutyHolidayRange : rangeDutyHoliday,
                additionalTimeInLastDuty : this.additionalTimeInLastDuty
            })
        }
    }
}
</script>
