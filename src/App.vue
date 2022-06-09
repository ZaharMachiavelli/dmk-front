<template>
  <section id="app">
    <Sidebar />
    <div class="main">
      <header v-if="!$store.state.analytics">
        <router-link to="/schedule">Главная</router-link>
        <router-link to="/test">Тест на профориентацию</router-link>
        <router-link to="/skills">Графики</router-link>
        <router-link to="/courses">Каталог курсов</router-link>
        <router-link to="/login" v-if="!$store.state.isAuth">Войти</router-link>
        <router-link to="/me" v-else>Профиль</router-link>
      </header>
      <header v-else>
        <router-link to="/">Главная</router-link>
        <router-link to="/analytics">Графики</router-link>
        <router-link to="/login" v-if="!$store.state.isAuth">Войти</router-link>
        <router-link to="/me" v-else>Профиль</router-link>
      </header>
      <router-view style="padding: 50px 30px; height: 100%" />
    </div>
  </section>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import axios from "axios";
import { getToken } from "@/api/schedule";
export default {
  name: "main",
  components: { Sidebar },
  methods: {
    getToken,
  },
  async created() {
    if (this.getToken()) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Token ${this.getToken()}`;
      this.$store.commit("changeAuth");
      this.$store.dispatch("FETCH_user");
    }
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
}

body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
}

body * {
  box-sizing: border-box;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.footer {
  background-color: black;
  padding: 30px 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  color: white;
}

header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  height: 50px;
  position: fixed;
  width: calc(100% - 80px);
}

header a {
  text-decoration: none;
  font-size: 18px;
  color: #ccc;
}

header a:hover {
  text-decoration: underline;
  transform: scale(1.2);
}

.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
