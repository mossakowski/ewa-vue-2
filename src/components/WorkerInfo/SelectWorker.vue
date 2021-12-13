<template>
  <b-row>
      <b-form-select :class="($store.state.selectedWorker === null) ? 'border-danger' : ''" v-model="$store.state.selectedWorker" :options="arrWorkers"></b-form-select>
      <label v-if="$store.state.selectedWorker === null" class="text-danger">Wybierz pracownika</label>
  </b-row>
  
</template>

<script>
export default {
    name: 'WorkerComponents',
    data() {
        return {
            selectedWorker: null,
            arrWorkers : [
                {text : 'Wybierz użytkownika', value: null},
                {text : 'Marian Zakrzewska', value : 'Marian Zakrzewska'},
                {text : 'Kamil Mossakowski', value : 'Kamil Mossakowski'},
                {text : 'Mirosław Wojciechowski', value : 'Mirosław Wojciechowski'},
                {text : 'Dariusz Borkowski', value : 'Dariusz Borkowski'},
                {text : 'Alojzy Walczak', value : 'Alojzy Walczak'},
            ]
        }
    }
}
</script>
