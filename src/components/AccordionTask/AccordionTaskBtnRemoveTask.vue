<template>
    <b-button 
        :data-id-task="idTask" 
        :data-status-task="statusTask" 
        @click="removeTask($event)" 
        class="bg-danger">
        Usuń
    </b-button>
</template>

<script>
export default {
    name: 'BtnRemoveTask',
    props: {
        statusTask: {
            type: String,
            require: true,
            validation : function(value) {
                return ['doneTasks', 'progressTasks', 'unrealizedTasks'].indexOf(value) !== -1;
            }
        },
        idTask: {
            type: Number,
            require: true,
        } 
    },
    methods: {
        removeTask() {
            this.$store.dispatch('removeTask',
                {'idTask' : this.idTask,
                'statusTask' : this.statusTask})
        }
    }
}
</script>
