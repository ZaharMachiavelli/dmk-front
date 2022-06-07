<template>
  <div class="profile" v-if="!loading">
    <h2>
      Профиль пользователя <span>{{ user.username }}</span>
    </h2>
    <div class="grid-container">
        <h3>Личная информация</h3>
      <form class="input-grid">
        <input :value="user.first_name" @input="changeBio" placeholder="Ваше имя" class="profile-input a" />
        <input :value="user.last_name" @input="changeBio" placeholder="Ваша фамилия" class="profile-input b" />
        <input :value="user.email" @input="changeBio" placeholder="Ваш email" class="profile-input c" />
        <textarea :value="user.biography" @input="changeBio" placeholder="Немного о себе..." class="biography"> </textarea>
        <button class="save" @click="addInfo">Сохранить</button>
      </form>

    <h3>Избранные курсы</h3>
      <div class="fav-disciplines">
        <Discipline
        v-for="(card, index) in $store.state.user.favourites"
        :key="index"
        :cards="[card]"
        :last="true"
      />
      </div>
    </div>
  </div>
  <Loader  v-else/>
</template>

<script>
import { mapState } from "vuex";
import Discipline from "@/components/schedule/Discipline.vue";
import { ScheduleApi } from "@/api/schedule.js";
export default {
  components: { Discipline },
  data() {
      return {
          courses: [],
          loading: false,
          person: null,
      }
  },
  methods: {
    addInfo() {
      console.log('gg');
    }
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.isAuth,
      user: (state) => state.user,
    }),
  },
  async created() {
    this.loading = true;
    this.person = JSON.parse(JSON.stringify(this.$store.state.user));
    this.courses = await ScheduleApi.getCourses();
    console.log(this.courses);
    this.loading  =false;
  },
  mounted() {
    console.log(this.user);
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 20px;
}

.grid-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
}

h2 span {
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
}

h3 {
    margin-bottom: 15px;
}
.input-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "a b c"
    "d d d";
  width: 100%;
}

.fav-disciplines {
    display: flex;
    flex-wrap: wrap;
}

.fav-disciplines div {
    margin-right: 15px;
}

.a {
  grid-area: a;
}

.b {
  grid-area: b;
}

.c {
  grid-area: c;
}

.profile-input {
  padding: 0 10px;
  font-size: 16px;
  line-height: 18px;
  height: 40px;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
}

.biography {
  min-height: 150px;
  padding: 15px;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
  grid-area: d;
  resize: none;
}

.save {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  cursor: pointer;
  height: 40px;
}

.save:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
</style>