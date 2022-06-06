<template>
  <div class="container-course">
    <p class="course-title">
      Ваша профессия: <strong>{{ profession.name }}</strong>
    </p>
    <p>
      Если вы хотите повысить собственную квалификацию вне учебного процесса, мы
      готовы порекомендовать вам данные курсы:
    </p>
    <ul class="course-list">
      <li v-for="(course, index) in courses" :key="index">
        <a :href="course.link">{{ course.name }}</a>
        <span> (Автор курса: {{ course.agregator }})</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { profession: Object },
  data() {
    return {
      courses: [
        {
          name: "Курс по дизайну от Skillbox",
          link: "https://vk.com/maks3722",
          agregator: "Skillbox",
        },
      ],
    };
  },
};
</script>

<style>
.container-course {
  margin-top: 30px;
}

.course-title {
  text-align: center;
  font-size: 22px;
  line-height: 22px;
  letter-spacing: -0.02;
  margin-bottom: 15px;
}
</style>