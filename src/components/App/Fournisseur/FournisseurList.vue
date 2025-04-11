<template>
    <table class="w-full mt-5 mb-5">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="pb-3 ps-5 text-start min-w-auto">
                    Nom
                </th>
                <th class="pb-3 ps-5  text-start min-w-auto">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/call.png" alt="">
                        Contact
                    </div>
                </th>
                <th class="pb-3 ps-5 text-start min-w-auto">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/home.png" alt="">
                        Adresse
                    </div>
                </th>
                <th class="pb-3 ps-5 flex gap-1 text-start min-w-auto">
                    <img class="hidden lg:inline" src="../../../../public/icons/calendar.png" alt=""> Date de création
                </th>
                <th class="pb-3 ps-5 text-start min-w-auto">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fournisseur in fournisseurs" :key="fournisseur.id" class="border-b-2">
                <td class="py-2 ps-5">
                    {{ fournisseur.name }}
                </td>
                <td class="py-2 ps-5">
                    {{ fournisseur.contact }}
                </td>
                <td class="py-2 ps-5">
                    {{ fournisseur.adresse }}
                </td>
                <td class="py-2 ps-5">
                    {{ formatDate(fournisseur.created_at) }}
                </td>
                <td class="py-2 ps-5 hover:cursor-pointer">
                    <div class="flex gap-2">
                        <i class="fa-solid fa-eye" @click.prevent="() => showShowModal(fournisseur.id)"></i>
                        <i class="fa-solid fa-pencil" @click.prevent="() => showUpdateModal(fournisseur.id)"></i>
                        <i class="fa-solid fa-trash" @click.prevent="() => showDeleteModal(fournisseur.id)"></i>
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
import CreateMarque from './CreateFournisseur.vue';
import ShowFournisseur from './ShowFournisseur.vue';
import { useCrudStore } from '@/stores/crudStore';
import Paginate from '@/components/Paginate.vue';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/helper';
import { onBeforeUnmount } from 'vue';
const crudStore = useCrudStore()
const { url, items: fournisseurs } = storeToRefs(crudStore)
url.value = "/api/fournisseurs"
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
    component: CreateMarque,
    attrs: {
        onConfirm() {
            updateCommand.close()
        }
    }
})
const showCommand = useModal({
    component: ShowFournisseur,
    attrs: {
        fournisseur: { name: "Jordy", created_at: "45" },
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
    crudStore.show(id, true);
    showCommand.open()
}
const showDeleteModal = (id) => {
    crudStore.show(id);
    trashCommmand.open()
}
onBeforeUnmount(() => {
    fournisseurs.value = [];
})
</script>

<style lang="scss" scoped></style>