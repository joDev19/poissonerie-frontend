<template>
    <table class="w-full mt-5 mb-5">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="pb-3 ps-5 text-start min-w-auto">
                    Produit
                </th>
                <th class="pb-3 ps-5 text-start min-w-auto">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/sell-black.png" alt=""> Type de
                        vente
                    </div>
                </th>
                <th class="pb-3 ps-5 text-start min-w-auto">
                    <div class="flex gap-1 items-center">
                        <span class="hidden lg:inline">
                            (<img src="../../../../public/icons/carton.png" class="inline" alt=""> ou <img
                                src="../../../../public/icons/kilo.png" class="inline" alt="">)
                        </span>
                        <span>
                            Quantité
                        </span>
                    </div>

                </th>
                <th class="pb-3 ps-5 text-start min-w-auto">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/price.png" alt="">
                        Prix
                    </div>
                </th>
                <th class="pb-3 ps-5 text-start min-w-auto">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vente in ventes" :key="vente.id" class="border-b-2">
                <td class="py-2 ps-5">
                    {{ vente.product?.name }}
                </td>

                <td class="py-2 ps-5">
                    {{ vente.type == 'detail' ? "En détail" : "En gros" }}
                </td>
                <td class="py-2 ps-5">
                    {{ vente.quantity }} <span v-if="vente.type == 'detail'">kg</span><span
                        v-if="vente.type == 'gros'">carton<span v-show="vente.quantity > 1">s</span></span>
                </td>
                <td class="py-2 ps-5">
                    {{ formatPrice(vente.total_price) }}
                </td>
                <td class="py-2 ps-5 hover:cursor-pointer">
                    <div class="flex gap-2">
                        <i class="fa-solid fa-eye" @click.prevent="showShowModal(vente.id)"></i>
                        <i class="fa-solid fa-pencil" @click.prevent="showUpdateModal(vente.id)"></i>
                        <i class="fa-solid fa-trash" @click.prevent="showTrashModal(vente.id)"></i>
                    </div>
                </td>
            </tr>
            <div class="mt-5">
                <p>Total des ventes: {{
                    formatPrice(ventes.map(v => v.total_price).reduce((currentValue, acc) => currentValue + acc, 0))
                }}</p>
            </div>
        </tbody>
    </table>
    <Paginate />
</template>

<script setup>
import { useModal } from 'vue-final-modal';
import { useCrudStore } from '@/stores/crudStore';
import ConfirmDeletion from './ConfirmDeletion.vue';
import CreateEntrer from './TypeDeVente.vue';
import ShowEntrer from './ShowVente.vue';
import { storeToRefs } from 'pinia';
import { formatPrice } from '@/helper';
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