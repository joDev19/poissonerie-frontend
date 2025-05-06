<template>
    <table class="table-class">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="td-start-table">
                    Nom
                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden xl:inline" src="../../../../public/icons/price.png" alt="">
                        Prix du kilo
                    </div>

                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden xl:inline" src="../../../../public/icons/price.png" alt="">
                        Prix du carton
                    </div>
                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden xl:inline" src="../../../../public/icons/price.png" alt="">
                        Prix unitaire
                    </div>
                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden xl:inline" src="../../../../public/icons/kilo.png" alt="">
                        <img class="hidden xl:inline" src="../../../../public/icons/carton.png" alt=""> Quantité
                        disponible
                    </div>
                </th>
                <th class="td-middle-table">
                    <img class="hidden xl:inline" src="../../../../public/icons/calendar.png" alt=""> Date de création
                </th>
                <th class="td-end-table">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id" class="border-b-2"
                :class="checkIfProductIsUnderSolde(product) ? (checkIfProductIsOver(product) ? 'bg-red-100' : 'bg-yellow-100') :''">
                <td class="td-start-table">
                    {{ product.name }}
                </td>
                <td class="td-middle-table">
                    <span v-if="product.price_kilo == 0">_</span> <span v-else>{{ formatPrice(product.price_kilo)
                        }}</span>
                </td>
                <td class="td-middle-table">
                    <span v-if="product.price_carton == 0">_</span> <span v-else>{{ formatPrice(product.price_carton)
                        }}</span>
                </td>
                <td class="td-middle-table">
                    <span v-if="product.price_unit == 0">_</span> <span v-else>{{ formatPrice(product.price_unit)
                        }}</span>
                </td>
                <td class="td-middle-table">
                    <span v-if="product.category=='kilo_ou_carton'">
                        {{ product?.quantity?.kg }} kg | {{ product?.quantity?.box }} carton(s)
                    </span>
                    <span v-else>
                        {{ product?.quantity?.unit }} unités
                    </span>
                </td>
                <td class="td-middle-table">
                    {{ formatDate(product.created_at) }}
                </td>
                <td class="td-end-table hover:cursor-pointer">
                    <div class="flex gap-2">
                        <i class="fa-solid fa-eye" @click.prevent="() => showShowModal(product.id)"></i>
                        <i class="fa-solid fa-pencil" @click.prevent="() => showUpdateModal(product.id)"></i>
                        <i v-if="checkIfUserIsAdmin()" class="fa-solid fa-trash"
                            @click.prevent="() => showDeleteModal(product.id)"></i>
                    </div>
                </td>

            </tr>
        </tbody>
    </table>
    <Paginate />
</template>

<script setup>
import { useModal } from 'vue-final-modal';
import ConfirmDeletion from './ConfirmDeletion.vue';
import CreateProduit from './CreateProduct.vue';
import ShowProduit from './ShowProduct.vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import { formatDate, formatPrice, checkIfUserIsAdmin, checkIfProductIsOver, checkIfProductIsUnderSolde } from '@/helper';
import Paginate from '@/components/Paginate.vue';
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
// onBeforeUnmount(() => {
//     products.value = [];
// })

</script>

<style lang="scss" scoped></style>