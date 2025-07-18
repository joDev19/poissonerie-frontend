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
                            <option v-for="marque in createData?.marques" :value="marque.id">{{ marque.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="flex gap-5 my-2">
                    <div class="flex items-center p-1 gap-1">
                        <input type="radio" v-model="produit.category" value="kilo_ou_carton" name="category"
                            id="kilo_ou_carton" class="input-checkbox"> <label for="kilo_ou_carton">À vendre au kilo ou
                            carton</label>
                    </div>
                    <div class="flex items-center p-1 gap-1">
                        <input type="radio" v-model="produit.category" value="unite" name="category" id="unite"
                            class="input-checkbox"> <label for="unite">À
                            vendre par unité</label>
                    </div>
                </div>
                <template v-if="produit.category == 'kilo_ou_carton'">
                    <div class="lg:flex gap-3">
                        <div class="w-full">
                            <label for="price_kilo_min" class="label">Prix minimum du kilo</label>
                            <input type="number" step="0.10" v-model="produit.price_kilo_min" class="input"
                                id="price_kilo_min">
                        </div>
                        <div class="w-full">
                            <label for="price_kilo_max" class="label">Prix maximum du kilo</label>
                            <input type="number" step="0.10" v-model="produit.price_kilo_max" class="input"
                                id="price_kilo_max">
                        </div>
                    </div>
                    <div class="lg:flex gap-3">
                        <div class="w-full">
                            <label for="price_box_min" class="label">Prix minimum du carton</label>
                            <input type="number" step="0.10" v-model="produit.price_carton_min" class="input"
                                id="price_box_min">
                        </div>
                        <div class="w-full">
                            <label for="price_box_max" class="label">Prix maximum du carton</label>
                            <input type="number" step="0.10" v-model="produit.price_carton_max" class="input"
                                id="price_box_max">
                        </div>
                    </div>
                </template>
                <template v-if="produit.category == 'unite'">
                    <div class="lg:flex gap-3">
                        <div class="w-full">
                            <label for="price_unit_min" class="label">Prix unitaire minimum</label>
                            <input type="number" step="0.10" v-model="produit.price_unit_min" class="input"
                                id="price_unit_min">
                        </div>
                        <div class="w-full">
                            <label for="price_unit_max" class="label">Prix unitaire maximum</label>
                            <input type="number" step="0.10" v-model="produit.price_unit_max" class="input"
                                id="price_unit_max">
                        </div>
                    </div>
                </template>
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
import { onBeforeMount, onUnmounted, ref, watch } from 'vue';
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
    console.log(produit.value);
    crudStore.store();
    emits("confirm")
}
const updateMarque = () => {
    crudStore.update({
        name: produit.value.name,
        marque_id: produit.value.marque_id,
        price_kilo_min: produit.value.price_kilo_min,
        price_kilo_max: produit.value.price_kilo_max,
        price_carton_min: produit.value.price_carton_min,
        price_carton_max: produit.value.price_carton_max,
        price_unit_min: produit.value.price_unit_min,
        price_unit_max: produit.value.price_unit_max,
        category: produit.value.category,
    });
    emits("confirm")
}
onUnmounted(() => {
    produit.value = {}
    if (isUpdate.value)
        crudStore.index();
})
watch(() => produit.value.category, (newCategory) => {
    if (isUpdate.value) {
        //
    } else {
        if (newCategory == "unite") {
            delete produit.value.price_carton
            delete produit.value.price_kilo
        } else {
            delete produit.value.price_unit
        }

    }
})

</script>

<style lang="scss" scoped></style>