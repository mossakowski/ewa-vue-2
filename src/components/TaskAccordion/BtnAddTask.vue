<template>
  <b-button @click="addAccordion">Dodaj temat</b-button>
</template>

<script>
export default {
  name: 'BtnAddAccordion',
  props: {
    stageWork: String
  },
  data() {
    return {
      countTask : 0,
    }
  },
  methods : {
    addAccordion() {
      this.$store.commit('addAccordion', {
        indexTask: ++this.countTask,

        stageWork : this.stageWork,
        typeTaskTitle: 'Serwis',

        typeTask : 'service',
      
        nameCustomer: '',
        description: '',
        paidCost: '0',

        paidTask: false,
        togglePaid: true,

        newClient: undefined,
        toggleNewClient: false,
        
      })
    }
  }

}
</script>
