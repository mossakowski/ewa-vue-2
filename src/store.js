import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

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
      dateWork: moment().format('DD-MM-YYYY'),
      late: false,
      overtime: false
    },
    dutyProperties: {
      activeWeek: false,
      activeHoliday: false,
      holidayRangeDate: [],
      additionalTimeInLastDuty: '00:00'
    },
    doneTasks: [{
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
    }, ],
    progressTasks: [],
    unrealizedTasks: [],
    widthHeigthComponents: {
      toggle: {
        width: 55,
        heigth: 25
      }
    }
  },
  mutations: {

    updateDutyDateRange(state,payload) {
      console.log(moment(payload.holidayRangeDateStart).year());
      state.dutyProperties.holidayRangeDate = [];
      state.dutyProperties.holidayRangeDate.push(new Date(moment(payload.holidayRangeDateStart).year(),moment(payload.holidayRangeDateStart).month() + 1, moment(payload.holidayRangeDateStart).date()));
      state.dutyProperties.holidayRangeDate.push(new Date(moment(payload.holidayRangeDateEnd).year(),moment(payload.holidayRangeDateEnd).month() + 1, moment(payload.holidayRangeDateEnd).date()));

    },
    updateAdditionalTimeInDuty(state,payload) {
      state.dutyProperties.additionalTimeInLastDuty = payload.additionalTimeInLastDuty;
    },

    updateEmailWorker(state,payload) {
      state.emailProperties.validate = payload.validate;
      state.emailProperties.email = payload.email;
    },

    updateNewClient(state, payload) {
      state[payload.statusTask][payload.indexTask]['newClient'] = payload.newClient;
    },

    //Mutations from DutyComponents
    updateDuty(state, payload) {
      state.dutyProperties.activeHoliday = payload.dutyHoliday;
      state.dutyProperties.activeWeek = payload.dutyWeek;    
    },

    //Mutations from SelectWorker
    updateSelectedWorker(state, payload) {
      state.selectedWorker = payload.nameWorker
    },

    //Mutations from TimeWorker
    updateOvertimeLateWorker(state, payload) {
      state.timeDateWork.late = payload.late;
      state.timeDateWork.overtime = payload.overtime;
    },

    updateTimeWork(state, payload) {
      state.timeDateWork.startWork = payload.startWork;
      state.timeDateWork.endWork = payload.endWork;
      // state.timeDateWork.durationWork = payload.durationWork
    },

    updateDateWork(state, payload) {
      state.timeDateWork.dateWork = payload.date;
    },

    updateQueryAutosuggest(state, payload) {
      state[payload.statusTask][payload.indexTask].query = payload.query
    },

    //Mutations from task
    resetRaport(state) {
      state['doneTasks'] = [];
      state['progressTasks'] = [];
      state['unrealizedTasks'] = [];

      state['doneTasks'][0] = {};

      state.selectedWorker = null,
      state['timeDateWork'].startWork = '09:00',
      state['timeDateWork'].endWork = '17:00',
      state['timeDateWork'].durationWork = '08:00',
      state['timeDateWork'].dateWork = moment().format('DD-MM-YYYY'),
      state['timeDateWork'].late = false,
      state['timeDateWork'].overtime = false,

      state['dutyProperties'].activeWeek = false,
      state['dutyProperties'].activeHoliday = false,
      state['dutyProperties'].holidayRangeDate = [],
      state['dutyProperties'].additionalTimeInLastDuty = '00:00',

      state['doneTasks'][0].indexTask = 0,
      state['doneTasks'][0].typeTaskTitle = 'Serwis',
      state['doneTasks'][0].typeTask = 'service',
      state['doneTasks'][0].nameCustomer = '',
      state['doneTasks'][0].description = '',
      state['doneTasks'][0].paidCost = '0',
      state['doneTasks'][0].paidTask = false,
      state['doneTasks'][0].togglePaid = true,
      state['doneTasks'][0].newClient = undefined,
      state['doneTasks'][0].toggleNewClient = false
      console.log(state);
    },

    addAccordion(state, payload) {
      state[payload.stageWork].push({
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
    removeTask(state, payload) {
      state[payload.statusTask].splice(payload.idTask, 1)
    },
    updateTask(state, payload) {
      state[payload.statusTask][payload.indexTask][payload.propertyObj] = payload.text;
    },
    updateSelectedtypeTask(state, payload) {
      state[payload.statusTask][payload.indexTask]['typeTaskTitle'] = payload.typeTaskTitle;
      Vue.set(state[payload.statusTask][payload.indexTask],'typeTask', payload.typeTask);
      state[payload.statusTask][payload.indexTask]['paidTask'] = payload.paidTask;
      state[payload.statusTask][payload.indexTask]['paidTask'] = payload.paidTask;
      Vue.set(state[payload.statusTask][payload.indexTask], 'newClient', payload.newClient);
    },
    updatePaidTask(state, payload) {
      state[payload.statusTask][payload.indexTask]['paidCost'] = payload.paidCost;
    }
  },
  getters: {
    stateBtnSend: state => {
      if (state.timeDateWork.dateWork === null || state.timeDateWork.startWork === '' || state.timeDateWork.endWork === '' || state.selectedWorker === null || !state.emailProperties.validate) {
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

  }
})