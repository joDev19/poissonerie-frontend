<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white  rounded-lg space-y-2 w-full sm:w-3/5">
        <div class="rounded-lg p-4">
            <p class="font-bold">Informations sur ce produit</p>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Nom</p>
                <p class="sm:w-3/5">{{ produit.name }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Category</p>
                <p class="sm:w-3/5"><span v-if="produit.category == 'unite'">Produit à vente unitaire</span><span
                        v-else>Produit à vendre en kg ou en carton</span></p>
            </div>
            <div v-if="produit.category == 'kilo_ou_carton'" class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Prix du kilo</p>
                <p class="sm:w-3/5">{{ produit.price_kilo }} xof</p>
            </div>
            <div v-if="produit.category == 'kilo_ou_carton'" class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Prix du carton</p>
                <p class="sm:w-3/5">{{ produit.price_carton }} xof</p>
            </div>
            <div v-if="produit.category == 'unite'" class=" border-b p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Prix unitaire</p>
                <p class="sm:w-3/5">{{ produit.price_unit }} xof</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Quantité disponible</p>
                <p class="sm:w-3/5">
                    <span v-if="produit.category == 'unite'">
                        {{ produit.quantity.unit }} unités
                    </span>
                    <span v-else>
                        {{ produit.quantity.kg }} kg | {{ produit.quantity.box }} cartons(s)
                    </span>
                </p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Marque</p>
                <p class="sm:w-3/5">{{ produit.marque.name }}</p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Date de création</p>
                <p class="sm:w-3/5">{{ formatDate(produit.created_at) }}</p>
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
import { formatDate } from '@/helper';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const { item: produit } = storeToRefs(crudStore)
const emits = defineEmits(["confirm"])

onUnmounted(() => {
    produit.value = {}
})
</script>

<style lang="css" scoped></style>