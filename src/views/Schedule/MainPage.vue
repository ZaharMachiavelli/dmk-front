<template>
  <div class="container">
    <div class="header">
      <!-- <img src="../../assets/logo.png" /> -->
      <h2>
        Начни свой путь
        <p>Любишь IT? Мы направим тебе жизнь</p>
        <p>
          Не уверен в выборе профессии? Пройди тест на
          <router-link to="/test" class="test-link"
            >профориентрацию</router-link
          >
        </p>
      </h2>
    </div>
    <div>
      <h3>Выберите интересующую профессию</h3>
      <select v-model="result.activeProfession">
        <option
          v-for="(profession, index) in professions"
          :key="index"
          :value="profession"
        >
          {{ profession.name }}
        </option>
      </select>
    </div>

    <descriptionTable
      v-if="result.activeProfession"
      :profession="result.activeProfession"
    />
    <resultTable v-if="result.activeProfession" :result="result" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { ScheduleApi } from "@/api/schedule.js";
const resultTable = defineAsyncComponent(() =>
  import("../../components/schedule/ResultTable.vue")
);

const descriptionTable = defineAsyncComponent(() =>
  import("../../components/schedule/DescriptionTable.vue")
);
export default {
  components: { resultTable, descriptionTable },
  data() {
    return {
      programs: [
        {
          code: "09.03.04",
          name: "Программная инженерия",
        },
        { code: "09.03.03", name: "Прикладная информатика" },
        { code: "09.03.02", name: "Информационные системы и технологии" },
        { code: "09.03.01", name: "Информатика и вычислительная техника" },
      ],
      professions: [
        {
          name: "Дизайнер",
          description:
            "UI/UX дизайнер — это креативный специалист, который проектирует пользовательские интерфейсы. Разница между UX и UI — в том, что UX-дизайнер планирует, как пользователь взаимодействует с интерфейсом, какие шаги ему нужно предпринять, чтобы достичь цели. А UI-дизайнер продумывает, как эти шаги и путь к цели выглядят.",
          disciplines: ["Создание макетов в Figma", "Основы верстки"],
        },
        {
          name: "Mobile-разработчик",
          description:
            "UI/UX дизайнер — это креативный специалист, который проектирует пользовательские интерфейсы. Разница между UX и UI — в том, что UX-дизайнер планирует, как пользователь взаимодействует с интерфейсом, какие шаги ему нужно предпринять, чтобы достичь цели. А UI-дизайнер продумывает, как эти шаги и путь к цели выглядят.",
          disciplines: ["Создание макетов в Figma", "Основы верстки"],
        },
        {
          name: "Web-разработчик",
          description:
            "UI/UX дизайнер — это креативный специалист, который проектирует пользовательские интерфейсы. Разница между UX и UI — в том, что UX-дизайнер планирует, как пользователь взаимодействует с интерфейсом, какие шаги ему нужно предпринять, чтобы достичь цели. А UI-дизайнер продумывает, как эти шаги и путь к цели выглядят.",
          disciplines: ["Создание макетов в Figma", "Основы верстки"],
        },
        {
          name: "Аналитик",
          description:
            "UI/UX дизайнер — это креативный специалист, который проектирует пользовательские интерфейсы. Разница между UX и UI — в том, что UX-дизайнер планирует, как пользователь взаимодействует с интерфейсом, какие шаги ему нужно предпринять, чтобы достичь цели. А UI-дизайнер продумывает, как эти шаги и путь к цели выглядят.",
          disciplines: ["Создание макетов в Figma", "Основы верстки"],
        },
        {
          name: "Менеджер IT-проекта",
          description:
            "UI/UX дизайнер — это креативный специалист, который проектирует пользовательские интерфейсы. Разница между UX и UI — в том, что UX-дизайнер планирует, как пользователь взаимодействует с интерфейсом, какие шаги ему нужно предпринять, чтобы достичь цели. А UI-дизайнер продумывает, как эти шаги и путь к цели выглядят.",
          disciplines: ["Создание макетов в Figma", "Основы верстки"],
        },
        {
          name: "Devops-программист",
          description:
            "UI/UX дизайнер — это креативный специалист, который проектирует пользовательские интерфейсы. Разница между UX и UI — в том, что UX-дизайнер планирует, как пользователь взаимодействует с интерфейсом, какие шаги ему нужно предпринять, чтобы достичь цели. А UI-дизайнер продумывает, как эти шаги и путь к цели выглядят.",
          disciplines: ["Создание макетов в Figma", "Основы верстки"],
        },
      ],
      result: {
        activeProgram: null,
        activeProfession: null,
      },
    };
  },
  async created() {
    this.professions = await ScheduleApi.getProfessions();
    console.log(this.professions);
  },
};
</script>

<style>
.container {
  width: 100%;
}

.container select {
  width: 80%;
  margin: 20px auto;
  display: flex;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  box-sizing: border-box;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}

.container select::-ms-expand {
  display: none;
}
.container select:hover {
  border-color: #888;
}
.container select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}

.container option {
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  box-sizing: border-box;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
}

.header img {
  margin-right: 10px;
}

h3 {
  text-align: center;
}

.test-link {
  color: #2d4f9f;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.test-link:hover {
  text-decoration: underline;
}
</style>