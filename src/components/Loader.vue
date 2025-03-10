<template>
    <div v-if="loaderIsActive" class="absolute flex justify-center items-center h-screen w-full bg-black opacity-25">
        <div class="loader"></div>
    </div>
</template>

<script setup>
import { useLoaderStore } from '@/stores/Loader';
import { storeToRefs } from 'pinia';
const loaderStore = useLoaderStore()
const { active: loaderIsActive } = storeToRefs(loaderStore);
</script>

<style lang="css" scoped>
/* HTML: <div class="loader"></div> */
.loader {
    width: 50px;
    opacity: 1;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #ffffff;
    --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
}

@keyframes l3 {
    to {
        transform: rotate(1turn)
    }
}
</style>