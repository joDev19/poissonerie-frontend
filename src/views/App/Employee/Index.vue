<template>
    <App>
        <div class="p-5 lg:w-full lg:mx-auto">
            <div class="lg:flex lg:mb-3">
                <MiniTitle text="Mes employés" />

                <InputFilterByName @open="open" filterName="name" />

            </div>
            <div class="flex items-center gap-2">
                <!-- <img class="hidden lg:inline" src="../../../../public/icons/sort.png" alt=""> -->
                <input type="checkbox" id="showFiltre" class="input-checkbox" v-model="showFiltre">
                <label class="my-2 text-xl" for="showFiltre">Filtrage</label>

            </div>
            <div class="" v-if="showFiltre">
                <Filter :items="itemFilters" />

            </div>
            <div class="overflow-auto">
                <EmployeeList />
            </div>
        </div>
    </App>
</template>

<script setup>
import App from '@/components/Layout/App.vue';
import { useModal } from 'vue-final-modal';
import InputFilterByName from '@/components/InputFilterByName.vue';
import MiniTitle from '@/components/MiniTitle.vue';
import Filter from '@/components/Filter.vue';
import EmployeeList from '@/components/App/Employee/EmployeeList.vue';
import CreateEmployee from '@/components/App/Employee/CreateEmployee.vue';
import { ref } from 'vue';
const { open, close } = useModal({
    component: CreateEmployee,
    attrs: {
        onConfirm() {
            close()
        }
    }
})
const itemFilters = [
    // {
    //     show: "Date de début",
    //     value: "start_date",
    //     type: "date",
    //     filterData: null
    // },
    // {
    //     show: "Date de fin",
    //     value: "end_date",
    //     type: "date",
    //     filterData: null
    // }
]
const showFiltre = ref(false)
</script>

<style lang="css" scoped></style>