<template>
    <toggle-button
        v-model="valueToggle"
        :value="valueToggle"
        @change="updateValueToggle"
        :width="constants.toggle.width" 
        :height="constants.toggle.heigth"                              
        :labels="toggleText"
        :color="colorToggleChecked"/>   
</template>

<script>
import { mapState } from 'vuex';
import { ToggleButton } from 'vue-js-toggle-button';

export default {
    name: 'AccordionTaskToggle',
    components: {
        ToggleButton
    },
    data() {
        return {
            valueToggle : this.valueToggleProp,
            toggleText : {checked: 'Tak', unchecked: 'Nie'}
        }
    },
    props: {
        valueToggleProp : {
            type: Boolean,
            require: true
        },
        colorToggleChecked : {
            type: String,
            default: '#75c791'
        }

    },
    computed:
        mapState({
            constants: 'constants'
        }),
    methods: {
        updateValueToggle() {
            this.$emit('updateValueToggle', this.valueToggle);
        }
    }
}
</script>