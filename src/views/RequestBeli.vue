<template>
  <div>
    <FormBeli />
    <h1 class="title">Permintaan Pembelian Barang</h1>

    <div class="container">
      <RequestBeliCard />
    </div>
  </div>
</template>

<script setup>
import FormBeli from "../components/FormBeli.vue";
import RequestBeliCard from "../components/RequestBeliCard.vue";
</script>

<style>
@import "../assets/RequestBeli.css";
</style>
