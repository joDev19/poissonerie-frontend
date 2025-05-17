<template>
    <App>
        <div class="container">
            <h1>Dashboard</h1>
            <p>Bienvenue sur votre tableau de bord {{ Cookies.get('poissonerie_auth_name') }}</p>
            <section>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="bg-white p-4 rounded shadow">
                        <h2 class="text-lg font-semibold">Nombre total de vente</h2>
                        <p>20</p>
                    </div>
                    <div class="bg-white p-4 rounded shadow">
                        <h2 class="text-lg font-semibold">Prix total des ventes</h2>
                        <p>1 200 000 FCFA</p>
                    </div>
                    <div class="bg-white p-4 rounded shadow">
                        <h2 class="text-lg font-semibold">Nombre total d'entrées</h2>
                        <p>100</p>
                    </div>
                    <div class="bg-white p-4 rounded shadow">
                        <h2 class="text-lg font-semibold">Prix total des entrés</h2>
                        <p>2 007 000 FCFA</p>
                    </div>
                    <div class="bg-white p-4 rounded shadow">
                        <h2 class="text-lg font-semibold">Nombre total de fournisseurs</h2>
                        <p>10</p>
                    </div>
                    <div class="bg-white p-4 rounded shadow">
                        <h2 class="text-lg font-semibold">Nombre total de produit</h2>
                        <p>30</p>
                    </div>

                </div>
            </section>
            <em>Liste des stats.... (à filtrer par date et générer des rapports)</em>
        </div>
    </App>
</template>

<script setup>
import App from '@/components/Layout/App.vue';
import Cookies from 'js-cookie';
</script>

<style lang="scss" scoped>

</style>