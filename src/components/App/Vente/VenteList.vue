<template>
    <table class="w-full mt-5 mb-5">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="pb-3 ps-5 text-start text-sm min-w-auto">
                    Date
                </th>
                <th class="pb-3 ps-5 text-start text-sm min-w-auto">
                    Type de vente
                </th>
                <th class="pb-3 ps-5 text-start text-sm min-w-auto">
                    Quantité
                </th>
                <th class="pb-3 ps-5 text-start text-sm min-w-auto">
                    Prix
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vente in ventes" :key="vente.id" class="border-b-2">
                <td class="py-2 ps-5 text-sm">
                    {{ vente.date }}
                </td>

                <td class="py-2 ps-5 text-sm">
                    {{ vente.type == 'detail' ? "En détail" : "En gros" }}
                </td>
                <td class="py-2 ps-5 text-sm">
                    {{ vente.quantity }} <span v-if="vente.type == 'detail'">kg</span><span
                        v-if="vente.type == 'gros'">carton<span v-show="vente.quantity > 1">s</span></span>
                </td>
                <td class="py-2 ps-5 text-sm">
                    {{ Intl.NumberFormat('fr-FR').format(vente.total_price) }} fcfa
                </td>
                <td class="py-2 ps-5 text-sm hover:cursor-pointer">
                    <div class="flex gap-2">
                        <i class="fa-solid fa-eye" @click.prevent="showShowModal(vente.id)"></i>
                        <i class="fa-solid fa-pencil" @click.prevent="showUpdateModal(vente.id)"></i>
                        <i class="fa-solid fa-trash" @click.prevent="showTrashModal(vente.id)"></i>
                    </div>
                </td>
            </tr>
            <div class="mt-5">
                <p>Total des ventes: {{Intl.NumberFormat('fr-FR').format(
                    ventes.map(v => v.total_price).reduce((currentValue, acc) => currentValue + acc, 0)
                )}} fcfa</p>
            </div>
        </tbody>
    </table>
</template>

<script setup>
import { useModal } from 'vue-final-modal';
import { useCrudStore } from '@/stores/crudStore';
import ConfirmDeletion from './ConfirmDeletion.vue';
import CreateEntrer from './TypeDeVente.vue';
import ShowEntrer from './ShowVente.vue';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/helper';
import { onBeforeUnmount } from 'vue';
const crudStore = useCrudStore()
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
    updateCommand.options.attrs.venteId = id
    updateCommand.open()
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