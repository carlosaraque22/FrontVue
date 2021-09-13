<template>
  <div class="hello">
       <ul>
      <li><a href="/qrcode/qrgenerator">Home</a></li>
      <li><a href="/qrcode/modificarqr">News</a></li>
    </ul>
    <form action class="form1" @submit.prevent="login">
      <img alt="ZA logo" src="../assets/ZA_logo.png" />
      <label class="form-label1" for="#usuario">Usuario a modificar</label>
      <input
        class="form-input"
        type="text"
        id="idk"
        required
        placeholder="Usuario..."
      />
      <p v-if="error1" class="error1">Por favor introduzca un usuario.</p>
      <p v-if="error2" class="error2">Este usuario no tiene un qr asignado.</p>
      <img
        v-show="qrcode"
        id="qrcodegenerate"
        alt="qrcode"
        class="js-qrcode qrcode"
        width="166"
        height="166"
      />
      <a v-show="qrcode" id="btn" download="usuario">
        <button class="boton1" type="button">Descargar</button>
      </a>
      <input
        v-if="submit"
        class="form-submit"
        v-on:click="onClick"
        type="submit"
        value="Generar"
      />
      <input
        class="form-submit1"
        v-on:click="doLogout"
        type="submit"
        href="#"
        value="salir"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import QRCode from "qrcode";
import "../assets/theme-qrcode.css";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: () => ({
    error1: false,
    error2: false,
    qrcode: false,
    submit: true, 
  }),
  methods: {
    onClick: async function () {
      try {
        const usuario = document.getElementById("idk").value;
        if (!usuario) {
          this.error1 = true;
          this.error2 = false;
          this.qrcode = false;
          console.log("Por favor introduzca un usuario");
        } else {
          this.error1 = false;
          const qrimgdownload1 = document.getElementById("btn");
          qrimgdownload1.setAttribute("download", "qrcode " + usuario);
          const prueba1 = await axios.post(
            `http://tomcat-testing:8071/test/modificar_usuario?user=${usuario}`
          );
          if (prueba1.data === "Error-2") {
            this.error2 = true;
            this.qrcode = false;
            console.log("Este usuario no tiene un qr activo");
          } else {
            QRCode.toDataURL(prueba1.data, (err, data_url) => {
              const qrcodeurl = data_url;
              const qrimg = document.getElementById("qrcodegenerate");
              const qrimgdownload = document.getElementById("btn");
              qrimgdownload.setAttribute("href", qrcodeurl);
              qrimg.setAttribute("src", qrcodeurl);
              this.error2 = false;
              this.qrcode = true;
              this.submit = false;
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async doLogout(event) {
      event.preventDefault();
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>