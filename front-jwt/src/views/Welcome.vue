<template>
    <div>
        <div>
            <h1>Welcome</h1> {{user.name}}
        </div>
        <hr>
        <button @click="cerrarSesion">Cerrar Sesion</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                token: '',
                user: ''
            }
        },
        created(){
            //this.$store.dispatch('obtenerToken')
            this.token = localStorage.getItem("x_jwt_string");
            this.ruta()
        },
        methods: {
        async ruta(){
            if(this.token != null) {
                try {
                    //const res = await fetch('http://localhost:3001/api/welcome', {
                    const res = await fetch('https://alejae-vue-jwt.herokuapp.com/api/welcome', {
                        headers: {
                        'Content-Type': 'application/json',
                        'auth-token': this.token
                        },
                    })
                    const user = await res.json()
                    this.user = user.data.user
                    } catch (error) {
                    console.log(error)
                    }
                }
        },
        cerrarSesion() {
            this.$store.dispatch('cerrarSesion')
            this.$router.replace('/')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>