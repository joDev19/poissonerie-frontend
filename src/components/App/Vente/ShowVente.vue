<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white  rounded-lg space-y-2 w-full sm:w-3/5">
        <!-- <div v-if="vente?.id" class="w-full h-full">

            <ModalLoader :active="true"></ModalLoader>
        </div> -->
        <template v-if="useLoaderStore().active">
            <ModalLoader :active="true"></ModalLoader>
        </template>
        <template v-else>
            <div class="rounded-lg p-4">
                <p class="flex justify-between font-bold"> <span>Informations sur cette vente</span> <span
                        v-if="vente?.is_paid"
                        class="bg-green-200 text-green-900 py-1 px-2 text-sm rounded-full">payé</span>
                    <span v-else class="bg-gray-200 text-gray-900 py-1 px-2 text-sm rounded-full">impayé</span>
                </p>
                <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Produit(s)</p>
                    <p class="text-sm sm:w-3/5">
                    <div v-for="selled_product in vente?.selled_products" :key="selled_product.id"
                        class="md:flex md:flex-row">
                        <div class="font-bold">
                            {{ selled_product.product.name }} &nbsp;
                        </div>
                        <div>
                            {{ selled_product.quantity }}&nbsp;
                            <template v-if="selled_product.product?.category == 'kilo_ou_carton'">
                                <span v-show="selled_product.type_achat == 'detail'">kg</span>
                                <span v-show="selled_product.type_achat == 'gros'">carton
                                    <span v-show="selled_product.quanity > 1">s</span> de {{
                                    selled_product.quantity_per_box
                                    }} kg
                                    ( 1 carton à {{ selled_product.sell_price }} )
                                </span>
                            </template> &nbsp; - &nbsp;
                            {{ formatPrice(selled_product.total_price) }} <strong>{{ selled_product.surplusSale == null
                                ? '' : `(vente en
                                surplus)`}}</strong>
                        </div>
                    </div>
                    </p>
                </div>

                <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Type de vente</p>
                    <p class="text-sm sm:w-3/5">{{ vente?.contains_gros ? "Gros" : "Détail" }} - {{ vente?.type }}
                    </p>
                </div>

                <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Prix de la vente</p>
                    <p class="text-sm sm:w-3/5">{{ formatPrice(vente.total_price) }} </p>
                </div>
                <template v-if="vente?.type == 'à terme'">
                    <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                        <p class="font-bold sm:w-2/5">Montant payé</p>
                        <p class="text-sm sm:w-3/5">{{ formatPrice(vente.amount_paid) }}</p>
                    </div>
                    <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                        <p class="font-bold sm:w-2/5">Montant restant</p>
                        <p class="text-sm sm:w-3/5">
                            {{ vente.amount_paid > 0 ? formatPrice(vente.total_price - vente.amount_paid) :
                            formatPrice(vente.total_price) }}
                        </p>
                    </div>
                </template>
                <div class="border-b  p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Effectué le</p>
                    <p class="text-sm sm:w-3/5">{{ formatDate(vente.created_at) }}</p>
                </div>
                <template v-if="showEncaisser">
                    <form class="bg-gray-100 rounded" @submit.prevent="encaisser">
                        <div class="p-2 my-2 sm:flex sm:items-center">
                            <p class="font-bold sm:w-2/5">Montant total à encaisser</p>
                            <p class="text-sm sm:w-3/5">
                                {{ vente.amount_paid > 0 ? formatPrice(vente.total_price - vente.amount_paid) :
                                formatPrice(vente.total_price) }}
                            </p>
                        </div>
                        <div class="p-2 my-2 sm:flex sm:items-center">
                            <p class="font-bold sm:w-2/5">Montant à encaisser</p>
                            <p class="text-sm sm:w-3/5">
                                <input type="number" v-model="vente.amount_paid_this_time"
                                    class="border p-1 rounded w-full outline-none"
                                    :class="(vente.amount_paid_this_time <= 0 || vente.amount_paid_this_time > (vente.total_price - vente.amount_paid)) || vente.amount_paid_this_time == null ? 'border-red-500' : 'border-green-500'"
                                    placeholder="Montant à encaisser" />
                            </p>
                        </div>
                        <div class="p-2 my-2 sm:flex sm:items-center sm:justify-start">
                            <button type="submit"
                                class="bg-blue-400 p-1 rounded text-white font-bold flex gap-1 items-center justify-center">Encaisser</button>
                        </div>
                    </form>
                </template>
                <div class="rounded p-2 my-2 grid grid-cols-2 gap-2">
                    <button class="bg-blue-400 p-1 rounded text-white font-bold flex gap-1 items-center justify-center"
                        @click.prevent="seeInvoice">Voir
                        la facture
                        <FileMinus />
                    </button>
                    <template v-if="!vente.is_paid">
                        <button v-if="!showEncaisser"
                            class="bg-blue-400 p-1 rounded text-white font-bold flex gap-1 items-center justify-center"
                            @click.prevent="showEncaisserForm">Encaisser
                            <BadgeDollarSign />
                        </button>
                        <button v-else
                            class="bg-blue-400 p-1 rounded text-white font-bold flex gap-1 items-center justify-center"
                            @click.prevent="showEncaisserForm">Anuler encaissement

                            <XCircle />
                        </button>
                    </template>
                </div>
            </div>
            <div class="flex justify-center">
                <div class="float-end w-1/3">
                    <Button type-name="button" text="OK" :loading="false" @click="emits('confirm')" />
                </div>
            </div>
        </template>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import Button from '@/components/Button.vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
import ModalLoader from '@/components/ModalLoader.vue';
import { FileMinus, BadgeDollarSign, XCircle } from 'lucide-vue-next';
import { onUnmounted, ref } from 'vue';
import { useLoaderStore } from '@/stores/Loader';
import { formatDate, formatPrice } from '@/helper';
import client from '@/client';
import Swal from 'sweetalert2';
const crudStore = useCrudStore()

const emits = defineEmits(['confirm'])
const { item: vente, } = storeToRefs(crudStore)
const showEncaisser = ref(false)
const seeInvoice = () => {
    // window.open(`http://localhost:8000/${vente.value.invoice}`, '_blank')
    window.open(`${import.meta.env.VITE_BACKEND_BASE_URL}/${vente.value.invoice}`, '_blank')
}
const showEncaisserForm = () => {
    showEncaisser.value = !showEncaisser.value
}
const encaisser = () => {
    console.log(`call api /encaisser id-vente=${vente.value.id} - montant=${vente.value.amount_paid_this_time}`)
    client.put(`/api/sells/encaisser/${vente.value.id}`, {
        amount_paid_this_time: vente.value.amount_paid_this_time
    }).then((response) => {
        Swal.fire({
            title: 'Paiement effectué',
            text: `Montant de ${vente.value.amount_paid_this_time} FCFA a été encaisser`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            crudStore.show(vente.value.id, true)
            showEncaisser.value = false
            vente.value.amount_paid_this_time = null
        })
    })
}
onUnmounted(() => {
    vente.value = {}
})
</script>

<style lang="css" scoped></style>