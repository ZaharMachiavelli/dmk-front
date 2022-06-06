<template>
  <div class="result-line">
    <div
      :style="`width: ${profession.points}%`"
      :class="{ 'progress-line': true, active: winner }"
    >
      {{ `${profession.name} ${profession.points}%` }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    winner: Boolean,
    profession: Object,
  },
  created() {
      console.log(this.winner);
  }
};
</script>

<style>
.result-line {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}

.progress-line {
  height: 100%;
  background-color: #ccd1d3;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.progress-line.active {
  background-color: #f7c109;
  font-weight: 500;
}
</style>