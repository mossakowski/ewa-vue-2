<template>
  <div>
      <h2>1. Wybierz informacje o pracowniku</h2>
      <b-row>
        <b-col>
            <b-form-select :class="($store.state.selectedWorker === null) ? 'border-danger' : ''" v-model="$store.state.selectedWorker" :options="arrWorkers"></b-form-select>
            <label v-if="$store.state.selectedWorker === null" class="text-danger">Wybierz pracownika</label>
        </b-col>
      </b-row>
  </div>
  
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
