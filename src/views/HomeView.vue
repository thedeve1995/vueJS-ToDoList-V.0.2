<template lang="">
  <form class="addform" @submit.prevent="addTodo">
    <div class="input-form">
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="newTodo"
            class="input"
            type="text"
            placeholder="Add A Task"
          />
        </div>
        <div class="control">
          <input
            v-model="author"
            class="input"
            type="text"
            placeholder="Your Name"
          />
        </div>
        <div class="control">
          <input
            title="Deadline"
            v-model="deadline"
            class="input"
            type="date"
            placeholder="Deadline"
          />
        </div>
        <div class="control">
          <button :disabled="!newTodo" class="button is-info">
            Tambah Tugas
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
    DAFTAR TUGAS
  </h1>

  <div class="container">
    <div
      v-for="todo in todos"
      :class="{ 'has-background-success-light': todo.done }"
      class="task-card"
    >
      <div class="card-content">
        <div class="content">
          <div
            style="text-align: center"
            :class="{ '-line-through-': todo.done }"
          >
            <h2 id="jobDone"></h2>
            <h3>{{ todo.content }}</h3>
            <span
              style="
                color: black;
                background-color: #f86f03;
                padding: 5px 10px;
                border-radius: 10px;
              "
            >
              Poster : {{ todo.author }}</span
            >
            <br />
            <br /><br />

            <span
              style="
                color: black;
                background-color: #ffa41b;
                padding: 5px 10px;
                border-radius: 10px;
              "
            >
              Posted @ {{ todo.time }}</span
            >

            <br /><br />

            <span
              style="
                color: white;
                background-color: maroon;
                padding: 5px 10px;
                border-radius: 10px;
                margin-bottom: 20px;
              "
            >
              Deadline : {{ todo.deadline }}</span
            >
            <br />
            <div
              class="done-time"
              style="
                margin-top: 10px;
                background-color: lightgreen;
                padding: 10px;
                border-radius: 10px;
                transform: scale(0.8);
                width: 300px;
              "
            >
              <h4>Done On</h4>
              <label
                for="doneDate"
                style="
                  color: black;
                  font-size: 20px;
                  margin-top: 10px;
                  text-align: left;
                "
                >Date</label
              >
              <input
                title="Deadline"
                v-model="doneDate"
                class="input"
                type="date"
                placeholder="Deadline"
                id="doneDate"
              />
              <label
                style="
                  color: black;
                  font-size: 20px;
                  margin-top: 10px;
                  text-align: left;
                "
                for="doneTime"
                >Time</label
              >
              <input
                title="Deadline"
                v-model="doneTime"
                class="input"
                type="time"
                placeholder="Deadline"
                id="doneTime"
              />
            </div>
          </div>
          <div class="btn-group">
            <button
              @click="toggleDone(todo.id)"
              :class="todo.done ? 'is-success' : 'is-light'"
              class="button"
            >
              {{ todo.done ? "In Progress..." : "Do This" }}
            </button>
            <button @click="deleteTodo(todo.id)" class="button is-danger">
              &check; done?
            </button>
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

const todosCollectionQuery = query(
  collection(db, "todos"),
  orderBy("time", "desc"),
  limit(10)
);
const todos = ref([]);

onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        time: doc.data().time,
        author: doc.data().author,
        deadline: doc.data().deadline,
      };

      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

const newTodo = ref("");
const author = ref("");
const deadline = ref("");
const doneTime = ref("");
const doneDate = ref("");

const addTodo = () => {
  const todoData = {
    content: newTodo.value,
    done: false,
    time: new Date().toLocaleString(),
    author: author.value,
    deadline: deadline.value,
  };

  addDoc(collection(db, "todos"), todoData);

  newTodo.value = "";
  deadline.value = "";
  author.value = "";
};

const deleteTodo = async (id) => {
  updateDoc(doc(db, "todos", id), {
    doneTime: doneTime.value,
    doneDate: doneDate.value,
  });

  const deletedTask = await getDoc(doc(db, "todos", id));
  if (deletedTask.exists()) {
    const deletedData = deletedTask.data();

    await addDoc(collection(db, "selesai"), deletedData);
    deleteDoc(doc(db, "todos", id));
  }
};

const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(collection(db, "todos"), id), {
    done: !todos.value[index].done,
  });
};
</script>

<style>
.task-card {
  background-color: burlywood;
  padding: 0;
  width: 350px;
  margin-bottom: 20px;
  border-radius: 20px;
}

.task-card:hover {
  background-color: rgb(172, 184, 184);
  transition: 0.3s ease;
  box-shadow: 2px 2px 15px rgb(7, 6, 6);
}

.task-card h3 {
  color: black;
  text-align: center;
}

.addform {
  width: 100%;
}

.input-form {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1000px) {
  .container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
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
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
  .input-form .field .control:last-child {
    margin-top: 10px;
  }
  .input-form .field .control input {
    width: 100%;
  }
  .input-form .field .control button {
    width: 100%;
  }
}
</style>
