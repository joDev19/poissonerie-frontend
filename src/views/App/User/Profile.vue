<template>
    <App>
        <div class="flex flex-col lg:flex-row gap-3">
            <div class="w-full lg:w-1/3">
                <p class="flex justify-around">Informations personnelles</p>
            </div>
            <div class="w-full lg:w-2/3 flex flex-col gap-5">
                <form v-if="isLoading == false" @submit.prevent="handleSubmit"
                    class="w-full flex flex-col gap-3 p-5 border border-gray-300 rounded">
                    <div class="flex justify-center lg:justify-start mx-auto w-full gap-5">
                        <div>
                            <img src="" alt="photo">
                        </div>
                        <div>
                            <label for="photo">Changer de photo de profile</label>
                            <input id="photo" type="file" class="hidden">
                            <p class="text-sm">JPG GIF or PNG 1 mb max</p>
                        </div>
                    </div>
                    <br>
                    <div>
                        <label class="mb-2" for="name">Nom et prénom</label>
                        <input type="text" id="name" class="input" v-model="user.name">
                    </div>
                    <div>
                        <label class="mb-2" for="email">Email</label>
                        <input type="text" id="email" class="input" v-model="user.email">
                    </div>
                    <div>
                        <label class="mb-2" for="role">Rôle</label>
                        <input type="text" id="role" class="input" v-model="user.role" disabled>
                    </div>
                    <div class="w-full sm:w-2/3  lg:w-1/3">
                        <Button text="Enregistrer" type-name="submit" />
                    </div>
                </form>
                <form @submit.prevent="changePassword"
                    class="w-full flex flex-col gap-3 p-5 border border-gray-300 rounded">

                    <div>
                        <label class="mb-2" for="oldPassword">Ancien mot de passe</label>
                        <input type="password" id="oldPassword" v-model="passwordForm.oldPassword" class="input">
                    </div>
                    <div>
                        <label class="mb-2" for="password">Nouveau mot de passe</label>
                        <input type="password" id="password" v-model="passwordForm.password" class="input">
                    </div>
                    <div>
                        <label class="mb-2" for="rePassword">Confirmer mot de passe</label>
                        <input type="password" id="rePassword" v-model="passwordForm.rePassword" class="input">
                    </div>

                    <div class="w-full sm:w-2/3  lg:w-1/3">
                        <Button text="Changer de mot de passe" type-name="submit" />
                    </div>
                </form>
            </div>
        </div>
    </App>
</template>

<script setup>
import App from '@/components/Layout/App.vue';
import Button from '@/components/Button.vue';
import client from '@/client';
import Cookies from 'js-cookie';
import { onMounted, ref } from 'vue';
const user = ref({
    name: "",
    email: "",
    role: ""
})
const passwordForm = ref({
    oldPassword: "",
    password: "",
    rePassword: ""

})
const errors = ref({})
import { useLoaderStore } from '@/stores/Loader';
import { storeToRefs } from 'pinia';
const loaderStore = useLoaderStore()
const { active: isLoading } = storeToRefs(loaderStore);
const loadData = () => {
    isLoading.value = true
    client.get('/api/user').then(response => {
        isLoading.value = false
        user.value = response.data
        Cookies.set('poissonerie_auth_name', user.value.name, { expires: 7 })
    })
}
onMounted(() => {
    loadData()
})
const handleSubmit = () => {
    client.put("/api/change-infos", { name: user.value.name, email: user.value.email }).then(res => loadData())
}
const changePassword = () => {
    client.post('/api/password-change', passwordForm.value).then(res => loadData())
}
</script>

<style lang="scss" scoped></style>