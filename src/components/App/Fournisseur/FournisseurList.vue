<template>
    <table class="table-class">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="td-start-table">
                    Nom
                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/call.png" alt="">
                        Contact
                    </div>
                </th>
                <th class="td-middle-table">
                    <div class="flex gap-1">
                        <img class="hidden lg:inline" src="../../../../public/icons/home.png" alt="">
                        Adresse
                    </div>
                </th>
                <th class="td-middle-table">
                    <img class="hidden lg:inline" src="../../../../public/icons/calendar.png" alt=""> Date de création
                </th>
                <th class="td-end-table">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fournisseur in fournisseurs" :key="fournisseur.id" class="border-b-2">
                <td class="td-start-table">
                    {{ fournisseur.name }}
                </td>
                <td class="td-middle-table">
                    {{ fournisseur.contact }}
                </td>
                <td class="td-middle-table">
                    {{ fournisseur.adresse }}
                </td>
                <td class="td-middle-table">
                    {{ formatDate(fournisseur.created_at) }}
                </td>
                <td class="td-end-table hover:cursor-pointer">
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