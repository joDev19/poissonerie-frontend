<template>
    <div
        class="flex fixed w-full lg:w-4/5 lg:right-0 lg:float-right border-gray-200 h-16 items-center border-b-2 z-2 bg-white">
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
            <span class="font-semibold hidden lg:block">Jordy GNANIH</span>
            <span class="hidden lg:block">
                <i class="fa-solid fa-caret-down" style="color:#afb1af;" id="userIconDrop"></i>
            </span>
        </div>
        <div class="w-32 rounded-lg px-2 py-1 shadow-xl absolute top-14 right-3 bg-white border hidden z-2"
            id="userSetting">
            <ul>
                <li class="p-1 text-sm">Your profile</li>
                <li class="p-1 text-sm">Sign out</li>
            </ul>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>