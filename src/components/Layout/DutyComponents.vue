<template>
  <div>
      <h2>5. Dyżury</h2>
      <div class="b-row">   
        Dyżur tygodniowy:
            <toggle-button
                v-model="$store.state.dutyInfo.activeWeek"
                :labels="{checked: 'Tak', unchecked: 'Nie'}"/>

        Dyżur świąteczny:
            <toggle-button
                v-model="$store.state.dutyInfo.activeHoliday"
                @change="resetDutyHoliday"
                :labels="{checked: 'Tak', unchecked: 'Nie'}"/>
            <date-picker
                v-if="$store.state.dutyInfo.activeHoliday"
                v-model="$store.state.dutyInfo.holidayRangeDate"
                type="date"
                range
                placeholder="Wybierz przedział czasowy"
            ></date-picker>
        </div>
        <div>Dodatkowy czas pracy z ostatniego dyżuru: <VueTimepicker :format="formatTimePicker" v-model="defaultTime" hide-clear-button/></div>
            
  </div>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/pl';
// import moment from 'moment'
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
    },
    mounted() {
        // console.log(moment.utc('08:00').isAfter('08:10', 'hour'));
        // let first = moment.utc('08:00');
        // let second = moment.utc('09:00');
        // let test1= moment('08:00', "hh:mm");
        // let test2= moment('08:05', "hh:mm");
        // console.log(test1 + ' ' + test2);
        // console.log(test2.isAfter(test1));
    }
}
</script>
