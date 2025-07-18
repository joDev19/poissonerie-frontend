<template>
    <App>
        <div class="p-5 lg:w-full lg:mx-auto">
            <div class="lg:flex lg:mb-3">
                <div class="sm:w-full">
                    <p class=" text-2xl">Mes marques</p>
                    <!-- <p>Listes de mes catégories.</p> -->
                </div>
                <InputFilterByName @open="open" :disabled-add-button="!checkIfUserIsAdmin()" />
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <!-- <img class="hidden lg:inline" src="../../../../public/icons/sort.png" alt=""> -->
                    <input type="checkbox" class="input-checkbox" id="showFiltre" v-model="showFiltre">
                    <label class="my-2 text-xl" for="showFiltre"> Filtrage</label>
                </div>
                <div class="" v-if="showFiltre">
                    <Filter :items="filterItems" />

                </div>
                <div class="overflow-auto">
                    <MarqueList />
                </div>
            </div>
        </div>
    </App>
</template>

<script setup>
import App from '@/components/Layout/App.vue';
import { useModal } from 'vue-final-modal';
import Filter from '@/components/Filter.vue';
import MarqueList from '@/components/App/Marque/MarqueList.vue';
import InputFilterByName from '@/components/InputFilterByName.vue';
import CreateMarque from '@/components/App/Marque/CreateMarque.vue';
import { checkIfUserIsAdmin } from '@/helper';
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
