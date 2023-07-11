<template lang="">
    <form class="addform" @submit.prevent="addTodo">
      <div class="input-form">
        <div class="field has-addons">
          <div class="control">
            <label for="newTodo">Subject</label>
            <input
              id="newTodo"
              v-model="newTodo"
              class="input"
              type="text"
              placeholder="Sertakan jumlah barang"
            />
          </div>
          <div class="control">
            <label for="author">Borowwer</label>
            <input
              id="author"
              v-model="author"
              class="input"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div class="control">
            <label for="deadline">Keterangan</label>
            <input
              id="deadline"
              title="Deadline"
              v-model="keterangan"
              class="input"
              type="text"
            />
          </div>
          <div class="control" id="dTime">
            <label for="deadlineTime">Rencana Pengembalian</label>
            <input
              id="deadlineTime"
              title="DeadlineTime"
              v-model="deadlineTime"
              class="input"
              type="time"
            />
          </div>
          <div class="control">
            <label style="color: transparent" for="">.</label>
            <button :disabled="!newTodo" class="button is-info">
              Pinjam Barang
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
        v-for="subject in subjects"
        :class="{ 'has-background-success-light': todo.done }"
        class="subject-card"
      >
      <!-- Edit Point -->
        <div class="card-content">
          <div class="content">
            <div
              style="text-align: center"
              :class="{ '-line-through-': todo.done }"
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
                <h3>{{ todo.content }}</h3>
                <p style="color: black; font-weight: 700; padding: 5px 10px">
                  Poster : {{ todo.author }}
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
                Posted@ | {{ todo.time }}
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
                Deadline : {{ todo.deadline }} | {{ todo.deadlineTime }}
              </p>
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
    orderBy("deadline", "asc"),
    // limit(10)
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
          deadlineTime: doc.data().deadlineTime,
        };
  
        fbTodos.push(todo);
      });
      todos.value = fbTodos;
    });
  
    
  });
  
  const newTodo = ref("");
  const author = ref("");
  const deadline = ref("");
  const deadlineTime = ref("");
  
  const addTodo = () => {
    const todoData = {
      content: newTodo.value,
      done: false,
      time: new Date().toLocaleString(),
      author: author.value,
      deadline: deadline.value,
      deadlineTime: deadlineTime.value,
    };
  
    addDoc(collection(db, "todos"), todoData);
  
    newTodo.value = "";
    deadline.value = "";
    author.value = "";
    deadlineTime.value = "";
  };
  
  const deleteTodo = async (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "dani1212") {
      updateDoc(doc(db, "todos", id), {
        doneTime: new Date().toLocaleString(),
      });
  
      const deletedTask = await getDoc(doc(db, "todos", id));
      if (deletedTask.exists()) {
        const deletedData = deletedTask.data();
        await addDoc(collection(db, "selesai"), deletedData);
        deleteDoc(doc(db, "todos", id));
      }
    } else {
      alert("Password anda salah");
    }
  };
  
  const toggleDone = (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "dani1212") {
      const index = todos.value.findIndex((todo) => todo.id === id);
      updateDoc(doc(collection(db, "todos"), id), {
        done: !todos.value[index].done,
      });
    } else {
      alert("Password anda salah")
    }
  };
  </script>
  
  <style>
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
  