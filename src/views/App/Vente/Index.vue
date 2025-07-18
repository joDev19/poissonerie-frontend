<template>
    <App>
        <div class="p-5 w-full lg:mx-auto">
            <template v-if="step === 1">
                <div class="lg:flex lg:mb-3">
                    <MiniTitle text="Mes ventes" />
                    <FilterById />
                    <InputFilterByName @open="venteStore.increment()" filterName="product_name_vente" />
                </div>
                <div class="flex items-center gap-2">
                    <!-- <img class="hidden lg:inline" src="../../../../public/icons/sort.png" alt=""> -->
                    <input type="checkbox" id="showFiltre" class="input-checkbox" v-model="showFiltre">
                    <label class="my-2 text-xl" for="showFiltre">Filtrage</label>

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
import MiniTitle from '@/components/MiniTitle.vue';
import App from '@/components/Layout/App.vue';
import Filter from '@/components/Filter.vue';
import FilterById from '@/components/FilterById.vue';
import { onUnmounted, ref } from 'vue';
import InputFilterByName from '@/components/InputFilterByName.vue';
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
        name: "",
        filterData: null
    },
    {
        show: "Date de fin",
        value: "end_date",
        type: "date",
        name: "",
        filterData: null
    },
    {
        show: "Payées",
        value: 1,
        type: "radio",
        name: "is_paid",
        filterData: null
    },
    {
        show: "Non payées",
        value: 0,
        type: "radio",
        name: "is_paid",
        filterData: null
    },
    {
        show: "Type de vente",
        value: null,
        type: "select",
        name: "type",
        filterData: [
            { value: "au comptant", label: "Au comptant" },
            { value: "à terme", label: "À terme" },
        ]
    },
    {
        show: "Vente en gros",
        value: 1,
        type: "radio",
        name: "contains_gros",
        filterData: null
    },
    {
        show: "Vente en détail",
        value: 0,
        type: "radio",
        name: "contains_gros",
        filterData: null
    },
    {
        show: "Ventes au comptant",
        value: "au comptant",
        type: "radio",
        name: "type",
        filterData: null
    },
    {
        show: "Ventes à terme",
        value: "à terme",
        type: "radio",
        name: "type",
        filterData: null
    }
]

onUnmounted(() => {
    step.value = 1
})
</script>

<style lang="scss" scoped></style>