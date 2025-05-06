<template>
    <table class="table-class">
        <thead>
            <tr class="">
                <th class="td-start-table">Nom</th>
                <th class="td-middle-table">
                    <div class="flex items-center gap-2">
                        <img class="hidden lg:inline w-4 h-4" src="../../../../public/icons/calendar.png" alt="">
                        Date de création
                    </div>
                </th>
                <th class="td-end-table">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="marque in marques" :key="marque.id" class="border rounded-lg">
                <td class="td-start-table">{{ marque.name }}</td>
                <td class="td-middle-table">{{ formatDate(marque.created_at) }}</td>
                <td class="td-end-table">
                    <div class="flex gap-3">
                        <i class="fa-solid fa-eye cursor-pointer" @click.prevent="() => showShowModal(marque.id)"></i>
                        <i v-if="checkIfUserIsAdmin()" class="fa-solid fa-pencil cursor-pointer"
                            @click.prevent="() => showUpdateModal(marque.id)"></i>
                        <i v-if="checkIfUserIsAdmin()" class="fa-solid fa-trash cursor-pointer"
                            @click.prevent="() => showDeleteModal(marque.id)"></i>
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
import CreateMarque from './CreateMarque.vue';
import ShowMarque from './ShowMarque.vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import { formatDate, checkIfUserIsAdmin } from '@/helper';
import { onBeforeUnmount, watch } from 'vue';
import Paginate from '@/components/Paginate.vue';
const crudStore = useCrudStore()
const { url, items: marques } = storeToRefs(crudStore)
url.value = "/api/marques"
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
    component: ShowMarque,
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
    crudStore.show(id, true);
    showCommand.open()
}
const showDeleteModal = (id) => {
    crudStore.show(id);
    trashCommmand.open()
}

onBeforeUnmount(() => {
    marques.value = [];
})
</script>

<style lang="scss" scoped></style>