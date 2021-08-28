<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card height="400" color="transparent" flat>
          <div class="display-3 mt-5">Page not found.</div>
          <div class="grey--text lighten-5">
           Страница не существует или у вас нет доступа
          </div>
          <div class="paragraph-text mt-10">
            Попробуйте вернуться на главную страницу и повторить свое действие. Или,
            обратитесь в службу поддержки для получения поддержки.
            <a href="/">Вернуться на главную</a>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
name: "PageNotFound"
}
</script>

<style scoped>

</style>
