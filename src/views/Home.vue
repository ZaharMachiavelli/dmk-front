<template>
  <div style="display: flex">
    <div class="main-content">
      <h1>Описание сервиса</h1>
      <br />
      <p>
        В данном сервисе представлены результаты аналитики вакансий на сайте
        HH.ru из раздела “Информационные технологии”.
      </p>
      <br />
      <p>Аналитика проводилась по вакансиям за 2017-2021 года.</p>
      <br />
      <h2>Вы можете посмотреть:</h2>
      <br />
      <div class="card">
        <div class="dot">
          <span class="card-dot"><span class="card-small-dot"></span></span>
        </div>
        <div class="card-text">
          Название, описание и необходимые навыки для наиболее популярных
          профессий сферы “Информационные технологии”
        </div>
      </div>
      <div class="card">
        <span class="card-dot"><span class="card-small-dot"></span></span
        >Количество вакансий для интересующей Вас профессии
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('setLink', true)
  }
};
</script>

<style>
.card {
  background: rgba(40, 33, 84, 0.9);
  border-radius: 10px;
  padding: 15px;
  color: white;
  font-size: 16px;
  line-height: 20px;
  font-weight: 300;
  margin-bottom: 40px;
  display: flex;
  padding-bottom: 35px;
}

.card-dot {
  display: block;
  border-radius: 50%;
  width: 9px;
  height: 9px;
  left: 390px;
  top: 384px;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-right: 10px;
}

.card-small-dot {
  display: block;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  left: 392px;
  top: 386px;
  background: rgba(40, 33, 84, 0.9);
}
</style>
