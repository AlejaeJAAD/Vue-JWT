<template>
    <div class="about">
      <h1>Ruta protegida</h1>
      <div v-for="(user, i) in this.users">
        Usuario numero {{i+1}} - {{user.name}}
      </div>
      <button @click="cerrarSesion">Cerrar Sesion</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            token: '',
            users: ''
        }
    },
    created(){
            this.$store.dispatch('obtenerToken')
            this.token = localStorage.getItem("x_jwt_string");
            this.ruta()
    },
    methods: {
      async ruta(){
        try {
          //const res = await fetch('http://localhost:3001/api/dashboard', {
          const res = await fetch('https://alejae-vue-jwt.herokuapp.com/api/dashboard', {
            headers: {
              'Content-Type': 'application/json',
              'auth-token': this.token
            },
          })
          const resDB = await res.json()
          this.users = resDB
        } catch (error) {
          console.log(error)
        }
      },
      cerrarSesion() {
            this.$store.dispatch('cerrarSesion')
            this.$router.replace('/')
        }
    }
  }
  </script>