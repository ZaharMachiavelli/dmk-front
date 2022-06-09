<template>
  <div class="container-course" v-if="!loading">
    <div class="container-course-header">
      <h2>Каталог курсов</h2>
      <SearchInput @updateValue="(value) => (search = value)" />
    </div>
    <p class="test-description">
      Здесь вы можете увидеть все доступные курсы для обучения. Нажмите на
      любой, чтобы узнать о нем подробнее
    </p>
    <div v-if="courses.filter((el) => el.name.toLowerCase().includes(search.toLowerCase())).length">
      <div
        v-for="(course, index) in courses
          .sort()
          .filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))"
        :key="index"
        class="course-container"
      >
        <router-link :to="`/courses/${course.slug}`" class="course-name">
          <h4>{{ course.name }}</h4>
        </router-link>
        <img
          :src="
            require($store.state.user.favourites.includes(course.id)
              ? '../assets/favourite.svg'
              : '../assets/no-favourite.svg')
          "
          v-if="$store.state.isAuth"
          class="favourite-icon"
          @click="changeFavourite(course.id)"
        />
      </div>
    </div>
    <p class="no-result" v-else>
      Ничего не найдено... Попробуйте изменить параметры поиска
    </p>
  </div>
  <Loader v-else />
</template>

<script>
import { ScheduleApi } from "@/api/schedule.js";
export default {
  data() {
    return {
      courses: [],
      search: "",
      loading: false,
    };
  },
  methods: {
    updateValue(string) {
      console.log(string);
    },
    async changeFavourite(id) {
      if (this.$store.state.user.favourites.includes(id)) {
        await ScheduleApi.patchInfo({
          favourites: this.$store.state.user.favourites.filter(
            (el) => el != id
          ),
        });
      } else {
        await ScheduleApi.patchInfo({
          favourites: [...this.$store.state.user.favourites, id],
        });
      }
      this.$store.dispatch("FETCH_user");
    },
  },
  async created() {
    this.loading = true;
    this.$store.commit("setLink", false);
    this.courses = await ScheduleApi.getCourses();
    this.loading = false;
  },
};
</script>

<style>
.test-description {
  font-weight: 600;
  color: #72808e;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 22px;
}

.container-course * {
  text-align: center;
}

.container-course a {
  color: #2d4f9f;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.container-course a:hover {
  text-decoration: underline;
}

.container-course-header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 15px;
  text-align: left;
}

.container-course-header * {
  text-align: start;
}

.favourite-icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
}

.course-name {
  display: flex;
  justify-content: center;
  align-items: center;
}

.course-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>