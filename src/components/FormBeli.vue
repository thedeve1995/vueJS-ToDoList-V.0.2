<template lang="">
  <form class="addform" @submit.prevent="submitRequest">
    <div class="input-form">
      <div class="field has-addons">
        <div class="control">
          <label for="nama">Nama</label>
          <input
            id="nama"
            v-model="nama"
            class="input"
            type="text"
            placeholder="Nama"
          />
        </div>
        <div class="control">
          <label>Barang</label>
          <input
            v-model="barang"
            class="input"
            type="text"
            placeholder="Barang"
          />
        </div>
        <div class="control">
          <label>Jumlah</label>
          <input
            placeholder="Jumlah"
            v-model="jumlah"
            class="input"
            type="number"
          />
        </div>
        <div class="control">
          <label>Tanggal Pakai</label>
          <input
            v-model="tanggalPakai"
            class="input"
            type="date"
            placeholder="Tanggal Pakai"
          />
        </div>
        <div class="control">
          <label>Jam Pakai</label>
          <input
            v-model="jamPakai"
            class="input"
            type="time"
            placeholder="Jam Pakai"
          />
        </div>
        <div class="control">
          <label style="color: transparent" for="">.</label>
          <button
            :disabled="!nama || !barang || !jumlah || !tanggalPakai || !jamPakai"
            class="button is-info"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref } from "vue";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

const nama = ref("");
const barang = ref("");
const jumlah = ref("");
const tanggalPakai = ref("");
const jamPakai = ref("");

const submitRequest = async () => {
  const newRequest = {
    nama: nama.value,
    barang: barang.value,
    jumlah: jumlah.value,
    tanggalPakai: tanggalPakai.value,
    jamPakai: jamPakai.value,
    status: "Belum Beli",
  };

  await addDoc(collection(db, "buyRequest"), newRequest);
  nama.value = "";
  barang.value = "";
  jumlah.value = "";
  tanggalPakai.value = "";
  jamPakai.value = "";

  loadBuyRequests();
};
</script>

<style></style>
