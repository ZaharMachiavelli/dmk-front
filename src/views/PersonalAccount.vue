<template>
  <div class="profile" v-if="!loading">
    <h2>
      Профиль пользователя <span>{{ user.username }}</span>
    </h2>
    <div class="grid-container">
      <h3>Личная информация</h3>
      <form class="input-grid">
        <input
          v-model="person.first_name"
          placeholder="Ваше имя"
          class="profile-input a"
        />
        <input
          v-model="person.last_name"
          placeholder="Ваша фамилия"
          class="profile-input b"
        />
        <input
          v-model="person.email"
          placeholder="Ваш email"
          class="profile-input c"
        />
        <textarea
          v-model="person.biography"
          placeholder="Немного о себе..."
          class="biography"
        >
        </textarea>
        <button class="save" @click="addInfo">Сохранить</button>
      </form>

      <h3>Избранные курсы</h3>
      <div class="fav-disciplines" v-if="courses.length">
        <Discipline
          v-for="(card, index) in courses"
          :key="index"
          :cards="[card]"
          :last="true"
          :link="card.slug"
        />
      </div>
      <p v-else class="no-result">Ваш список избранного пуст</p>

      <h3>Избранные карты</h3>
      <div v-if="presets.length">
        <div v-for="(profession, id) in presets" :key="id">
          <h5>{{ profession.name }}</h5>
          <div class="course-wide">
            <Discipline
              v-for="(step, index) in prepareObject(profession)"
              :key="index"
              :cards="step"
              :last="index == 'tenth'"
            />
          </div>
        </div>
      </div>
      <p v-else class="no-result">У вас пока нет избранных карт</p>
    </div>
  </div>
  <Loader v-else />
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
      presets: [],
    };
  },
  methods: {
    async addInfo(e) {
      e.preventDefault();
      await ScheduleApi.patchInfo(this.person);
      this.$store.dispatch("FETCH_user");
    },
    prepareObject(object) {
      let profession = JSON.parse(JSON.stringify(object));
      delete profession.id;
      delete profession.name;
      delete profession.description;
      delete profession.tag;
      for (let key in profession) {
        if (!profession[key].length) delete profession[key];
      }
      return profession;
    },
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
    this.presets = await ScheduleApi.getPresets(this.person.presets);
    this.courses = await ScheduleApi.getFavouriteCourses(
      this.person.favourites
    );
    console.log(this.courses);
    this.loading = false;
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

.course-wide {
  display: flex;
  flex-wrap: wrap;
}

.no-result {
  font-weight: 600;
  color: #72808e;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 22px;
}

.profile h5 {
  text-align: center;
}

@media (max-width: 767px) {
  .course-wide {
    flex-direction: column;
  }
}
</style>