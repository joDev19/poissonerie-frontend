<template>
    <App>
        <div class="p-5 lg:w-5/6 lg:mx-auto">
            <div class="lg:flex lg:mb-3">
                <div class="sm:w-full">
                    <p class="font-bold">Mes Catégories</p>
                    <p>Listes de mes catégories.</p>
                </div>
                <div class="flex w-full sm:w-auto items-center gap-3">
                    <input type="text" class="border-2 p-2 rounded focus:outline-none" placeholder="Rechercher">
                    <Button type-name="button" text="Ajouter" :loading="false" @click="open" />
                </div>
            </div>
            <div class="flex items-center gap-2">
                <label class="my-2 text-blue-700 underline" for="showFiltre">Afficher les options de filtrage</label>
                <input type="checkbox" id="showFiltre" v-model="showFiltre">

            </div>
            <div class="" v-if="showFiltre">
                <Filter />

            </div>
            <div class="overflow-auto">
                <MarqueList />
            </div>
        </div>
    </App>
</template>

<script setup>
import App from '@/components/Layout/App.vue';
import { useModal } from 'vue-final-modal';
import Button from '@/components/Button.vue';
import Filter from '@/components/App/Marque/Filter.vue';
import MarqueList from '@/components/App/Marque/MarqueList.vue';
import CreateMarque from '@/components/App/Marque/CreateMarque.vue';
import { ref } from 'vue';

const { open, close } = useModal({
    component: CreateMarque,
    attrs: {
        onConfirm() {
            close()
        }
    }
})
const showFiltre = ref(false)
</script>

<style lang="css" scoped></style>
