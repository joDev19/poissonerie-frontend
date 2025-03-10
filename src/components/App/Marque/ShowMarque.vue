<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white  rounded-lg space-y-2 w-full sm:w-3/5">
        <div class="rounded-lg p-4">
            <p class="font-bold">Informations sur cette marque</p>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Nom</p>
                <p class="sm:w-3/5">{{ marque.name }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Date de création</p>
                <p class="sm:w-3/5">{{ marque.created_at }}</p>
            </div>
            <!-- <div class="border-b rounded p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">About</p>
                <p class="text-sm sm:w-3/5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolorem
                    accusantium sapiente dolore rerum? Debitis, nostrum cupiditate aliquid earum expedita quae
                    voluptatum delectus perferendis beatae. Dolorem eius libero tempore nam.</p>
            </div> -->
        </div>
        <div class="flex justify-center">
            <div class="float-end w-1/3">
                <Button type-name="button" text="OK" :loading="false" @click="emits('confirm')" />
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import Button from '@/components/Button.vue';
import { onUnmounted } from 'vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const {item: marque} = storeToRefs(crudStore)
const emits = defineEmits(["confirm"])

onUnmounted(() => {
    marque.value = {}
})
</script>

<style lang="css" scoped></style>