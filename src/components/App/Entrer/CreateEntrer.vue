<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white border  rounded-lg w-full sm:w-3/5">
        <div v-if="isGettingCreateData && createData.product == undefined" class="w-full h-full">

            <ModalLoader :active="isGettingCreateData"></ModalLoader>
        </div>
        <div v-else class="">
            <h1 class="text-xl">
                Enregistrer un achat:
            </h1>
            <div>
                <form action="" @submit.prevent="handleSubmit">
                    <div class="lg:flex lg:gap-3">
                        <div class="w-full lg:w-1/2">
                            <label for="date" class="label">Date</label>
                            <input type="date" name="date" v-model="entrer.date" class="input" id="date">
                        </div>
                        <div class="w-full lg:w-1/2">
                            <label for="produit" class="label">Produit</label>
                            <select name="produit" v-model="entrer.product_id" class="input" id="produit">
                                <option :value="null">Choisir le produit</option>
                                <option v-for="product in createData.products" :key="product.id" :value="product.id">
                                    {{ product.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="lg:flex lg:gap-3">
                        <div class="w-full">
                            <label for="quantite" class="label">Quantité en carton</label>
                            <input type="number" v-model="entrer.box_quantity" name="quantite" class="input"
                                id="quantite">
                        </div>
                        <div class="w-full">
                            <label for="quantite" class="label">Quantité en kilo</label>
                            <input type="number" step="0.01" v-model="entrer.kilo_quantity" name="quantite"
                                class="input" id="quantite">
                        </div>
                        <div class="w-full">
                            <label for="quantite" class="label">Prix</label>
                            <input type="number" step="0.01" name="quantite" v-model="entrer.price" class="input"
                                id="quantite">
                        </div>
                    </div>
                    <div class="w-full">
                        <label for="fournisseur" class="label">Fournisseur</label>
                        <select name="fournisseur" class="input" v-model="entrer.fournisseur_id" id="fournisseur">
                            <option v-for="fournisseur in createData.fournisseurs" :key="fournisseur.id"
                                :value="fournisseur.id">{{ fournisseur.name }}
                            </option>
                        </select>
                    </div>
                    <div class="w-full">
                        <label for="marque" class="label">Marque</label>
                        <select v-if="entrer.product_id" disabled name="marque" class="input" id="marque">
                            <option></option>
                            <option v-for="marque in createData.marques"
                                :selected="marque.id == createData.products.find(el => el.id == entrer.product_id).marque_id"
                                :key="marque.id" :value="marque.id">{{ marque.name }}
                            </option>
                        </select>
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
const { createData, item: entrer } = storeToRefs(crudStore)
const isGettingCreateData = ref(true);
crudStore.create().then(() => isGettingCreateData.value = false);
const isUpdate = ref(false)
const props = defineProps({
    entrerId: {
        type: Number,
        default: null,
        required: false
    }
})
if (props.entrerId) {
    crudStore.show(props.entrerId);
    isUpdate.value = true
    console.log("c'est un update", props)
} else {
    console.log("c'est un create")
    entrer.value.date = `${new Date().getFullYear()}-${reFormatDate(new Date().getMonth() + 1)}-${reFormatDate(new Date().getDate())}`
}

const handleSubmit = () => {
    if (isUpdate.value) {
        // update
        const { id, ...data } = entrer.value
        crudStore.update(data)

    } else {
        // create
        crudStore.store();

    }
    emits("confirm")
}
onUnmounted(() => {
    entrer.value = {}
})

</script>

<style lang="scss" scoped></style>