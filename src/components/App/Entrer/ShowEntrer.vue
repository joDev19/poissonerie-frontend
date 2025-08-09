<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white  rounded-lg space-y-2 w-full sm:w-3/5">
        <div v-if="useLoaderStore().active" class="w-full h-full">

            <ModalLoader :active="true"></ModalLoader>
        </div>
        <div v-else class="rounded-lg p-4">
            <p class="font-bold">Informations sur cette entré</p>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Fournisseur</p>
                <p class="text-sm sm:w-3/5">{{ entrer.fournisseur.name }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Produit</p>
                <p class="text-sm sm:w-3/5">{{ entrer.product.name }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Marque du produit</p>
                <p class="text-sm sm:w-3/5">{{ entrer.product.marque.name }}</p>
            </div>
            <template v-if="entrer.product.category == 'kilo_ou_carton'">
                <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Quantité de carton</p>
                    <p class="text-sm sm:w-3/5">{{ entrer.box_quantity }}</p>
                </div>
                <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Quantité de kilo par carton</p>
                    <p class="text-sm sm:w-3/5">{{ entrer.kilo_once_quantity }}</p>
                </div>
                <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Quantité de kilo total</p>
                    <p class="text-sm sm:w-3/5">{{ entrer.kilo_quantity }}</p>
                </div>
            </template>
            <template v-else>
                <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Quantité</p>
                    <p class="text-sm sm:w-3/5">{{ entrer.unit_quantity }}</p>
                </div>
            </template>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Prix</p>
                <p class="text-sm sm:w-3/5">{{ formatPrice(entrer.price) }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Effectué le</p>
                <p class="text-sm sm:w-3/5">{{ formatDate(entrer.created_at) }}</p>
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
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import ModalLoader from '@/components/ModalLoader.vue';
import { onUnmounted } from 'vue';
import { useLoaderStore } from '@/stores/Loader';
import { formatDate, formatPrice } from '@/helper';
const crudStore = useCrudStore()
const emits = defineEmits(['confirm'])
const { item: entrer } = storeToRefs(crudStore)
onUnmounted(() => {
    entrer.value = {}
})
</script>

<style lang="css" scoped></style>