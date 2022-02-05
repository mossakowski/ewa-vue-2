<template>
  <b-button @click="addAccordion">Dodaj zadanie</b-button>
</template>

<script>
export default {
  name: 'BtnAddAccordion',
  props: {
    statusTask: String
  },
  data() {
    return {
      countTask : 0,
    }
  },
  methods : {
    addAccordion() {
      this.$store.dispatch('accordionTask/addAccordion', {
        indexTask: ++this.countTask,

        statusTask : this.statusTask,
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
