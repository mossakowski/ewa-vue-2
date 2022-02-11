<template>
<div>
    <ValidationProvider :rules="{required: true}" v-slot="{ errors }">                 
        <date-picker
            :value="workerInfo.timeDateWork.dateWork"
            @change="updateDate"
            :format="DATE_FULL_FORMAT_DATEPICKET"
            value-type="format"              
            type="date"
            style="width:100%"
            placeholder="Wybierz datę">
        </date-picker>
        <br>
        <span class="text-danger">{{ errors[0] }}</span>
    </ValidationProvider>   
    
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { DATE_FULL_FORMAT_DATEPICKET } from '../../../common/constants/date'
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import DatePicker from 'vue2-datepicker';

extend('required', {
    ...required,
    message: 'Pole wymagane!'
})


export default {
    name: 'DatePickerForm',
    components: {
        ValidationProvider,
        DatePicker
    },
    data() {
        return {
            DATE_FULL_FORMAT_DATEPICKET
        }
    },
    computed: mapState({
            workerInfo : state => state.workerInfo,
    }),
    methods : {
        updateDate(date) {
            this.$emit('updateDate',date);
        }
    }

}
</script>