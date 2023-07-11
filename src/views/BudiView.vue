<template lang="">
    <form class="addform" @submit.prevent="addTodoBudi">
      <div class="input-form">
        <div class="field has-addons">
          <div class="control">
            <label for="newTodo">Task</label>
            <input
              id="newTodo"
              v-model="budinewTodo"
              class="input"
              type="text"
              placeholder="Add A Task"
            />
          </div>
          <div class="control">
            <label for="author">Poster</label>
            <input
              id="author"
              v-model="budiauthor"
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
              v-model="budideadline"
              class="input"
              type="date"
            />
          </div>
          <div class="control" id="dTime">
            <label for="deadlineTime">Deadline Time</label>
            <input
              id="deadlineTime"
              title="DeadlineTime"
              v-model="budideadlineTime"
              class="input"
              type="time"
            />
          </div>
          <div class="control">
            <label style="color: transparent" for="">.</label>
            <button :disabled="!budinewTodo" class="button is-info">
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
        v-for="buditodo in buditodos"
        :class="{ 'has-background-success-light': buditodo.done }"
        class="task-card"
      >
        <div class="card-content">
          <div class="content">
            <div
              style="text-align: center"
              :class="{ '-line-through-': buditodo.done }"
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
                <h3>{{ buditodo.content }}</h3>
                <p style="color: black; font-weight: 700; padding: 5px 10px">
                  Poster : {{ buditodo.author }}
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
                Posted@ | {{ buditodo.time }}
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
                Deadline : {{ buditodo.deadline }} | {{ buditodo.deadlineTime }}
              </p>
            </div>
            <div class="btn-group">
              <button
                @click="toggleDoneBudi(buditodo.id)"
                :class="buditodo.done ? 'is-success' : 'is-light'"
                class="button"
              >
                {{ buditodo.done ? "In Progress..." : "Do This" }}
              </button>
              <button @click="deleteTodoBudi(buditodo.id)" class="button is-danger">
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
  
  const buditodosCollectionQuery = query(
    collection(db, "buditodos"),
    orderBy("deadline", "asc"),
    // limit(10)
  );
  const buditodos = ref([]);
  
  onMounted(() => {
    onSnapshot(buditodosCollectionQuery, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
        const buditodo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done,
          time: doc.data().time,
          author: doc.data().author,
          deadline: doc.data().deadline,
          deadlineTime: doc.data().deadlineTime,
        };
  
        fbTodos.push(buditodo);
      });
      buditodos.value = fbTodos;
    });
  });
  
  const budinewTodo = ref("");
  const budiauthor = ref("");
  const budideadline = ref("");
  const budideadlineTime = ref("");
  
  const addTodoBudi = () => {
    const todoData = {
      content: budinewTodo.value,
      done: false,
      time: new Date().toLocaleString(),
      author: budiauthor.value,
      deadline: budideadline.value,
      deadlineTime: budideadlineTime.value,
    };
  
    addDoc(collection(db, "buditodos"), todoData);
  
    budinewTodo.value = "";
    budideadline.value = "";
    budiauthor.value = "";
    budideadlineTime.value = "";
  };
  
  const deleteTodoBudi = async (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "budi1212") {
      updateDoc(doc(db, "buditodos", id), {
        doneTime: new Date().toLocaleString(),
      });
  
      const deletedTask = await getDoc(doc(db, "buditodos", id));
      if (deletedTask.exists()) {
        const deletedData = deletedTask.data();
        await addDoc(collection(db, "budiselesai"), deletedData);
        deleteDoc(doc(db, "buditodos", id));
      }
    } else {
      alert("Password anda salah");
    }
  };
  
  const toggleDoneBudi = (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "budi1212") {
      const index = buditodos.value.findIndex((buditodo) => buditodo.id === id);
      updateDoc(doc(collection(db, "buditodos"), id), {
        done: !buditodos.value[index].done,
      });
    } else {
      alert("Password anda salah")
    }
  };
  </script>
  
  <style>
  
  </style>
  