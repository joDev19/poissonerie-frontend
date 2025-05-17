<template>
    <table class="table-class">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="td-start-table">
                    Produit
                </th>
                <!-- <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/sell-black.png" alt=""> Type de
                        vente
                    </div>
                </th> -->
                <!-- <th class="td-middle-table">
                    <div class="flex gap-1 items-center">
                        <span class="hidden lg:inline">
                            (<img src="../../../../public/icons/carton.png" class="inline" alt=""> ou <img
                                src="../../../../public/icons/kilo.png" class="inline" alt="">)
                        </span>
                        <span>
                            Quantité
                        </span>
                    </div>

                </th> -->
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/price.png" alt="">
                        Prix
                    </div>
                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/calendar.png" alt="">
                        Date
                    </div>
                </th>
                <th class="td-end-table">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vente in ventes" :key="vente.id" class="border-b-2">
                <td class="td-start-table">
                    {{ vente.selled_products_name?.join(', ') }}
                </td>

                <!-- <td class="td-middle-table">
                    {{ vente.type == 'detail' ? "En détail" : "En gros" }}
                </td> -->
                <!-- <td class="td-middle-table">
                    {{ vente.quantity }} 
                    <template v-if="vente.product?.category == 'kilo_ou_carton'">
                        <span v-if="vente.type == 'detail'">kg</span>
                        <span v-if="vente.type == 'gros'">carton<span v-show="vente.quantity > 1">s</span></span>
                    </template>
</td> -->
                <td class="td-middle-table">
                    {{ formatPrice(vente.total_price) }}
                </td>
                <td class="td-middle-table">
                    {{ formatDate(vente.created_at) }}
                </td>
                <td class="td-end-table hover:cursor-pointer">
                    <div class="flex gap-2">
                        <i class="fa-solid fa-eye" @click.prevent="showShowModal(vente.id)"></i>
                        <i v-if="false" class="fa-solid fa-pencil" @click.prevent="showUpdateModal(vente.id)"></i>
                        <i v-if="checkIfUserIsAdmin()" class="fa-solid fa-trash"
                            @click.prevent="showTrashModal(vente.id)"></i>
                    </div>
                </td>

            </tr>
        </tbody>
    </table>
    <div class="mt-5 w-full">
        <p>Total des ventes: {{
            formatPrice(ventes.map(v => v.total_price).reduce((currentValue, acc) => currentValue + acc, 0))
        }}</p>
    </div>
    <Paginate />
</template>

<script setup>
import { useModal } from 'vue-final-modal';
import { useCrudStore } from '@/stores/crudStore';
import ConfirmDeletion from './ConfirmDeletion.vue';
// import CreateEntrer from './TypeDeVente.vue';
import ShowEntrer from './ShowVente.vue';
import { storeToRefs } from 'pinia';
import { formatPrice, formatDate, checkIfUserIsAdmin } from '@/helper';
import { useVenteStore } from '@/stores/VenteStore';
import Paginate from '@/components/Paginate.vue';
import { onBeforeUnmount } from 'vue';
const crudStore = useCrudStore()
const venteStore = useVenteStore()
const { step, isUpdate } = storeToRefs(venteStore)
const { url, items: ventes } = storeToRefs(crudStore)
url.value = "/api/sells";
crudStore.index();
ventes.value.date = new Date()
const trashCommmand = useModal({
    component: ConfirmDeletion,
    attrs: {
        onConfirm() {
            trashCommmand.close();
        }
    }
})
// const updateCommand = useModal({
//     component: CreateEntrer,
//     attrs: {
//         onConfirm() {
//             updateCommand.close()
//         }
//     }
// })
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
    //updateCommand.options.attrs.venteId = id
    //updateCommand.open()
    step.value = 2
    isUpdate.value = true;

}
const showShowModal = (id) => {
    crudStore.show(id, true);
    showCommand.open()
}
onBeforeUnmount(() => {
    ventes.value = [];
})
</script>

<style lang="scss" scoped></style>