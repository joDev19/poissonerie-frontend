<template>
    <VueFinalModal class="flex justify-center items-center p-5"
        content-class="flex flex-col p-4 bg-white  rounded-lg space-y-2 w-full sm:w-3/5">
        <div>
            <p class="font-bold text-lg mb-4">Détails de la quantité</p>
            <template v-if="quantites.length ==0">
                <p>Pas disponible</p>
            </template>
            <template v-else>
                <div v-if="category === 'kilo_ou_carton'" class="space-y-2">
                    <div v-for="q in quantites" :key="q.kilo_once_quantity" class="mb-4 border-b pb-4">
                        <p class="font-bold text-blue-500">Carton de {{ q.kilo_once_quantity }} kilo</p>
                        <br>
                        <div class="flex justify-start gap-5   p-2">
                            <span class="font-bold">Quantité en kilogrammes :</span>
                            <span>{{ q.total_kilo }} kg</span>
                        </div>
                        <div class="flex justify-start gap-5  p-2">
                            <span class="font-bold">Quantité en cartons :</span>
                            <span>{{ q.total_box }} cartons</span>
                        </div>
                    </div>
                    Total en Kilogrammes : <strong>{{
                        quantites.reduce((acc, q) => acc + q.total_kilo, 0)
                    }} kg</strong>
                </div>
                <div v-else class="space-y-2">
                    <div class="flex justify-between border-b pb-2">
                        <span class="font-bold">Quantité en unités :</span>
                        <span>{{ quantity.unit }} unités</span>
                    </div>
                </div>
            </template>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
const props = defineProps(['quantites', 'category'])
</script>

<style lang="scss" scoped></style>