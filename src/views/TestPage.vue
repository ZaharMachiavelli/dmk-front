<template>
  <div>
    <h2 class="test-header">Тест на профориентацию</h2>
    <p class="test-description">
      Уважаемый пользователь, на этой странице ты можешь пройти тест, чтобы
      понять, какая из профессий IT-рынка подходит именно тебе.<br />На данный
      момент доступно 6 профессий: тестировщик, программист, системный
      администратор, дизайнер, специалист по интрнет-маркетингу и специалист по
      информационной безопасности.
    </p>
    <p class="alert-message">
      Просим обратить внимание, что данный тест является лишь рекомендацией и
      основан на среднестатистических данных, поэтому не может гарантировать
      абсолютно точный результат для каждого пользователя.
    </p>
    <div class="progress-boxes">
      <TestProgress
        v-for="(_, index) in questions"
        :key="index"
        :active="index < progress"
        :index="index + 1"
      />
    </div>

    <Test
      :question="questions[progress]"
      @addAnswer="addAnswer"
      :class="{ loading: loading }"
      v-if="progress < questions.length"
    />

    <TestResult v-else :result="result" />
  </div>
</template>

<script>
import TestProgress from "@/components/schedule/Test/TestProgress.vue";
import Test from "@/components/schedule/Test/Test.vue";
import TestResult from "@/components/schedule/Test/TestResult.vue";
export default {
  components: { TestProgress, Test, TestResult },
  methods: {
    loadQuestion() {
      return new Promise((resolve) =>
        setTimeout(() => resolve(this.progress++), 300)
      );
    },
    async addAnswer(value) {
      let values = value.split(",");
      values.forEach((el) => {
        console.log(this.result[el]);
        this.result[el].points++;
      });
      this.loading = true;
      await this.loadQuestion();
      this.loading = false;
    },
  },
  created() {
    console.log(this.questions[this.progress]);
    this.$store.commit("setLink", false);
  },
  watch: {
    progress(value) {
      if (value == this.questions.length) {
        for (let el in this.result) {
          this.result[el].points = Math.floor(
            (this.result[el].points / this.questions.length) * 100
          );
        }
      }
    },
  },
  data() {
    return {
      progress: 0,
      loading: false,
      result: {
        programmer: { name: "Программист", points: 1 },
        sysadmin: { name: "Системный администратор", points: 0 },
        testing: { name: "Тестировщик", points: 1 },
        marketing: { name: "Специалист по интернет-маркетингу", points: 0 },
        designer: { name: "Дизайнер", points: 0 },
        security: {
          name: "Специалист по информационной безопасности",
          points: 0,
        },
      },
      questions: [
        {
          title: "Какое из следующих слов отлично от других?",
          answers: [
            {
              title: "Петь",
              value: "designer",
            },
            { title: "Звонить", value: "marketing" },
            { title: "Болтать", value: "security" },
            { title: "Слушать", value: "programmer,sysadmin" },
            { title: "Говорить", value: "testing" },
          ],
        },

        {
          title: "Чего больше?",
          answers: [
            { title: "Не цветов", value: "designer,marketing,testing" },
            { title: "Не фиалок", value: "programmer,sysadmin,security" },
          ],
        },
        {
          title:
            "Все передовые люди – члены демократической партии. Все передовые люди занимают крупный пост. Тогда верно ли утверждение, что только некоторые члены демократической партии занимают крупные посты?",
          answers: [
            { title: "Верно", value: "programmer,security" },
            { title: "Неверно", value: "sysadmin,testing" },
            { title: "В вопросе нет логики", value: "designer,marketing" },
          ],
        },
        {
          title: "Подберите аналогичную пару слов к «водород – вода»",
          answers: [
            { title: "страница - книга", value: "programmer" },
            { title: "бедность - богатство", value: "designer,marketing" },
            { title: "болезнь - хворь", value: "testing" },
            { title: "удар - боль", value: "sysadmin,security" },
          ],
        },
        {
          title: "Какая из следующих дробей не подходит к двум остальным?",
          answers: [
            { title: "3/7", value: "designer,marketing,testing" },
            { title: "3/9", value: "programmer,sysadmin,security" },
            { title: "3/11", value: "designer,marketing,testing" },
          ],
        },
        {
          title:
            "Слово «незавершённый» является противоположным по своему значению слову...",
          answers: [
            {
              title: "Нелепый",
              value: "designer",
            },
            { title: "Несовершенный", value: "marketing" },
            { title: "Образованный", value: "security,sysadmin" },
            { title: "Законченный", value: "programmer,security" },
            { title: "Грязный", value: "testing" },
          ],
        },
        {
          title:
            "Какая из приведённых ниже пословиц имеет сходный смысл с пословицей «не по виду суди, а по делам гляди»?",
          answers: [
            { title: "Куй железо, пока горячо", value: "testing,marketing" },
            { title: "Один в поле не воин", value: "sysadmin,security" },
            { title: "Лес рубят, щепки летят", value: "designer" },
            {
              title: "Не все то золото, что блестит",
              value: "programmer,sysadmin,security",
            },
          ],
        },
        {
          title: "«Размер» так относится к «длине», как «движение»...",
          answers: [
            {
              title: "... к светофору",
              value: "programmer,designer,marketing",
            },
            {
              title: "... к направлению",
              value: "programmer,sysadmin,security",
            },
            { title: "... к транспорту", value: "programmer,testing" },
          ],
        },
        {
          title:
            "Какое из следующих сочетаний знаков должно продолжить этот ряд: 1ОООО11ООО111?",
          answers: [
            { title: "0111", value: "designer" },
            { title: "0011", value: "sysadmin,security,testing,marketing" },
            { title: "1000", value: "programmer" },
          ],
        },
        {
          title: "Ты стараешься разнообразить привычные действия?",
          answers: [
            {
              title: "Стараюсь вносить разнообразие",
              value: "designer,marketing,testing",
            },
            {
              title: "Я почти всегда действую привычным способом",
              value: "programmer,sysadmin,security",
            },
          ],
        },

        {
          title: "Нравится ли тебе экспериментировать с формой и цветом?",
          answers: [
            {
              title: "Очень нравится",
              value: "designer",
            },
            {
              title: "Я равнодушен к этому",
              value: "programmer,sysadmin,security,marketing,testing",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title: "Создавать новые алгоритмы",
              value: "programmer,sysadmin,designer,security",
            },
            {
              title: "Тестировать программы, написанные другими",
              value: "testing,marketing,designer",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title: "Делать дизайн интерфейса",
              value: "designer",
            },
            {
              title: "Рекламировать сайт в интернете",
              value: "marketing",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title:
                "Собирать компьютеры, объединять их в сеть и устанавливать программы",
              value: "sysadmin",
            },
            {
              title: "Изучать и подбирать методы защиты от хакеров",
              value: "security",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title: "Постоянно изучать работы современных дизайнеров",
              value: "designer",
            },
            {
              title: "Постоянно изучать новинки компьютерной техники",
              value: "sysadmin",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title: "Делать компанию привлекталеьной для клиентов",
              value: "marketing",
            },
            {
              title: "Защищать компанию от информационных угроз",
              value: "security",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title: "Ежедневно работать со шрифтами, фотографиями, цветами",
              value: "designer,programmer,testing",
            },
            {
              title:
                "Ежедневно изучать операционные системы на предмет наличия в них уязвимостей",
              value: "security,testing",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title:
                "Разрабатывать алгоритмы и логику программы или сайта компании",
              value: "programmer",
            },
            {
              title:
                "Разрабатывать концепцию продвижения товара или услуги компании в интернете",
              value: "marketing",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title:
                "Проверять, задуман ли сайт или приложение так, как задумано",
              value: "programmer,testing",
            },
            {
              title: "Создавать удобный и красивый интерфейс",
              value: "designer",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title:
                "Исследовать поведение людей в социальных  сетях, поисковых системах, на сайтах",
              value: "marketing",
            },
            {
              title:
                "Обеспечивать бесперебойную работу корпоративных компьютеров, закупать их и обновлять",
              value: "sysadmin",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title:
                "Программировать логику и поведение разных компонентов веб-приложения",
              value: "programmer",
            },
            {
              title:
                "Рисовать графические  элементы веб-приложения (логотипы, кнопки, меню и т.д.)",
              value: "designer",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title:
                "Участвовать в разработке программ, обкатывая их на работоспособность",
              value: "programmer,testing,security",
            },
            {
              title: "Устанаваливать и настраивать сетевые программы, сервера",
              value: "sysadmin",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title:
                "Изучать разлчиные методологии разработки качественных приложений",
              value: "programmer,sysadmin",
            },
            {
              title: "Обучать сотрудников не попадаться в ловушки хакеров",
              value: "security",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title: "Проверять, выдает ли программа правильный ответ",
              value: "testing",
            },
            {
              title:
                "Проверять компьютерную сеть компании на устойчивость к информационным атакам",
              value: "security",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title:
                "Настраивать компьютеры, телефонию, сетевые роутеры, подсоединять принтеры, настраивать программы",
              value: "sysadmin",
            },
            {
              title:
                "Анализировать алгоритмы, писать код на языках программирования, используя абстрактные понятия",
              value: "programmer",
            },
          ],
        },

        {
          title: "Постарайтесь выбрать один из двух предложенных вариантов",
          answers: [
            {
              title:
                "Проверять функционирование всех элементов и страниц сайта",
              value: "testing",
            },
            {
              title:
                "Продвигать сайт в интернете, привлекать аудиторию с помощью рекламы, рассылок и содержания",
              value: "marketing",
            },
          ],
        },

        {
          title:
            "Ты стремишься внести перемены и украсить окружающую тебя среду?",
          answers: [
            {
              title: "Чи да, постоянно это делаю",
              value: "testing,marketing,designer",
            },
            {
              title: "Мне это неинтересно",
              value: "programmer,sysadmin,security",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
.progress-boxes {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
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

.test-description {
  font-weight: 600;
  color: #72808e;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 22px;
}

.test-header {
  text-align: center;
}
</style>
