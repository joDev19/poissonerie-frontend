<template>
    <App>
        <div class="p-5 lg:w-5/6 lg:mx-auto">
            <template v-if="step === 1">
                <div class="lg:flex lg:mb-3">
                    <div class="sm:w-full">
                        <p class="font-bold">Mes ventes</p>
                        <p>Listes de mes ventes.</p>
                    </div>
                    <InputFilterByName @open="typeDeVenteModalManager.open()" filterName="product_name" />
                </div>
                <div class="flex items-center gap-2">
                    <img class="hidden lg:inline" src="../../../../public/icons/sort.png" alt="">
                    <label class="my-2 text-blue-700 underline" for="showFiltre">Filtrage</label>
                    <input type="checkbox" id="showFiltre" v-model="showFiltre">

                </div>
                <div class="" v-if="showFiltre">
                    <Filter :items="itemFilters" />

                </div>
                <div class="overflow-auto">
                    <VenteList />
                </div>
            </template>
            <template v-if="step === 2">
                <div class="lg:flex lg:mb-3">
                    <div class="sm:w-full">
                        <p class="font-bold hover:cursor-pointer" @click="step = 1">Mes ventes</p>
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
import Filter from '@/components/Filter.vue';
import { onUnmounted, ref } from 'vue';
import InputFilterByName from '@/components/InputFilterByName.vue';
import { useModal } from 'vue-final-modal';
import TypeDeVente from '@/components/App/Vente/TypeDeVente.vue';
import { useVenteStore } from '@/stores/VenteStore';
import CreateVente from '@/components/App/Vente/CreateVente.vue';
import { storeToRefs } from 'pinia';
const venteStore = useVenteStore()
const showFiltre = ref(false)
const { step } = storeToRefs(venteStore)
const itemFilters = [
    {
        show: "Date de début",
        value: "start_date",
        type: "date",
        filterData: null
    },
    {
        show: "Date de fin",
        value: "end_date",
        type: "date",
        filterData: null
    }
]
const typeDeVenteModalManager = useModal({
    component: TypeDeVente,
    attrs: {
        onConfirm() {

            typeDeVenteModalManager.close()

            venteStore.increment()
        }
    }
})
onUnmounted(() => {
    step.value = 1
})
</script>

<style lang="scss" scoped></style>