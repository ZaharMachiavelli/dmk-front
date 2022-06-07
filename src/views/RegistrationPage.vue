<template>
  <div class="sign-up">
    <h2>
      {{ registration ? "Регистрация пользователя" : "Вход в личный кабинет" }}
    </h2>
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="field">
          <label>Логин</label>
          <div class="control">
            <input
              type="text"
              :class="{
                input: true,
                error: v$.username.$error && v$.username.required,
              }"
              v-model="username"
            />
            <p
              class="message-alert"
              v-if="v$.username.$error && v$.username.required"
            >
              Обязательное поле
            </p>
          </div>
        </div>

        <div class="field">
          <label>Пароль</label>
          <div class="control">
            <input
              type="password"
              :class="{
                input: true,
                error: v$.password.$error && v$.password.required,
              }"
              v-model="password"
            />
            <p
              class="message-alert"
              v-if="v$.password.$error && v$.password.required"
            >
              Обязательное поле
            </p>
          </div>
        </div>

        <div class="field" v-if="registration">
          <label>Повторите пароль</label>
          <div class="control">
            <input
              type="password"
              :class="{
                input: true,
                error: v$.password2.$error,
              }"
              v-model="password2"
            />
            <p class="message-alert" v-if="v$.password2.$error">
              Пароли не совпадают
            </p>
          </div>
        </div>

        <div class="field">
          <div class="control" style="text-align: center">
            <button class="black-btn" @click="submitForm">
              {{ registration ? "Зарегистрироваться" : "Войти" }}
            </button>
          </div>
        </div>
        <p v-if="registration" class="footnote">
          Уже зарегистрированы?
          <router-link :to="{ name: 'Login' }">Войдите</router-link>, чтобы
          авторизоваться
        </p>
        <p v-else class="footnote">
          Нет аккаунта?
          <router-link to="/signup">Зарегистрируйтесь</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import {getToken} from '@api/schedule';
import useValidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
import {HOST} from "@/api/schedule.js";
export default {
  data() {
    return {
      v$: useValidate(),
      username: "",
      password: "",
      password2: "",
    };
  },
  validations() {
    return {
      username: { required },
      password: { required },
      password2: this.registration
        ? { sameAsPassword: sameAs(this.password) }
        : {},
    };
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();
      let formData = {
        username: this.username,
        password: this.password,
      };
      this.v$.$touch();
      console.log(this.v$);
      if (!this.v$.$invalid) {
        if (this.registration) {
          await axios
            .post(`${HOST}/auth/users/`, formData)
            .then(() => this.$router.push("/login"))
            .catch((error) => {
              console.error(error);
            });
        } else {
          let result = await axios
            .post(
              `${HOST}/auth/token/login/`,
              formData
            )
          console.log(result.data);
          document.cookie = `key=${result.data.auth_token}`;
          axios.defaults.headers.common["Authorization"] = `Token ${result.data.auth_token}`;
          this.$store.commit("changeAuth");
          this.$store.dispatch("FETCH_user");
          this.$router.push({ path: '/schedule' });
        }
      }
    },
  },
  computed: {
    registration() {
      return this.$route.name == "Signup" ? true : false;
    },
  },
};
</script>

<style scoped>
h2,
.footnote {
  text-align: center;
}

.message-alert {
  font-size: 12px;
  color: red;
  position: absolute;
  bottom: -12px;
  left: 0;
  font-weight: bold;
}

.control {
  position: relative;
}
.input.error {
  border: 2px solid red;
}

.input.error:focus-visible {
  border: 2px solid red;
}

.control input {
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  padding: 5px 15px;
  overflow: hidden;
  width: 100%;
  margin: 10px 0 15px;
}

.form-container {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

form {
  padding: 15px 20px;
  border: 1px solid black;
  width: 600px;
  margin: 0 auto;
  border-radius: 6px;
}

button {
  text-decoration: none;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  color: #fff;
  text-align: center;
  min-width: 100px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding: 14px 16px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: background-color 0.1s linear;
  -moz-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
  background-color: #000;
  border: 1px solid #000;
  cursor: pointer;
  margin: 0 auto;
}
</style>