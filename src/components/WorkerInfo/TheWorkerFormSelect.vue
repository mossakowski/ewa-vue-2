<template>
  <div>  
      <b-row>
          <b-col>
            <h2>1. Wybierz informacje o pracowniku</h2>
          </b-col>
      </b-row>
      <b-row>
        <b-col>
            <b-form-group>
                <label>Wybierz pracownika</label>
                <b-form-select 
                    :class="(workerInfo.selectedWorker === null) ? 'border-danger' : ''" 
                    :value="workerInfo.selectedWorker" 
                    :options="arrWorkers"
                    @change="updateSelectedWorker">                
                </b-form-select>
                <label v-if="workerInfo.selectedWorker === null" class="text-danger">Wybierz pracownika</label>
            </b-form-group>
            
            <b-form-group>
                <label>Podaj adres email</label>
                <ValidationProvider ref="refValidationEmail" rules="email|required" immediate v-slot="{ errors }">
                    <b-form-input @input="inputEmailWorker" :value="workerInfo.emailProperties.email" type="email"></b-form-input>
                    <span class="text-danger">{{ errors[0] }} </span>
                </ValidationProvider>
            </b-form-group>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import { email,required } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';
import { mapState } from 'vuex';

extend('required', {
    ...required,
    message: 'Pole wymagane'
})

extend('email', {
    ...email,
    message: 'Proszę podać poprawny adres email'
})


export default {
    name: 'WorkerComponents',
    components: {
        ValidationProvider
    },
    data() {
        return {
            arrWorkers : [
                {text : 'Wybierz pracownika', value: null},
                {text : 'Marian Zakrzewska', value : 'Marian Zakrzewska'},
                {text : 'Kamil Mossakowski', value : 'Kamil Mossakowski'},
                {text : 'Mirosław Wojciechowski', value : 'Mirosław Wojciechowski'},
                {text : 'Dariusz Borkowski', value : 'Dariusz Borkowski'},
                {text : 'Alojzy Walczak', value : 'Alojzy Walczak'},
            ]
        }
    },
    computed: mapState({
        workerInfo : state => state.workerInfo
    }),      
    methods: {
        updateSelectedWorker(value) {            
            this.$store.dispatch('workerInfo/updateSelectedWorker',{
                nameWorker: value
            })
        },
        async inputEmailWorker(value) {
            let validationEmail = await this.$refs.refValidationEmail.validate();
            
            this.$store.dispatch('workerInfo/updateEmailWorker', {
                validate : validationEmail.valid,
                email: value
            })
        }
    }  
}
</script>
