const getters = {
    stateBtnSend: (state, getters, rootState) => {
        // console.log(state.timeDateWork.dateWork + " " +  state.timeDateWork.startWork + " " + state.timeDateWork.endWork + " " + state.selectedWorker + " " + state.emailProperties.validate + " " + state.dutyProperties.additionalTimeInLastDutyValidation + " " + state.paidCostValid)
        if (rootState.workerInfo.timeDateWork.dateWork === null || 
            rootState.workerInfo.timeDateWork.startWork === '' || 
            rootState.workerInfo.timeDateWork.endWork === '' || 
            rootState.workerInfo.selectedWorker === null || 
            !rootState.workerInfo.emailProperties.validate ||
            !rootState.duty.dutyProperties.additionalTimeInLastDutyValidation ||
            !rootState.accordionTask.paidCostValid) {
          return true
        } else {
          if (rootState.duty.dutyProperties.holidayRangeDate.length === 0 && rootState.duty.dutyProperties.activeHoliday) {
            return true //disabled btn
          } else {
            return false
          }
        }
      },    
}

export default {
    getters
}