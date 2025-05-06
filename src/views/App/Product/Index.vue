<template>
    <App>
        <div class="p-5 lg:w-full lg:mx-auto">
            <div class="lg:flex lg:mb-3">
                <MiniTitle text="Mes produits" />
                <InputFilterByName @open="open" :disabled-add-button="!checkIfUserIsAdmin()" />
            </div>
            <div class="flex items-center gap-2">
                <!-- <img class="hidden lg:inline" src="../../../../public/icons/sort.png" alt=""> -->
                <input type="checkbox" id="showFiltre" class="input-checkbox" v-model="showFiltre">
                <label class="my-2 text-xl" for="showFiltre">Filtrage</label>

            </div>
            <div class="" v-if="showFiltre">
                <Filter :items="[]" />

            </div>
            <div class="overflow-auto">
                <ProductList />
            </div>
        </div>
    </App>
</template>

<script setup>
import App from '@/components/Layout/App.vue';
import { useModal } from 'vue-final-modal';
import Filter from '@/components/Filter.vue';
import InputFilterByName from '@/components/InputFilterByName.vue';
import MiniTitle from '@/components/MiniTitle.vue';
import { checkIfUserIsAdmin } from '@/helper';
import ProductList from '@/components/App/Product/ProductList.vue';
import CreateProduct from '@/components/App/Product/CreateProduct.vue';
import { ref } from 'vue';

const { open, close } = useModal({
    component: CreateProduct,
    attrs: {
        onConfirm() {
            close()
        }
    }
})
const showFiltre = ref(false)
</script>

<style lang="css" scoped></style>
