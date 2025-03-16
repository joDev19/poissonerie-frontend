import client from "@/client";
import { defineStore } from "pinia";
import { useLoaderStore } from "./Loader";
export const useCrudStore = defineStore('crud', {
    state: () => ({
        items: [],
        item: {},
        errors: {},
        url: "",
        createData: {}
    }),
    actions: {
        async index() {
            useLoaderStore().active = true;
            try {
                try {
                    const res = await client.get(this.url);
                    this.items = res.data;
                } catch (err) {
                    console.log(err);
                }
            } finally {
                return useLoaderStore().active = false;
            }
        },
        show(id, needToRequest = false) {
            useLoaderStore().active = true;
            const data = needToRequest ? null : this.items.find(el => el.id == id);
            if (data) {
                this.item = data
                useLoaderStore().active = false
            } else {
                client.get(`${this.url}/${id}`).then((res) => {
                    this.item = res.data
                }).catch((err) => {
                    console.log(err)
                }).finally(() => useLoaderStore().active = false)
            }
        },
        async store(data = null) {
            useLoaderStore().active = true;
            try {
                if (data == null)
                    data = this.item
                const res = await client.post(this.url, data);
                this.index();
            } catch (err) {
                return console.log(err);
            }
            //.finally(() => useLoaderStore().active = false)
        },
        async create() {
            useLoaderStore().active = true;
            try {
                try {
                    const res = await client.get(`${this.url}/create`);
                    this.createData = res.data;
                } catch (err) {
                    return console.log(err);
                }
            } finally {
                return useLoaderStore().active = false;
            }
        },
        async update(data) {
            useLoaderStore().active = true;
            try {
                const res = await client.put(`${this.url}/${this.item.id}`, data);
                this.index();
            } catch (err) {
                console.log(err);
            }
            // .finally(() => useLoaderStore().active = false)
        },
        async delete(id) {
            useLoaderStore().active = true;
            try {
                const res = await client.delete(`${this.url}/${id}`);
                this.index();
            } catch (err) {
                console.log(err);
            }
            // .finally(() => useLoaderStore().active = false)
        }
    }
})