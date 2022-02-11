<template>
    <ValidationProvider :rules="{required: true, regex: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/}" v-slot="{ errors }"> 
        <VueTimepicker
            :value="valueTimepicker"
            @change="updateValueForm"                
            hour-interval="1"
            minute-interval="5"
            autocomplete="on"
            :input-width="inputWidth"
            auto-scroll                        
            hide-clear-button />
        <br>
        <span class="text-danger">{{ errors[0] }}</span>
    </ValidationProvider>  
</template>

<script>
import { mapState } from 'vuex';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import { ValidationProvider, extend } from 'vee-validate';
import { required, regex } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Pole wymagane!'
})

extend('regex', {
    ...regex,
    message: 'Niepoprawny format!'
})

export default {
    name: 'FormTimePicker',
    data() {
        return {
            inputWidth: '100px'
        }
    },
    components: {
        VueTimepicker,
        ValidationProvider                
    },
    props: {
        valueTimepicker : {
            type: String,
            required: true
        }
    },
    computed: mapState({
        workerInfo : state => state.workerInfo,
    }),     
    methods: {
        updateValueForm(e) {
            this.$emit('updateValueForm', e.displayTime)
        }
    }
}
</script>

<style>

</style>