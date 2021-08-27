<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="30%">
      <v-card>
        <v-card-title class="headline">Авторизация</v-card-title>
       <v-card-actions>
          <div id="firebaseui-auth-container" class="mx-auto"></div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

</template>

<script>
import auth from "../../auth";

export default {

name: "login",
  data(){
  return{
    dialog: true
  }
  },
  mounted() {
    auth.authForm('#firebaseui-auth-container')
  }
}
</script>

<style scoped>
@import "../../../node_modules/firebaseui/dist/firebaseui.css";
</style>
