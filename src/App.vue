<template>
    <b-container>
      <navbar-components/>     
      <WorkerComponents class="mb-2"/>
      <time-worker />
      
      <div class="accordion mt-2" role="tablist">
        <h2>2. Prace zakończone</h2>
        <p v-if="$store.state.doneTask.length === 0">Dodaj zadanie</p>
        <accordion-item
          v-else 
          v-for="(item,index) in $store.state.doneTask" 
          :key="index"
          :nameCustomer="item.nameCustomer"
          :typeWork="item.typeWork"
          :indexTask="index"
          statusTask="doneTask"
        ></accordion-item>
        <btn-add-accordion kindTask="doneTask"></btn-add-accordion>
      </div>

    
      <div class="accordion mt-2" role="tablist">
        <h2>3. Prace do dokończena</h2>
        <p v-if="$store.state.progressTask.length === 0">Dodaj zadanie</p>
        <accordion-item
          v-else 
          v-for="(item,index) in $store.state.progressTask" 
          :key="index"
          :nameCustomer="item.nameCustomer"
          :typeWork="item.typeWork"
          :indexAccordion="index"
          statusTask="progressTask"
        ></accordion-item>
        <btn-add-accordion kindTask="progressTask"></btn-add-accordion>
      </div>

    
      <div class="accordion mt-2" role="tablist">
        <h2>4. Prace niezrealizowane</h2>
        <p v-if="$store.state.notDoneTask.length === 0">Dodaj zadanie</p>
        <accordion-item
          v-else 
          v-for="(item,index) in $store.state.notDoneTask" 
          :key="index"
          :nameCustomer="item.nameCustomer"
          :typeWork="item.typeWork"
          :indexAccordion="index"
          statusTask="notDoneTask"
        ></accordion-item>
        <btn-add-accordion kindTask="notDoneTask"></btn-add-accordion>
      </div>

      <duty-components></duty-components>
      <summary-components></summary-components>
  


      <btn-send-reset-raport/>


    </b-container>
</template>

<script>
import NavbarComponents from './components/Layout/NavbarComponents.vue'
import WorkerComponents from './components/WorkerInfo/SelectWorker.vue'
import TimeWorker from './components/WorkerInfo/TimeWorker.vue'
import AccordionItem from './components/TaskAccordion/AccordionItem.vue'
import BtnAddAccordion from './components/TaskAccordion/BtnAddTask.vue'
import BtnSendResetRaport from './components/Btn/BtnSendResetRaport.vue'
import SummaryComponents from './components/Layout/SummaryComponents.vue'
import DutyComponents from './components/Duty/DutyComponents.vue'
// import moment from 'moment'

export default {
  name: 'App',
  components: {
    NavbarComponents,
    WorkerComponents,
    TimeWorker,
    AccordionItem,
    BtnAddAccordion,
    BtnSendResetRaport,
    SummaryComponents,
    DutyComponents
  },
  mounted() {
    
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
