<template>
    <!-- <div class="lg:flex lg:gap-2 lg:items-stretch">
        <div class="lg:w-1/3">
            <p class="font-semibold">
                Filtrer par date
            </p>
            <input type="date" class="input"> à <input type="date" class="input">
        </div>
        <div class="lg:w-1/3">
            <p class="font-semibold">Filtrer par prix. De</p>
            <input type="number" class="input">
            à
            <input type="number" class="input">
        </div>
        <div class="lg:w-1/3">
            <p class="font-semibold">Filtrer par produit</p>
            <input type="text" class="input">
            <p class="font-semibold">Filtrer par marque</p>
            <input type="text" class="input">
        </div>
        <div class="lg:w-1/3">
            <p class="font-semibold">Filtrer par fournisseur</p>
            <input type="text" class="input">
        </div>

    </div>
    <div class="flex gap-3">
        <div class="w-24 mt-2"><Button type-name="button" text="Filtrer" :loading="false" /></div>
        <div class="w-24 mt-2"><Button type-name="button" text="Reset" :loading="false" /></div>
    </div> -->
</template>

<script setup>
import Button from '@/components/Button.vue';
import { useLoaderStore } from '@/stores/Loader';
const loaderStore = useLoaderStore()

</script>

<style lang="scss" scoped></style>