<template lang="">
  <form class="addform" @submit.prevent="addTodo">
    <div class="input-form">
      <div class="field has-addons">
        <div class="field-row">
          <div class="control">
            <label for="naMe">Nama Peminjam</label>
            <input
              id="naMe"
              v-model="naMe"
              class="input"
              type="text"
              placeholder="Ketik Nama Dulu"
            />
          </div>
          <div class="control">
            <label for="barang">Barang (Detail)</label>
            <textarea
              style="height: 40px; width: 100%"
              id="barang"
              v-model="barang"
              class="input"
              type="text"
              placeholder="Jangan lupa Jumlah"
              rows="4"
              cols="10"
            ></textarea>
          </div>
          <div class="control">
            <label for="keperluan">Keperluan</label>
            <input
              id="keperluan"
              v-model="keperluan"
              class="input"
              type="text"
              placeholder="Ketik Keperluan"
            />
          </div>
          <div class="control">
            <label for="tglPinjam">Tanggal Pinjam</label>
            <input
              id="tglPinjam"
              v-model="tglPinjam"
              class="input"
              type="date"
            />
          </div>
        </div>
        <div class="field-row">
          <div class="control" id="dTime">
            <label for="jamPinjam">Jam Pinjam</label>
            <input
              id="jamPinjam"
              title="DeadlineTime"
              v-model="jamPinjam"
              class="input"
              type="time"
            />
          </div>
          <div class="control">
            <label for="tglKembali">Tanggal Kembali</label>
            <input
              id="tglKembali"
              v-model="tglKembali"
              class="input"
              type="date"
            />
          </div>
          <div class="control" id="dTime">
            <label for="jamKembali">Jam Kembali</label>
            <input
              id="jamKembali"
              v-model="jamKembali"
              class="input"
              type="time"
            />
          </div>
          <div class="control">
            <label style="color: transparent" for="">.</label>
            <button :disabled="!naMe" class="button is-info">
              Ajukan Pinjam
            </button>
          </div>
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
    DAFTAR BARANG PINJAMAN
  </h1>

  <div class="filter" style="width:100%;display:flex;flex-direction:column;align-items:center">
    <label style="text-align:center;font-size:20px;" for="filterDate">Filter Tanggal:</label>
    <input style="width:250px;padding:5px 20px; font-size:15px; text-align:center;border-radius:10px"
      id="filterDate"
      v-model="filterDate"
      class="input"
      type="date"
      @input="applyFilter"
    />
  </div>

  <div class="container">
    <div
      v-for="barangPinjaman in filteredBarangPinjamans"
      :class="{ 'has-background-success-light': barangPinjaman.done }"
      class="task-card"
    >
      <div class="card-content">
        <div class="content">
          <div
            style="text-align: center"
            :class="{ '-line-through-': barangPinjaman.done }"
          >
            <div
              style="
                background-color: white;
                color: black;
                font-weight: 700;
                padding: 5px 10px;
                border-radius: 10px 10px 0 0;
              "
            >
              <h3>{{ barangPinjaman.barang }}</h3>
              <h4>Untuk : {{ barangPinjaman.keperluan }}</h4>
              <p style="color: black; font-weight: 700; padding: 5px 10px">
                Poster: {{ barangPinjaman.name }}
              </p>
            </div>
            <div>
              <p
                style="color: black; background-color: #fff; padding: 5px 10px"
              >
                Posted@ | {{ barangPinjaman.time }}
              </p>
            </div>

            <p
              style="
                color: black;
                background-color: #ffa41b;
                padding: 5px 10px;
                border-radius: 0 0 10px 10px;
              "
            >
              Waktu Pakai | {{ barangPinjaman.tglPinjam }} @
              {{ barangPinjaman.jamPinjam }}
            </p>

            <p
              style="
                color: whitesmoke;
                background-color: maroon;
                width: 100%;
                padding: 5px 10px;
                border-radius: 10px;
              "
            >
              Waktu Kembali: {{ barangPinjaman.tglKembali }} |
              {{ barangPinjaman.jamKembali }}
            </p>
          </div>
          <div class="btn-group">
            <button
              @click="toggleDone(barangPinjaman.id)"
              :class="barangPinjaman.done ? 'is-success' : 'is-light'"
              class="button"
            >
              {{ barangPinjaman.done ? "In Use..." : "Receive" }}
            </button>
            <button
              @click="deleteTodo(barangPinjaman.id)"
              class="button is-danger"
            >
              &check; done?
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  collection,
  onSnapshot,
  getFirestore,
  getDocs,
  addDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";

const barangCollectionQuery = query(
  collection(db, "barangPinjamans"),
  orderBy("tglPinjam", "asc")
  // limit(10)
);
const barangPinjamans = ref([]);

onMounted(() => {
  onSnapshot(barangCollectionQuery, (querySnapshot) => {
    const fbBarangPinjamans = [];
    querySnapshot.forEach((doc) => {
      const barangPinjaman = {
        id: doc.id,
        name: doc.data().name,
        done: doc.data().done,
        time: doc.data().time,
        barang: doc.data().barang,
        keperluan: doc.data().keperluan,
        tglPinjam: doc.data().tglPinjam,
        jamPinjam: doc.data().jamPinjam,
        tglKembali: doc.data().tglKembali,
        jamKembali: doc.data().jamKembali,
      };

      fbBarangPinjamans.push(barangPinjaman);
    });
    barangPinjamans.value = fbBarangPinjamans;
  });
});

const applyFilter = () => {
  // Menghapus spasi di awal dan akhir tanggal filter
  filterDate.value = filterDate.value.trim();
};

const filteredBarangPinjamans = computed(() => {
  if (filterDate.value === "") {
    return barangPinjamans.value;
  } else {
    return barangPinjamans.value.filter(
      (barangPinjaman) => barangPinjaman.tglPinjam === filterDate.value
    );
  }
});

const naMe = ref("");
const barang = ref("");
const keperluan = ref("");
const tglPinjam = ref("");
const jamPinjam = ref("");
const tglKembali = ref("");
const jamKembali = ref("");
const filterDate = ref("");

const addTodo = () => {
  const todoData = {
    name: naMe.value,
    done: false,
    time: new Date().toLocaleString(),
    barang: barang.value,
    keperluan: keperluan.value,
    tglPinjam: tglPinjam.value,
    jamPinjam: jamPinjam.value,
    tglKembali: tglKembali.value,
    jamKembali: jamKembali.value,
  };

  addDoc(collection(db, "barangPinjamans"), todoData);

  naMe.value = "";
  tglPinjam.value = "";
  tglKembali.value = "";
  barang.value = "";
  keperluan.value = "";
  jamPinjam.value = "";
  jamKembali.value = "";
};

const deleteTodo = async (id) => {
  let password = prompt("Tolong Passwordnya");
  if (password === "dani1212") {
    updateDoc(doc(db, "barangPinjamans", id), {
      doneTime: new Date().toLocaleString(),
    });

    const deletedTask = await getDoc(doc(db, "barangPinjamans", id));
    if (deletedTask.exists()) {
      const deletedData = deletedTask.data();
      await addDoc(collection(db, "selesaiPinjam"), deletedData);
      deleteDoc(doc(db, "barangPinjamans", id));
    }
  } else {
    alert("Password anda salah");
  }
};

const toggleDone = (id) => {
  let password = prompt("Tolong Passwordnya");
  if (password === "dani1212") {
    const index = barangPinjamans.value.findIndex(
      (barangPinjaman) => barangPinjaman.id === id
    );
    updateDoc(doc(collection(db, "barangPinjamans"), id), {
      done: !barangPinjamans.value[index].done,
    });
  } else {
    alert("Password anda salah");
  }
};
</script>

<style scoped>
.task-card {
  background-color: burlywood;
  padding: 0;
  width: 350px;
  margin-bottom: 20px;
  border-radius: 20px;
  margin-top: 20px;
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

.input-form .field {
  gap: 20px;

  width: 80%;
}

.field-row {
  width: 100%;
}

.input-form .field .control button {
  width: 100%;
}
.input-form .field .control {
  margin-top: 10px;
  border-radius: 5px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

@media (min-width: 1000px) {
  .container {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.content .btn-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 800px) {
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
