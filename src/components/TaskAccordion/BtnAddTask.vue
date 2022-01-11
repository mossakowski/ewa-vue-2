<template>
  <b-button @click="addAccordion">Dodaj temat</b-button>
</template>

<script>
export default {
  name: 'BtnAddAccordion',
  props: {
    kindTask: String
  },
  methods : {
    addAccordion() {
      this.$store.commit('addAccordion', {
        kindTask : this.kindTask,
        typeWorkTitle: 'Serwis',

        typeWork : 'service',
      
        nameCustomer: '',
        description: '',
        paidCost: '0',

        paidTask: false,
        togglePaid: true,

        newClient: undefined,
        toggleNewClient: false,
        
        query: 'Serwis'
      })
    }
  }

}
</script>
