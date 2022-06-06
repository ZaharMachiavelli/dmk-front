<template>
  <div class="service-info">
    <p class="alert-message">
      {{
        ropMode
          ? "Мы подобрали для вас рекомендуемые дисциплины на выбор. При желании Вы можете нажать на кнопку “Выбрать самостоятельно” и выбрать предметы по желанию."
          : `Вы находитесь в режиме самостоятельного выбора. Нажмите на кнопку \n"Заполнить автоматически\n", чтобы система подобрала для Вас дисциплины.`
      }}
    </p>
    <div class="version-buttons">
      <button class="change-mode" @click="ropMode = !ropMode" type="button">
        {{ ropMode ? "Выбрать самостоятельно" : "Заполнить автоматически" }}
      </button>
      <button class="clean-table" @click="cleanTable" v-if="!ropMode">
        Очистить таблицу
      </button>
    </div>
    <div class="course-wide">
      <Discipline
        v-for="(step, index) in prepareObject()"
        :key="index"
        :cards="step"
        :last="index == 'tenth'"
      />
    </div>
  </div>

  <div v-if="!ropMode">
    <p v-if="actualProfession">
      Уважаемый пользователь, вашим интересам лучше соответсвует профессия:
      <span class="new-profession">{{ actualProfession.name }}</span>
    </p>
    <p class="alert-message">
      Ниже представлены все возможные дисциплины на выбор. Мы уже выбрали для
      вашей профессии самые акутальные из них, но при желании вы можете что-то
      изменить
    </p>
  </div>
  <CoursesList />
</template>

<script>
import Discipline from "@/components/schedule/Discipline.vue";
import { ScheduleApi } from "@/api/schedule.js";
import CoursesList from "@/components/schedule/CoursesList.vue";
export default {
  props: { result: Object },
  components: { Discipline, CoursesList },
  data() {
    return {
      prechosedDisciplines: {
        third_sem: ["Пользовательский интерфейс"],
        forth_sem: ["Пользовательский интерфейс", "Пользовательский интерфейс"],
        fifth_sem: [
          "Пользовательский интерфейс",
          "Пользовательский интерфейс",
          "Пользовательский интерфейс",
        ],
        sixth_sem: [
          "Пользовательский интерфейс",
          "Пользовательский интерфейс",
          "Пользовательский интерфейс",
        ],
        seventh_sem: [
          "Пользовательский интерфейс",
          "Пользовательский интерфейс",
          "",
        ],
      },
      openedDisciplines: [],
      actualProfession: null,
      ropMode: true,
      categoriesColors: {
        design: "#ffc5c2",
      },
      courses: [],
      categories: [
        {
          name: "Дизайн",
          tag: "design",
          disciplines: [
            "Проливание клея",
            "Выклянчивание энергетика",
            "Уход в армию",
            "Уход с универа",
            "Картавость",
          ],
        },
      ],
    };
  },
  methods: {
    async onDrop(event, sem, pos) {
      const title = event.dataTransfer.getData("title");
      this.prechosedDisciplines[sem][pos] = this.prechosedDisciplines[sem][pos]
        ? this.prechosedDisciplines[sem][pos]
        : title;
      event.target.style.background = "white";

      let profs = await ScheduleApi.setProfession([
        ...this.prechosedDisciplines.third_sem,
        ...this.prechosedDisciplines.forth_sem,
        ...this.prechosedDisciplines.fifth_sem,
        ...this.prechosedDisciplines.sixth_sem,
        ...this.prechosedDisciplines.seventh_sem,
      ]);
      if (
        !profs.map((el) => el.name).includes(this.result.activeProfession.name)
      ) {
        this.actualProfession = [...profs];
      }
    },
    onEnter(event) {
      if (
        !event.target.children.length &&
        event.target.classList.contains("extraSubject")
      )
        event.target.style.background = "lightgray";
    },
    onLeave(event) {
      if (event.target.classList.contains("extraSubject"))
        event.target.style.background = "white";
    },
    cleanTable() {
      this.prechosedDisciplines = {
        third_sem: [""],
        forth_sem: ["", ""],
        fifth_sem: ["", "", ""],
        sixth_sem: ["", "", ""],
        seventh_sem: ["", "", ""],
      };
    },
    changeLine(name) {
      this.openedDisciplines.includes(name)
        ? (this.openedDisciplines = this.openedDisciplines.filter(
            (el) => el != name
          ))
        : this.openedDisciplines.push(name);
    },
    prepareObject() {
      let profession = JSON.parse(JSON.stringify(this.result.activeProfession));
      delete profession.id;
      delete profession.name;
      delete profession.description;
      delete profession.tag;
      for (let key in profession) {
        if (!profession[key].length) delete profession[key];
      }
      return profession;
    },
  },
  computed: {
    activeCourse() {
      console.log(this.result);
      return this.courseDictionary[this.result.activeProgram.code];
    },
  },
  async created() {
    // let disciplines = await ScheduleApi.getDisciplines();
    // console.log(disciplines);
    // disciplines.forEach((el) => {
    //   let cat = this.categories.find((cat) => cat.name == el.category.name);
    //   if (cat) {
    //     this.categories[this.categories.indexOf(cat)].disciplines.push(el.name);
    //     console.log(this.categories[0]);
    //   } else {
    //     this.categories.push({
    //       name: el.category.name,
    //       tag: el.category.tag,
    //       disciplines: [el.name],
    //     });
    //   }
    // });
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%), 0 5px 5px 0 rgb(0 0 0 / 20%);
  width: 100%;
  margin-top: 20px;
}

table td {
  padding: 5px;
  border: 1px solid #e8e9eb;
  font-size: 12px;
  text-align: center;
}

.dark {
  font-weight: bold;
  color: white;
  background-color: #005092;
}

.reset-button {
  background-color: #005092;
  border: none;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%), 0 5px 5px 0 rgb(0 0 0 / 20%);
  border-radius: 5px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
}

.extraSubject {
  vertical-align: middle;
  text-align: center;
}

.extraSubject .discipline {
  margin: auto;
}

.choosed-disciplines {
  display: grid;
  row-gap: 25px;
  column-gap: 11px;
  width: 100%;
  grid-template-areas:
    "a b c d e f g h i"
    "j m m q r t w z p"
    "k m m n s u x aa p"
    "l m m n o v y bb p";
  grid-template-columns: repeat(9, 1fr);
}

.choosed-disciplines > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.zero {
  grid-area: a;
}

.first {
  grid-area: b;
}

.second {
  grid-area: c;
}

.third {
  grid-area: d;
}

.forth {
  grid-area: e;
}

.fifth {
  grid-area: f;
}

.sixth {
  grid-area: g;
}

.seventh {
  grid-area: h;
}

.eigth {
  grid-area: i;
}

.subject_first {
  grid-area: j;
}

.subject_second {
  grid-area: k;
}

.subject_third {
  grid-area: l;
}

.no-choose_first {
  grid-area: m;
}

.no-choose_second {
  grid-area: n;
}

.no-choose_third {
  grid-area: o;
}

.no-choose_forth {
  grid-area: p;
}

.third_sem {
  grid-area: q;
}

.forth_sem_first {
  grid-area: r;
}

.forth_sem_second {
  grid-area: s;
}

.fifth_sem_first {
  grid-area: t;
}

.fifth_sem_second {
  grid-area: u;
}

.fifth_sem_third {
  grid-area: v;
}

.sixth_sem_first {
  grid-area: w;
}

.sixth_sem_second {
  grid-area: x;
}

.sixth_sem_third {
  grid-area: y;
}

.seventh_sem_first {
  grid-area: z;
}

.seventh_sem_second {
  grid-area: aa;
}

.seventh_sem_third {
  grid-area: bb;
}

.version_buttons {
  display: flex;
}

.version-buttons {
  display: flex;
  justify-content: center;
}

.version-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 25px;
}

.change-mode {
  background-color: #27243e;
  margin-right: 30px;
}

.clean-table {
  background-color: #b95959;
}

.alert-message {
  border-radius: 5px;
  box-shadow: 0 0 15px 5px #ccc;
  border-left: 5px solid #6c6c6c;
  background-color: #ebebeb;
  margin: 20px auto;
  padding: 30px;
  font-weight: bold;
}

[class^="no-choose"] {
  background-color: #c0c0c0;
  opacity: 0.85;
  font-weight: 500;
  text-align: center;
  border-radius: 5px;
}

.closedCategory {
  display: flex;
  align-items: center;
}

.closedCategory .disciplines-line {
  margin-right: 15px;
}

.new-profession {
  color: red;
  font-size: 18px;
  font-weight: 600;
}

.course-wide {
  display: flex;
  flex-wrap: wrap;
}
</style>
