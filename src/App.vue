<template>
    <b-container>
      <TheNavbar/>     
      <WorkerFormSelect class="mb-2"/>
      <WorkerTime/>
      
      <div class="accordion mt-2" role="tablist">
        <h2>2. Prace zakończone</h2>
        <p v-if="$store.state.doneTasks.length === 0">Dodaj zadanie</p>
        <AccordionTask
          v-else
          v-for="(item,index) in $store.state.doneTasks" 
          :key="$store.state.doneTasks[index].indexTask"
          :indexTask="index"
          statusTask="doneTasks" />
        <btn-add-task statusTask="doneTasks"></btn-add-task>
      </div>

      <div class="accordion mt-2" role="tablist">
        <h2>3. Prace do dokończena</h2>
        <p v-if="$store.state.progressTasks.length === 0">Dodaj zadanie</p>      
        <AccordionTask
          v-else
          v-for="(item,index) in $store.state.progressTasks" 
          :key="$store.state.progressTasks[index].indexTask"
          :indexTask="index"
          statusTask="progressTasks" />
        <btn-add-task statusTask="progressTasks"></btn-add-task>
      </div>
    
      <div class="accordion mt-2" role="tablist">
        <h2>4. Prace niezrealizowane</h2>
        <p v-if="$store.state.unrealizedTasks.length === 0">Dodaj zadanie</p>
          <AccordionTask
            v-else
            v-for="(item,index) in $store.state.unrealizedTasks" 
            :key="$store.state.unrealizedTasks[index].indexTask"
            :indexTask="index"
            statusTask="unrealizedTasks" />
        <btn-add-task statusTask="unrealizedTasks"></btn-add-task>
      </div>

      <TheDuty/>

      <TheSummary/>
  
      <BtnSendResetRaport/>

      <TheFooter/>
  </b-container>
</template>

<script>
import TheNavbar from './components/Layout/TheNavbar.vue'
import WorkerFormSelect from './components/WorkerInfo/TheWorkerFormSelect.vue'
import WorkerTime from './components/WorkerInfo/TheWorkerTime.vue'
import AccordionTask from './components/AccordionTask/AccordionTask.vue'
import BtnAddTask from './components/AccordionTask/AccordionTaskBtnAddTask.vue'
import BtnSendResetRaport from './components/Btn/TheBtnSendResetRaport.vue'
import TheSummary from './components/Layout/TheSummary.vue'
import TheDuty from './components/Duty/TheDuty.vue'
import TheFooter from './components/Layout/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheNavbar,
    WorkerFormSelect,
    WorkerTime,
    AccordionTask,
    BtnAddTask,
    BtnSendResetRaport,
    TheSummary,
    TheDuty,
    TheFooter
  }
}
</script>
