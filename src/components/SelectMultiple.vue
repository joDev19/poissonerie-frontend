<template>
    <div class="w-full">
        <label for="produit" class="label">Produit</label>
        <input type="text" v-model="filter" class="input mb-2" placeholder="rechercher un produit">
        <select multiple name="produit"
            class="w-full h-40 border border-gray-300 focus:outline-none border-gray-400 rounded text-lg p-2" id="produit">
            <option :value="0">Choisir le produit</option>
            <option v-for="p in filteredData" :key="p.id" :value="p.id" @dblclick="() => addOrRemoveId(p.id)"
                :class="selectedElements.includes(p.id) ? 'bg-gray-400' : ''"
                class="appearance-none has-checked:bg-red-500">{{ p.name
                }}</option>
        </select>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

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
const addOrRemoveId = (id) => {
    if (selectedElements.value.includes(id)) {
        // remove
        selectedElements.value = selectedElements.value.filter(el => el != id);
    } else {
        // add
        selectedElements.value = [...selectedElements.value, id]
    }
    emit('updateElements', selectedElements.value)
    console.log(selectedElements.value)
}
</script>

<style lang="scss" scoped></style>