<template>
  <div class="courses-list" v-if="courses">
    <SearchInput @updateValue="(value) => (search = value)" />
    <div
      class="discipline-list"
      v-if="courses.filter((el) => el.name.includes(search)).length"
    >
      <Discipline
        v-for="(card, index) in courses.filter((el) =>
          el.name.includes(search)
        )"
        :key="index"
        :cards="[card]"
        :last="true"
      />
    </div>
    <p class="no-result" v-else>
      Ничего не найдено... Попробуйте изменить параметры поиска
    </p>
  </div>
</template>

<script>
import Discipline from "@/components/schedule/Discipline.vue";
import { ScheduleApi } from "@/api/schedule.js";
export default {
  components: { Discipline },
  data() {
    return {
      search: "",
      courses: [],
    };
  },
  async created() {
    this.courses = await ScheduleApi.getCourses();
    console.log(this.courses);
  },
};
</script>

<style>
.discipline-list {
  display: grid;
  grid-gap: 15px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  margin-top: 20px;
}

.courses-list {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: flex-end;
  padding: 0 20px;
}

.no-result {
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  color: #ccc;
}
</style>