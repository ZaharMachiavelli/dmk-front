<template>
  <div class="profession-description">
    <div class="prof-title">
      <h3 style="margin: 0">{{ profession.name }}</h3>
      <button
        @click="showProfessionDesc = !showProfessionDesc"
        class="cleaning"
      >
        {{ showProfessionDesc ? "Скрыть" : "Показать" }}
      </button>
    </div>
    <div v-if="showProfessionDesc">
      <p class="prof-description">{{ profession.description }}</p>
      <!-- <p class="recommended">
        Ключевые навыки:
        <span v-for="(discipline, index) in profession.disciplines" :key="index"
          >{{ discipline
          }}{{ index == profession.disciplines.length - 1 ? "." : "," }}</span
        >
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: { profession: Object },
  data() {
    return {
      showProfessionDesc: true,
    };
  },
};
</script>

<style>
.profession-description {
  margin-top: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
}

.prof-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.prof-description {
  color: #72808e;
  font-weight: 500;
  margin-bottom: 8px;
}

.recommended span {
  font-weight: bold;
}

.cleaning {
  border: none;
  text-decoration: none;
  background: transparent;
  color: #467be3;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.02;
  cursor: pointer;
}

.cleaning:hover {
  text-decoration: underline;
  color: #215bce;
}
</style>