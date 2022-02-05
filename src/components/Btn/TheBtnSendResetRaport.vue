<template>
    <b-row>
        <b-col>
            {{stateBtnSend}}
            <b-button :disabled="stateBtnSend" @click="showModalConfirmSendRaport" class="bg-success mr-1 mt-1">
                Wyślij raport!  
                <b-spinner v-if="showSpinnerTextSending" small variant="light" label="Spinning"></b-spinner>
                <span v-if="showSpinnerTextSending" class="ml-1">Wysyłam...</span>
                <b-icon-check v-if="showCheckSendText"></b-icon-check>
                <span v-if="showCheckSendText" class="ml-1">Wysłano!</span>                
            </b-button>
            <b-button class="bg-danger mr-1 mt-1" @click="resetRaport">Zresetuj cały raport</b-button>
            <span class="text-danger">{{(stateBtnSend) ? 'Popraw wprowadzone dane!' : ''}}</span>
        </b-col>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'BtnSendResetRaport',
    data() {
        return {
            showSpinnerTextSending : false,
            showCheckSendText : false
        }
    },
    computed: {
        ...mapGetters({
            stateBtnSend : 'stateBtnSend'
        })
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
                            this.$socket.client.emit('SEND_RAPORT', { data : this.$store.state, summary: this.$store.getters.calcSummary }, (res) => {
                                if(res) {
                                    this.showSpinnerTextSending = false;
                                    this.showCheckSendText = true;                                
                                }
                            })
                        
                        }
                    })            
        },
        resetRaport() {
            this.showSpinnerTextSending = false;
            this.showCheckSendText = false;
            this.$store.dispatch('accordionTask/resetRaport');
        }        
    }
}
</script>
