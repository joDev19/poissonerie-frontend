<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white  rounded-lg space-y-2 w-full sm:w-3/5">
        <div v-if="vente.id == undefined && vente.product?.marque.name == undefined" class="w-full h-full">

            <ModalLoader :active="true"></ModalLoader>
        </div>
        <div v-else class="rounded-lg p-4">
            <p class="font-bold">Informations sur cette vente</p>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Marque</p>
                <p class="text-sm sm:w-3/5">{{ vente.product.marque.name }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Produit</p>
                <p class="text-sm sm:w-3/5">{{ vente.product.name }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Prix du kilo</p>
                <p class="text-sm sm:w-3/5">{{ Intl.NumberFormat('fr-FR').format(vente.product.price_kilo) }} fcfa</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Prix du carton</p>
                <p class="text-sm sm:w-3/5">{{ Intl.NumberFormat('fr-FR').format(vente.product.price_carton) }} fcfa</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Type de vente</p>
                <p class="text-sm sm:w-3/5">{{ vente.type == "detail" ? "Détail" : "Gros" }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Quantité</p>
                <p class="text-sm sm:w-3/5">{{ vente.quantity }} <span v-show="vente.type == 'detail'">kg</span><span
                        v-show="vente.type == 'gros'">carton<span v-show="vente.quanity > 1">s</span> </span> </p>
            </div>


            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Prix de la vente</p>
                <p class="text-sm sm:w-3/5">{{ Intl.NumberFormat('fr-FR').format(vente.total_price) }} fcfa</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Effectué le</p>
                <p class="text-sm sm:w-3/5">{{ formatDate(vente.created_at) }}</p>
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
import { formatDate } from '@/helper';
const crudStore = useCrudStore()
const emits = defineEmits(['confirm'])
const { item: vente } = storeToRefs(crudStore)
onUnmounted(() => {
    vente.value = {}
})
</script>

<style lang="css" scoped></style>