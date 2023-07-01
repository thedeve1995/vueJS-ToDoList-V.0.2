<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="login-container">
    <h2>Silakan Masuk</h2>
    <form>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      
      <button type="submit">Masuk</button>
    </form>
  </div>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />

    <h1 class="title has-text-white is-size-1" >To Do List App by Vue</h1>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/done">Done</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import 'node_modules\bulma\css\bulma.min.css';

.login-container {
  position: fixed;
  display: none;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

h2 {
  text-align: center;
  color: #110c0c;
  font-size: 35px;

}

form {
  margin-top: 20px;
  width: 35%;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
  border: none;
  background-color: #4CAF50;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
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
  font-size: 25px;
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


</style>
