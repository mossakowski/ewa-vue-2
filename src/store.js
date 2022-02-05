import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { DATE_FULL_FORMAT } from './../common/constants/date'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Ogarniete
    selectedWorker: null,
    emailProperties: {
      validate: false,
      email: ''
    },
    timeDateWork: {
      startWork: '09:00',
      endWork: '17:00',
      durationWork: '08:00',
      dateWork: moment().format(DATE_FULL_FORMAT),
      late: false,
      overtime: false
    },
    dutyProperties: {
      activeWeek: false,
      activeHoliday: false,
      holidayRangeDate: [],
      additionalTimeInLastDuty: '00:00',
      additionalTimeInLastDutyValidation : true
    },
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
    widthHeigthComponents: {
      toggle: {
        width: 55,
        heigth: 25
      }
    }
  },
  mutations: {
    //Accordion Task
    UPDATE_PAID_COST_VALID(state, payload) {
      state.paidCostValid = payload.paidCostValid;
    },
    // duty
    UPDATE_DUTY_HOLIDAY_DATE_RANGE(state,payload) {
      state.dutyProperties.holidayRangeDate = [];
      if(payload.holidayRangeDateStart != '' || payload.holidayRangeDateEnd != '') {
        state.dutyProperties.holidayRangeDate.push(new Date(moment(payload.holidayRangeDateStart).year(),moment(payload.holidayRangeDateStart).month(), moment(payload.holidayRangeDateStart).date()));
        state.dutyProperties.holidayRangeDate.push(new Date(moment(payload.holidayRangeDateEnd).year(),moment(payload.holidayRangeDateEnd).month(), moment(payload.holidayRangeDateEnd).date()));
      } else {
        state.dutyProperties.holidayRangeDate = [];        
      }
    },
    //duty
    UPDATE_ADDITIONAL_TIME_IN_DUTY(state,payload) {
      state.dutyProperties.additionalTimeInLastDuty = payload.additionalTimeInLastDuty;
      state.dutyProperties.additionalTimeInLastDutyValidation = payload.additionalTimeInLastDutyValidation;
    },
    //worker info
    UPDATE_EMAIL_WORKER(state,payload) {
      state.emailProperties.validate = payload.validate;
      state.emailProperties.email = payload.email;
    },
    // Accordion task
    UPDATE_NEW_CLIENT(state, payload) {
      state[payload.statusTask][payload.indexTask]['newClient'] = payload.newClient;
    },

    //duty
    UPDATE_DUTY(state, payload) {
      state.dutyProperties.activeHoliday = payload.dutyHoliday;
      state.dutyProperties.activeWeek = payload.dutyWeek;    
    },

    //worker_info
    UPDATE_SELECTED_WORKER(state, payload) {
      state.selectedWorker = payload.nameWorker
    },

    //worker_info
    UPDATE_OVERTIME_LATE_WORKER(state, payload) {
      state.timeDateWork.late = payload.late;
      state.timeDateWork.overtime = payload.overtime;
    },
    // worker info
    UPDATE_TIME_WORK(state, payload) {
      state.timeDateWork.startWork = payload.startWork;
      state.timeDateWork.endWork = payload.endWork;
    },
    // worker)_info
    UPDATE_DURATION_WORK(state, payload) {
      state.timeDateWork.durationWork = payload.durationWork
    },
    //worker_info
    UPDATE_DATE_WORK(state, payload) {
      state.timeDateWork.dateWork = payload.date;
    },
    //Accordion task
    RESET_RAPORT(state) {
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
    //accordion task
    ADD_ACCORDION(state, payload) {
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
    //accordion task
    REMOVE_TASK(state, payload) {
      state[payload.statusTask].splice(payload.idTask, 1)
    },
    //accordion task
    UPDATE_TASK(state, payload) {
      state[payload.statusTask][payload.indexTask][payload.propertyObj] = payload.text;
    },
    //accordion task
    UPDATE_SELECTED_TYPE_TASK(state, payload) {
      state[payload.statusTask][payload.indexTask]['typeTaskTitle'] = payload.typeTaskTitle;
      Vue.set(state[payload.statusTask][payload.indexTask],'typeTask', payload.typeTask);
      state[payload.statusTask][payload.indexTask]['paidTask'] = payload.paidTask;
      state[payload.statusTask][payload.indexTask]['togglePaid'] = payload.togglePaid;
      state[payload.statusTask][payload.indexTask]['toggleNewClient'] = payload.toggleNewClient;
      Vue.set(state[payload.statusTask][payload.indexTask], 'newClient', payload.newClient);
    },
    //accordion task
    UPDATE_PAID_TASK(state, payload) {
      state[payload.statusTask][payload.indexTask]['paidCost'] = payload.paidCost;
      state[payload.statusTask][payload.indexTask]['paidTask'] = payload.paidTask;
    }
  },
  getters: {
    //main
    stateBtnSend: state => {
      // console.log(state.timeDateWork.dateWork + " " +  state.timeDateWork.startWork + " " + state.timeDateWork.endWork + " " + state.selectedWorker + " " + state.emailProperties.validate + " " + state.dutyProperties.additionalTimeInLastDutyValidation + " " + state.paidCostValid)
      if (state.timeDateWork.dateWork === null || 
          state.timeDateWork.startWork === '' || 
          state.timeDateWork.endWork === '' || 
          state.selectedWorker === null || 
          !state.emailProperties.validate ||
          !state.dutyProperties.additionalTimeInLastDutyValidation ||
          !state.paidCostValid) {
        return true
      } else {
        if (state.dutyProperties.holidayRangeDate.length === 0 && state.dutyProperties.activeHoliday) {
          return true //disabled btn
        } else {
          return false
        }
      }
    },
    //summary
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

    calcSummaryServices : state => {
      let numberService = 0;

      for (let item of state.doneTasks) {
        if (item.typeTask === 'service') {
          numberService++;
        }
      }
      return numberService;
    },

    calcSummaryAccidents : state => {
      let numberAccidents = 0;

      for (let item of state.doneTasks) {
        if (item.typeTask === 'accident') {
          numberAccidents++;
        }
      }

      return numberAccidents;
    },

    calcSummaryNetworkBulding : state => {
      let numberNetworkBulding = 0;

      for (let item of state.doneTasks) {
        if (item.typeTask === 'network-bulding') {
          numberNetworkBulding++;
        }
      }

      return numberNetworkBulding;
    }


  },
  actions : {
    //accordionTask
    updatePaidCostValid({ commit }, payload) {
      commit('UPDATE_PAID_COST_VALID', payload);
    },
    //accordionTask
    updatePaidTask({ commit }, payload) {
      commit('UPDATE_PAID_TASK', payload);
    },
    //accordionTask
    updateSelectedTypeTask({ commit }, payload) {
      commit('UPDATE_SELECTED_TYPE_TASK', payload);
    },
    //accordionTask
    updateTask({ commit }, payload) {
      commit('UPDATE_TASK', payload);
    },
    //accordionTask
    updateNewClient({ commit }, payload) {
      commit('UPDATE_NEW_CLIENT', payload);
    },
    //accordionTask
    addAccordion({ commit }, payload) {
      commit('ADD_ACCORDION', payload);
    },
    //accordionTask
    removeTask({ commit }, payload) {
      commit('REMOVE_TASK', payload);
    },
    //accordionTask
    resetRaport({ commit }, payload) {
      commit('RESET_RAPORT', payload);
    },
    updateDateRangeDutyHoliday({ commit }, payload) {
      commit('UPDATE_DUTY_HOLIDAY_DATE_RANGE', payload);
    },
    updateDuty({ commit }, payload) {
      commit('UPDATE_DUTY', payload);
    },
    updateAdditionalTimeInDuty({ commit }, payload) {
      commit('UPDATE_ADDITIONAL_TIME_IN_DUTY',payload);
    },
    updateSelectedWorker({ commit }, payload) {
      commit('UPDATE_SELECTED_WORKER',payload);
    },
    updateEmailWorker({ commit }, payload) {
      commit('UPDATE_EMAIL_WORKER', payload);
    },
    updateDateWork({ commit }, payload) {
      commit('UPDATE_DATE_WORK', payload);
    },
    updateTimeWork({ commit }, payload) {
      commit('UPDATE_TIME_WORK', payload);
    },
    updateOvertimeLateWorker({ commit }, payload) {
      commit('UPDATE_OVERTIME_LATE_WORKER', payload);
    },
    updateDurationWork({ commit }, payload) {
      commit('UPDATE_DURATION_WORK', payload);
    }
  }
})