<template>
  <div class="graph-container" v-if="!loading">
    <h2>Тепловая карта навыков</h2>
    <p class="test-description">
      Здесь вы можеет увдиеть тепловую карту навыков, присущих профессиям
      IT-рынка. С помощью них Вы сможете понять, на что делать акцент в своем
      обучении
    </p>
    <div class="graph" :style="`grid-template-columns : ${columnsLength}`">
      <div class="atributes">
        <p v-for="(atr, id) in dictionary" :key="id">
          {{ atr }}
        </p>
      </div>
      <div v-for="(graph, index) in graphs" :key="index" class="column">
        <div
          class="column-area"
          v-for="(el, id) in deleteGraph(graph)"
          :key="id"
          :style="`background-color: ${getColor(el)}`"
        >
          {{ el + "%" }}
        </div>
        <p class="graph-title">
          {{ graph.profession ? graph.profession.name : "Хуй" }}
        </p>
      </div>
    </div>
  </div>

  <div class="loader-container" v-else>
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { ScheduleApi } from "@/api/schedule.js";
export default {
  data() {
    return {
      dictionary: {
        languages: "Языки программирования",
        dbms: "СУБД",
        instruments: "Инструменты разработчика",
        patterns: "Паттерны",
        os: "Операционные системы",
        api: "API",
        soft: "Soft Skills",
        web: "Web-разработка",
        layout: "Верстка",
        mobile: "Мобильная разработка",
        desktop: "Desktop",
        asu: "АСУ/АСУ ТП",
        erp: "КИС",
        graphic: "Работа с графикой",
        cms: "СMS",
        agile: "Agile",
        virtualization: "Средства виртуалзиации",
        marketing: "Интернет-маркетинг",
        serverpo: "Серверное ПО",
        webs: "Сети",
        infrastructure: "Инфраструктура ПО",
        userpc: "Пользователь ПК",
        web_app: "Веб-приложения",
        testing: "Тестирование",
        standarts: "Стандарты",
        buisiness: "Бизнес-анализ",
        bigdata: "Big Data",
        web_services: "Web-сервисы",
        service: "Обслуживание",
        ml: "ML",
        gamedev: "GameDev",
        security: "Информационная безопасность",
      },
      graphs: null,
      columnsLength: 0,
      rowsLength: 0,
      loading: false,
    };
  },
  methods: {
    getColor(value) {
      if (value < 1) {
        return "#6abe86";
      } else if (value < 5) {
        return "#92c47e";
      } else if (value < 10) {
        return "#f8bc69";
      } else if (value < 20) {
        return "#ef9d6e";
      } else {
        return "#e67c73";
      }
    },
    getColumns() {
      return this.graphs.length + 1;
    },
    getRows() {
      return Object.keys(this.dictionary).length;
    },
    deleteGraph(graph) {
      let newGraph = JSON.parse(JSON.stringify(graph));
      delete newGraph.profession;
      delete newGraph.id;
      return newGraph;
    },
  },
  async created() {
    this.loading = true;
    this.$store.commit("setLink", false);
    this.graphs = await ScheduleApi.getSkills();
    this.loading = false;
    console.log(this.graphs);
    this.columnsLength = `repeat(auto-fit, 150px)`;
    this.rowsLength = `repeat(${this.getRows()},1fr)`;
  },
};
</script>

<style>
.column {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.column-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid black;
  height: 50px;
}

.graph {
  display: grid;
  grid-gap: 15px;
  width: 100%;
  margin-top: 15px;
}

.graph-container {
  display: flex;
  flex-direction: column;
}

.graph-container h2 {
  text-align: center;
}

.atributes {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.atributes p {
  display: flex;
  height: 50px;
  margin: 0;
  align-items: center;
  font-weight: bold;
}

.graph-title {
  color: #505050;
  font-size: 16px;
  font-weight: 600;
}

.test-description {
  font-weight: 600;
  color: #72808e;
  margin-bottom: 8px;
  font-size: 18px;
  line-height: 22px;
}

.loader-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 160px;
  height: 160px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 128px;
  height: 128px;
  margin: 8px;
  border: 8px solid black;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: black transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

