<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white border  rounded-lg space-y-2 w-full sm:w-2/5">
        <h1 class="text-xl">
            Enregistrer un produit
        </h1>
        <div>
            <form action="">
                <div class="lg:flex lg:gap-3">
                    <div class="w-full">
                        <label for="nom" class="label">Nom</label>
                        <input type="text" v-model="produit.name" class="input" id="nom">
                    </div>
                    <div class="w-full">
                        <label for="nom" class="label">Marque</label>
                        <select v-model="produit.marque_id" class="input" id="nom">
                            <option v-for="marque in createData.marques" :value="marque.id">{{ marque.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="lg:flex">
                    <div class="w-full">
                        <label for="price" class="label">Prix du kilo</label>
                        <input type="number" step="0.10" v-model="produit.price_kilo" class="input" id="price">
                    </div>
                </div>
                <div class="lg:flex">
                    <div class="w-full">
                        <label for="price" class="label">Prix du carton</label>
                        <input type="number" step="0.10" v-model="produit.price_carton" class="input" id="price">
                    </div>
                </div>
            </form>
        </div>
        <div class="flex justify-center">
            <div class="float-end w-full">
                <Button v-if="!isUpdate" type-name="button" text="Enregistrer" :loading="false" @click="createMarque" />
                <Button v-else type-name="button" text="Modifier" :loading="false" @click="updateMarque" />
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
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const { item: produit, createData } = storeToRefs(crudStore)
const emits = defineEmits(["confirm"])
const isUpdate = ref(false)
if (produit.value.name) {
    isUpdate.value = true
}
onBeforeMount(() => {
    crudStore.create();
})
const createMarque = () => {
    crudStore.store();
    emits("confirm")
}
const updateMarque = () => {
    crudStore.update({ name: produit.value.name, marque_id: produit.value.marque_id, price_kilo: produit.value.price_kilo, price_carton: produit.value.price_carton });
    emits("confirm")
}
onUnmounted(() => {
    produit.value = {}
    if (isUpdate.value)
        crudStore.index();
})

</script>

<style lang="scss" scoped></style>