<template>
  <div class="disciplines-line">
    <div
      :style="`background-color:${
        categoriesColors[category.tag]
      }; border: 1px solid ${categoriesColors[category.tag]};`"
      @click="changeLine"
      class="discipline"
    >
      {{ category.name }}
    </div>

    <div v-if="opened" class="disciplines">
      <Discipline
        v-for="(discipline, index) in category.disciplines"
        :key="index"
        :title="discipline"
        :color="categoriesColors[category.tag]"
        :dragAllowed="true"
        :inLine="true"
      />
    </div>
  </div>
</template>

<script>
import Discipline from "@/components/schedule/Discipline.vue";
export default {
  props: { category: Object, opened: { type: Boolean, default: false } },
  components: { Discipline },
  data() {
    return {
      showed: false,
      categoriesColors: {
        design: "#ffc5c2",
      },
    };
  },
  methods: {
    startDrag(event, discipline) {
      console.log(discipline);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("title", discipline);
      ``;
    },
    changeLine() {
      console.log("change");
      this.$emit("changeLine", this.category.name);
    },
  },
};
</script>

<style scoped>
.disciplines-line {
  display: flex;
  justify-content: space-between;
}

p {
  text-align: center;
  padding: 5px 0;
  font-weight: bold;
  cursor: pointer;
}

.disciplines {
  display: flex;
  flex-wrap: wrap;
}

.disciplines .discipline {
  margin-right: 15px;
}
</style>