<template>
  <b-button class="bg-danger" @click="resetRaport">Zresetuj cały raport</b-button>
</template>

<script>
export default {
    name: 'BtnResetRaport',
    methods: {
        resetRaport() {
            this.$store.state.accordionDoneTask = [];
            this.$store.state.accordionProgressTask = [];
            this.$store.state.accordionNotDoneTask = [];
        }
    }
}
</script>