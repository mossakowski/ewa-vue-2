<template>
    <span v-if="showDatePicker">
        <date-picker
            @change="updateValueDateRange"                        
            :value="duty.holidayRangeDate"
            value-type="format"                   
            type="date"
            class="ml-2"
            range
            :clearable="false"
            :sync="true"
            :format="DATE_FULL_FORMAT_DATEPICKET"
            placeholder="Wybierz przedział czasowy">
        </date-picker>
        <span class="text-danger ml-1" v-if="showAlertCompleteForm">Uzupełnij pole</span>
    </span>  
</template>

<script>
import { mapState } from 'vuex';
import DatePicker from 'vue2-datepicker';
import { DATE_FULL_FORMAT_DATEPICKET } from './../../../common/constants/date';

export default {
    name: 'FormDateRangePicker',
    data() {
        return {
            DATE_FULL_FORMAT_DATEPICKET            
        }
    },
    components: {
        DatePicker
    },
    computed: mapState({
        duty : 'duty',
        constants : 'constants',

        showAlertCompleteForm() {   
            return this.duty.holidayRangeDate.length === 0 || this.duty.holidayRangeDate[0] === null || this.duty.holidayRangeDate[1] === null;
        },
        showDatePicker() {
            return this.duty.activeHoliday;
        }
    }),
    methods : {
        updateValueDateRange(rangeTime) {
            this.$emit('updateValueDateRange', rangeTime);
        }
    }
}
</script>
