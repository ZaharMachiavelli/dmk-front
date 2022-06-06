<template>
  <div style="display: flex" class="container">
    <div class="main-content mc-a">
      <h1>Аналитика вакансий</h1>
      <br />
      <div class="graph-container">
        <div class="select-year">
          <span>Выберите год:</span>
          <select class="select" name="year" id="year" v-model="year">
            <option
              :value="year"
              v-for="(year, index) in years"
              :key="index"
              :selected="i == 0"
            >
              {{ year }}
            </option>
          </select>
        </div>

        <p class="graph-title">{{ year }} год</p>
        <Bar
          :chart-options="options"
          :chart-data="chartData"
          :dataset-id-key="1"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
      </div>
      <div class="table-container">
        <table>
          <tr>
            <th>Профессия</th>
            <th>Количество вакансий</th>
          </tr>
          <tr v-for="(prof, name) in data" :key="prof">
            <td>
              {{ dictionary[name].name }}
            </td>
            <td>
              {{ prof }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { ScheduleApi } from "@/api/schedule.js";
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
  components: {
    Bar,
  },
  data() {
    return {
      tableData: [],
      years: ["2021", "2020", "2019", "2018", "2017", "2017-2021"],
      selectYear: 2021,
      height: 500,
      width: 900,
      year: 2021,
      dictionary: {
        programmer: { name: "Программист", order: 1 },
        erp: { name: "ERP", order: 2 },
        manager: { name: "Менеджер IT-проекта", order: 3 },
        sysadmin: { name: "Системный администратор", order: 4 },
        analyst: { name: "Аналитик", order: 5 },
        marketing: { name: "Специалист по интернет-маркетингу", order: 6 },
        support: { name: "Специалист техподдержки", order: 7 },
        sysengineer: { name: "Системный инженер и QA инженер", order: 8 },
        web: { name: "Веб", order: 9 },
        engineer: { name: "Инженер", order: 10 },
        devops: { name: "Devops", order: 11 },
        mobile: { name: "Mobile-разработчик", order: 12 },
        designeer: { name: "UX/UI дизайнер", order: 13 },
        director: { name: "Руководитель", order: 14 },
        datascience: { name: "Data Science", order: 15 },
        gamedev: { name: "GameDev", order: 16 },
        specialist: { name: "IT-специалист", order: 17 },
        security: {
          name: "Специалист по информационной безопасности",
          order: 18,
        },
        admindb: { name: "Администратор баз данных", order: 19 },
        sysproger: { name: "Системный программист", order: 20 },
        notit: { name: "Не относятся к IT", order: 21 },
      },
      chartData: {
        labels: [],
        datasets: [
          {
            fill: false,
            title: "Тайтл",
            lineTension: 0,
            data: [],
            backgroundColor: [
              "rgba(241, 58, 19, 0.8)",
              "rgba(157, 161, 170, 0.8)",
              "rgba(216, 27, 96, 0.8)",
              "rgba(120, 88, 64, 0.8)",
              "rgba(204, 255, 250, 0.8)",
              "rgba(0, 123, 167, 0.8)",
              "rgba(30, 33, 61, 0.8)",
              "rgba(255, 140, 105, 0.8)",
              "rgba(119, 221, 231, 0.8)",
              "rgba(102, 0, 102, 0.8)",
              "rgba(175, 218, 252, 0.8)",
              "rgba(117, 51, 19, 0.8)",
              "rgba(76, 187, 23, 0.8)",
              "rgba(216, 169, 3, 0.8)",
              "rgba(0, 100, 0, 0.8)",
              "rgba(146, 0, 10, 0.8)",
              "rgba(237, 118, 14, 0.8)",
              "rgba(93, 118, 203, 0.8)",
              "rgba(100, 28, 52, 0.8)",
              "rgba(234, 137, 154, 0.8)",
              "rgba(133, 133, 133, 0.8)",
            ],
            borderColor: "rgba(123, 0, 28, 1)",
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
      data: null,
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Общий график за 2017 год",
          position: "top",
          fontSize: 16,
          padding: 20,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    setData(data) {
      this.chartData.labels= [];
      let array = [];
      this.data = Object.keys(data)
        .filter((el) => this.dictionary[el])
        .sort((a, b) => this.dictionary[a].order - this.dictionary[b].order)
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});
      // отсортировал объект по ключу в зависимости от их order в dictionary, проверяй
      for (let key in this.data) {
        this.chartData.labels.push(
          `${this.dictionary[key].name} ${this.data[key]}`
        );
        array.push(this.data[key]);
      }
      this.chartData.datasets[0].data = array;
    },
    async getStatistic() {
      await ScheduleApi.getStatistic(this.year).then((res) =>
        this.setData(res)
      );
    },
  },
  async created() {
    console.log("fwf");
    await this.getStatistic();
    // this.chartData = dataGraphes.year2021.chartData;
    // this.tableData = dataTables.year2021;
  },
  watch: {
    // year() {
    //   if (this.year == 2017) {
    //     this.chartData = dataGraphes.year2017.chartData;
    //     this.tableData = dataTables.year2017;
    //   } else if (this.year == 2018) {
    //     this.chartData = dataGraphes.year2018.chartData;
    //     this.tableData = dataTables.year2018;
    //   } else if (this.year == 2019) {
    //     this.chartData = dataGraphes.year2019.chartData;
    //     this.tableData = dataTables.year2019;
    //   } else if (this.year == 2020) {
    //     this.chartData = dataGraphes.year2020.chartData;
    //     this.tableData = dataTables.year2020;
    //   } else if (this.year == 2021) {
    //     this.chartData = dataGraphes.year2021.chartData;
    //     this.tableData = dataTables.year2021;
    //   } else if (this.year == "2017-2021") {
    //     this.chartData = dataGraphes.year20172021.chartData;
    //     this.tableData = dataTables.year20172021;
    //   }
    // },
    year() {
      this.getStatistic();
    },
  },
};
</script>

<style>

.graph-container {
  text-align: center;
  width: 100%;
}

.select {
  border: none;
  font-size: 16px;
  text-align: center;
  font-weight: Regular;
}

.select-year {
  border-bottom: 1px solid black;
  display: inline;
  padding-bottom: 5px;
}

.table-container {
  margin-top: 30px;
}
.table-container table {
  width: 100%;
  text-align: center;
}
.table-container table td {
  text-align: center;
  border: 1px solid #aaa;
}

.container {
  max-width: 90vw;
}
</style>