<template>
  <v-container fill-height fluid text-center>
    <v-container>
      <v-row>
        <v-col class="primary--text text-center mx-auto pb-4" cols="1" sm="4" offset="4"><h1 class="h1">Login</h1></v-col>
      </v-row>
      <v-row class="elevation-3 mx-auto">
        <v-col cols="auto">
          <v-img max-height="250" max-width="250" src='@/assets/images/images.jpg'></v-img>
        </v-col>
        <v-col>
          <v-form>
            <v-text-field label="Email" v-model="user.email"></v-text-field>
            <v-text-field 
            label="Senha" 
            v-model="user.password" 
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
            @click:append="show= ! show">
            </v-text-field>
            <v-btn color="primary" dark @click="login">Login</v-btn>
            <v-btn class="ml-5" color="primary" dark @click="reset">Cancelar</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar color="primary" dark v-model="errorLogin" danger multiline timeout="2000">
      Usuário ou senha inválidos
    </v-snackbar>
    <v-dialog v-model="novaconta" persistent max-width="300px">
      <v-card>
        <v-card-title>A conta não foi encontrada</v-card-title>
        <v-card-text> Deseja criar uma nova conta com os dados informados?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-2"  text @click="criarnovaconta"> Sim </v-btn>
          <v-btn color="red darken-2"  text @click="novaconta = false"> Não </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data() {
    return {
      user: {},
      show: false,
      errorLogin: false,
      novaconta: false,
    }
  },
  methods: {
    reset() {
      this.user= {};
    },
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
        this.$router.push({name: 'Home'})
      } catch(error) {
        const errorCode = error.code
        switch(errorCode) {
          case "auth/wrong-password":
            this.errorLogin = true
            break
          case "auth/invalid-email":
            this.errorLogin = true
            break
          case "auth/user-not-found":
            this.novaconta = true
            break
          default:
            this.errorLogin = true
            break

        }
       }
      },
      async criarnovaconta () {
        this.novaconta = false;
        await fb.auth.createUserWithEmailAndPassword(
         this.user.email,
         this.user.password)
        this.login()
      }
  }
}
</script>

<style>

</style>
