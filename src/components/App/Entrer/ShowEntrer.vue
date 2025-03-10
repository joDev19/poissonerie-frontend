<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white  rounded-lg space-y-2 w-full sm:w-3/5">
        <div v-if="entrer.fournisseur == undefined" class="w-full h-full">

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
                <p class="text-sm sm:w-3/5">J{{ entrer.product.marque.name }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Quantité de carton</p>
                <p class="text-sm sm:w-3/5">{{ entrer.box_quantity }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Quantité de kilo</p>
                <p class="text-sm sm:w-3/5">{{ entrer.kilo_quantity }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Prix</p>
                <p class="text-sm sm:w-3/5">{{ entrer.price }} fcfa</p>
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
const crudStore = useCrudStore()
const emits = defineEmits(['confirm'])
const { item: entrer } = storeToRefs(crudStore)
onUnmounted(() => {
    entrer.value = {}
})
</script>

<style lang="css" scoped></style>