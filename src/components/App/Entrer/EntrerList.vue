<template>
    <table class="table-class">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="td-start-table">
                    Produit
                </th>


                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/carton.png" alt="">Quantité de
                        carton
                    </div>

                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/carton.png" alt="">Quantité
                    </div>

                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/kilo.png" alt="">Nombre de
                        Kilograme
                    </div>
                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/price.png" alt="">Prix
                    </div>
                </th>
                <th class="td-end-table">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entrer in entrers" :key="entrer.id" class="border-b-2">
                <!-- <td class="py-2 ps-5 ">
                    {{ formatDate(new Date(entrer.date)) }}
                </td> -->
                <td class="td-start-table">
                    {{ entrer.product?.name }}
                </td>

                <td class="td-middle-table">
                    {{ entrer.box_quantity }}
                </td>
                <td class="td-middle-table">
                    <!-- {{ entrer.unit_quantity }} -->
                    <span v-if="entrer.unit_quantity == 0">_</span> <span v-else>{{ entrer.unit_quantity }}</span>
                </td>
                <td class="td-middle-table">
                    {{ entrer.kilo_quantity }}
                </td>
                <td class="td-middle-table">
                    {{ formatPrice(entrer.price) }}
                </td>
                <td class="td-end-table  hover:cursor-pointer">
                    <div class="flex gap-2">
                        <i class="fa-solid fa-eye" @click.prevent="showShowModal(entrer.id)"></i>
                        <i class="fa-solid fa-pencil" @click.prevent="showUpdateModal(entrer.id)"></i>
                        <i class="fa-solid fa-trash" @click.prevent="showTrashModal(entrer.id)"></i>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="mt-5">
        <p>Total des achats: {{
            formatPrice(entrers.map(e => e.price).reduce((currentValue, acc) => currentValue + acc, 0))
            }}</p>
    </div>
    <Paginate />
</template>

<script setup>
import { useModal } from 'vue-final-modal';
import { useCrudStore } from '@/stores/crudStore';
import ConfirmDeletion from './ConfirmDeletion.vue';
import CreateEntrer from './CreateEntrer.vue';
import ShowEntrer from './ShowEntrer.vue';
import { storeToRefs } from 'pinia';
import { formatPrice } from '@/helper';
import { onBeforeUnmount } from 'vue';
import Paginate from '@/components/Paginate.vue';
const crudStore = useCrudStore()
const { url, items: entrers } = storeToRefs(crudStore)
url.value = "/api/entrers"
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
    component: CreateEntrer,
    attrs: {
        onConfirm() {
            updateCommand.close()
        }
    }
})
const showTrashModal = (id) => {
    crudStore.show(id);
    trashCommmand.open()
}
const showCommand = useModal({
    component: ShowEntrer,
    attrs: {
        onConfirm() {
            showCommand.close()
        }
    }
})
const showUpdateModal = (id) => {
    updateCommand.options.attrs.entrerId = id
    updateCommand.open()
}
const showShowModal = (id) => {
    crudStore.show(id, true);
    showCommand.open()
}
onBeforeUnmount(() => {
    entrers.value = [];
})
</script>

<style lang="scss" scoped></style>