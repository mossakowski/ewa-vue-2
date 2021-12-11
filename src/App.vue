<template>
  <b-container>
    <navbar-components/>
    <h2>1. Wybierz informacje o pracowniku</h2>
    <WorkerComponents />
    <time-worker />
    <h2>2. Prace zakończone</h2>
    <div class="accordion" role="tablist">
      <!-- Tu trzeba podać id elementu w tablicy, dane klienta, opis, płatne? -->
      <p v-if="$store.state.accordionDoneTask.length === 0">Dodaj zadanie</p>
      <accordion-item
        v-else 
        v-for="(item,index) in $store.state.accordionDoneTask" 
        :key="index"
        :nameCustomer="item.nameCustomer"
        :typeWork="item.typeWork"
        :indexAccordion="index"
        statusTask="accordionDoneTask"
      ></accordion-item>
      <btn-add-accordion kindTask="accordionDoneTask"></btn-add-accordion>
    </div>

    <h2>3. Prace do dokończena</h2>
    <div class="accordion" role="tablist">
      <p v-if="$store.state.accordionProgressTask.length === 0">Dodaj zadanie</p>
      <accordion-item
        v-else 
        v-for="(item,index) in $store.state.accordionProgressTask" 
        :key="index"
        :nameCustomer="item.nameCustomer"
        :typeWork="item.typeWork"
        :indexAccordion="index"
        statusTask="accordionProgressTask"
      ></accordion-item>
      <btn-add-accordion kindTask="accordionProgressTask"></btn-add-accordion>
    </div>

    <h2>4. Prace niezrealizowane</h2>
    <div class="accordion" role="tablist">
      <p v-if="$store.state.accordionNotDoneTask.length === 0">Dodaj zadanie</p>
      <accordion-item
        v-else 
        v-for="(item,index) in $store.state.accordionNotDoneTask" 
        :key="index"
        :nameCustomer="item.nameCustomer"
        :typeWork="item.typeWork"
        :indexAccordion="index"
        statusTask="accordionNotDoneTask"
      ></accordion-item>
      <btn-add-accordion kindTask="accordionNotDoneTask"></btn-add-accordion>
    </div>

  <btn-send-raport></btn-send-raport>

  </b-container>
</template>

<script>
import NavbarComponents from './components/Layout/NavbarComponents.vue'
import WorkerComponents from './components/WorkerInfo/SelectWorker.vue'
import TimeWorker from './components/WorkerInfo/TimeWorker.vue'
import AccordionItem from './components/TaskAccordion/AccordionItem.vue'
import BtnAddAccordion from './components/TaskAccordion/BtnAddTask.vue'
import BtnSendRaport from './components/Btn/BtnSendRaport.vue'

export default {
  name: 'App',
  components: {
    NavbarComponents,
    WorkerComponents,
    TimeWorker,
    AccordionItem,
    BtnAddAccordion,
    BtnSendRaport
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
