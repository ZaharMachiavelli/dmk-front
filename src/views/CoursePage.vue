<template>
  <div class="course-page-container" v-if="course">
    <div class="course-page-info">
      <h1>{{ course.name }}</h1>
      <div class="course-page-main">
        <img :src="course.image_link" />
        <p class="course-page-desc">{{ course.description }}</p>
      </div>
      <a :href="course.link" style="width: fit-content"
        >Ссылка на прохождение курса</a
      >
    </div>

    <div class="course-page-author">
      <strong
        >Автор курса:
        <a :href="course.agregator.link">{{ course.agregator.name }}</a></strong
      >
    </div>
  </div>
</template>

<script>
import { ScheduleApi } from "@/api/schedule.js";
export default {
  data() {
    return {
      course: null,
    };
  },
  async created() {
    this.$store.commit("setLink", false);
    this.course = await ScheduleApi.getCourses(`/${this.$route.params.course}`);
    console.log(this.course);
  },
};
</script>

<style>
.course-page-desc {
  font-weight: 500;
  font-style: italic;
  font-size: 16px;
}

.course-page-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.course-page-main img {
  padding: 10px;
  border: 3px solid black;
  margin-right: 10px;
  border-radius: 5px;
  width: 300px;
  height: 200px;
  object-fit: contain;
}

.course-page-container a {
  text-decoration: none;
  color: #2d4f9f;
}

.course-page-container a:hover {
  text-decoration: underline;
}

.course-page-author {
  margin-top: 20px;
  font-size: 18px;
}

.course-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.course-page-info {
  display: flex;
  flex-direction: column;
}
</style>