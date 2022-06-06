<template>
  <div class="container-course">
    <div class="container-course-header">
      <h2>Каталог курсов</h2>
      <SearchInput @updateValue="(value) => (search = value)" />
    </div>
    <p class="test-description">
      Здесь вы можете увидеть все доступные курсы для обучения. Нажмите на
      любой, чтобы узнать о нем подробнее
    </p>
    <div v-if="courses.filter((el) => el.name.includes(search)).length">
      <router-link
        v-for="(course, index) in courses
          .sort()
          .filter((el) => el.name.includes(search))"
        :key="index"
        :to="`/courses/${course.slug}`"
        class="course-name"
      >
        <h4>{{ course.name }}</h4>
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
      </router-link>
    </div>
    <p class="no-result" v-else>
      Ничего не найдено... Попробуйте изменить параметры поиска
    </p>
  </div>
</template>

<script>
import { ScheduleApi } from "@/api/schedule.js";
export default {
  data() {
    return {
      courses: [],
      search: "",
    };
  },
  methods: {
    updateValue(string) {
      console.log(string);
    },
    async changeFavourite(id) {
      if (this.$store.state.user.favourites.includes(id)) {
        await ScheduleApi.patchInfo({
          favourites: this.$store.state.user.favourites.map((el) => el != id),
        });
      } else {
        await ScheduleApi.patchInfo({
          favourites: [...this.$store.state.user.favourites, id],
        });
      }
    },
  },
  async created() {
    this.courses = await ScheduleApi.getCourses();
    console.log(this.courses);
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
}

.course-name {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>