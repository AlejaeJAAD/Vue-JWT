<template>
    <div>
        <h1>Auth Home</h1>
        <hr>
        <button @click="cerrarSesion">Cerrar Sesion</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                token: ''
            }
        },
        methods: {
            cerrarSesion() {
                this.$store.dispatch('cerrarSesion')
                this.$router.replace('/')
            },
        },
        created(){
            this.$store.dispatch('obtenerToken')
            this.token = localStorage.getItem("x_jwt_string");
        },
}
</script>

<style lang="scss" scoped>

</style>