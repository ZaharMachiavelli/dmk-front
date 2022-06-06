<template>
  <div class="container">
    <h2>Графики</h2>
    <div class="select_item">
      <label><strong>Выберите год:</strong></label>
      <select class="select"  v-model="activeGraph">
        <option
          :value="year"
          v-for="(year, index) in years"
          :key="index"
          :selected="i == 0"
        >
          {{ year }}
        </option>
      </select>
      <div class="grid_container1">
        <!-- <canvas class="d" id="oilChart" width="300" height="100"  style="display:block"></canvas> -->
        <Graph 
            :active="activeGraph == years[i]"
            v-for="(year, i) in years"
            :key="i"
            :year="year"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Graph from '@/components/Graph.vue';
export default {
  name: "graphes",
  components: {Graph},
  data() {
    return {
      years: ["2021", "2020", "2019", "2018", "2017", "2017-2021"],
      activeGraph: 2021,
    };
  },
  created() {
    this.$store.commit("changeActiveLink", "graph");
  },
};
</script>

<style>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.grid-container1 p {
  text-align: center;
}
</style>