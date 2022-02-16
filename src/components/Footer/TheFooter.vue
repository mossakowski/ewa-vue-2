<template>
    <footer class="bg-info text-light">
        <div class="text-center p-2 mt-2">
            Kamil Mossakowski 
            {{getYear}}
        </div>
    </footer>  
</template>

<script>
import { getYear as getYearAdapter } from '../../../common/adapters/adapterDate';
export default {
    name: 'TheFooter',
    computed: {
        getYear: function() {
            return getYearAdapter();
        }
    }
}
</script>
