<template>
<div>
    <b-button @click="sendRaport" class="bg-success">Wyślij raport!</b-button>
    <br>
    {{this.$store.state.accordionDoneTask}}
    <br>
    {{this.$store.state.accordionProgressTask}}
    <br>
    {{this.$store.state.accordionNotDoneTask}}
    </div>
</template>

<script>
export default {
    name: "BtnSendRaport",
    methods : {
        sendRaport() {
            console.log(this.$store.state.accordionDoneTask);
        }
    }
}
</script>
