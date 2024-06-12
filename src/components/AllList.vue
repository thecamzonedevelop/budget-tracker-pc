<template>
    <div>
        <ListBuet @clickRecord="emitClickRecord" @clickEdit="emitClickEdit" @clickDelete="emitClickDelete" />
    </div>
</template>
<script>
import ListBuet from './ListBudgetd.vue';
export default {
    data() {
        return {

        }
    },
    components: {
        ListBuet
    },
    methods: {
        emitClickRecord() {
            this.$emit('clickRecord')
        },
        emitClickEdit() {
            this.$emit('clickEdit')
        },
        emitClickDelete() {
            this.$emit('clickDelete')
        }
    }
}
</script>
<style lang="">

</style>