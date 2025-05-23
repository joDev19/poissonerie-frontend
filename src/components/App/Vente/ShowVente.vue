<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white  rounded-lg space-y-2 w-full sm:w-3/5">
        <!-- <div v-if="vente?.id" class="w-full h-full">

            <ModalLoader :active="true"></ModalLoader>
        </div> -->
        <div class="rounded-lg p-4">
            <p class="font-bold">Informations sur cette vente</p>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Produit(s)</p>
                <p class="text-sm sm:w-3/5">
                <div v-for="selled_product in vente?.selled_products" :key="selled_product.id" class="flex flex-row">
                    {{ selled_product.product.name }} -&nbsp;
                    {{ selled_product.quantity }}&nbsp;
                    <template v-if="selled_product.product?.category == 'kilo_ou_carton'">
                        <span v-show="selled_product.type_achat == 'detail'">kg</span>
                        <span v-show="selled_product.type_achat == 'gros'">carton
                            <span v-show="selled_product.quanity > 1">s</span>
                        </span>
                    </template> &nbsp; - &nbsp;
                    {{ formatPrice(selled_product.total_price) }}
                </div>
                </p>
            </div>

            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Type de vente</p>
                <p class="text-sm sm:w-3/5">{{vente?.selled_products.some(el => el.type_achat == "detail") ? "Détail" :
                    "Gros"}}</p>
            </div>

            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Prix de la vente</p>
                <p class="text-sm sm:w-3/5">{{ formatPrice(vente.total_price) }} </p>
            </div>
            <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                <p class="font-bold sm:w-2/5">Effectué le</p>
                <p class="text-sm sm:w-3/5">{{ formatDate(vente.created_at) }}</p>
            </div>
            <div class="rounded p-2 my-2 sm:flex sm:items-center">
                <button class="bg-blue-400 p-1 rounded text-white font-bold flex gap-1" @click.prevent="seeInvoice">Voir
                    la facture
                    <FileMinus />
                </button>
            </div>
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
import { FileMinus } from 'lucide-vue-next';
import { onUnmounted } from 'vue';
import { formatDate, formatPrice } from '@/helper';
const crudStore = useCrudStore()
const emits = defineEmits(['confirm'])
const { item: vente } = storeToRefs(crudStore)
const seeInvoice = () => {
    // window.open(`http://localhost:8000/${vente.value.invoice}`, '_blank')
    window.open(`https://heron-bright-shad.ngrok-free.app/${vente.value.invoice}`, '_blank')
}
onUnmounted(() => {
    vente.value = {}
})
</script>

<style lang="css" scoped></style>