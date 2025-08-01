<template>
    <div class=" w-full sm:w-auto lg:mx-3">
        <input v-model="filters[filterId]" type="text" class="border border-gray-300 p-2 rounded focus:outline-none"
            placeholder="Rechercher par code">
    </div>
</template>

<script setup>
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import { watch, onUnmounted } from 'vue';
const crudStore = useCrudStore()
const { filters, url } = storeToRefs(crudStore)
const emits = defineEmits(['open'])
const props = defineProps({
    filterId: {
        type: String,
        default: 'id'
    },
})
watch(() => filters.value[props.filterId], (filter_id) => {
    if (filter_id == "") {
        delete filters.value[props.filterId]
    } else {
    }
    crudStore.index();
}, { deep: true })
onUnmounted(() => {
    crudStore.resetFilter()
})
</script>

<style lang="scss" scoped></style>