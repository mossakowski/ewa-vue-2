<template>
<div>
    <b-button :disabled="!$store.state.selectedWorker" @click="sendRaport" class="bg-success">Wyślij raport!</b-button>
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
