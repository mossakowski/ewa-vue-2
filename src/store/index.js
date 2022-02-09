import Vue from 'vue';
import Vuex from 'vuex';
import accordionTask from './modules/accordionTask';
import duty from './modules/duty';
import workerInfo from './modules/workerInfo';
import btn from './modules/btn';
import constants from './modules/constants';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        accordionTask,
        duty,
        workerInfo,
        btn,
        constants
    },
});