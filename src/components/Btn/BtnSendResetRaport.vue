<template>
    <b-row>
        <b-col>
            <b-button :disabled="!$store.state.selectedWorker" @click="sendRaport" class="bg-success mr-1">Wyślij raport!</b-button>
            <b-button class="bg-danger" @click="resetRaport">Zresetuj cały raport</b-button>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'BtnSendResetRaport',
    methods : {
        sendRaport() {
            console.log(this.$store.state.accordionDoneTask);
        },
        resetRaport() {
            this.$store.state.accordionDoneTask = [];
            this.$store.state.accordionProgressTask = [];
            this.$store.state.accordionNotDoneTask = [];
        }        
    }
}
</script>
