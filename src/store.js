import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedWorker: null,
    timeDateWork: {
      startWork: '09:00',
      endWork: '17:00',
      durationWork: '08:00',  
      dateWork : '',
      late: false,
      overtime: false          
    },
    dutyInfo: {
      activeWeek : false,
      activeHoliday: false,
      holidayRangeDate : [],
      additionalTimeInLastDuty : '00:00'
    },
    accordionDoneTask : [
      {typeWork: 'Serwis', nameCustomer: '', description: '', paidCost : '0'},
    ],
    accordionProgressTask : [],
    accordionNotDoneTask : [],
    widthHeigthComponents: {
      toggle: {
        width: 55,
        heigth : 25        
      }
    }        
  },
  mutations: {

    //Mutations from DutyComponents
    updateDuty(state,payload) {
      state.dutyInfo.activeHoliday = payload.dutyHoliday;
      state.dutyInfo.activeWeek = payload.dutyWeek;
      state.dutyInfo.holidayRangeDate = payload.dutyHolidayRange;
      state.dutyInfo.additionalTimeInLastDuty = payload.additionalTimeInLastDuty;
      console.log(state.dutyInfo);
    },

    //Mutations from SelectWorker
    updateSelectedWorker(state,payload) {
      state.selectedWorker = payload.nameWorker
    },

    //Mutations from TimeWorker

    updateOvertimeLateWorker(state,payload) {
      state.timeDateWork.late = payload.late;
      state.timeDateWork.overtime = payload.overtime;
    },

    updateTimeWork(state,payload) {
      state.timeDateWork.startWork = payload.startWork;
      state.timeDateWork.endWork = payload.endWork;
      state.timeDateWork.durationWork = payload.durationWork
    },

    updateDateWork(state,payload) {
      state.timeDateWork.dateWork = payload.date;
    },


    //Mutations from task
    addAccordion(state,payload) {
      state[payload.kindTask].push(
        {
          typeWork : payload.typeWork,
          nameCustomer: payload.nameCustomer,
          description: payload.description
        }
      )
    },
    removeTask(state, payload) {
      state[payload.statusTask].splice(payload.idTask,1)
    },
    updateTask(state,payload) {
      state[payload.statusTask][payload.indexAccordion][payload.propertyObj] = payload.text   
    },
    updateSelectedTypeWork(state,payload) {
      state[payload.statusTask][payload.indexAccordion]['typeWork'] = payload.selectedTypeWork;
    },
    updatePaidTask(state,payload) {
      state[payload.statusTask][payload.indexAccordion]['paidCost'] = payload.paidCost;    
    }
  },
  getters: {
    stateBtnSend: state => {
      console.log(state.timeDateWork);
      if(state.timeDateWork.dateWork === null || state.timeDateWork.startWork === '' || state.timeDateWork.endWork === '' || state.selectedWorker === null)
      {
        return true
      } else {
        return false
      } 
    }
  }
})
