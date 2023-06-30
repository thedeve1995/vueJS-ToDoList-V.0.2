<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <h1 class="title has-text-white" >To Do List App by Vue</h1>

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
