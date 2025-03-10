<template>
    <button :type="typeName"
        class="flex w-full justify-center rounded-md px-3 py-1.5 font-semibold text-white shadow-xs" :class="`${bgColor} hover:${bgHoverColor}`" >
        <template v-if="loading">
            <Spinner />
        </template>
        <template v-else>
            {{ text }}
        </template>
</button>
</template>

<script setup >
import Spinner from './Spinner.vue';
const props = defineProps({
    typeName: String,
    loading: Boolean,
    text: String,
    bgColor: {
        type: String,
        default: 'bg-blue-600',
    },
    bgHoverColor: {
        type: String,
        default: 'bg-blue-500',
    }
})
</script>

<style lang="css" scoped></style>