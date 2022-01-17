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
            {{$store.state.dutyProperties.holidayRangeDate}}
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
                            @change="onChangeDutyDateRange"                        
                            :value="$store.state.dutyProperties.holidayRangeDate"                   
                            type="date"
                            class="ml-2"
                            range
                            :clearable="false"
                            :sync="true"
                            placeholder="Wybierz przedział czasowy">
                        </date-picker>
                        <span class="text-danger ml-1" v-if="(dutyDateRange.length === 0 || dutyDateRange[0] === null || dutyDateRange[1] === null)">Uzupełnij pole</span>
                    </span>
            </b-col>
            <b-col sm="12">
                Dodatkowy czas pracy z ostatniego dyżuru: 
                <VueTimepicker
                    :value="$store.state.dutyProperties.additionalTimeInLastDuty"                 
                    :format="formatTimePicker"
                    @change="onChangeAdditionalTimeInLastDuty"  
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
        onChangeDutyDateRange(e) {
            console.log(moment(e[0]).date());
            this.$store.commit('updateDutyDateRange', {
                holidayRangeDateStart : moment(e[0]),
                holidayRangeDateEnd : moment(e[1])
            });            
        },
        onChangeAdditionalTimeInLastDuty(e) {           
            this.$store.commit('updateAdditionalTimeInDuty', {
                additionalTimeInLastDuty : e.displayTime
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
                this.$store.commit('updateDuty', {
                    dutyWeek : this.$store.state.dutyProperties.activeWeek,
                    dutyHoliday : !this.$store.state.dutyProperties.activeHoliday,
                })
            }
            
        }
    }
}
</script>
