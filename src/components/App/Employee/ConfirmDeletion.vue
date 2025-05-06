<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white border  rounded-lg space-y-2 w-full sm:w-1/3">
        <h1>Confirmation !</h1>
        <p>êtes vous sur de vouloir supprimer cet employé ? </p>
        <div class="flex justify-center">
            <div class="flex gap-3 w-full">
                <div class="w-1/2">
                    <Button type-name="button" text="Annuler" bg-color="bg-gray-600" bg-hover-color="bg-gray-500" @click="emit('confirm')" />

                </div>
                <div class="w-1/2">
                    <Button type-name="button" text="Confirmer" :loading="false" @click="handleDelete" />

                </div>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import { useCrudStore } from '@/stores/crudStore';
import Button from '@/components/Button.vue';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const { item: entrer } = storeToRefs(crudStore);
const emit = defineEmits(["confirm"])
const handleDelete = () => {
    crudStore.delete(entrer.value.id);
    emit("confirm")
}
</script>

<style lang="scss" scoped></style>