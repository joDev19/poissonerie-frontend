<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white border  rounded-lg w-full sm:w-3/5 lg:w-96">

        <div class="">
            <h1 class="text-xl mb-5">
                Quel est le type d'achat
            </h1>
            <div>
                <form action="" @submit.prevent="handleSubmit">
                    <div class="lg:flex lg:gap-3">
                        <div class="w-full lg:mx-auto">
                            <!-- <p class="label">Type de vente</p> -->
                            <div class="flex justify-around">
                                <div class="flex gap-1">
                                    <input type="radio" id="detail" value="detail" v-model="vente.type" name="type"><label for="detail">Vente
                                        en détail</label>
                                </div>
                                <div class="flex gap-1">
                                    <input type="radio" id="gros" value="gros" v-model="vente.type" name="type"><label for="gros">Vente
                                        en gros</label>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="h-4"></div>
                    <div class="flex justify-center">
                        <div class="float-end w-full">
                            <Button type-name="submit" text="Suivant" :loading="false" />
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
import { storeToRefs } from 'pinia';
import { useCrudStore } from '@/stores/crudStore';
const crudStore = useCrudStore()
const emits = defineEmits(["confirm"])
const { item: vente } = storeToRefs(crudStore)
const handleSubmit = () => {
    if (vente.value.type) {
        emits("confirm")
    } else {
        alert('veuillez choisir le type de vente a enregistrer')
    }
}
</script>

<style lang="scss" scoped></style>