<template>
    <table class="w-full mt-5 mb-5">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="pb-3 ps-5 text-start min-w-auto">
                    Nom
                </th>
                <th class="pb-3 ps-5  text-start min-w-auto">
                    Date de création
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id" class="border-b-2">
                <td class="py-2 ps-5">
                    {{ product.name }}
                </td>
                <td class="py-2 ps-5">
                    {{ formatDate(product.created_at) }}
                </td>
                <td class="py-2 ps-5 hover:cursor-pointer">
                    <div class="flex gap-2">
                        <i class="fa-solid fa-eye" @click.prevent="() => showShowModal(product.id)"></i>
                        <i class="fa-solid fa-pencil" @click.prevent="() => showUpdateModal(product.id)"></i>
                        <i class="fa-solid fa-trash" @click.prevent="() => showDeleteModal(product.id)"></i>
                    </div>
                </td>

            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { useModal } from 'vue-final-modal';
import ConfirmDeletion from './ConfirmDeletion.vue';
import CreateProduit from './CreateProduct.vue';
import ShowProduit from './ShowProduct.vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/helper';
import { onBeforeUnmount } from 'vue';
const crudStore = useCrudStore()
const { url, items: products } = storeToRefs(crudStore)
url.value = "/api/products"
crudStore.index();

const trashCommmand = useModal({
    component: ConfirmDeletion,
    attrs: {
        onConfirm() {
            trashCommmand.close();
        }
    }
})
const updateCommand = useModal({
    component: CreateProduit,
    attrs: {
        onConfirm() {
            updateCommand.close()
        }
    }
})
const showCommand = useModal({
    component: ShowProduit,
    attrs: {
        product: { name: "Jordy", created_at: "45" },
        onConfirm() {
            showCommand.close()
        }
    }
})
const showUpdateModal = (id) => {
    crudStore.show(id);
    updateCommand.open()
}
const showShowModal = (id) => {
    crudStore.show(id);
    showCommand.open()
}
const showDeleteModal = (id) => {
    crudStore.show(id);
    trashCommmand.open()
}
onBeforeUnmount(() => {
    products.value = [];
})
</script>

<style lang="scss" scoped></style>