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
            :disabled="
              !nama || !barang || !jumlah || !tanggalPakai || !jamPakai
            "
            class="button is-info"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script></script>
<style></style>
