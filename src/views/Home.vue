<template>
  <section class="main-field">
    <mainPageFilter v-bind:message="'test message'"/>
    <div class="cards-panel">
      <card
          v-for="item in 10" :key="item"
          v-bind:title="'Фильтр внутренний PICK UP 60Фильтр внутренний'"
          v-bind:description="'YINGTAI T11 мобильный телефон для пожилых,Лучшая функция,телефон для пожилых,2,2 дюймов,fm фонарь,скорость,DialSOS,большая кнопка,динамик,клавиатура с русским шрифтом,GSM'"
          v-bind:price="62.5"
      />
    </div>
  </section>
</template>

<script>
import card from "../components/card";
import mainPageFilter from "../components/mainPageFilter";
export default {
  components: {
    card,
    mainPageFilter
  },
}
</script>

<style scoped>
.cards-panel{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
