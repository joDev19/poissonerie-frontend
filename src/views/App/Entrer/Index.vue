<template>
    <App>
        <div class="p-5 lg:w-5/6 lg:mx-auto">
            <div class="lg:flex lg:mb-3">
                <div class="sm:w-full">
                    <p class="font-bold">Mes entrés</p>
                    <p>Listes de mes entrés.</p>
                </div>
                <InputFilterByName @open="open" filterName="product_name" />

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
                <EntrerList />
            </div>
        </div>
    </App>
</template>

<script setup>
import App from '@/components/Layout/App.vue';
import { useModal } from 'vue-final-modal';
import Button from '@/components/Button.vue';
import InputFilterByName from '@/components/InputFilterByName.vue';
import Filter from '@/components/Filter.vue';
import EntrerList from '@/components/App/Entrer/EntrerList.vue';
import CreateEntrer from '@/components/App/Entrer/CreateEntrer.vue';
import { ref } from 'vue';
const { open, close } = useModal({
    component: CreateEntrer,
    attrs: {
        onConfirm() {
            close()
        }
    }
})
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
const showFiltre = ref(false)
</script>

<style lang="css" scoped></style>