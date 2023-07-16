<template lang="">
  <h1
    style="
      font-size: 30px;
      text-align: center;
      margin-top: 20px;
      font-weight: 700;
      color: burlywood;
    "
  >
    Tugas Yang Telah Di Selesaikan
  </h1>
  <div class="filter-form" >
    <label for="filterDate">Filter by Date:</label>
    <input
      style="height:30px;padding:10px 30px;font-size:17px"
      v-model="filterDate"
      type="date"
      @change="filterTasks"
      placeholder="Filter by Date"
    />
  </div>
  <div class="container">
    <div
      v-for="task in filteredTasks"
      :key="task.id"
      :class="{ 'has-background-success-light': task.done }"
      class="task-card"
    >
      <div class="card-content">
        <div class="content">
          <div
            style="text-align: center"
            :class="{ 'line-through': task.done }"
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
              <h3>{{ task.content }}</h3>
              <p
                style="
                  color: black;
                  padding: 5px 10px;
                  border-radius: 10px;
                  font-weight: 600;
                "
              >
                Poster: {{ task.author }}
              </p>
            </div>
            <div>
              <p
                style="
                  color: black;
                  background-color: #ffa41b;
                  padding: 5px 10px;
                "
              >
                Posted @ {{ task.time }}
              </p>
            </div>
            <div>
              <p
                style="
                  color: black;
                  background-color: #fff6f4;
                  padding: 5px 10px;
                "
              >
                Deadline: {{ task.deadline }}
              </p>
            </div>
            <p
              style="
                color: black;
                background-color: #f86f03;
                padding: 5px 10px;
                border-radius: 0 0 10px 10px;
              "
            >
              Done @ {{ task.doneTime }}
            </p>
          </div>
          <div class="btn-group">
            <button
              @click="toggleDone(task.id)"
              :class="task.done ? 'is-light' : 'is-danger'"
              class="button"
            >
              {{ task.done ? "Cancel Done ?" : "Done ?" }}
            </button>

            <button
              @click="deleteThis(task.id)"
              :class="task.done ? 'is-light' : 'is-danger'"
              class="button"
            >
              Delete
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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
} from "firebase/firestore";
import { db } from "@/firebase";

const tasksCollectionQuery = query(
  collection(db, "selesai"),
  orderBy("time", "desc")
);
const tasks = ref([]);
const filterDate = ref("");
const filteredTasks = ref([]);

onMounted(() => {
  loadTasks();
});

watch(filterDate, () => {
  filterTasks();
});

const loadTasks = () => {
  onSnapshot(tasksCollectionQuery, (querySnapshot) => {
    const fbTasks = [];
    querySnapshot.forEach((doc) => {
      const task = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        time: doc.data().time,
        author: doc.data().author,
        deadline: doc.data().deadline,
        doneTime: doc.data().doneTime,
      };
      fbTasks.push(task);
    });
    tasks.value = fbTasks;
    filterTasks();
  });
};

const deleteThis = async (id) => {
  let password = prompt("Tolong Passwordnya");
  if (password === "dani1212") {
      deleteDoc(doc(db, "selesai", id));
  } else {
    alert("Password anda salah");
  }
};

const filterTasks = () => {
  if (!filterDate.value) {
    filteredTasks.value = tasks.value;
  } else {
    const selectedDate = new Date(filterDate.value);
    filteredTasks.value = tasks.value.filter((task) => {
      const doneTime = new Date(task.doneTime);
      return doneTime.toDateString() === selectedDate.toDateString();
    });
  }
};

const toggleDone = async (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    if (task.done) {
      await updateDoc(doc(db, "selesai", id), {
        done: false,
      });
      await addDoc(collection(db, "todos"), task);
      await deleteDoc(doc(db,"selesai",id))
    } else {
      await updateDoc(doc(db, "selesai", id), {
        done: true,
      });
      await deleteDoc(doc(db, "todos", id));
    }
  }
};
</script>

<style scoped>
.task-card:hover {
  background-color: rgb(228, 175, 77);
  transition: 0.3s ease;
  box-shadow: 2px 2px 15px rgb(7, 6, 6);
}

.task-card {
  background-color: rgb(216, 161, 90);
  border-radius: 20px;
  box-shadow: 0 0 10px rgb(24, 23, 23);
}

.task-card h3 {
  color: black;
  text-align: center;
}

.filter-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.line-through {
  text-decoration: line-through;
}

.btn-group{
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
}
@media (min-width: 1000px) {
  .container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
}

.task-card {
  margin-top: 20px;
  width: 300px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.content .btn-group {
  width: 200px;
  display: flex;
  justify-content: center;
}
</style>
