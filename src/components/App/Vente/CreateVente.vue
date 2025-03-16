<template>
    <p class="text-xl font-bold">Formulaire de vente en {{ vente.type }}</p>
    <!-- {{ vente }} -->
    <form v-if="!loaderStore.active" class="space-y-3" @submit.prevent="handleSubmit">
        <div class="lg:flex lg:gap-3">
            <div class="w-full lg:w-1/2">
                <label for="date" class="label">Date</label>
                <input type="date" name="date" v-model="vente.date" class="input" id="date">
            </div>
            <div class="w-full lg:w-1/2">
                <label for="date" class="label">Date</label>
                <input type="time" name="date" v-model="hour" class="input" id="date">
            </div>
            <div class="w-full lg:w-1/2">
                <label for="produit" class="label">Produit</label>
                <select name="produit" v-model="vente.product_id" class="input" id="produit">
                    <option :value="0">Choisir le produit</option>
                    <option v-for="p in createData.products" :key="p.id" :value="p.id">{{ p.name }}</option>
                </select>
            </div>
        </div>

        <div class="lg:flex lg:gap-3">
            <div class="w-full">
                <label for="date" class="label">Quantité (en {{ vente.type == 'detail' ? 'kilo' : 'nombre de carton'
                    }})</label>
                <input type="number" step="0.10" name="date" v-model="vente.quantity" class="input" id="date">
            </div>
        </div>
        <div>
            <input type="checkbox" id="buyer" v-model="showBuyerInfos" class="w-10"><label for="buyer">Ajouter les
                informations de
                l'acheteur</label>
        </div>
        <div v-if="showBuyerInfos" class="lg:flex lg:gap-3">
            <div class="w-full lg:w-1/2">
                <label for="name" class="label">Nom & Prénom</label>
                <input type="text" name="name"  class="input" id="name">
            </div>
            <div class="w-full lg:w-1/2">
                <label for="email" class="label">Email</label>
                <input type="email" name="email" class="input" id="email">
            </div>
        </div>
        <div v-if="product?.id" class="min-h-52 w-full bg-white p-5 shadow-lg rounded-lg">
            <p class="text-blue-500 font-semibold">Information sur le produit</p>
            <div class="p-2">
                <table class="w-full lg:w-1/2">
                    <tr>
                        <td>Nom</td>
                        <td>{{ product.name }}</td>
                    </tr>
                    <tr>
                        <td>Marque</td>
                        <td>{{ product.marque.name }}</td>
                    </tr>
                    <tr>
                        <td>Prix du kilo</td>
                        <td>{{ product.price_kilo }} fcfa</td>
                    </tr>
                    <tr>
                        <td>Prix du carton</td>
                        <td>{{ product.price_carton }} fcfa</td>
                    </tr>
                </table>
            </div>
            <p class="text-blue-500 font-semibold">Information de la vente</p>
            <div class="p-2">
                <table class="w-full lg:w-1/2">
                    <tr>
                        <td>Type de l'achat</td>
                        <td> {{ vente.type == "detail" ? 'en détail' : 'en gros' }} </td>
                    </tr>
                    <tr>
                        <td>Quantité</td>
                        <td>{{ vente.quantity }} <span v-if="vente.type == 'detail'">kg</span><span
                                v-if="vente.type == 'gros'">carton<span v-show="vente.quantity > 1">s</span></span></td>
                    </tr>
                    <tr>
                        <td>Coût de la vente</td>
                        <td v-if="vente.quantity > 0 && vente.type == 'gros'"> {{ Intl.NumberFormat('fr-FR').format(Number(product.price_carton) *
                            Number(vente.quantity)) }} fcfa</td>
                        <td v-if="vente.quantity > 0 && vente.type =='detail'"> {{ Intl.NumberFormat('fr-FR').format(Number(product.price_kilo) *
                            Number(vente.quantity)) }} fcfa</td>
                        <td v-if="vente.quantity <= 0">_</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="lg:w-1/2 mx-auto">
            <Button :loading="false" type-name="submit" text="Enregistrer la vente"></Button>
        </div>
    </form>
</template>

<script setup>
import { useCrudStore } from '@/stores/crudStore';
import { useLoaderStore } from '@/stores/Loader';
import Button from '@/components/Button.vue';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useVenteStore } from '@/stores/VenteStore';
import { reFormatDate } from '@/helper';

const loaderStore = useLoaderStore()
const crudStore = useCrudStore()
const showBuyerInfos = ref(false)
const { item: vente, createData } = storeToRefs(crudStore);
crudStore.create().then(res => {
    loaderStore.hide()
});
const hour = ref(`${reFormatDate(new Date().getHours())}:${reFormatDate(new Date().getMinutes())}`)

vente.value.date = `${new Date().getFullYear()}-${reFormatDate(new Date().getMonth() + 1)}-${reFormatDate(new Date().getDate())}`
vente.value.quantity = 0
// vente.value.buyer = {
//     name: null
// }
const product = computed(() => {
    return vente.value.product_id == 0 ? {} : createData.value.products.find(p => p.id == vente.value.product_id)
})

const handleSubmit = () => {
    const venteCopy = {...vente.value, "date": `${vente.value.date} ${hour.value}`}
    if (!vente.value.product_id || vente.value.quantity==0) {
        alert('choisissez un produit et une quantité');
    } else {
        crudStore.store(venteCopy).then(() => {
            loaderStore.hide();
            vente.value = {}
            createData.value = {}
            useVenteStore().step = 1;
        })
    }
}
</script>

<style lang="scss" scoped></style>