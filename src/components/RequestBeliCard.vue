<template lang="">
  <div class="control" style="width:100%;display:flex;gap:10px;justify-content:center">
    <label>Status</label>
    <select style="background-color:white;color:black;font-weight:700" v-model="statusFilter" @change="applyFilter">
      <option value="">Semua</option>
      <option value="Belum Beli">Belum Beli</option>
      <option value="Sudah Dibeli">Sudah Dibeli</option>
    </select>
  </div>
  <div v-for="request in filteredBuyRequests" :key="request.id" class="request-card">
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
            <h3>{{ request.nama }}</h3>
            <span>Barang: {{ request.barang }}</span>
            <p style="color: black; font-weight: 700; padding: 5px 10px">
              Jumlah: {{ request.jumlah }}
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
            Tanggal Pakai: {{ request.tanggalPakai }} |
            {{ request.jamPakai }}
          </p>
        </div>
        <div class="status-control">
          <p style="color: rgb(206, 206, 206)">Status:</p>
          <div class="control">
            <select style="background-color:white;color:black;font-weight:700" v-model="request.status" @change="updateStatus(request)">
              <option value="Belum Beli">Belum Beli</option>
              <option value="Sudah Dibeli">Sudah Dibeli</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import {
  onSnapshot,
  collection,
 
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";

const buyRequests = ref([]);
const statusFilter = ref("");

const requestCollectionQuery = query(
  collection(db, "buyRequest"),
  orderBy("status" || "tanggalPakai", "asc")
  // limit(10)
);
const loadBuyRequests = () => {
  onSnapshot(requestCollectionQuery, (querySnapshot) => {
    const requests = [];
    querySnapshot.forEach((doc) => {
      const request = {
        id: doc.id,
        nama: doc.data().nama,
        barang: doc.data().barang,
        jumlah: doc.data().jumlah,
        tanggalPakai: doc.data().tanggalPakai,
        jamPakai: doc.data().jamPakai,
        status: doc.data().status,
      };
      requests.push(request);
    });
    buyRequests.value = requests;
  });
};

const updateStatus = async (request) => {
  await updateDoc(doc(db, "buyRequest", request.id), {
    status: request.status,
  });
};

onMounted(() => {
  loadBuyRequests();
});

const applyFilter = () => {
  loadBuyRequests();
};



const filteredBuyRequests = computed(() => {
  if (!statusFilter.value) {
    return buyRequests.value; // Jika filter belum dipilih, tampilkan semua data
  } else {
    return buyRequests.value.filter(
      (request) => request.status === statusFilter.value
    );
  }
});
</script>
