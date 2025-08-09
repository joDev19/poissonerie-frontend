<script setup>
import App from '@/components/Layout/App.vue';
import MiniTitle from '@/components/MiniTitle.vue';
import Button from '@/components/Button.vue';
import client from '@/client';
import { ref, } from 'vue';
import { formatPrice } from '@/helper';
const stats = ref({})
client.get('/api/vente/stats').then(res => stats.value = res.data)
const startDate = ref(null)
const endDate = ref(null)
const filtrer = () => {
    client.get(`/api/vente/stats?startDate=${startDate.value}?&endDate=${endDate.value}`).then(res => stats.value = res.data)
}
const resetFilter = () => {
    startDate.value = null
    endDate.value = null;
    filtrer()
}
</script>
<template>
    <App>
        <div class="p-5 w-full lg:mx-auto">
            <div class="lg:flex lg:mb-3">
                <MiniTitle text="Statistique sur les ventes" />
            </div>
            <div>
                Filtrer les statistiques par période.
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div class="">
                        <label for="" class="label">Date de début</label>
                        <input type="date" class="input" v-model="startDate">
                    </div>
                    <div class="">
                        <label for="" class="label">Date de fin</label>
                        <input type="date" class="input" v-model="endDate">
                    </div>
                    <div>
                        <label for="" class="label text-white">.</label>
                        <Button text="Filtrer" @click="filtrer" />
                    </div>
                </div>
                <br>
                <div v-if="startDate || endDate" class="w-40">
                    <Button text="Anuler les filtres" @click="resetFilter" />
                </div>
                <br>
            </div>
            <template v-if="stats.produitsVendus != undefined">
                <div>
                    <!-- <h2 class="text-lg">Liste des informations à afficher</h2>
                    <ul class="list-disc pl-5">
                        <li>Afficher un graphique en baton pour la liste des produits venus et de leur quantité sur une
                            période données</li>
                        <li>Afficher les 5 produits les plus vendu sur une période donnée</li>
                        <li>Afficher le montant total des ventes sur une période donnée</li>
                    </ul> -->
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
                        <div class="border p-5 shadow">
                            <p class="text-2xl">
                                {{ stats.nombre_total_vente }}
                            </p>
                            <p>Nombre de ventes</p>
                        </div>
                        <div class="border p-5 shadow">
                            <p class="text-2xl">
                                {{ stats.nombre_total_vente_gros }}
                            </p>
                            <p>Nombre de ventes en gros</p>
                        </div>
                        <div class="border p-5 shadow">
                            <p class="text-2xl">
                                {{ stats.nombre_total_vente_detail }}
                            </p>
                            <p>Nombre de ventes en détail</p>
                        </div>
                        <div class="border p-5 shadow">
                            <p class="text-2xl">
                                {{ stats.nombre_total_vente_payer }}
                            </p>
                            <p>Nombre de ventes payées</p>
                        </div>
                        <div class="border p-5 shadow">
                            <p class="text-2xl">
                                {{ stats.nombre_total_vente_impayer }}
                            </p>
                            <p>Nombre de ventes impayées</p>
                        </div>
                        <div class="border p-5 shadow">
                            <p class="text-2xl">
                                {{ stats.nombre_total_vente_au_comptant }}
                            </p>
                            <p>Nombre de ventes au comptant</p>
                        </div>
                        <div class="border p-5 shadow">
                            <p class="text-2xl">
                                {{ stats.nombre_total_vente_a_terme }}
                            </p>
                            <p>Nombre de ventes à terme</p>
                        </div>
                        <div class="border p-5 shadow">
                            <p class="text-2xl">
                                {{ formatPrice(stats.total_amount_ventes) }}
                            </p>
                            <p>Montant total des ventes</p>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class=" text-xl">Différents produits vendu en détail</p>
                        <table class="table-class">
                            <thead class="border-b-2 w-full">
                                <tr>
                                    <th class="td-start-table">
                                        Nom
                                    </th>
                                    <th class="td-middle-table">
                                        <div class="flex gap-1">
                                            Marque
                                        </div>
                                    </th>
                                    <th class="td-middle-table">
                                        <div class="flex gap-1">
                                            Quantité vendu
                                        </div>
                                    </th>
                                    <th class="td-end-table">
                                        <div class="flex gap-1">
                                            Prix des ventes
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="row in stats.produitsVendus.detail" :key="row.product_name">
                                    <td class="td-start-table">
                                        {{ row.product_name }}
                                    </td>
                                    <td class="td-middle-table">
                                        {{ row.product_marque_name }}
                                    </td>
                                    <td class="td-middle-table">
                                        {{ row.sum_kg }} kg
                                    </td>
                                    <td class="td-end-table">
                                        {{ formatPrice(row.sum_price) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p class=" text-xl">Différents produits vendu en gros</p>
                        <table class="table-class">
                            <thead class="border-b-2 w-full">
                                <tr>
                                    <th class="td-start-table">
                                        Nom
                                    </th>
                                    <th class="td-middle-table">
                                        <div class="flex gap-1">
                                            Marque
                                        </div>
                                    </th>
                                    <th class="td-middle-table">
                                        <div class="flex gap-1">
                                            Quantité par carton
                                        </div>
                                    </th>
                                    <th class="td-middle-table">
                                        <div class="flex gap-1">
                                            Nombre de carton
                                        </div>
                                    </th>
                                    <th class="td-end-table">
                                        <div class="flex gap-1">
                                            Prix des ventes
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="row in stats.produitsVendus.gros" :key="row.product_name">
                                    <td class="td-start-table">
                                        {{ row.product_name }}
                                    </td>
                                    <td class="td-middle-table">
                                        {{ row.product_marque_name }}
                                    </td>
                                    <td class="td-middle-table">
                                        {{ row.product_quantity_per_box }}
                                    </td>
                                    <td class="td-middle-table">
                                        {{ row.selled_box }}
                                    </td>
                                    <td class="td-end-table">
                                        {{ formatPrice(row.sum_price) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template v-else>
            </template>
        </div>

    </App>
</template>



<style lang="scss" scoped></style>