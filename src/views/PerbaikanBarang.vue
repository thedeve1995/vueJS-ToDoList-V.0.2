<template lang="">
    <form class="addform" @submit.prevent="addTodo">
      <div class="input-form">
        <div class="field has-addons">
          <div class="control">
            <label for="namaBarang">Nama Barang</label>
            <input
              id="namaBarang"
              v-model="namaBarang"
              class="input"
              type="text"
              placeholder="Masukkan Nama Barang"
            />
          </div>
          <div class="control">
            <label for="kodeBarang">Kode Barang</label>
            <input
              id="kodeBarang"
              v-model="kodeBarang"
              class="input"
              type="text"
              placeholder="Masukkan Kode Barang"
            />
          </div>
          <div class="control">
            <label for="kerusakan">Kerusakan</label>
            <input
              id="kerusakan"
              v-model="kerusakan"
              class="input"
              type="text"
              placeholder="Masukkan Kerusakan Barang"
            />
          </div>
          <div class="control">
            <label for="tanggalPerbaikan">Tanggal Perbaikan</label>
            <input
              id="tanggalPerbaikan"
              v-model="tanggalPerbaikan"
              class="input"
              type="date"
            />
          </div>
          <div class="control">
            <label style="color:transparent">.</label>
            <button
             
              class="button is-info"
            >
              Tambah Riwayat Perbaikan
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
      RIWAYAT PERBAIKAN BARANG
    </h1>
  
    <div class="container">
      <div v-if="sortedRepairHistory.length === 0">
        Belum ada riwayat perbaikan.
      </div>
      <div v-else>
        <div
          v-for="repair in sortedRepairHistory"
          :key="repair.id"
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
                  "
                >
                  <h3>{{ repair.namaBarang }}</h3>
                  <p style="color: black; font-weight: 700; padding: 5px 10px">
                    Kode Barang: {{ repair.kodeBarang }}
                  </p>
                  <p style="color: black; font-weight: 700; padding: 5px 10px">
                    Kerusakan: {{ repair.kerusakan }}
                  </p>
                  <div style="margin-top: 10px">
                    <label for="status" style="color:black;text-align:center">Status:</label>
                    <select v-model="repair.status" id="status" style="width:100%;height:30px;font-weight:700;text-align:center" @change="updateStatus(repair)">
                      <option value="Rusak">Rusak</option>
                      <option value="Di Perbaiki">Di Perbaiki</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>
                </div>
  
                <p
                  style="
                    color: black;
                    background-color: #ffa41b;
                    padding: 5px 10px;
                    border-radius: 0 0 10px 10px;
                  "
                >
                  Tanggal Perbaikan: {{ repair.tanggalPerbaikan }}
                </p>
              </div>
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
    getFirestore,
    addDoc,
    query,
    orderBy,
    updateDoc,
    doc,
  } from "firebase/firestore";
  import { db } from "@/firebase";
  
  const sortedRepairHistory = ref([]);
  
  onMounted(() => {
    onSnapshot(
      query(
        collection(db, "repairHistory"),
        orderBy("tanggalPerbaikan", "desc")
      ),
      (querySnapshot) => {
        const fbRepairHistory = [];
        querySnapshot.forEach((doc) => {
          const repair = {
            id: doc.id,
            namaBarang: doc.data().namaBarang,
            kodeBarang: doc.data().kodeBarang,
            kerusakan: doc.data().kerusakan,
            tanggalPerbaikan: doc.data().tanggalPerbaikan,
            status: doc.data().status || "Rusak",
          };
  
          fbRepairHistory.push(repair);
        });
        sortedRepairHistory.value = fbRepairHistory;
      }
    );
  });
  
  const namaBarang = ref("");
  const kodeBarang = ref("");
  const kerusakan = ref("");
  const tanggalPerbaikan = ref("");
  
  const addTodo = async () => {
    const repairData = {
      namaBarang: namaBarang.value,
      kodeBarang: kodeBarang.value,
      kerusakan: kerusakan.value,
      tanggalPerbaikan: tanggalPerbaikan.value,
      status: "Rusak", // Status default "Rusak"
    };
  
    await addDoc(collection(db, "repairHistory"), repairData);
  
    namaBarang.value = "";
    kodeBarang.value = "";
    kerusakan.value = "";
    tanggalPerbaikan.value = "";
  };

  const updateStatus = async (repair) => {
  try {
    await updateDoc(doc(db, "repairHistory", repair.id), {
      status: repair.status,
    });
    console.log("Status berhasil diperbarui!");
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui status:", error);
  }
};
  </script>
  <style>
  
  </style>
  