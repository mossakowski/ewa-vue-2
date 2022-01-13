<template>
    <footer class="bg-info text-light">
    <div class="text-center p-2 mt-2">
        Kamil Mossakowski {{currentDate}}
    </div>
    </footer>  
</template>

<script>
import moment from 'moment'
export default {
    name: 'TheFooter',
    data() {
        return {
            currentDate : moment().format('YYYY')
        }
    }
}
</script>
