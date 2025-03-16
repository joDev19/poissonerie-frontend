<template>
    <App>
        <div class="p-5 lg:w-5/6 lg:mx-auto">
            <template v-if="step === 1">
                <div class="lg:flex lg:mb-3">
                    <div class="sm:w-full">
                        <p class="font-bold">Mes ventes</p>
                        <p>Listes de mes ventes.</p>
                    </div>
                    <div class="flex w-full sm:w-auto items-center gap-3">
                        <input type="text" class="border-2 p-2 rounded focus:outline-none" placeholder="Rechercher">
                        <Button type-name="button" text="Ajouter" :loading="false"
                            @click="typeDeVenteModalManager.open" />
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <label class="my-2 text-blue-700 underline" for="showFiltre">Afficher les options de
                        filtrage</label>
                    <input type="checkbox" id="showFiltre" v-model="showFiltre">

                </div>
                <div class="" v-if="showFiltre">
                    <Filter />

                </div>
                <div class="overflow-auto">
                    <VenteList />
                </div>
            </template>
            <template v-if="step === 2">
                <div class="lg:flex lg:mb-3">
                    <div class="sm:w-full">
                        <p class="font-bold" @click="step = 1">Mes ventes</p>
                        <p>Enregistrer une vente.</p>
                    </div>
                    <!-- <div class="flex w-full sm:w-auto items-center gap-3">
                        <input type="text" class="border-2 p-2 rounded focus:outline-none" placeholder="Rechercher">
                        <Button type-name="button" text="Retour" :loading="false"
                            @click="null" />
                    </div> -->
                </div>
                <CreateVente />
            </template>
        </div>
    </App>
</template>

<script setup>
import VenteList from '@/components/App/Vente/VenteList.vue';
import App from '@/components/Layout/App.vue';
import Button from '@/components/Button.vue';
import Filter from '@/components/App/Vente/Filter.vue';
import { ref } from 'vue';
import { useModal } from 'vue-final-modal';
import TypeDeVente from '@/components/App/Vente/TypeDeVente.vue';
import { useVenteStore } from '@/stores/VenteStore';
import CreateVente from '@/components/App/Vente/CreateVente.vue';
import { storeToRefs } from 'pinia';
const venteStore = useVenteStore()
const showFiltre = ref(false)
const { step } = storeToRefs(venteStore)
const typeDeVenteModalManager = useModal({
    component: TypeDeVente,
    attrs: {
        onConfirm() {

            typeDeVenteModalManager.close()

            venteStore.increment()
        }
    }
})
</script>

<style lang="scss" scoped></style>