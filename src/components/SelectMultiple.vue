<template>
    <div class="w-full">
        <label for="produit" class="label">Produit</label>
        <input type="text" v-model="filter" class="input mb-2" placeholder="rechercher un produit">
        <div class="w-full h-40 border border-gray-300 focus:outline-none border-gray-400 rounded text-lg px-2 overflow-auto"
            id="produit">
            <ul class="p-2 divide-y divide-gray-200">
                <div v-for="p in filteredData" class="">
                    <label :for="`lab-${p.id}`" class="flex gap-2">
                        <input v-model="selectedElements" :value="p.id" type="checkbox" name="" :id="`lab-${p.id}`">
                        <li :class="selectedElements.includes(p.id) ? 'bg-gray-400 text-white' : ''"
                            class="p-1 rounded-sm hover:cursor-pointer w-full">{{ p.name }}</li>
                    </label>

                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const selectedElements = ref([]);
const filter = ref("");
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    filterBy: {
        type: String,
        required: true,
    }
})
const emit = defineEmits(['updateElements'])
const filteredData = computed(() => props.data.filter(el => el[props.filterBy].toLowerCase().includes(filter.value.toLowerCase())))
watch(selectedElements, (newValue) => {
    emit('updateElements', newValue);
});
</script>

<style lang="scss" scoped></style>