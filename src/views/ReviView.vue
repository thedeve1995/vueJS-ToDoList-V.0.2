<template lang="">
    <form class="addform" @submit.prevent="addTodoRevi">
      <div class="input-form">
        <div class="field has-addons">
          <div class="control">
            <label for="newTodo">Task</label>
            <input
              id="newTodo"
              v-model="revinewTodo"
              class="input"
              type="text"
              placeholder="Add A Task"
            />
          </div>
          <div class="control">
            <label for="author">Poster</label>
            <input
              id="author"
              v-model="reviauthor"
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
              v-model="revideadline"
              class="input"
              type="date"
            />
          </div>
          <div class="control" id="dTime">
            <label for="deadlineTime">Deadline Time</label>
            <input
              id="deadlineTime"
              title="DeadlineTime"
              v-model="revideadlineTime"
              class="input"
              type="time"
            />
          </div>
          <div class="control">
            <label style="color: transparent" for="">.</label>
            <button :disabled="!revinewTodo" class="button is-info">
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
        v-for="revitodo in revitodos"
        :class="{ 'has-background-success-light': revitodo.done }"
        class="task-card"
      >
        <div class="card-content">
          <div class="content">
            <div
              style="text-align: center"
              :class="{ '-line-through-': revitodo.done }"
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
                <h3>{{ revitodo.content }}</h3>
                <p style="color: black; font-weight: 700; padding: 5px 10px">
                  Poster : {{ revitodo.author }}
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
                Posted@ | {{ revitodo.time }}
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
                Deadline : {{ revitodo.deadline }} | {{ revitodo.deadlineTime }}
              </p>
            </div>
            <div class="btn-group">
              <button
                @click="toggleDoneRevi(revitodo.id)"
                :class="revitodo.done ? 'is-success' : 'is-light'"
                class="button"
              >
                {{ revitodo.done ? "In Progress..." : "Do This" }}
              </button>
              <button @click="deleteTodoRevi(revitodo.id)" class="button is-danger">
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
  
  const revitodosCollectionQuery = query(
    collection(db, "revitodos"),
    orderBy("deadline", "asc"),
    // limit(10)
  );
  const revitodos = ref([]);
  
  onMounted(() => {
    onSnapshot(revitodosCollectionQuery, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
        const revitodo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done,
          time: doc.data().time,
          author: doc.data().author,
          deadline: doc.data().deadline,
          deadlineTime: doc.data().deadlineTime,
        };
  
        fbTodos.push(revitodo);
      });
      revitodos.value = fbTodos;
    });
  });
  
  const revinewTodo = ref("");
  const reviauthor = ref("");
  const revideadline = ref("");
  const revideadlineTime = ref("");
  
  const addTodoRevi = () => {
    const todoData = {
      content: revinewTodo.value,
      done: false,
      time: new Date().toLocaleString(),
      author: reviauthor.value,
      deadline: revideadline.value,
      deadlineTime: revideadlineTime.value,
    };
  
    addDoc(collection(db, "revitodos"), todoData);
  
    revinewTodo.value = "";
    revideadline.value = "";
    reviauthor.value = "";
    revideadlineTime.value = "";
  };
  
  const deleteTodoRevi = async (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "revi1212") {
      updateDoc(doc(db, "revitodos", id), {
        doneTime: new Date().toLocaleString(),
      });
  
      const deletedTask = await getDoc(doc(db, "revitodos", id));
      if (deletedTask.exists()) {
        const deletedData = deletedTask.data();
        await addDoc(collection(db, "reviselesai"), deletedData);
        deleteDoc(doc(db, "revitodos", id));
      }
    } else {
      alert("Password anda salah");
    }
  };
  
  const toggleDoneRevi = (id) => {
    let password = prompt("Tolong Passwordnya");
    if (password === "revi1212") {
      const index = revitodos.value.findIndex((revitodo) => revitodo.id === id);
      updateDoc(doc(collection(db, "revitodos"), id), {
        done: !revitodos.value[index].done,
      });
    } else {
      alert("Password anda salah")
    }
  };
  </script>
  
  <style>
  
  </style>
  