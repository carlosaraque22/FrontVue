<template>
  <div class="login">
    <form action class="form" @submit.prevent="login">
      <img alt="ZA logo" src="../assets/ZA_logo.png">
      <h1 class="title">Iniciar sesión</h1>
      <label class="form-label" for="#email">Usuario</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email..."
      />
      <label class="form-label" for="#password">Contraseña</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Contraseña..."
      />
      <p v-if="error" class="error">
        Has introducido mal el email o la contraseña.
      </p>
      <input class="form-submit" type="submit" value="Iniciar sesión" />
    </form>
  </div>
</template>

<script>
import api from "../core/api";
import "../assets/theme-login.css";
import jwt_decode from "jwt-decode";

export default {
  data: () => ({
    email: "",
    password: "",
    error: false,
  }),
  methods: {
    async login() {
      try {
        const token = await api.login(this.email, this.password);
        const decoded = jwt_decode(token);
        if (decoded && decoded.user === this.email && decoded.estado) {
          localStorage.setItem("token", token);
          this.$router.push({ path: "/Qrgenerator" });
        } else {
          console.log("Algo anda mal");
        }
      } catch (error) {
        this.error = true;
      }
    },
  },
};
</script>