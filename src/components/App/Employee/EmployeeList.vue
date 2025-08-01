<template>
    <table class="table-class">
        <thead class="border-b-2 w-full">
            <tr>
                <th class="td-start-table">
                    Nom et prénoms
                </th>


                <th class="td-middle-table">Email

                </th>
                <th class="td-middle-table">Rôle

                </th>
                <th class="td-middle-table">
                    Ajouter le
                </th>
                <th class="td-end-table">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="employee in employees" :key="employee.id" class="border-b-2">
                <!-- <td class="py-2 ps-5 ">
                    {{ formatDate(new Date(employee.date)) }}
                </td> -->
                <td class="td-start-table ">
                    {{ employee.name }}
                </td>

                <td class="td-middle-table ">
                    {{ employee.email }}
                </td>
                <td class="td-middle-table ">
                    {{ employee.role }}
                </td>

                <td class="td-middle-table ">
                    {{ formatDate(employee.created_at) }}
                </td>
                <td class="td-end-table  hover:cursor-pointer">
                    <div class="flex gap-2">
                        <!-- <i class="fa-solid fa-eye" @click.prevent="showShowModal(employee.id)"></i> -->
                        <!-- <i class="fa-solid fa-pencil" @click.prevent="showUpdateModal(employee.id)"></i> -->
                        <i class="fa-solid fa-trash" @click.prevent="showTrashModal(employee.id)"></i>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <Paginate />
</template>

<script setup>
import { useModal } from 'vue-final-modal';
import { useCrudStore } from '@/stores/crudStore';
import ConfirmDeletion from './ConfirmDeletion.vue';
import CreateEntrer from './CreateEmployee.vue';
import ShowEntrer from './ShowEmployee.vue';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/helper';
import { onBeforeUnmount } from 'vue';
import Paginate from '@/components/Paginate.vue';
const crudStore = useCrudStore()
const { url, items: employees } = storeToRefs(crudStore)
url.value = "/api/employees"
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
    updateCommand.options.attrs.employeeId = id
    updateCommand.open()
}
const showShowModal = (id) => {
    crudStore.show(id, true);
    showCommand.open()
}
onBeforeUnmount(() => {
    employees.value = [];
})
</script>

<style lang="scss" scoped></style>