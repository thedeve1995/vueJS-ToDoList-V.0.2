<template lang="">
    <form class="addform" @submit.prevent="addTodoFerdi">
      <div class="input-form">
        <div class="field has-addons">
          <div class="control">
            <label for="newTodo">Task</label>
            <input
              id="newTodo"
              v-model="ferdinewTodo"
              class="input"
              type="text"
              placeholder="Add A Task"
            />
          </div>
          <div class="control">
            <label for="author">Poster</label>
            <input
              id="author"
              v-model="ferdiauthor"
              class="input"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div class="control">
            <label for="deadline">Deadline Date</label>
            <input
              id="deadline"
              title="Deadline"
              v-model="ferdideadline"
              class="input"
              type="date"
            />
          </div>
          <div class="control" id="dTime">
            <label for="deadlineTime">Deadline Time</label>
            <input
              id="deadlineTime"
              title="DeadlineTime"
              v-model="ferdideadlineTime"
              class="input"
              type="time"
            />
          </div>
          <div class="control">
            <label style="color: transparent" for="">.</label>
            <button :disabled="!ferdinewTodo" class="button is-info">
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
        v-for="ferditodo in ferditodos"
        :class="{ 'has-background-success-light': ferditodo.done }"
        class="task-card"
      >
        <div class="card-content">
          <div class="content">
            <div
              style="text-align: center"
              :class="{ '-line-through-': ferditodo.done }"
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
                <h3>{{ ferditodo.content }}</h3>
                <p style="color: black; font-weight: 700; padding: 5px 10px">
                  Poster : {{ ferditodo.author }}
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
                Posted@ | {{ ferditodo.time }}
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
                Deadline : {{ ferditodo.deadline }} | {{ ferditodo.deadlineTime }}
              </p>
            </div>
            <div class="btn-group">
              <button
                @click="toggleDoneFerdi(ferditodo.id)"
                :class="ferditodo.done ? 'is-success' : 'is-light'"
                class="button"
              >
                {{ ferditodo.done ? "In Progress..." : "Do This" }}
              </button>
              <button @click="deleteTodoFerdi(ferditodo.id)" class="button is-danger">
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
  
  const ferditodosCollectionQuery = query(
    collection(db, "ferditodos"),
    orderBy("deadline", "asc"),
    // limit(10)
  );
  const ferditodos = ref([]);
  
  onMounted(() => {
    onSnapshot(ferditodosCollectionQuery, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
        const ferditodo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done,
          time: doc.data().time,
          author: doc.data().author,
          deadline: doc.data().deadline,
          deadlineTime: doc.data().deadlineTime,
        };
  
        fbTodos.push(ferditodo);
      });
      ferditodos.value = fbTodos;
    });
  });
  
  const ferdinewTodo = ref("");
  const ferdiauthor = ref("");
  const ferdideadline = ref("");
  const ferdideadlineTime = ref("");
  
  const addTodoFerdi = () => {
    const todoData = {
      content: ferdinewTodo.value,
      done: false,
      time: new Date().toLocaleString(),
      author: ferdiauthor.value,
      deadline: ferdideadline.value,
      deadlineTime: ferdideadlineTime.value,
    };
  
    addDoc(collection(db, "ferditodos"), todoData);
  
    ferdinewTodo.value = "";
    ferdideadline.value = "";
    ferdiauthor.value = "";
    ferdideadlineTime.value = "";
  };
  
  const deleteTodoFerdi = async (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "ferdi1212") {
      updateDoc(doc(db, "ferditodos", id), {
        doneTime: new Date().toLocaleString(),
      });
  
      const deletedTask = await getDoc(doc(db, "ferditodos", id));
      if (deletedTask.exists()) {
        const deletedData = deletedTask.data();
        await addDoc(collection(db, "ferdiselesai"), deletedData);
        deleteDoc(doc(db, "ferditodos", id));
      }
    } else {
      alert("Password anda salah");
    }
  };
  
  const toggleDoneFerdi = (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "ferdi1212") {
      const index = ferditodos.value.findIndex((ferditodo) => ferditodo.id === id);
      updateDoc(doc(collection(db, "ferditodos"), id), {
        done: !ferditodos.value[index].done,
      });
    } else {
      alert("Password anda salah")
    }
  };
  </script>
  
  <style>
  
  </style>
  