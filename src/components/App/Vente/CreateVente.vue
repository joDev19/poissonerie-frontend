<script setup>
import { useCrudStore } from '@/stores/crudStore';
import { useLoaderStore } from '@/stores/Loader';
import Button from '@/components/Button.vue';
import { storeToRefs } from 'pinia';
import SelectMultiple from '@/components/SelectMultiple.vue';
import { computed, ref, watch } from 'vue';
import { useVenteStore } from '@/stores/VenteStore';
import { reFormatDate, formatPrice } from '@/helper';
import { useModal } from 'vue-final-modal';
import QuantityComponent from '../Product/QuantityComponent.vue';
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
vente.value.type = computed(() => contains_gros ? 'gros' : 'détail')
const buyer_informations = ref({
    nom: "",
    ifu: "",
})
if (isUpdate.value && step.value == 2) {
    console.log("c'est un update")
    // faire le mapping des données....

} else {
    console.log("c'est un create")
    vente.value.type_vente = "au comptant"
    vente.value.amount_paid = 0
    vente.value.is_paid = false
}
const verifyPriceIsBetweenTwice = (price, min, max) => {
    return price >= min && price <= max
}

const total = computed(() => {
    // alert("Calcul du total")
    let price = 0;
    products.value.forEach(p => {
        if (p.sell_quantity && p.sell_price) {
            if (p.category == 'kilo_ou_carton') {
                if (p.sell_type == 'gros') {
                    price += p.sell_price * Number(p.sell_quantity);
                } else {
                    price += p.sell_price * Number(p.sell_quantity);
                }
            } else {
                price += p.sell_price * Number(p.sell_quantity);
            }
        }
    });
    return price;
})
const montantRemisParAcheteur = ref(0)
const relicat = computed(() => {
    if (vente.value.type_vente == "au comptant") {
        if (total.value > 0 && montantRemisParAcheteur.value > 0 && montantRemisParAcheteur.value > total.value) {
            return montantRemisParAcheteur.value - total.value
        }
        return 0;
    } else {
        if (montantRemisParAcheteur.value > 0 && vente.value.amount_paid > 0 && montantRemisParAcheteur.value > vente.value.amount_paid) {
            return montantRemisParAcheteur.value - vente.value.amount_paid;
        }
        return 0;
    }
})
// vente.value.amount_paid = computed(() => {


//     if (vente.value.type_vente == 'au comptant') {
//         alert("vente au comptant")
//         return total.value;
//     } else {
//         return vente.value.amount_paid || 0;
//     }
// })
watch(() => vente.value.type_vente, (newValue) => {
    if (newValue == 'au comptant') {
    } else {
        vente.value.is_paid = false;
        vente.value.amount_paid = 0;
    }
}, { immediate: true })

watch(total, (newValue) => {
    if (newValue > 0) {
        if (vente.value.type_vente == 'au comptant') {
            vente.value.amount_paid = newValue;
        } else {
            vente.value.amount_paid = 0;
        }
    }
})

const handleSubmit = () => {
    if (!isUpdate.value) {
        const selled_products = products.value.map(p => {
            return {
                product_id: p.id,
                type: p.sell_type,
                quantity: p.sell_quantity,
                quantity_per_box: p.quantity_per_box,
                sell_price: p.sell_price
            }
        })
        const _date = `${date.value} ${hour.value}`
        const data = {
            selled_products, "contains_gros": contains_gros.value, "date": _date, "buyer_informations": buyer_informations.value, "is_paid": vente.value.is_paid, 'price': total.value, type: vente.value.type_vente, amount_paid: vente.value.amount_paid
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
const showQuantityModal = (quantites, category) => {
    useModal({
        component: QuantityComponent,
        attrs: {
            quantites,
            category,
            onConfirm() {
                quantityCommand.close()
            }
        }
    }).open()
}
</script>
<template>
    <p class="text-xl font-bold">Formulaire de vente en {{ vente.type }}</p>
    <div class="xl:flex w-full xl:gap-3">
        <form v-if="!loaderStore.active" class="space-y-3 lg:w-1/2" @submit.prevent="handleSubmit">
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
            <div v-if="products.length" class="w-full mt-3">
                <template v-for="product in products" :key="product.id">
                    <div class="my-3 shadow-lg rounded-lg p-3 border-gray-300 border">
                        <h2 class="text-blue-500 font-semibold">{{ product.name }}</h2>
                        <div class="lg:flex lg:gap-3">
                            <div class="lg:w-1/2 lg:gap-3">
                                <label for="type_de_vente" class="label">Type de vente</label>
                                <select v-model="product.sell_type" name="type_de_vente" class="input"
                                    id="type_de_vente">
                                    <option value="gros">Vente en gros <span
                                            v-if="product.category == 'kilo_ou_carton'">(
                                            en carton )</span> </option>
                                    <option value="detail">Vente en détail <span
                                            v-if="product.category == 'kilo_ou_carton'"> ( en kilo )</span> </option>
                                </select>
                            </div>
                            <div class="lg:flex lg:w-1/2 lg:gap-3" v-if="product?.category == 'kilo_ou_carton'">
                                <div class="w-full" v-if="product.sell_type">
                                    <label for="date" class="label">Quantité (en {{ product.sell_type == 'detail' ?
                                        'kilo' :
                                        'nombre de carton'
                                    }})</label>
                                    <input type="number" step="0.01" name="date" v-model="product.sell_quantity"
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
                        <div v-if="product.sell_type && product.category == 'kilo_ou_carton'"
                            class="mt-3">
                            <label for="" class="label">Selectionner un carton</label>
                            <div v-for="q in product.quantities" :key="q.kilo_once_quantity"
                                class="flex gap-2 justifyt-start items-center">
                                <input :id="`idof-${q.kilo_once_quantity}`" :value="q.kilo_once_quantity"
                                    type="radio" class="input-checkbox"
                                    v-model="product.quantity_per_box" >
                                <label :for="`idof-${q.kilo_once_quantity}`">Carton de {{ q.kilo_once_quantity }}
                                    kilo</label>
                            </div>

                        </div>
                        <!-- <div v-if="product.category == 'kilo_ou_carton' && product.sell_type == 'gros'" class="mt-3">
                            <label for="" class="label">Quantité de kilo par carton</label>
                            <input type="number" step="0.01" v-model="product.quantity_per_box" class="input"
                                :placeholder="`Quantité de kilo par carton pour ${product.name}`">
                        </div> -->
                        <div v-if="product.sell_type" class="mt-3">
                            <label :for="`price-sell-${product.id}`" class="label">Prix du produit ({{
                                product.category == 'unite' ? 'unite' : (product.sell_type == 'detail' ? 'kilo' :
                                    'carton')
                            }})</label>
                            <template v-if="product.category == 'unite'">
                                <!-- <div class="grid grid-cols-2 gap-3">
                                    <div class="flex gap-2">
                                        <input type="radio" :value="product.price_unit_min" v-model="product.sell_price"
                                            :id="`price-min-${product.id}`">
                                        <label :for="`price-min-${product.id}`">{{ formatPrice(product.price_unit_min)
                                            }}</label>
                                    </div>
                                    <div class="flex gap-2">
                                        <input type="radio" :value="product.price_unit_max" v-model="product.sell_price"
                                            :id="`price-max-${product.id}`">
                                        <label :for="`price-max-${product.id}`">{{ formatPrice(product.price_unit_max)
                                            }}</label>
                                    </div>
                                </div> -->
                                <div class="">
                                    <input type="number"
                                        :class="verifyPriceIsBetweenTwice(product.sell_price, product.price_unit_min, product.price_unit_max) ? 'input-success' : 'input-error'"
                                        v-model="product.sell_price"
                                        :placeholder="`Prix entre ${formatPrice(product.price_unit_min)} - ${formatPrice(product.price_unit_max)}`"
                                        :id="`price-sell-${product.id}`">
                                    <small
                                        v-if="!verifyPriceIsBetweenTwice(product.sell_price, product.price_unit_min, product.price_unit_max)"
                                        class="text-red-500">Prix entre {{ formatPrice(product.price_unit_min) }} - {{
                                            formatPrice(product.price_unit_max) }}</small>
                                </div>
                            </template>
                            <template v-if="product.category == 'kilo_ou_carton'">
                                <div class="grid grid-cols-1 gap-3">
                                    <template v-if="product.sell_type == 'detail'">
                                        <div>
                                            <input type="number"
                                                :class="verifyPriceIsBetweenTwice(product.sell_price, product.price_kilo_min, product.price_kilo_max) ? 'input-success' : 'input-error'"
                                                v-model="product.sell_price"
                                                :placeholder="`Prix entre ${formatPrice(product.price_kilo_min)} - ${formatPrice(product.price_kilo_max)}`"
                                                :id="`price-sell-${product.id}`">
                                            <small
                                                v-if="!verifyPriceIsBetweenTwice(product.sell_price, product.price_kilo_min, product.price_kilo_max)"
                                                class="text-red-500">Prix entre {{
                                                    formatPrice(product.price_kilo_min) }} - {{
                                                    formatPrice(product.price_kilo_max) }}</small>
                                        </div>
                                        <!-- <div class="flex gap-2">
                                            <input type="radio" :value="product.price_kilo_min"
                                                v-model="product.sell_price" :id="`price-min-${product.id}`">
                                            <label :for="`price-min-${product.id}`">{{
                                                formatPrice(product.price_kilo_min)
                                                }}</label>
                                        </div>
                                        <div class="flex gap-2">
                                            <input type="radio" :value="product.price_kilo_max"
                                                v-model="product.sell_price" :id="`price-max-${product.id}`">
                                            <label :for="`price-max-${product.id}`">{{
                                                formatPrice(product.price_kilo_max)
                                                }}</label>
                                        </div> -->
                                    </template>
                                    <template v-if="product.sell_type == 'gros'">
                                        <div class="">
                                            <input type="number" class="input" v-model="product.sell_price"
                                                :class="verifyPriceIsBetweenTwice(product.sell_price, product.price_carton_min, product.price_carton_max) ? 'input-success' : 'input-error'"
                                                :placeholder="`Prix entre ${formatPrice(product.price_carton_min)} - ${formatPrice(product.price_carton_max)}`"
                                                :id="`price-sell-${product.id}`">
                                            <!-- <small v-if="!verifyPriceIsBetweenTwice(product.sell_price, product.price_carton_min, product.price_carton_max)" class="text-red-500">Prix entre {{
                                                formatPrice(product.price_carton_min) }} - {{
                                                formatPrice(product.price_carton_max) }}</small> -->
                                        </div>
                                        <!-- <div class="flex gap-2">
                                            <input type="radio" :value="product.price_carton_min"
                                                v-model="product.sell_price" :id="`price-min-${product.id}`">
                                            <label :for="`price-min-${product.id}`">{{
                                                formatPrice(product.price_carton_min)
                                                }}</label>
                                        </div>
                                        <div class="flex gap-2">
                                            <input type="radio" :value="product.price_carton_max"
                                                v-model="product.sell_price" :id="`price-max-${product.id}`">
                                            <label :for="`price-max-${product.id}`">{{
                                                formatPrice(product.price_carton_max)
                                                }}</label>
                                        </div> -->
                                    </template>
                                </div>
                            </template>
                        </div>
                    </div>

                </template>
            </div>
            <div class="w-full bg-white p-5 shadow-lg rounded-lg border border-gray-300 mt-3">
                <template v-if="contains_gros">
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
                    </div>
                </template>
                <div class="w-full">
                    <label for="type_achat" class="label">Type d'achat</label>
                    <div>
                        <div>
                            <input type="radio" v-model="vente.type_vente" name="type_achat" value="à terme"
                                id="à terme">
                            <label for="à terme">À terme</label>
                        </div>
                        <div>
                            <input type="radio" v-model="vente.type_vente" name="type_achat" value="au comptant"
                                id="au comptant">
                            <label for="au comptant">Au comptant</label>
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
                                <template v-if="product.category == 'kilo_ou_carton'">
                                    <tr>
                                        <td>Prix du kilo</td>
                                        <td> {{ formatPrice(product.price_kilo_min) }} - {{
                                            formatPrice(product.price_kilo_max) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Prix du carton</td>
                                        <td>{{
                                            formatPrice(product.price_carton_min) }} - {{
                                                formatPrice(product.price_carton_max) }}</td>
                                    </tr>
                                    <tr>
                                        <td>Quantité disponible</td>
                                        <td>
                                            <p @click="() => showQuantityModal(product.quantities, product.category)"
                                                class="hover:cursor-pointer">Voir les quantités</p>
                                        </td>
                                        <!-- <td>{{ product.quantity.kg }} kg</td> -->
                                    </tr>
                                </template>
                                <tr v-if="product.category == 'unite'">
                                    <td>Prix unitaire</td>
                                    <td>{{ formatPrice(product.price_unit_min) }} - {{
                                        formatPrice(product.price_unit_max) }}</td>
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
                    <table class="w-full">
                        <tbody>
                            <tr>
                                <td>Coût de la vente</td>
                                <td> {{ formatPrice(total) }} </td>
                            </tr>
                            <tr v-if="vente.type_vente == 'au comptant'">
                                <td><label for="is_paid">J'ai reçu les sous
                                    </label></td>
                                <td>
                                    <input type="checkbox" class="input-checkbox" id="is_paid" v-model="vente.is_paid">
                                </td>
                            </tr>
                            <tr v-else>
                                <td><label for="amount_payed">Montant payé par l'acheteur
                                    </label></td>
                                <td>
                                    <input type="number" name="amount_paid" class="input" id="amount_payed"
                                        v-model="vente.amount_paid">
                                </td>
                            </tr>
                            <tr>
                                <td>Montant remis par l'acheteur</td>
                                <td> <input type="number" name="amount_given" v-model="montantRemisParAcheteur"
                                        class="input"> </td>
                            </tr>
                            <tr>
                                <td>Relicat à remettre</td>
                                <td>{{ formatPrice(relicat) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- {{ vente }} -->
</template>

<style lang="scss" scoped></style>