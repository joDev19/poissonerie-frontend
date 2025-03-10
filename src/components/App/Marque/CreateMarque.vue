<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white border  rounded-lg space-y-2 w-full sm:w-2/5">
        <h1 class="text-xl">
            Enregistrer une marque
        </h1>
        <div>
            <form action="">
                <div class="lg:flex lg:gap-3">
                    <div class="w-full">
                        <label for="nom" class="label">Nom</label>
                        <input type="text" v-model="marque.name" class="input" id="nom">
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
import { onUnmounted, ref } from 'vue';
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const { item: marque } = storeToRefs(crudStore)
const emits = defineEmits(["confirm"])
const isUpdate = ref(false)
if (marque.value.name) {
    isUpdate.value = true
}

const createMarque = () => {
    crudStore.store();
    emits("confirm")
}
const updateMarque = () => {
    crudStore.update({ name: marque.value.name });
    emits("confirm")
}
onUnmounted(() => {
    marque.value = {}
    if (isUpdate.value)
        crudStore.index();
})

</script>

<style lang="scss" scoped></style>