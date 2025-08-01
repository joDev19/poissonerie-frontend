<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white border  rounded-lg w-full sm:w-3/5">

        <div class="">
            <h1 class="text-xl">
                Enregistrer un nouvel employé:
            </h1>
            <div>
                <form @submit.prevent="handleSubmit">
                    <div>
                        <label class="mb-2" for="name">Nom et prénom</label>
                        <input type="text" id="name" class="input" v-model="employee.name">
                    </div>
                    <div>
                        <label class="mb-2" for="email">Email</label>
                        <input type="text" id="email" class="input" v-model="employee.email">
                    </div>
                    <div>
                        <label class="mb-2" for="email">Role</label>
                        <select type="text" id="email" class="input" v-model="employee.role">
                            <option value="employee">Employer</option>
                            <option value="caissiere">Caissière</option>
                        </select>
                    </div>
                    <div>
                        <label class="mb-2" for="password">Password</label>
                        <input type="text" id="password" class="input" v-model="employee.password">
                        <button @click.prevent="" role="button"
                            class="p-1 mt-1 text-sm border border-gray-300 rounded hover:cursor-pointer">Générer le mot
                            de passe</button>
                    </div>
                    <div class="h-2"></div>
                    <div class="flex justify-center">
                        <div class="float-end w-full">
                            <Button type-name="submit" text="Enregistrer" :loading="false" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- <button class="mt-1 ml-auto px-2 border rounded-lg" @click="emit('confirm')"> 
            Confirm
        </button>-->
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import Button from '../../Button.vue';
import { onUnmounted, ref } from 'vue';
import ModalLoader from '@/components/ModalLoader.vue';
import { storeToRefs } from 'pinia';
import { useCrudStore } from '@/stores/crudStore';
import { reFormatDate } from '@/helper';
const crudStore = useCrudStore()
const emits = defineEmits(["confirm"])
const { item: employee } = storeToRefs(crudStore)
const isUpdate = ref(false)
const props = defineProps({
    employeeId: {
        type: Number,
        default: null,
        required: false
    }
})
if (props.employeeId) {
    crudStore.show(props.employeeId);
    isUpdate.value = true
    console.log("c'est un update", props)
} else {
    console.log("c'est un create")
    employee.value.date = `${new Date().getFullYear()}-${reFormatDate(new Date().getMonth() + 1)}-${reFormatDate(new Date().getDate())}`
}

const handleSubmit = () => {
    if (isUpdate.value) {
        // update
        const { id, ...data } = employee.value
        crudStore.update(data)

    } else {
        // create
        crudStore.store();

    }
    emits("confirm")
}
onUnmounted(() => {
    employee.value = {}
})

</script>

<style lang="scss" scoped></style>