<template>
  <div class="sidebar">
    <!-- <router-link to="/">Главная</router-link>
    <router-link to="/">Общая аналитика</router-link>
    <router-link to="/graphes">Графики</router-link>
    <router-link to="/">Программисты</router-link>
    <router-link to="/">Динамика</router-link>
    <router-link to="/">Методика отбора</router-link> -->
    <div class="icons">
      <router-link to="/"><img src="../assets/statistic.svg" /></router-link>
      <router-link to="/schedule"><img src="../assets/learning.svg"/></router-link>
    </div>
  </div>
</template>

<style>
.sidebar {
  background-color: #08070E;
  flex: 0 0 80px;
  top: 0;
  height: 100vh;
  position: sticky;
  display: flex;
  align-items: center;
}

/* .sidebar ul {
  padding: 0;
}

.sidebar ul li {
  list-style-type: none;
}

.sidebar a {
  color: white;
  display: inline-block;
  width: 100%;
  padding: 20px 0;
  text-align: center;
  transition: 0.2s ease all;
  font-size: 1rem;
  text-decoration: none;
}

.sidebar a:hover {
  background-color: #be3076;
  transition: 0.2s ease all;
}

.sidebar .router-link-active {
  background-color: #a9275c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
} */

.icons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25%;
}
</style>