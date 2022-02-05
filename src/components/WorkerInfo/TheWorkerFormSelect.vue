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
                    :class="($store.state.selectedWorker === null) ? 'border-danger' : ''" 
                    :value="$store.state.selectedWorker" 
                    :options="arrWorkers"
                    @change="updateSelectedWorker">                
                </b-form-select>
                <label v-if="$store.state.selectedWorker === null" class="text-danger">Wybierz pracownika</label>
            </b-form-group>
            
            <b-form-group>
                <label>Podaj adres email</label>
                <ValidationProvider ref="refValidationEmail" rules="email|required" immediate v-slot="{ errors }">
                    <b-form-input @input="inputEmailWorker" :value="$store.state.emailProperties.email" type="email"></b-form-input>
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
    methods: {
        updateSelectedWorker(value) {            
            this.$store.dispatch('updateSelectedWorker',{
                nameWorker: value
            })
        },
        async inputEmailWorker(value) {
            let validationEmail = await this.$refs.refValidationEmail.validate();
            
            this.$store.dispatch('updateEmailWorker', {
                validate : validationEmail.valid,
                email: value
            })
        }
    }
}
</script>
