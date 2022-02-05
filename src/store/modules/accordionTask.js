import moment from 'moment';
import { DATE_FULL_FORMAT } from './../../../common/constants/date';

const state = () => ({
    doneTasks: [
        {
          indexTask: 0,
          typeTaskTitle: 'Serwis',
          typeTask: 'service',
          nameCustomer: '',
          description: '',
          paidCost: '0',
          paidTask: false,
          togglePaid: true,
          newClient: undefined,
          toggleNewClient: false
      }
    ],
      progressTasks: [],
      unrealizedTasks: [],
      paidCostValid : true,     
});

const actions = {
    updatePaidCostValid({ commit }, payload){
        commit('UPDATE_PAID_COST_VALID', payload);
    },
    
    updatePaidTask({ commit }, payload){
        commit('UPDATE_PAID_TASK', payload);
    },
       
    updateSelectedTypeTask({ commit }, payload){
        commit('UPDATE_SELECTED_TYPE_TASK', payload);
    },
       
    updateTask({ commit }, payload){
        commit('UPDATE_TASK', payload);
    },
       
    updateNewClient({ commit }, payload){
        commit('UPDATE_NEW_CLIENT', payload);
    },
       
    addAccordion({ commit }, payload){
        commit('ADD_ACCORDION', payload);
    },
       
    removeTask({ commit }, payload){
        commit('REMOVE_TASK', payload);
    },
       
    resetRaport({ commit }, payload){
        commit('RESET_RAPORT', payload);
    }  
}

const mutations = {
    UPDATE_PAID_COST_VALID(state, payload){
        state.paidCostValid = payload.paidCostValid;
      },
    
    UPDATE_NEW_CLIENT(state, payload){
        state[payload.statusTask][payload.indexTask]['newClient'] = payload.newClient;
      },
    
    RESET_RAPORT(state){
        state['doneTasks'] = [];
        state['progressTasks'] = [];
        state['unrealizedTasks'] = [];
        
        state['emailProperties'].email = '';
        state['emailProperties'].validate = false;
        
        state['doneTasks'] = [];
    
        state.selectedWorker = null,
        state['timeDateWork'].startWork = '09:00'
        state['timeDateWork'].endWork = '17:00';
        state['timeDateWork'].durationWork = '08:00';
        state['timeDateWork'].dateWork = moment().format(DATE_FULL_FORMAT);
        state['timeDateWork'].late = false;
        state['timeDateWork'].overtime = false;
    
        state['dutyProperties'].activeWeek = false;
        state['dutyProperties'].activeHoliday = false;
        state['dutyProperties'].holidayRangeDate = [];
        state['dutyProperties'].additionalTimeInLastDuty = '00:00';
    
        let defaultTask = {
          indexTask : 0,
          typeTaskTitle : 'Serwis',
          typeTask: 'service',
          nameCustomer: '',
          description: '',
          paidCost: '0',
          paidTask: false,
          togglePaid: true,
          newClient: undefined,
          toggleNewClient: false
        }
        state['doneTasks'].push(defaultTask);
    
      },
      
    ADD_ACCORDION(state, payload){
        state[payload.statusTask].push({
          indexTask : payload.indexTask,
          typeTaskTitle: payload.typeTaskTitle,
          typeTask: payload.typeTask,
          nameCustomer: payload.nameCustomer,
          description: payload.description,
          paidCost: '0',
          paidTask : false,
          togglePaid : true,
          newClient : undefined,
          toggleNewClient : false
        })
      },
      
         
    REMOVE_TASK(state, payload){
        state[payload.statusTask].splice(payload.idTask, 1)
        },
    
           
    UPDATE_TASK(state, payload){
            state[payload.statusTask][payload.indexTask][payload.propertyObj] = payload.text;
        },
           
    UPDATE_SELECTED_TYPE_TASK(state, payload){
            state[payload.statusTask][payload.indexTask]['typeTaskTitle'] = payload.typeTaskTitle;
            state[payload.statusTask][payload.indexTask]['typeTask'] = payload.typeTask;
            state[payload.statusTask][payload.indexTask]['paidTask'] = payload.paidTask;
            state[payload.statusTask][payload.indexTask]['togglePaid'] = payload.togglePaid;
            state[payload.statusTask][payload.indexTask]['toggleNewClient'] = payload.toggleNewClient;
            state[payload.statusTask][payload.indexTask]['newClient'] = payload.newClient;
            console.log(state.doneTasks);
          },
           
    UPDATE_PAID_TASK(state, payload){
            state[payload.statusTask][payload.indexTask]['paidCost'] = payload.paidCost;
            state[payload.statusTask][payload.indexTask]['paidTask'] = payload.paidTask;
          }
    
}

const getters = {
  calcSummaryFiberInstallations : state => {
    let numberInstallationFiber = 0;
    let numberCurrentClientFiber = 0;
    let numberNewClientFiber = 0;

    for (let item of state.doneTasks) {
      if (item.typeTask === 'installation-fiber') {
        numberInstallationFiber++;
        if (item.newClient) {
          numberNewClientFiber++
        }
      }
    }
    numberCurrentClientFiber = numberInstallationFiber - numberNewClientFiber;
    
    return {
      'numberInstallations': numberInstallationFiber,
      'numberNewClients': numberNewClientFiber,
      'numberCurrentClients': numberCurrentClientFiber,        
    }

  },  
  calcSummaryServices : (state) => {
    let numberService = 0;

    for (let item of state.doneTasks) {
      if (item.typeTask === 'service') {
        numberService++;
      }
    }
    return numberService;    
  },

  calcSummaryRadioInstallations : state => {
    let numberNewClientRadio = 0;
    let numberInstallationRadio = 0;
    let numberCurrentClientRadio = 0;

    for (let item of state.doneTasks) {
      if (item.typeTask === 'installation-radio') {
        numberInstallationRadio++;
        if (item.newClient) {
          numberNewClientRadio++
        }
      }
    }

    numberCurrentClientRadio = numberInstallationRadio - numberNewClientRadio;

    return {
      'numberInstallations': numberInstallationRadio,
      'numberNewClients': numberNewClientRadio,
      'numberCurrentClients': numberCurrentClientRadio,
    }
  },  

  calcSummaryAccidents : (state) => {
    let numberAccidents = 0;

    for (let item of state.doneTasks) {
      if (item.typeTask === 'accident') {
        numberAccidents++;
      }
    }

    return numberAccidents;
  },
  calcSummaryNetworkBulding : (state) => {
    let numberNetworkBulding = 0;

    for (let item of state.doneTasks) {
      if (item.typeTask === 'network-bulding') {
        numberNetworkBulding++;
      }
    }

    return numberNetworkBulding;
  }    
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}