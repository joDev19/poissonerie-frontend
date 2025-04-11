<template>
    <div class="flex w-full sm:w-auto items-center gap-3">
        <input v-model="filters[filterName]" type="text" class="border-2 p-2 rounded focus:outline-none"
            placeholder="Rechercher par nom">
        <Button type-name="button" text="Ajouter" :loading="false" @click="emits('open')" />
    </div>
</template>

<script setup>
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import { watch, onUnmounted } from 'vue';
import Button from './Button.vue';
const crudStore = useCrudStore()
const { filters, url } = storeToRefs(crudStore)
const emits = defineEmits(['open'])
const props = defineProps({
    filterName: {
        type: String,
        default: 'name'
    }
})
watch(() => filters.value[props.filterName], (filter_name) => {
    if (filter_name == "") {
        delete filters.value[props.filterName]
    } else {
    }
    crudStore.index();
}, { deep: true })
onUnmounted(() => {
    crudStore.resetFilter()
})
</script>

<style lang="scss" scoped></style>