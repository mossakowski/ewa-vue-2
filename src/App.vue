<template>
  <b-container>
    <navbar-components/>
    <h2>1. Wybierz informacje o pracowniku</h2>
    <WorkerComponents />
    <time-worker />
    <h2>2. Prace zakończone</h2>
    <div class="accordion" role="tablist">
      <!-- Tu trzeba podać id elementu w tablicy, dane klienta, opis, płatne? -->
      <accordion-item id="1" title="Serwis"></accordion-item>
      <btn-add-accordion></btn-add-accordion>
    </div>

  </b-container>
</template>

<script>

import NavbarComponents from './components/Layout/NavbarComponents.vue'
import WorkerComponents from './components/WorkerInfo/SelectWorker.vue'
import TimeWorker from './components/WorkerInfo/TimeWorker.vue'
import AccordionItem from './components/TaskAccordion/AccordionItem.vue'
import BtnAddAccordion from './components/TaskAccordion/BtnAddAccordion.vue'

export default {
  name: 'App',
  components: {
    NavbarComponents,
    WorkerComponents,
    TimeWorker,
    AccordionItem,
    BtnAddAccordion
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
