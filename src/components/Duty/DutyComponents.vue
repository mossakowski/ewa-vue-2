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
                <date-picker
                    v-if="dutyHoliday"
                    @change="onChangedUpdateDuty"
                    v-model="dutyDateRange"                    
                    type="date"
                    class="ml-2"
                    range
                    placeholder="Wybierz przedział czasowy"
                ></date-picker>
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
            this.$store.commit('updateDuty', {
                dutyWeek : this.dutyWeek,
                dutyHoliday : this.dutyHoliday,
                dutyHolidayRange : (this.dutyHoliday) ? moment(this.dutyDateRange[0]).format('DD-MM-YYYY') + ' - ' + moment(this.dutyDateRange[1]).format('DD-MM-YYYY') : '',
                additionalTimeInLastDuty : this.additionalTimeInLastDuty
            })
        }
    }
}
</script>
