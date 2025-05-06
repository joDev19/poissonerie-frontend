<template>
    <div class="sm:w-full">
        <p class=" text-2xl">{{ text }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped></style>