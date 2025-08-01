<script setup>
import App from '@/components/Layout/App.vue';
import MiniTitle from '@/components/MiniTitle.vue';
import Button from '@/components/Button.vue';
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
                        <input type="date" class="input">
                    </div>
                    <div class="">
                        <label for="" class="label">Date de fin</label>
                        <input type="date" class="input">
                    </div>
                    <div>
                        <label for="" class="label text-white">.</label>
                        <Button text="Filtrer" />
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-lg">Liste des informations à afficher</h2>
                <ul class="list-disc pl-5">
                    <li>Nombre total de vente</li>
                    <li>Liste des produits vendu respectivement avec les quantité vendus</li>
                    <li>Afficher un graphique en baton pour la liste des produits venus et de leur quantité sur une
                        période données</li>
                    <li>Afficher les 5 produits les plus vendu sur une période donnée</li>
                    <li>Afficher le montant total des ventes sur une période donnée</li>
                </ul>
            </div>
        </div>

    </App>
</template>



<style lang="scss" scoped>

</style>