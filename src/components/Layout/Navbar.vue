<template>
    <div
        class="flex fixed w-full lg:w-4/5 lg:right-0 lg:float-right border-gray-200 h-20 items-center border-b-2 z-2 bg-white">
        <div class="border-gray-200 border-r lg:hidden p-5 h-4/5 flex items-center justify-center w-1/6 sm:w-16"
            id="menuIcon">
            <i class="fa-solid fa-bars" style="color:#afb1af;"></i>
        </div>
        <div class="p-5 flex items-center gap-2 w-4/6 lg:w-80">
            <i class="fa-solid fa-search" style="color:#afb1af;"></i> <input type="text" placeholder="Search"
                class="border-0 focus:outline-none ">
        </div>
        <div class="p-3 flex justify-center gap-3 items-center sm:justify-end lg:justify-end w-1/6 sm:w-64 lg:w-full">
            <i class="fa-solid fa-bell lg:pr-3 lg:border-r-2" style="color:#afb1af;"></i>
            <i class="fa-solid fa-user border p-2 rounded-full" style="color:#afb1af;" id="userIcon"></i>
            <div class="flex flex-col gap-1">
                <span class="font-semibold hidden lg:block">{{ Cookies.get('poissonerie_auth_name') }}</span>
                <span class="text-sm hidden lg:block">{{ Cookies.get('auth_user_role') }}</span>
            </div>
            <span class="hidden lg:block">
                <i class="fa-solid fa-caret-down hover:cursor-pointer" style="color:#afb1af;" id="userIconDrop"></i>
            </span>
        </div>
        <div class="w-32 rounded-lg px-2 py-1 shadow-xl absolute top-14 right-3 bg-white border hidden z-2 hover:cursor-pointer"
            id="userSetting">
            <ul>
                <li class="p-1 hover:cursor-pointer">
                    <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
                </li>
                <li class="p-1 hover:cursor-pointer" @click="signOut">Déconnexion</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import client from '@/client';
import router from '@/router';
import { RouterLink } from 'vue-router';
import Cookies from 'js-cookie';

const signOut = () => {
    client.get("/api/logout").then(() => {
        Cookies.remove('poissonerie_auth_name')
        // stocker un auth_is_connected a true
        Cookies.remove('auth_is_connected')
        Cookies.remove('auth_user_role')
        router.push({ name: 'login' })
    });
}
</script>

<style lang="scss" scoped></style>