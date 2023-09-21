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
          <label for="fileImage">Upload Gambar</label>
          <input
            type="file"
            class="input"
            id="fileImage"
            ref="myFile"
            @change="handleImageUpload"
            multiple
          />
        </div>
        <div class="control">
          <label style="color: transparent">.</label>
          <button :disabled="!namaBarang" class="button is-info">
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
    <div class="card-container" v-else>
      <div
        v-for="repair in sortedRepairHistory"
        :key="repair.id"
        class="task-card"
        style="width: 300px"
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
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <h3>{{ repair.namaBarang }}</h3>
                <div
                  v-for="(imageLink, index) in repair.linkImage"
                  :key="index"
                >
                  <img :src="imageLink" alt="" style="width: 200px" />
                </div>
                <span
                  style="
                    text-align: center;
                    color: black;
                    font-weight: 700;
                    padding: 5px 10px;
                  "
                >
                  Kerusakan: {{ repair.kerusakan }}
                </span>
                <div>
                  <select
                    v-model="repair.status"
                    id="status"
                    style="
                      width: 100%;
                      height: 30px;
                      font-weight: 700;
                      text-align: center;
                      margin-bottom: 10px;
                      border-radius: 10px;
                    "
                    @change="updateStatus(repair)"
                  >
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

              <div
                class="btn-group"
                style="width: 100%; display: flex; justify-content: center"
              >
                <button @click="deleteTodo(repair.id)" class="button is-danger">
                  &cross; Delete
                </button>
              </div>
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
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { storage, app } from "@/firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const sortedRepairHistory = ref([]);

let selectedImageFile = null;
let imageRef; // Define imageRef globally

const handleImageUpload = async (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const imageLinks = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageRef = storageRef(storage, file.name);

      try {
        // Upload each image to Firebase Storage
        await uploadBytes(imageRef, file);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        // Push the URL to the imageLinks array
        imageLinks.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Set the linkImage field in Firestore to the array of image links
    linkImage.value = imageLinks;
  }
};

onMounted(() => {
  onSnapshot(
    query(collection(db, "repairHistory"), orderBy("tanggalPerbaikan", "desc")),
    (querySnapshot) => {
      const fbRepairHistory = [];
      querySnapshot.forEach((doc) => {
        const repair = {
          id: doc.id,
          namaBarang: doc.data().namaBarang,
          kerusakan: doc.data().kerusakan,
          tanggalPerbaikan: doc.data().tanggalPerbaikan,
          status: doc.data().status || "Rusak",
          linkImage: doc.data().linkImage,
        };

        fbRepairHistory.push(repair);
      });
      sortedRepairHistory.value = fbRepairHistory;
    }
  );
});

const namaBarang = ref("");
const kerusakan = ref("");
const tanggalPerbaikan = ref("");
const linkImage = ref("");

const addTodo = async () => {
  if (selectedImageFile) {
    // Upload the images and get their URLs
    const imageLinks = [];

    for (let i = 0; i < selectedImageFile.length; i++) {
      const file = selectedImageFile[i];
      const imageRef = storageRef(storage, file.name);

      try {
        // Upload each image to Firebase Storage
        await uploadBytes(imageRef, file);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        // Push the URL to the imageLinks array
        imageLinks.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Set the linkImage field in Firestore to the array of image links
    linkImage.value = imageLinks;
  }

  const repairData = {
    namaBarang: namaBarang.value,
    kerusakan: kerusakan.value,
    tanggalPerbaikan: tanggalPerbaikan.value,
    status: "Rusak", // Status default "Rusak"
    linkImage: linkImage.value,
  };

  await addDoc(collection(db, "repairHistory"), repairData);

  namaBarang.value = "";
  kerusakan.value = "";
  tanggalPerbaikan.value = "";
  selectedImageFile = null;
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

const deleteTodo = async (id) => {
  let password = prompt("Tolong Passwordnya");
  if (password === "dani1212") {
    deleteDoc(doc(db, "repairHistory", id));
  } else {
    alert("Password anda salah");
  }
};
</script>
<style>
.container {
  width: 100%;
}
.task-card .content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.card-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

@media (max-width: 600px) {
}
</style>
