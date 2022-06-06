<template>
  <div class="search-input">
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        enable-background="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
        xml:space="preserve"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
    </button>

    <input
      class="search"
      v-model="input"
      @input="$emit('updateValue', input)"
      type="text"
      placeholder="Поиск курса"
    />
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style>
.search-input {
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 350px;
  height: 40px;
  border-radius: 40px;
  box-shadow: 0 6px 8px rgb(0 0 0 / 15%);
  background: #fff;
  transition: all 0.3s ease;
}

.search-input button {
  position: absolute;
  cursor: pointer;
  top: 10px;
  left: 15px;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  outline: none !important;
}

.search-input svg {
  width: 20px;
}

.search {
  position: absolute;
  left: 38px;
  top: 10px;
  width: calc(100% - 50px);
  font-size: 14px;
  background: none;
  color: #5a6674;
  height: 20px;
  border: none;
  appearance: none;
  outline: none;
}
</style>