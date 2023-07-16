<template lang="">
    <div
        v-for="request in buyRequests"
        :key="request.id"
        class="request-card"
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
                <select
                  v-model="request.status"
                  @change="updateStatus(request)"
                >
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
import { ref, onMounted } from "vue";
import {
  onSnapshot,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";

const buyRequests = ref([]);
const nama = ref("");
const barang = ref("");
const jumlah = ref("");
const tanggalPakai = ref("");
const jamPakai = ref("");
const requestCollectionQuery = query(
  collection(db, "buyRequest"),
  orderBy("tanggalPakai", "asc")
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

const updateStatus = async (request) => {
  await updateDoc(doc(db, "buyRequest", request.id), {
    status: request.status,
  });
};

onMounted(() => {
  loadBuyRequests();
});
</script>
