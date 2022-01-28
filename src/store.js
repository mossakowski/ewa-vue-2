import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { DATE_FULL_FORMAT } from './../common/constants/date'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    UPDATE_PAID_COST_VALID(state, payload) {
      state.paidCostValid = payload.paidCostValid;
    },
    UPDATE_DUTY_HOLIDAY_DATE_RANGE(state,payload) {
      state.dutyProperties.holidayRangeDate = [];
      if(payload.holidayRangeDateStart != '' || payload.holidayRangeDateEnd != '') {
        state.dutyProperties.holidayRangeDate.push(new Date(moment(payload.holidayRangeDateStart).year(),moment(payload.holidayRangeDateStart).month(), moment(payload.holidayRangeDateStart).date()));
        state.dutyProperties.holidayRangeDate.push(new Date(moment(payload.holidayRangeDateEnd).year(),moment(payload.holidayRangeDateEnd).month(), moment(payload.holidayRangeDateEnd).date()));
      } else {
        state.dutyProperties.holidayRangeDate = [];        
      }
    },
    UPDATE_ADDITIONAL_TIME_IN_DUTY(state,payload) {
      state.dutyProperties.additionalTimeInLastDuty = payload.additionalTimeInLastDuty;
      state.dutyProperties.additionalTimeInLastDutyValidation = payload.additionalTimeInLastDutyValidation;
    },

    UPDATE_EMAIL_WORKER(state,payload) {
      state.emailProperties.validate = payload.validate;
      state.emailProperties.email = payload.email;
    },

    UPDATE_NEW_CLIENT(state, payload) {
      state[payload.statusTask][payload.indexTask]['newClient'] = payload.newClient;
    },

    //Mutations from DutyComponents
    UPDATE_DUTY(state, payload) {
      state.dutyProperties.activeHoliday = payload.dutyHoliday;
      state.dutyProperties.activeWeek = payload.dutyWeek;    
    },

    //Mutations from SelectWorker
    UPDATE_SELECTED_WORKER(state, payload) {
      state.selectedWorker = payload.nameWorker
    },

    //Mutations from TimeWorker
    UPDATE_OVERTIME_LATE_WORKER(state, payload) {
      state.timeDateWork.late = payload.late;
      state.timeDateWork.overtime = payload.overtime;
    },

    UPDATE_TIME_WORK(state, payload) {
      state.timeDateWork.startWork = payload.startWork;
      state.timeDateWork.endWork = payload.endWork;
    },
    UPDATE_DURATION_WORK(state, payload) {
      state.timeDateWork.durationWork = payload.durationWork
    },
    UPDATE_DATE_WORK(state, payload) {
      state.timeDateWork.dateWork = payload.date;
    },
    //Mutations from task
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
    REMOVE_TASK(state, payload) {
      state[payload.statusTask].splice(payload.idTask, 1)
    },
    UPDATE_TASK(state, payload) {
      state[payload.statusTask][payload.indexTask][payload.propertyObj] = payload.text;
    },
    UPDATE_SELECTED_TYPE_TASK(state, payload) {
      state[payload.statusTask][payload.indexTask]['typeTaskTitle'] = payload.typeTaskTitle;
      Vue.set(state[payload.statusTask][payload.indexTask],'typeTask', payload.typeTask);
      state[payload.statusTask][payload.indexTask]['paidTask'] = payload.paidTask;
      state[payload.statusTask][payload.indexTask]['togglePaid'] = payload.togglePaid;
      state[payload.statusTask][payload.indexTask]['toggleNewClient'] = payload.toggleNewClient;
      Vue.set(state[payload.statusTask][payload.indexTask], 'newClient', payload.newClient);
    },
    UPDATE_PAID_TASK(state, payload) {
      state[payload.statusTask][payload.indexTask]['paidCost'] = payload.paidCost;
      state[payload.statusTask][payload.indexTask]['paidTask'] = payload.paidTask;
    }
  },
  getters: {
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
    calcSummary: state => {

      let numberInstallationFiber = 0;
      let numberCurrentClientFiber = 0;
      let numberNewClientFiber = 0;

      let numberNewClientRadio = 0;
      let numberInstallationRadio = 0;
      let numberCurrentClientRadio = 0;

      let numberService = 0;
      let numberAccident = 0;
      let numberNetworkBulding = 0;


      for (let item of state.doneTasks) {
        if (item.typeTask === 'service') {
          numberService++;
        }
        if (item.typeTask === 'installation-fiber') {
          numberInstallationFiber++;
          if (item.newClient) {
            numberNewClientFiber++
          }
        }

        if (item.typeTask === 'installation-radio') {
          numberInstallationRadio++;
          if (item.newClient) {
            numberNewClientRadio++
          }
        }

        if (item.typeTask === 'accident') {
          numberAccident++;
        }

        if (item.typeTask === 'network-bulding') {
          numberNetworkBulding++;
        }
      }

      numberCurrentClientFiber = numberInstallationFiber - numberNewClientFiber;
      numberCurrentClientRadio = numberInstallationRadio - numberNewClientRadio;

      return {
        'numberInstallationFiber': numberInstallationFiber,
        'numberNewClientFiber': numberNewClientFiber,
        'numberCurrentClientFiber': numberCurrentClientFiber,

        'numberInstallationRadio': numberInstallationRadio,
        'numberNewClientRadio': numberNewClientRadio,
        'numberCurrentClientRadio': numberCurrentClientRadio,

        'numberService': numberService,
        'numberAccident': numberAccident,
        'numberNetworkBulding': numberNetworkBulding
      };
    }

  },
  actions : {
    updatePaidCostValid({ commit }, payload) {
      commit('UPDATE_PAID_COST_VALID', payload);
    },
    updatePaidTask({ commit }, payload) {
      commit('UPDATE_PAID_TASK', payload);
    },
    updateSelectedtypeTask({ commit }, payload) {
      commit('UPDATE_SELECTED_TYPE_TASK', payload);
    },
    updateTask({ commit }, payload) {
      commit('UPDATE_TASK', payload);
    },
    updateNewClient({ commit }, payload) {
      commit('UPDATE_NEW_CLIENT', payload);
    },
    addAccordion({ commit }, payload) {
      commit('ADD_ACCORDION', payload);
    },
    removeTask({ commit }, payload) {
      commit('REMOVE_TASK', payload);
    },
    resetRaport({ commit }, payload) {
      commit('RESET_RAPORT', payload);
    },
    updateDutyHolidayDateRange({ commit }, payload) {
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