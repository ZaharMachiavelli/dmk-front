<template>
  <div class="test">
    <h5>{{ question.title }}</h5>
    <label v-for="(answer, index) in question.answers" :key="index">
      <input type="radio" v-model="finalAnswer" :value="answer.value" />
      {{ answer.title }}
    </label>
    <button @click="addAnswer" :disabled="!finalAnswer">Далее</button>
  </div>
</template>

<script>
export default {
  props: { question: Object },
  data() {
    return {
      finalAnswer: "",
    };
  },
  watch: {
    question: {
      handler() {
        this.finalAnswer = "";
      },
      deep: true,
    },
  },
  methods: {
    addAnswer() {
      this.$emit("addAnswer", this.finalAnswer);
    },
  },
};
</script>

<style scoped>
button {
  text-decoration: none;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  color: #fff;
  text-align: center;
  min-width: 100px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding: 8px 16px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: background-color 0.1s linear;
  -moz-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
  background-color: rgb(43, 153, 91);
  border: 1px solid rgb(33, 126, 74);
  cursor: pointer;
}
button:hover {
  background-color: rgb(75, 183, 141);
}

button:disabled {
  opacity: 0.65;
  cursor: default;
}

.test {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 2px solid #c0c0c0;
  border-radius: 5px;
  padding: 20px 15px;
  margin-top: 15px;
}

.test label {
  margin: 10px 0;
  font-weight: 600;
}

.test h5 {
  font-size: 20px;
  margin: 10px 0;
}

.loading {
  opacity: 0.55;
}
</style>