<template>
    <div class="w-full h-screen flex fixed top-0 flex hidden lg:block lg:w-1/5 z-5" id="sideBar">
        <div class="w-5/6 sm:w-96 h-full bg-blue-600 lg:w-full">
            <div class="p-5 ">
                <!-- <img src="" alt="Logo"> -->
                <p class="text-xl text-white font-bold">Gérer mon stock</p>
            </div>
            <div class="p-5 min-h-6/8">
                <ul>
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-700"
                            :to="{ name: 'marque' }" active-class="bg-blue-700">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/categorie.png" class="w-10" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Gérer les catégories</p>
                        </RouterLink>
                    </li>
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-700"
                            :to="{ name: 'fournisseur' }" active-class="bg-blue-700">
                            <img src="../../../public/icons/fournisseur.png" class="w-10" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Gérer les fournisseurs</p>
                        </RouterLink>
                    </li>
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-700"
                            :to="{ name: 'product' }" active-class="bg-blue-700">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/product.png" class="w-10" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Gérer les produits</p>
                        </RouterLink>
                    </li>
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-700"
                            :to="{ name: 'entrer' }" active-class="bg-blue-700">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/approvisionnement.png" class="w-10" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Gérer les entrés</p>
                        </RouterLink>
                    </li>
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-700"
                            :to="{ name: 'vente' }" active-class="bg-blue-700">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/sell.png" class="w-10" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Gérer les ventes</p>
                        </RouterLink>
                    </li>


                </ul>
            </div>
            <div class="p-5 min-h-1/8 relative top-1/3 w-full">
                <div class="flex items-center justify-start gap-3 p-2 rounded-lg bg-purple-700">
                    <i class="fa-solid fa-gear w-1/8" style="color:#fff;"></i>
                    <p class="w-1/8 text-white text-lg font-semibold">Setting</p>
                </div>
            </div>
        </div>
        <div class="w-1/6 sm:w-full h-full flex justify-start bg-black opacity-65 lg:hidden" id="partCloseSide">
            <div class="p-1  opacity-100 rounded-full w-10 h-10 mt-3 flex justify-center items-center"
                id="closeSideBar">
                <i class="fa-solid fa-xmark fa-xl" style="color:#fff;"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';


</script>

<style lang="scss" scoped></style>