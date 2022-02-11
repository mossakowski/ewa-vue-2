const state = () => ({
    activeWeek: false,
    activeHoliday: false,
    holidayRangeDate: [],
    additionalTimeInLastDuty: '00:00',
    additionalTimeInLastDutyValidation : true    
});

const actions = {
    updateDutyHolidayDateRange({ commit }, payload){
      if(payload.holidayRangeDateStart != '' || payload.holidayRangeDateEnd != '') {
        commit('UPDATE_DUTY_HOLIDAY_DATE_RANGE', payload);
      } else {
        payload.holidayRangeDateStart = '';
        payload.holidayRangeDateEnd = '';
        commit('UPDATE_DUTY_HOLIDAY_DATE_RANGE',payload);        
      }
    },
    
    updateAdditionalTimeInDuty({ commit }, payload){
        commit('UPDATE_ADDITIONAL_TIME_IN_DUTY',payload);
      },
    
    updateDuty({ commit }, payload){
        commit('UPDATE_DUTY', payload);
      },    
}

const mutations = {
  
    UPDATE_DUTY_HOLIDAY_DATE_RANGE(state,payload){
        state.holidayRangeDate = [];
        state.holidayRangeDate.push(payload.holidayRangeDateStart);
        state.holidayRangeDate.push(payload.holidayRangeDateEnd);
      },
    
    UPDATE_ADDITIONAL_TIME_IN_DUTY(state,payload){
        state.additionalTimeInLastDuty = payload.additionalTimeInLastDuty;
        state.additionalTimeInLastDutyValidation = payload.additionalTimeInLastDutyValidation;
    },
    
    
    UPDATE_DUTY(state, payload){
        state.activeHoliday = payload.dutyHoliday;
        state.activeWeek = payload.dutyWeek;    
    }    
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}