<template lang="">
    <form class="addform" @submit.prevent="addTodo">
      <div class="input-form">
        <div class="field has-addons">
          <div class="control">
            <label for="namaBarang" style="text-align:center">Nama Barang</label>
            <input
              id="namaBarang"
              v-model="namaBarang"
              class="input"
              type="text"
              placeholder="Masukkan Nama Barang"
            />
          </div>
          <div class="control">
            <label for="jumlah" style="text-align:center">Jumlah</label>
            <input
              id="jumlah"
              v-model="jumlah"
              class="input"
              type="number"
              placeholder="Masukkan Jumlah Barang"
            />
          </div>
          <div class="control">
            <label for="tanggalMasuk" style="text-align:center">Tanggal Masuk</label>
            <input
              id="tanggalMasuk"
              v-model="tanggalMasuk"
              class="input"
              type="date"
            />
          </div>
          <div class="control">
            <label for="tanggalMasuk" style="color:transparent">.</label>
            <button
              :disabled="!namaBarang || !jumlah || !tanggalMasuk"
              class="button is-info"
            >
              Tambah Barang Masuk
            </button>
          </div>
        </div>
      </div>
    </form>
  
    <h1
      style="
        font-size: 30px;
        text-align: center;
        margin-top: 20px;
        font-weight: 700;
        color: burlywood;
      "
    >
      DAFTAR BARANG MASUK
    </h1>
  
    <div class="container">
      <div
        v-for="barangMasuk in barangMasuks"
        class="task-card"
      >
        <div class="card-content">
          <div class="content">
            <div>
              <div
                style="
                  background-color: white;
                  color: black;
                  font-weight: 700;
                  padding: 5px 10px;
                  border-radius: 10px 10px 0 0;
                  text-align: center;
                "
              >
                <h3>{{ barangMasuk.namaBarang }}</h3>
                <p style="color: black; font-weight: 700; padding: 5px 10px">
                  Jumlah: {{ barangMasuk.jumlah }}
                </p>
              </div>
  
              <p
                style="
                  color: black;
                  background-color: #ffa41b;
                  padding: 5px 10px;
                  border-radius: 0 0 10px 10px;
                  text-align: center;
                "
              >
                Tanggal Masuk: {{ barangMasuk.tanggalMasuk }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from "vue";
  import {
    collection,
    onSnapshot,
    
    addDoc,
    query,
    orderBy,
    
  } from "firebase/firestore";
  import { db } from "@/firebase";
  
  const CollectionQuery = query(
  collection(db, "barangMasuk"),
  orderBy("tanggalMasuk", "desc"),
  // limit(10)
);

  const barangMasuks = ref([]);
  
  onMounted(() => {
    onSnapshot(CollectionQuery, (querySnapshot) => {
      const fbBarangMasuks = [];
      querySnapshot.forEach((doc) => {
        const barangMasuk = {
          id: doc.id,
          namaBarang: doc.data().namaBarang,
          jumlah: doc.data().jumlah,
          tanggalMasuk: doc.data().tanggalMasuk,
        };
  
        fbBarangMasuks.push(barangMasuk);
      });
      barangMasuks.value = fbBarangMasuks;
    });
  });
  
  const namaBarang = ref("");
  const jumlah = ref("");
  const tanggalMasuk = ref("");
  
  const addTodo = async () => {
    const barangMasukData = {
      namaBarang: namaBarang.value,
      jumlah: jumlah.value,
      tanggalMasuk: tanggalMasuk.value,
    };
  
    await addDoc(collection(db, "barangMasuk"), barangMasukData);
  
    namaBarang.value = "";
    jumlah.value = "";
    tanggalMasuk.value = "";
  };
  </script>
  
  <style>
  .task-card {
    background-color: burlywood;
    padding: 0;
    width: 300px;
    margin-bottom: 20px;
    border-radius: 20px;
    margin-top: 10px;
    box-shadow: 2px 2px 15px rgb(7, 6, 6);
  }
  
  .task-card:hover {
    transform: translateY(-10px);
    transition: 0.5s ease-in-out;
  }
  
  .task-card h3 {
    color: black;
    text-align: center;
  }
  
  .addform {
    width: 100%;
    margin-top: 50px;
    background-color: rgb(22, 22, 22);
    padding: 10px 30px 30px 20px;
    border-radius: 20px;
  }
  
  .input-form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
  }
  
  .container {
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  
  @media (max-width: 600px) {
    .input-form .field {
      flex-direction: column;
      place-items: center;
      width: 300px;
    }
    .input-form .field .control {
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
  
    .input-form .field .control input {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .input-form .field .control button {
      width: 100%;
    }
    .input-form .field .control label:not(:first-child) {
      margin-top: 10px;
    }
    #dTime {
      margin-top: 20px;
    }
  }
  </style>
  