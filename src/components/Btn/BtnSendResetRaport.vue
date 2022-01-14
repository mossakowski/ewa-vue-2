<template>
    <b-row>
        <b-col>
            <b-button :disabled="$store.getters.stateBtnSend" @click="showModalConfirmSendRaport" class="bg-success mr-1">
                Wyślij raport!  
                <b-spinner v-if="showSpinnerTextSending" small variant="light" label="Spinning"></b-spinner>
                <span v-if="showSpinnerTextSending" class="ml-1">Wysyłam...</span>
                <b-icon-check v-if="showCheckSendText"></b-icon-check>
                <span v-if="showCheckSendText" class="ml-1">Wysłano!</span>                
            </b-button>
            <b-button class="bg-danger mr-1" @click="resetRaport">Zresetuj cały raport</b-button>
            <span class="text-danger">{{($store.getters.stateBtnSend) ? 'Popraw wprowadzone dane!' : ''}}</span>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'BtnSendResetRaport',
    data() {
        return {
            showSpinnerTextSending : false,
            showCheckSendText : false
        }
    },
    methods : {
        showModalConfirmSendRaport() {
            this.$bvModal.msgBoxConfirm('Czy na pewno chcesz wysłać raport?', {
                    title: 'Potwiedź wysłanie raportu',
                    okVariant: 'success',
                    closeVariant: 'primary',
                    cancelTitle: 'Nie',
                    okTitle: 'Wyślij'
                    })
                    .then(confirmSendRaport => {
                        if(confirmSendRaport) {
                            this.showSpinnerTextSending = true;
                            this.showCheckSendText = false;
                            this.$socket.client.emit('SEND_RAPORT', { data : this.$store.state, summary: this.$store.getters.calcSummary }, () => {
                                this.showSpinnerTextSending = false;
                                this.showCheckSendText = true;
                            })
                        
                        }
                    })            
        },
        resetRaport() {
            this.$store.commit('resetRaport');
        }        
    }
}
</script>
