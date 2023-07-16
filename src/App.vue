<script setup>
import { RouterLink, RouterView } from 'vue-router'

// function login() {
//   event.preventDefault();
//   var username = document.getElementById("username").value;
//   var password = document.getElementById("password").value;
  
//   if (username === "dani95" && password === "dani1212") {
//     var loginContainer = document.querySelector(".login-container");
//     loginContainer.style.display = "none";
//   } else {
//     alert("Username atau password salah.");
//   }
// }
</script>

<template>
  <!-- <div class="login-container">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />

    <h1 class="title has-text-white is-size-1" >ToDoList App</h1>
    
    <form>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
     
      <button @click="login()" class="tombol-login">Masuk</button>
    </form>
  </div> -->
  <header>
    <h1 class="title has-text-white is-size-8" >My To Do List <br> <i>(Beta Version)</i></h1>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Tugas</RouterLink> 
        <RouterLink to="/done">Tugas Done</RouterLink> 
        <RouterLink to="/buyrequest">Request Beli</RouterLink> 
        <RouterLink to="/pinjam">Pinjam Barang</RouterLink> 
        <RouterLink to="/pinjamSelesai">Pinjam Selesai </RouterLink> 
        <RouterLink to="/barangMasuk">Barang Masuk </RouterLink> 
        <RouterLink to="/perbaikan">Perbaikan </RouterLink> 
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style>
@import 'node_modules\bulma\css\bulma.min.css';
form {
  margin-top: 20px;
  width: 35%;
}



label {
  display: block;
  margin-bottom: 8px;
  color: #e6e6e6;
}


header {
  line-height: 1.5;
  max-height: 100vh;
  place-content: center;
}

header .title{
  text-align: center;
  color:aliceblue;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 15px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: white;
  background-color: rgb(91, 194, 91);
  border-radius: 10px;
  font-weight: 700;
}

nav a.router-link-exact-active:hover {
  background-color: rgb(91, 194, 91);
}

nav a {
  display: inline-block;
  margin-top: 10px;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: white;
  border-radius: 10px;
}

nav a:hover{
  background-color: rgb(91, 194, 91);
}

nav a:first-of-type {
  border: 0;
}

h1{
  text-align: center;
}

@media (max-width:800px) {
  form {
  margin-top: 20px;
  width: 90%;
}

  nav a{
  width: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  }
}
</style>
