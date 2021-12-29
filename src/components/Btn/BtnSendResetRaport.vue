<template>
    <b-row>
        <b-col>
            <b-button :disabled="$store.getters.stateBtnSend" @click="sendRaport" class="bg-success mr-1">Wyślij raport!</b-button>
            <b-button class="bg-danger" @click="resetRaport">Zresetuj cały raport</b-button>
            <span class="text-danger">{{($store.getters.stateBtnSend) ? 'Popraw wprowadzone dane!' : ''}}</span>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'BtnSendResetRaport',
    methods : {
        sendRaport() {
            this.$socket.client.emit('SEND_RAPORT', { data : this.$store.state }, (arg) => {
                console.log(arg)
            })
        },
        resetRaport() {
            this.$store.state.accordionDoneTask = [];
            this.$store.state.accordionProgressTask = [];
            this.$store.state.accordionNotDoneTask = [];
        }        
    }
}
</script>
