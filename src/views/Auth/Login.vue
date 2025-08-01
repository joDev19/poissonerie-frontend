<template>
    <div class="w-full h-screen flex items-center text-lg">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <p class="mx-auto text-5xl font-bold text-blue-500">StockFish</p>
                <!-- <img class="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> -->
                <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Connectez - vous
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="#" method="POST" @submit.prevent="handleSubmit">
                    <div>
                        <label for="email" class="block font-medium text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input type="email" v-model="user.email" name="email" id="email" autocomplete="email"
                                class="input">
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block font-medium text-gray-900">Password</label>
                            <div class="text-sm">
                                <!-- <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                     password?</a> -->
                            </div>
                        </div>
                        <div class="mt-2">
                            <input type="password" v-model="user.password" name="password" id="password"
                                autocomplete="current-password" class="input">
                        </div>
                    </div>

                    <div>
                        <Button typeName="submit" text="Se connecter" :loading="buttonIsLoading"></Button>
                    </div>
                </form>

                <!-- <p class="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?
                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free
                        trial</a>
                </p> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import client from '@/client';
import Button from '@/components/Button.vue';
import router from '@/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ref } from 'vue';
const user = ref({
    email: 'ppapadollard@gmail.com',
    'password': 'password'
})

const buttonIsLoading = ref(false);
const handleSubmit = () => {
    buttonIsLoading.value = true;
    client.post('api/login', user.value).then((res) => {
        // récupérer le token
        const token = res.data.token
        Cookies.set('token', token, { expires: 7 })
        client.get('api/user',).then(response => {
            // stocker le nom 
            Cookies.set('poissonerie_auth_name', response.data.name, { expires: 7 })
            // stocker un auth_is_connected a true
            Cookies.set('auth_is_connected', true, { expires: 7 })
            Cookies.set("auth_user_role", response.data.role, { expires: 7 })
            // redireiger vers le dashboard
            //client.get("/api/user")
            router.push({ name: 'fournisseur' })
        })
    }).catch((err) => {
        alert("err.response.data")
    })
        .finally(() => {
            buttonIsLoading.value = false;
        })
}
</script>

<style lang="scss" scoped></style>