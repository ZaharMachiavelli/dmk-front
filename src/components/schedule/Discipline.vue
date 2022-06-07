<template>
  <div @click="goCourse">
    <div class="activeCard">
      <div
        :draggable="dragAllowed"
        @dragstart="startDrag($event)"
        :style="`background-color:${color}; border: 1px solid ${color}; opacity:${
          inLine ? 0.65 : 1
        }`"
        class="discipline"
        @click="opened = !opened"
      >
        {{ activeTitle }}
      </div>
      <span class="line" v-if="!last"></span>
    </div>
    <div class="optionalCards" v-if="cards.length > 1 && opened">
      <div
        :style="`background-color:${color}; border: 1px solid ${color};`"
        class="discipline"
        v-for="(card, index) in cards.filter((el) => el.name != activeTitle)"
        :key="index"
        @click="activeTitle = card.name"
      >
        {{ card.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: Array,
    inLine: { type: Boolean, default: false },
    dragAllowed: { type: Boolean, default: false },
    last: { type: Boolean, default: false },
    link: { type: String, default: "" },
  },
  data() {
    return {
      color: this.cards.length > 1 ? "#fed50d" : "#00bfff",
      opened: false,
      activeTitle: this.cards[0].name,
    };
  },
  methods: {
    startDrag(event) {
      console.log(this.title);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("title", this.title);
      ``;
    },
    goCourse() {
      if (this.link) {
        this.$router.push({ path: `/courses/${this.link}` });
      }
    },
  },
  created() {
    console.log(this.cards);
  },
};
</script>

<style>
.discipline {
  width: 150px;
  /* flex: 1 1 auto */
  height: 80px;
  cursor: grab;
  padding: 0 5px;
  font-size: 12px;
  opacity: 0.9;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%), 0 5px 5px 0 rgb(0 0 0 / 20%);
  display: flex;
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  text-align: center;
}

.optionalCards {
  display: flex;
  flex-direction: column;
}

.optionalCards div {
  margin-top: 7px;
  opacity: 0.65;
}

.activeCard {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.activeCard span {
  display: block;
  border-bottom: 2px solid grey;
  width: 50px;
}

.activeCard div {
  padding: 5px;
  border: 1px solid black;
}
</style>