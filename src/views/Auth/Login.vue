<template>
    <div class="w-full h-screen flex items-center">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Connectez - vous
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="#" method="POST" @submit.prevent="handleSubmit">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input type="email" v-model="user.email" name="email" id="email" autocomplete="email"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div class="text-sm">
                                <!-- <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                     password?</a> -->
                            </div>
                        </div>
                        <div class="mt-2">
                            <input type="password" v-model="user.password" name="password" id="password"
                                autocomplete="current-password"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
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
import { ref } from 'vue';
const user = ref({
    email: 'ppapaollard@gmail.com',
    'password': 'password'
})
const buttonIsLoading = ref(false);
const handleSubmit = () => {
    buttonIsLoading.value = true;
    client.get('/sanctum/csrf-cookie').then(() => {
        client.post('api/login', user.value).then((res) => {
            // stocker le nom 
            // stocker un auth_is_auth a true
            // redireiger vers le dashboard
            //client.get("/api/user")
            router.push({ name: 'fournisseur' })
        }).finally(() => {
            buttonIsLoading.value = false;
        })
    })
}
</script>

<style lang="scss" scoped></style>