<template>
    <App>
        <div class="p-5 lg:w-full lg:mx-auto">
            <div class="lg:flex lg:mb-3">
                <MiniTitle text="Mes fournisseurs" />
                <InputFilterByName @open="open" />
            </div>
            <div class="flex items-center gap-2">
                <!-- <img class="hidden lg:inline" src="../../../../public/icons/sort.png" alt=""> -->
                <input type="checkbox" id="showFiltre" class="input-checkbox" v-model="showFiltre">
                <label class="my-2 text-xl" for="showFiltre">Filtrage</label>

            </div>
            <div class="" v-if="showFiltre">
                <Filter :items="filterItems" />

            </div>
            <div class="overflow-auto">
                <FournisseurList />
            </div>
        </div>
    </App>
</template>

<script setup>
import App from '@/components/Layout/App.vue';
import { useModal } from 'vue-final-modal';
import MiniTitle from '@/components/MiniTitle.vue';
import Filter from '@/components/Filter.vue';
import InputFilterByName from '@/components/InputFilterByName.vue';
import FournisseurList from '@/components/App/Fournisseur/FournisseurList.vue';
import CreateFournisseur from '@/components/App/Fournisseur/CreateFournisseur.vue';
import { ref } from 'vue';
const filterItems = [
    {
        show: "Trier par date",
        value: "created_at",
        type: "date",
        filterData: null
    }
]
const { open, close } = useModal({
    component: CreateFournisseur,
    attrs: {
        onConfirm() {
            close()
        }
    }
})
const showFiltre = ref(false)
</script>

<style lang="css" scoped></style>