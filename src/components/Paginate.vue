<template>
    <div class="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <a v-if="paginate_data?.links?.prev" href="#" @click.prevent="loadData(paginate_data?.links?.prev)"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a v-if="paginate_data?.links?.next" href="#" @click.prevent="loadData(paginate_data?.links?.next)"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Affichage de
                    <span class="font-medium">{{ items.length }}</span>
                    à
                    <!-- <span class="font-medium">{{ paginate_data.per_page }}</span>  --> sur
                    <span class="font-medium">{{ paginate_data.total || paginate_data.meta?.total }}</span>
                    résultats
                </p>
            </div>
            <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a v-if="paginate_data?.prev_page_url" @click.prevent="loadData(paginate_data?.prev_page_url)"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Previous</span>
                        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd"
                                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a v-if="paginate_data?.links?.prev" @click.prevent="loadData(paginate_data?.links?.prev)"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Previous</span>
                        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd"
                                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <template v-if="Array.isArray(paginate_data?.meta?.links)">
                    <a v-for="(url_object, i) in paginate_data?.meta?.links.filter((p, i) => i != 0 && i != paginate_data?.meta?.links?.length - 1)"
                        :key="url_object?.url" @click.prevent="loadData(url_object?.url)" href="#" aria-current="page"
                        :class="url_object.active ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'">{{
                            url_object.label }}</a>
                    </template>
                    <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                    <template v-if="Array.isArray(paginate_data?.links)">
                        <a v-for="(url_object, i) in paginate_data?.links.filter((p, i) => i != 0 && i != paginate_data?.links?.length - 1)"
                            :key="url_object?.url" @click.prevent="loadData(url_object?.url)" href="#"
                            aria-current="page"
                            :class="url_object.active ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'">{{
                                url_object.label }}</a>
                    </template>
                    <!-- <span
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span> -->
                    <a v-if="paginate_data?.links?.next" href="#" @click.prevent="loadData(paginate_data?.links?.next)"
                        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Next</span>
                        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd"
                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a v-if="paginate_data?.next_page_url" href="#"
                        @click.prevent="loadData(paginate_data?.next_page_url)"
                        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Next</span>
                        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd"
                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCrudStore } from '@/stores/crudStore';
import { storeToRefs } from 'pinia';
const crudStore = useCrudStore()
const { paginate_data, items, url, filters } = storeToRefs(crudStore)
console.log(url.value)
const loadData = (temp_url) => {
    filters.value.page = temp_url.split('?page=')[1]
    crudStore.index().then(() => {
        console.log(url.value)
        url.value = url.value.split('?page')[0]
    })
}

</script>

<style lang="scss" scoped></style>