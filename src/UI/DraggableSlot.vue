<template>
  <div
    class="area"
    @dragenter.prevent
    @dragover.prevent
    @drop="onDrop"
    @dragenter="onEnter"
    @dragleave="onLeave"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "myArea",
  props: { classes: Array },
  methods: {
    onDrop(e) {
      this.$emit("onDrop", e);
    },
    onEnter(e) {
      if (!e.target.children.length && e.target.classList.contains("area"))
        e.target.style.background = "#d3d3d3";
    },
    onLeave(e) {
      if (e.target.classList.contains("area"))
        e.target.style.background = "#fff";
    },
  },
};
</script>

<style>
.area {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>