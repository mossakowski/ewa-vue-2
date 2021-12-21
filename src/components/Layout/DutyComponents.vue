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
                    v-model="$store.state.dutyInfo.activeWeek"
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                     
                    :labels="{checked: 'Tak', unchecked: 'Nie'}"/>
            </b-col>
            <b-col sm="12">
            Dyżur świąteczny:
                <toggle-button
                    v-model="$store.state.dutyInfo.activeHoliday"
                    @change="resetDutyHoliday"
                    :width="$store.state.widthHeigthComponents.toggle.width" 
                    :height="$store.state.widthHeigthComponents.toggle.heigth"                     
                    :labels="{checked: 'Tak', unchecked: 'Nie'}"/>
                <date-picker
                    v-if="$store.state.dutyInfo.activeHoliday"
                    v-model="$store.state.dutyInfo.holidayRangeDate"                    
                    type="date"
                    class="ml-2"
                    range
                    placeholder="Wybierz przedział czasowy"
                ></date-picker>
            </b-col>
            <b-col sm="12">
                Dodatkowy czas pracy z ostatniego dyżuru: 
                <VueTimepicker :format="formatTimePicker" v-model="defaultTime" input-width="85px" hide-clear-button/>
            </b-col>                
        </b-row>
    </div>
</template>

<script>
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
            formatTimePicker: 'HH:mm',
            defaultTime: {
                HH: '00',
                mm: '00'
            },
            dateRange : []                      
        }
    },
    methods: {
        resetDutyHoliday() {
            this.$store.state.dutyInfo.holidayRangeDate = []
        }
    }
}
</script>
