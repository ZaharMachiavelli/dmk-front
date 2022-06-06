<template>
  <h2 class="result-title">Результаты теста</h2>
  <div class="test-result">
    <TestResultLine
      v-for="(p, id) in professions"
      :key="id"
      :profession="p"
      :winner="p.points == maxValue"
    />
  </div>
</template>

<script>
import TestResultLine from "@/components/schedule/Test/TestResultLine.vue";
export default {
  props: { result: Object },
  components: { TestResultLine },
  data() {
    return {
      professions: [],
      maxValue: null,
    };
  },
  created() {
    for (let el in this.result) {
      //   if (this.result[el].points > winner.points) {
      //     winner = JSON.parse(JSON.stringify(this.result[el]));
      //   }
      this.professions.push(this.result[el]);
    }
    this.professions = this.professions.sort((a, b) => b.points - a.points);
    this.maxValue = this.professions[0].points;
    console.log(this.maxValue);
  },
};
</script>

<style>
.test-result {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px auto;
}

.result-title {
  text-align: center;
}
</style>