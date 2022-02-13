import { getFullDate } from './../../../common/adapters/adapterDate';

const state = () => ({
    selectedWorker: null,
    emailProperties: {
      validate: false,
      email: ''
    },
    timeDateWork: {
      startWork: '09:00',
      endWork: '17:00',
      durationWork: '08:00',
      dateWork: getFullDate(),
      late: false,
      overtime: false
    }
})

const actions = {
    updateEmailWorker({ commit }, payload){
        commit('UPDATE_EMAIL_WORKER', payload);
    },
    
    updateSelectedWorker({ commit }, payload){
        commit('UPDATE_SELECTED_WORKER',payload);
    },
    
    updateOvertimeLateWorker({ commit }, payload){
        commit('UPDATE_OVERTIME_LATE_WORKER', payload);
    },
    
    updateTimeWork({ commit }, payload){
        commit('UPDATE_TIME_WORK', payload);
    },
    
    updateDurationWork({ commit }, payload){
        commit('UPDATE_DURATION_WORK', payload);
    },
      
    updateDateWork({ commit }, payload){
        commit('UPDATE_DATE_WORK', payload);
    },
    
    resetRaport({ commit }) {
        commit('RESET_RAPORT');
    }
}

const mutations = {
    RESET_RAPORT(state) {
        state['emailProperties'].email = '';
        state['emailProperties'].validate = false;
        
        state.selectedWorker = null,
        state['timeDateWork'].startWork = '09:00'
        state['timeDateWork'].endWork = '17:00';
        state['timeDateWork'].durationWork = '08:00';
        state['timeDateWork'].dateWork = getFullDate();
        state['timeDateWork'].late = false;
        state['timeDateWork'].overtime = false;        
    },

    UPDATE_EMAIL_WORKER(state, payload){
        state.emailProperties.validate = payload.validate;
        state.emailProperties.email = payload.email;
    },
    
    UPDATE_SELECTED_WORKER(state, payload){
        state.selectedWorker = payload.nameWorker
    },
    
    
    UPDATE_OVERTIME_LATE_WORKER(state, payload){
        state.timeDateWork.late = payload.late;
        state.timeDateWork.overtime = payload.overtime;
    },
    
    UPDATE_TIME_WORK(state, payload){
        state.timeDateWork.startWork = payload.startWork;
        state.timeDateWork.endWork = payload.endWork;
    },
    
    UPDATE_DURATION_WORK(state, payload){
        state.timeDateWork.durationWork = payload.durationWork
    },
    
    UPDATE_DATE_WORK(state, payload){
        state.timeDateWork.dateWork = payload.date;
    },  
}

export default {
    namespaced : true,
    state,
    actions,
    mutations
}