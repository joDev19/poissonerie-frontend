<template>
    <div class="flex w-full flex-col sm:w-auto lg:items-center gap-3">
        <input v-model="filters[filterName]" type="text" class="border border-gray-300 p-2 rounded focus:outline-none"
            placeholder="Rechercher par nom">
            <div class="flex justify-end lg:w-full">
                <div class="lg:w-2/3">
                    <Button :disabled="disabledAddButton" type-name="button" text="Ajouter" :loading="false"
                    @click="emits('open')" />

                </div>
            </div>
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
    },
    disabledAddButton: {
        type: Boolean,
        default: false
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