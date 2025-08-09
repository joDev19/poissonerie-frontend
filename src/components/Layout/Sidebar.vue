<template>
    <div class="w-full h-screen flex fixed top-0 flex hidden lg:block lg:w-1/5 z-5 oversize:auto" id="sideBar">
        <div class="w-5/6 sm:w-96 h-full bg-blue-700 lg:w-full overflow-y-auto">
            <div class="py-5 ps-5 bg-blue-700">
                <!-- <img src="" alt="Logo"> -->
                <p class="text-5xl text-white font-bold">StockFish</p>
            </div>


            <div class="p-5 h-full">
                <ul class="">
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 py-4 px-2 rounded-lg hover:bg-blue-800"
                            :to="{ name: 'dashboard' }" active-class="bg-blue-800">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <LayoutDashboard class="w-10 px-2 text-white" />
                            <p class="w-7/8 text-white text-lg font-semibold">Tableau de bord</p>
                        </RouterLink>
                    </li>
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 py-4 px-2 rounded-lg hover:bg-blue-800"
                            :to="{ name: 'marque' }" active-class="bg-blue-800">
                            <img src="../../../public/icons/categorie.png" class="w-10 px-2" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Gérer les marques</p>
                        </RouterLink>
                    </li>
                    <li v-if="checkIfUserIsAdmin()" class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 py-4 px-2 rounded-lg hover:bg-blue-800"
                            :to="{ name: 'fournisseur' }" active-class="bg-blue-800">
                            <img src="../../../public/icons/fournisseur.png" class="w-10 px-2" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Gérer les fournisseurs</p>
                        </RouterLink>
                    </li>
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 py-4 px-2 rounded-lg hover:bg-blue-800"
                            :to="{ name: 'product' }" active-class="bg-blue-800">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/product.png" class="w-10 px-2" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Gérer les produits</p>
                        </RouterLink>
                    </li>
                    <li v-if="checkIfUserIsAdmin()" class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 py-4 px-2 rounded-lg hover:bg-blue-800"
                            :to="{ name: 'entrer' }" active-class="bg-blue-800">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/approvisionnement.png" class="w-10 px-2" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Suivis des entrés</p>
                        </RouterLink>
                    </li>
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 py-4 px-2 rounded-lg hover:bg-blue-800"
                            :to="{ name: 'vente' }" active-class="bg-blue-800">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/sell.png" class="w-10 px-2" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Suivis des ventes</p>
                        </RouterLink>
                    </li>
                    <li v-if="checkIfUserIsAdmin()" class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 py-4 px-2 rounded-lg hover:bg-blue-800"
                            :to="{ name: 'stat_vente' }" active-class="bg-blue-800">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/sell.png" class="w-10 px-2" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Statistisque sur les ventes</p>
                        </RouterLink>
                    </li>
                    <li v-if="checkIfUserIsAdmin()" class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 py-4 px-2 rounded-lg hover:bg-blue-800"
                            :to="{ name: 'employee' }" active-class="bg-blue-800">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/group.png" class="w-10 px-2" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Gérer les employés</p>
                        </RouterLink>
                    </li>
                    <li class="my-1">
                        <RouterLink class="flex items-center justify-start gap-3 py-4 px-2 rounded-lg hover:bg-blue-800"
                            :to="{ name: 'profile' }" active-class="bg-blue-800">
                            <!-- <i class="fa-solid fa-arrow-left w-1/8" style="color:#fff;"></i> -->
                            <img src="../../../public/icons/user.png" class="w-10 px-2" alt="">
                            <p class="w-7/8 text-white text-lg font-semibold">Profile</p>
                        </RouterLink>
                    </li>


                </ul>
            </div>
            <div class="p-5 relative top-1/3 w-full">
                <div class="flex items-center justify-start gap-3 p-2 rounded-lg bg-blue-700">
                    <i class="fa-solid fa-gear w-1/8" style="color:#fff;"></i>
                    <p class="w-1/8 text-white text-lg font-semibold">Setting</p>
                </div>
            </div>
        </div>
        <div class="w-1/6 sm:w-full h-full flex justify-start bg-black opacity-65 lg:hidden" id="partCloseSide">
            <div class="p-1  opacity-100 rounded-full w-10 px-2 h-10 mt-3 flex justify-center items-center"
                id="closeSideBar">
                <i class="fa-solid fa-xmark fa-xl" style="color:#fff;"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { checkIfUserIsAdmin } from '@/helper';
import { LayoutDashboard } from 'lucide-vue-next';
</script>

<style lang="scss" scoped></style>