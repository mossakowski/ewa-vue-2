<template>
  <div>
    <h2>6. Podsumowanie:</h2>
    <div v-if="workerInfo.selectedWorker != null">
      <p><b class="mr-1">Imię i nazwisko pracownika:</b> {{workerInfo.selectedWorker}}</p>
      <p><b class="mr-1">Czas pracy:</b>{{workerInfo.timeDateWork.durationWork}}</p>
      <p><b class="mr-1">Instalacji światłowodowych:</b><i class="mr-1">Nowi klienci:</i>{{calcSummaryFiberInstallations.numberNewClients}}<i class="ml-1 mr-2">Aktualni klienci:</i>{{calcSummaryFiberInstallations.numberCurrentClients}}</p>
      <p><b class="mr-1">Instalacji radiowych:</b><i class="mr-1">Nowi klienci:</i>{{calcSummaryRadioInstallations.numberNewClients}}<i class="ml-1 mr-2">Aktualni klienci:</i>{{calcSummaryRadioInstallations.numberCurrentClients}}</p>
      <p><b class="mr-1">Serwisów:</b>{{calcSummaryServices}}<b class="mr-1 ml-1">Awarii:</b>{{calcSummaryAccidents}} <b>Budowy sieci:</b> {{calcSummaryNetworkBulding}}</p>
    </div>
    <div class="text-danger" v-else>Aby wyświetlić podsumowanie, wybierz pracownika</div>     
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'TheSummary',
  computed: {
    ...mapGetters('accordionTask', {
      calcSummaryFiberInstallations: 'calcSummaryFiberInstallations',
      calcSummaryRadioInstallations : 'calcSummaryRadioInstallations',
      calcSummaryServices : 'calcSummaryServices',
      calcSummaryAccidents : 'calcSummaryAccidents',
      calcSummaryNetworkBulding : 'calcSummaryNetworkBulding'
    }),
    ...mapState([
      'workerInfo'
    ])
  }
}
</script>