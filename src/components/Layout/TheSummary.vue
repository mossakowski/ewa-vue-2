<template>
  <div>
    <h2>6. Podsumowanie:</h2>
    <div v-if="$store.state.selectedWorker != null">
      <p><b class="mr-1">Imię i nazwisko pracownika:</b> {{$store.state.selectedWorker}}</p>
      <p><b class="mr-1">Czas pracy:</b>{{$store.state.timeDateWork.durationWork}}</p>
      <p><b class="mr-1">Instalacji światłowodowych:</b><i class="mr-1">Nowi klienci:</i>{{$store.getters.calcSummary.numberNewClientFiber}}<i class="ml-1 mr-2">Aktualni klienci:</i>{{$store.getters.calcSummary.numberCurrentClientFiber}}</p>
      <p><b class="mr-1">Instalacji radiowych:</b><i class="mr-1">Nowi klienci:</i>{{$store.getters.calcSummary.numberNewClientRadio}}<i class="ml-1 mr-2">Aktualni klienci:</i>{{$store.getters.calcSummary.numberCurrentClientRadio}}</p>
      <p><b class="mr-1">Serwisów:</b>{{$store.getters.calcSummary.numberService}}<b class="mr-1 ml-1">Awarii:</b>{{$store.getters.calcSummary.numberAccident}} <b>Budowy sieci:</b> {{$store.getters.calcSummary.numberNetworkBulding}}</p>
    </div>
    <div class="text-danger" v-else>Aby wyświetlić podsumowanie, wybierz pracownika</div>     
  </div>
</template>
