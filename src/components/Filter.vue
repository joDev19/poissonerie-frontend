<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in items" :key="item.value" class="lg:w-full">
            <p class="font-semibold">
                {{ item.show }}
            </p>
            <input v-if="item.type == 'date'" type="date" v-model="filters[item.value]" class="input">
            <input v-if="item.type == 'radio'" :name="item.name" type="radio" :value="item.value"
                v-model="filters[item.name]" class="input-checkbox mt-2">
            <select v-if="item.type == 'select'" :name="item.name" v-model="filters[item.name]"
                class="input">
                <option v-for="option in item.filterData" :key="option.value" :value="option.value">
                    {{ option.label }} 
                </option>
            </select>
        </div>
    </div>
    <div v-if="items.length > 0" class="flex gap-3">
        <div class="w-24 mt-2"><Button type-name="button" text="Filtrer" :loading="loaderStore.active"
                @click.prevent="filter" /></div>
        <div class="w-24 mt-2"><Button type-name="button" text="Reset" :loading="false" @click="reset" /></div>
    </div>
</template>

<script setup>
import Button from '@/components/Button.vue';
import { useLoaderStore } from '@/stores/Loader';
import { useCrudStore } from '@/stores/crudStore';
import { formatDate } from '@/helper';
import { storeToRefs } from 'pinia';
import { onUnmounted } from 'vue';
const props = defineProps({
    items: Array
})
const crudStore = useCrudStore()

const { filters } = storeToRefs(crudStore)
const loaderStore = useLoaderStore()
const filter = () => {
    // const date = formatDate(filters.value.created_at)
    // filters.value.created_at = date
    crudStore.index()
}
onUnmounted(() => {
    filters.value = {}
})
const reset = () => {
    crudStore.resetFilter();
}


</script>

<style lang="scss" scoped></style>