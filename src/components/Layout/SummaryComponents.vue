<template>
  <div>
    <h2>6. Podsumowanie:</h2>
    <div v-if="$store.state.selectedWorker != null">
      <p>Imię i nazwisko pracownika: {{$store.state.selectedWorker}}</p>
      <p>Czas pracy: {{$store.state.durationWork}}</p>
    </div>
    <div v-else>Nie wybrano użytkownika (nie wyślesz raportu) </div>     
  </div>
</template>

<script>
export default {

}
</script>