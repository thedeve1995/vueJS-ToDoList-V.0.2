<template lang="">
    <form class="addform" @submit.prevent="addTodoSurip">
      <div class="input-form">
        <div class="field has-addons">
          <div class="control">
            <label for="newTodo">Task</label>
            <input
              id="newTodo"
              v-model="suripnewTodo"
              class="input"
              type="text"
              placeholder="Add A Task"
            />
          </div>
          <div class="control">
            <label for="author">Poster</label>
            <input
              id="author"
              v-model="suripauthor"
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
              v-model="suripdeadline"
              class="input"
              type="date"
            />
          </div>
          <div class="control" id="dTime">
            <label for="deadlineTime">Deadline Time</label>
            <input
              id="deadlineTime"
              title="DeadlineTime"
              v-model="suripdeadlineTime"
              class="input"
              type="time"
            />
          </div>
          <div class="control">
            <label style="color: transparent" for="">.</label>
            <button :disabled="!suripnewTodo" class="button is-info">
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
        v-for="suriptodo in suriptodos"
        :class="{ 'has-background-success-light': suriptodo.done }"
        class="task-card"
      >
        <div class="card-content">
          <div class="content">
            <div
              style="text-align: center"
              :class="{ '-line-through-': suriptodo.done }"
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
                <h3>{{ suriptodo.content }}</h3>
                <p style="color: black; font-weight: 700; padding: 5px 10px">
                  Poster : {{ suriptodo.author }}
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
                Posted@ | {{ suriptodo.time }}
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
                Deadline : {{ suriptodo.deadline }} | {{ suriptodo.deadlineTime }}
              </p>
            </div>
            <div class="btn-group">
              <button
                @click="toggleDoneSurip(suriptodo.id)"
                :class="suriptodo.done ? 'is-success' : 'is-light'"
                class="button"
              >
                {{ suriptodo.done ? "In Progress..." : "Do This" }}
              </button>
              <button @click="deleteTodoSurip(suriptodo.id)" class="button is-danger">
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
  
  const suriptodosCollectionQuery = query(
    collection(db, "suriptodos"),
    orderBy("deadline", "asc"),
    // limit(10)
  );
  const suriptodos = ref([]);
  
  onMounted(() => {
    onSnapshot(suriptodosCollectionQuery, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
        const suriptodo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done,
          time: doc.data().time,
          author: doc.data().author,
          deadline: doc.data().deadline,
          deadlineTime: doc.data().deadlineTime,
        };
  
        fbTodos.push(suriptodo);
      });
      suriptodos.value = fbTodos;
    });
  });
  
  const suripnewTodo = ref("");
  const suripauthor = ref("");
  const suripdeadline = ref("");
  const suripdeadlineTime = ref("");
  
  const addTodoSurip = () => {
    const todoData = {
      content: suripnewTodo.value,
      done: false,
      time: new Date().toLocaleString(),
      author: suripauthor.value,
      deadline: suripdeadline.value,
      deadlineTime: suripdeadlineTime.value,
    };
  
    addDoc(collection(db, "suriptodos"), todoData);
  
    suripnewTodo.value = "";
    suripdeadline.value = "";
    suripauthor.value = "";
    suripdeadlineTime.value = "";
  };
  
  const deleteTodoSurip = async (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "surip1212") {
      updateDoc(doc(db, "suriptodos", id), {
        doneTime: new Date().toLocaleString(),
      });
  
      const deletedTask = await getDoc(doc(db, "suriptodos", id));
      if (deletedTask.exists()) {
        const deletedData = deletedTask.data();
        await addDoc(collection(db, "suripselesai"), deletedData);
        deleteDoc(doc(db, "suriptodos", id));
      }
    } else {
      alert("Password anda salah");
    }
  };
  
  const toggleDoneSurip = (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "surip1212") {
      const index = suriptodos.value.findIndex((suriptodo) => suriptodo.id === id);
      updateDoc(doc(collection(db, "suriptodos"), id), {
        done: !suriptodos.value[index].done,
      });
    } else {
      alert("Password anda salah")
    }
  };
  </script>
  
  <style>
  
  </style>
  