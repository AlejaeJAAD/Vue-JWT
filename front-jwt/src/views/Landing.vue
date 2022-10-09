<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <form @submit.prevent="login(usuario)">
      <input type="text" placeholder="Ingrese email" v-model="usuario.email">
      <input type="password" placeholder="Ingrese contraseña" v-model="usuario.password">
      <button type="submit">Acceder</button>
    </form>
    <div type="error" class="text-center">
        {{ errorMsg }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        email: '',
        password: '',
      },
      alert: false,
      alertTxt: "",
      loading: false,
      errorMsg: "",
      token: ''
    }
  },
  methods: {
    login() {
      setTimeout(() => {
        const authModel = { email: this.usuario.email, password: this.usuario.password };
        console.log(authModel)
        this.$store
            .dispatch("login", authModel)
            .then(() => this.$router.replace('/about'))
            .catch(err => {
              if (err.data) {
                this.alertTxt = err;
                this.alert = true;
                setTimeout(() => {
                  this.alert = false;
                }, 10000);
              } else {
                this.alert = true;
                this.errorMsg = "Ha ocurrido un problema";
                setTimeout(() => {
                  this.alert = false;
                }, 500);
              }
            });
      }, 1000);
    },
  },
  created(){
            this.$store.dispatch('obtenerToken')
            this.token = localStorage.getItem("x_jwt_string");
            if(localStorage.getItem("x_jwt_string") != null) {
              this.$router.replace('/about')
            }
          }
}
</script>