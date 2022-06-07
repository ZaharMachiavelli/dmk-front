<template>
  <div v-if="active">
    <p class="graph-title">Общий график за {{ year }} год</p>
    <Bar
      v-if="data != null"
      :chart-options="data.options"
      :chart-data="data.chartData"
      :dataset-id-key="1"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
ChartJS.defaults.plugins.title.display = true;
ChartJS.defaults.plugins.legend.display = false;

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    year: { String },
    active: { Boolean },
    chartId: {
      type: String,
      default: "bar-chart",
    },

    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 800,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  methods: { getGraphes },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
      data: null,
    };
  },
  async mounted() {
    // await getApiGraphes(2017);
    await getGraphes(2017).then((res) => (this.data = res.data));
    // this.data = await Api.getApiGraphes(this.year)
    // console.log(this.data.programmer);
  },
};
</script>

<style scoped>
.d {
  display: none;
}

.d.choosed {
  display: block;
}

.graph-title {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
</style>