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
        statusTask: String,
        idTask: Number
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
