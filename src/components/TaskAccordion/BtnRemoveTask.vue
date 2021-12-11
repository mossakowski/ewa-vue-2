<template>
  <b-button :data-id-task="idTask" :data-status-task="statusTask" @click="removeTask($event)" class="bg-danger">Usuń</b-button>
</template>

<script>
export default {
    name: 'BtnRemoveTask',
    props: {
        statusTask: String,
        idTask: Number
    },
    methods: {
        removeTask(e) {
            this.$store.commit('removeTask',
                {'idTask' : e.target.dataset.idTask,
                'statusTask' : e.target.dataset.statusTask})
        },
    }
}
</script>
