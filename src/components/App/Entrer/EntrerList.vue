<template>
    <table class="w-full mt-5 mb-5">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="pb-3 ps-5 text-start text-sm min-w-auto">
                    Date
                </th>


                <th class="pb-3 ps-5 text-start text-sm min-w-auto">
                    Quantité de carton
                </th>
                <th class="pb-3 ps-5 text-start text-sm min-w-auto">
                    Nombre de Kilograme
                </th>
                <th class="pb-3 ps-5 text-start text-sm min-w-auto">
                    Prix
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entrer in entrers" :key="entrer.id" class="border-b-2">
                <td class="py-2 ps-5 text-sm">
                    {{ formatDate(new Date(entrer.date)) }}
                </td>

                <td class="py-2 ps-5 text-sm">
                    {{ entrer.box_quantity }}
                </td>
                <td class="py-2 ps-5 text-sm">
                    {{ entrer.kilo_quantity }}
                </td>
                <td class="py-2 ps-5 text-sm">
                    {{ entrer.price }} fcfa
                </td>
                <td class="py-2 ps-5 text-sm hover:cursor-pointer">
                    <div class="flex gap-2">
                        <i class="fa-solid fa-eye" @click.prevent="showShowModal(entrer.id)"></i>
                        <i class="fa-solid fa-pencil" @click.prevent="showUpdateModal(entrer.id)"></i>
                        <i class="fa-solid fa-trash" @click.prevent="showTrashModal(entrer.id)"></i>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { useModal } from 'vue-final-modal';
import { useCrudStore } from '@/stores/crudStore';
import ConfirmDeletion from './ConfirmDeletion.vue';
import CreateEntrer from './CreateEntrer.vue';
import ShowEntrer from './ShowEntrer.vue';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/helper';
import { onBeforeUnmount } from 'vue';
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