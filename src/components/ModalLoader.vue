<template>
    <div v-if="active" class="flex justify-center items-center h-full w-full">
        <div class="loader"></div>
    </div>
</template>

<script setup>
const props = defineProps(["active"])
</script>

<style lang="css" scoped>
/* HTML: <div class="loader"></div> */
.loader {
    width: 50px;
    opacity: 1;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #000000;
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