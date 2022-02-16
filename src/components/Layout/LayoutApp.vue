<template>
    <b-container>
      <TheNavbar/>     
      <WorkerFormSelect class="mb-2"/>
      <WorkerTime/>
      
      <div class="accordion mt-2" role="tablist">
        <h2>2. Prace zakończone</h2>
        <p v-if="accordionTask.doneTasks.length === 0">Dodaj zadanie</p>
        <AccordionTask
          v-else
          v-for="(item,index) in accordionTask.doneTasks" 
          :key="index"
          :indexTask="index"
          statusTask="doneTasks" />
        <btn-add-task statusTask="doneTasks"></btn-add-task>
      </div>

      <div class="accordion mt-2" role="tablist">
        <h2>3. Prace do dokończena</h2>
        <p v-if="accordionTask.progressTasks.length === 0">Dodaj zadanie</p>      
        <AccordionTask
          v-else
          v-for="(item,index) in accordionTask.progressTasks" 
          :key="accordionTask.progressTasks[index].indexTask"
          :indexTask="index"
          statusTask="progressTasks" />
        <btn-add-task statusTask="progressTasks"></btn-add-task>
      </div>
    
      <div class="accordion mt-2" role="tablist">
        <h2>4. Prace niezrealizowane</h2>
        <p v-if="accordionTask.unrealizedTasks.length === 0">Dodaj zadanie</p>
          <AccordionTask
            v-else
            v-for="(item,index) in accordionTask.unrealizedTasks" 
            :key="accordionTask.unrealizedTasks[index].indexTask"
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
import TheNavbar from '../Navbar/TheNavbar.vue'
import WorkerFormSelect from '../WorkerInfo/TheWorkerFormSelect.vue'
import WorkerTime from '../WorkerInfo/TheWorkerTime.vue'
import AccordionTask from '../AccordionTask/AccordionTask.vue'
import BtnAddTask from '../AccordionTask/AccordionTaskBtnAddTask.vue'
import BtnSendResetRaport from '../ui/BtnSendResetRaport.vue'
import TheSummary from '../Summary/TheSummary.vue'
import TheDuty from '../Duty/TheDuty.vue'
import TheFooter from '../Footer/TheFooter.vue'
import { mapState } from 'vuex' 

export default {
  name: 'LayoutApp',
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
  },
  computed: mapState({
    accordionTask : state => state.accordionTask
  })
}
</script>
