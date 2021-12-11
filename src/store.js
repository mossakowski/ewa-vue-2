import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accordionDoneTask : [
      {typeWork: 'Serwis', nameCustomer: '', description: '', paidCost : '0'},
    ],
    accordionProgressTask : [],
    accordionNotDoneTask : []        
  },
  mutations: {
    addAccordion(state,payload) {
      console.log(payload);
      state[payload.kindTask].push(
        {
          typeWork : payload.typeWork,
          nameCustomer: payload.nameCustomer,
          description: payload.description,
          paid: payload.paid
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
  }
})
