<template>
  <div class="block">
    <slot></slot>
  </div>
</template>


<script>
export default ({
    name: "block",
})
</script>

<style>
.block {
  background-color: #282154;
  color: #fff;
  border-radius: 10px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 18px;
}
</style>

