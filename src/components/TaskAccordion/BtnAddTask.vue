<template>
  <b-button @click="addAccordion">Dodaj temat</b-button>
</template>

<script>
export default {
  name: 'BtnAddAccordion',
  props: {
    kindTask: String
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
