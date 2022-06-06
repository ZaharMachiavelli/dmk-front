<template>
  <div :class="{ box: true, active: active }">
    {{ index }}
  </div>
</template>

<script>
export default {
  props: { active: Boolean, index: Number },
};
</script>

<style>
.box {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-bottom: 5px;
  padding-top: 2px;
  font-size: 11px;
  text-align: center;
  border: 1px solid #ddd;
}

.box.active {
  background: #48c172;
  border: none;
  color: #fff;
}
</style>