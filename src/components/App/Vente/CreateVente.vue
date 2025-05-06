<template>
    <p class="text-xl font-bold">Formulaire de vente en {{ vente.type }}</p>
    <div class="xl:flex w-full xl:gap-3">
        <form v-if="!loaderStore.active" class="space-y-3 w-1/2" @submit.prevent="handleSubmit">
            <div class="lg:flex lg:gap-3">
                <div class="w-full lg:w-1/2">
                    <label for="date" class="label">Date</label>
                    <input type="date" name="date" v-model="date" class="input" id="date">
                </div>
                <div class="w-full lg:w-1/2">
                    <label for="date" class="label">Date</label>
                    <input type="time" name="date" v-model="hour" class="input" id="date">
                </div>
            </div>
            <SelectMultiple :data="createData?.products" filter-by="name" @update-elements="el => productsId = el" />
            <div v-if="products.length" class="w-full bg-white p-5 shadow-lg rounded-lg border border-gray-300 mt-3">
                <template v-for="product in products" :key="product.id">
                    <h2 class="text-blue-500 font-semibold">{{ product.name }}</h2>
                    <div class="lg:flex lg:gap-3">
                        <div class="lg:w-1/2 lg:gap-3">
                            <label for="type_de_vente" class="label">Type de vente</label>
                            <select v-model="product.sell_type" name="type_de_vente" class="input" id="type_de_vente">
                                <option value="gros">Vente en gros</option>
                                <option value="detail">Vente en détail</option>
                            </select>
                        </div>
                        <div class="lg:flex lg:w-1/2 lg:gap-3" v-if="product?.category == 'kilo_ou_carton'">
                            <div class="w-full" v-if="product.sell_type">
                                <label for="date" class="label">Quantité (en {{ product.sell_type == 'detail' ? 'kilo' :
                                    'nombre de carton'
                                    }})</label>
                                <input type="number" step="0.10" name="date" v-model="product.sell_quantity"
                                    class="input" id="date">
                            </div>
                        </div>
                        <div class="lg:flex lg:w-1/2 lg:gap-3" v-if="product?.category == 'unite'">
                            <div class="w-full">
                                <label for="date" class="label">Quantité (unité)</label>
                                <input type="number" step="0.10" name="date" v-model="product.sell_quantity"
                                    class="input" id="date">
                            </div>
                        </div>

                    </div>
                </template>
            </div>
            <div v-if="contains_gros" class="w-full bg-white p-5 shadow-lg rounded-lg border border-gray-300 mt-3">
                <h1>Information sur l'acheteur</h1>
                <div class="flex flex-col gap-3">
                    <div class="w-full">
                        <label for="name" class="label">Nom & Prénom</label>
                        <input type="text" v-model="buyer_informations.nom" name="name" class="input" id="name">
                    </div>
                    <div class="w-full">
                        <label for="ifu" class="label">IFU</label>
                        <input type="text" v-model="buyer_informations.ifu" name="ifu" class="input" id="ifu">
                    </div>
                    <div class="w-full">
                        <label for="type_achat" class="label">Type d'achat</label>
                        <div>
                            <div>
                                <input type="radio" v-model="buyer_informations.type_achat" name="type_achat"
                                    value="à terme" id="à terme"> <label for="à terme">À terme</label>
                            </div>
                            <div>
                                <input type="radio" v-model="buyer_informations.type_achat" name="type_achat"
                                    value="au comptant" id="au comptant"> <label for="au comptant">Au comptant</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:w-1/2 mx-auto">
                <Button :loading="false" type-name="submit" text="Enregistrer la vente"></Button>
            </div>
        </form>
        <div class="xl:w-1/2 h-full overflow-auto">
            <template v-for="product in products" :key="product.id">
                <div v-if="product?.id" class="min-h-52 w-full bg-white p-5 shadow-lg rounded-lg my-3">
                    <p class="text-blue-500 font-semibold">Information sur le produit {{ product.name }}</p>
                    <div class="p-2">
                        <table class="w-full">
                            <tbody>
                                <tr>
                                    <td>Nom</td>
                                    <td>{{ product.name }}</td>
                                </tr>
                                <tr>
                                    <td>Marque</td>
                                    <td>{{ product.marque.name }}</td>
                                </tr>
                                <tr>
                                    <td>Catégorie</td>
                                    <td>{{ product.category }}</td>
                                </tr>
                                <tr v-if="product.category == 'kilo_ou_carton'">
                                    <td>Prix du kilo</td>
                                    <td> <span v-if="product.price_kilo == 0">_</span> <span v-else>{{
                                        formatPrice(product.price_kilo) }}</span></td>
                                </tr>
                                <tr v-if="product.category == 'kilo_ou_carton'">
                                    <td>Prix du carton</td>
                                    <td><span v-if="product.price_carton == 0">_</span> <span v-else>{{
                                        formatPrice(product.price_carton) }}</span></td>
                                </tr>
                                <tr v-if="product.category == 'unite'">
                                    <td>Prix unitaire</td>
                                    <td><span v-if="product.price_unit == 0">_</span> <span v-else>{{
                                        formatPrice(product.price_unit) }}</span></td>
                                </tr>
                                <tr v-if="product.category == 'kilo_ou_carton'">
                                    <td>Quantité disponible en kilo</td>
                                    <td>{{ product.quantity.kg }} kg</td>
                                </tr>
                                <tr v-if="product.category == 'kilo_ou_carton'">
                                    <td>Quantité disponible en carton</td>
                                    <td>{{ product.quantity.box }} carton(s)</td>
                                </tr>
                                <tr v-if="product.category == 'unite'">
                                    <td>Quantité disponible</td>
                                    <td>{{ product.quantity.unit }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </template>
            <div v-if="products.length != 0" class="min-h-52 w-full bg-white p-5 shadow-lg rounded-lg">
                <p class="text-blue-500 font-semibold">Information de la vente</p>
                <div class="p-2">
                    <table class="w-full lg:w-1/2">
                        <tbody>


                            <tr v-if="true">
                                <td>Coût de la vente</td>
                                <td> {{ formatPrice(total)
                                    }}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- {{ vente }} -->
</template>

<script setup>
import { useCrudStore } from '@/stores/crudStore';
import { useLoaderStore } from '@/stores/Loader';
import Button from '@/components/Button.vue';
import { storeToRefs } from 'pinia';
import SelectMultiple from '@/components/SelectMultiple.vue';
import { computed, ref, watch } from 'vue';
import { useVenteStore } from '@/stores/VenteStore';
import { reFormatDate, formatPrice } from '@/helper';
const venteStore = useVenteStore()
const { step, isUpdate } = storeToRefs(venteStore)
const loaderStore = useLoaderStore()
const crudStore = useCrudStore()
const { item: vente, createData } = storeToRefs(crudStore);
crudStore.create().then(res => {
    loaderStore.hide()
});
const hour = ref(`${reFormatDate(new Date().getHours())}:${reFormatDate(new Date().getMinutes())}`)
const date = ref(`${new Date().getFullYear()}-${reFormatDate(new Date().getMonth() + 1)}-${reFormatDate(new Date().getDate())}`)
const productsId = ref([]);
const products = computed(() => {
    return productsId.value.map(id => createData.value.products.find(el => el.id == id))
})
const contains_gros = computed(() => products.value.some(p => p.sell_type == 'gros'))
const buyer_informations = ref({
    nom: "",
    ifu: "",
    type_achat: "au comptant"
})
if (isUpdate.value && step.value == 2) {
    console.log("c'est un update")
    // faire le mapping des données....
} else {
    console.log("c'est un create")
}

const total = computed(() => {
    let price = 0;
    products.value.forEach(p => {
        if (p.sell_quantity) {
            if (p.category == 'kilo_ou_carton') {
                if (p.sell_type == 'gros') {
                    price += p.price_carton * Number(p.sell_quantity);
                } else {
                    price += p.price_kilo * Number(p.sell_quantity);
                }
            } else {
                price += p.price_unit * Number(p.sell_quantity);
            }
        }
    });
    return price;

})


const handleSubmit = () => {
    if (!isUpdate.value) {
        const selled_products = products.value.map(p => {
            return {
                product_id: p.id,
                type: p.sell_type,
                quantity: p.sell_quantity,
            }
        })
        const _date = `${date.value} ${hour.value}`
        const data = {
            selled_products, "contains_gros": contains_gros.value, "date": _date, "buyer_informations": buyer_informations.value
        }
        crudStore.store(data).then(() => {
            loaderStore.hide();
            vente.value = {}
            createData.value = {}
            step.value = 1;
        })
    } else {
        // c'est un update
    }
}
</script>

<style lang="scss" scoped></style>