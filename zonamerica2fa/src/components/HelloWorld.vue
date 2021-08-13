<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Usuario: <input type="text" id="idk" name="nombre" size="40" /></p>
    <p>
      <input v-on:click="onClick" type="submit" value="generar" />
    </p>
    <img
      id="qrcodegenerate"
      alt="qrcode"
      class="js-qrcode qrcode"
      width="166"
      height="166"
    />
  </div>
</template>

<script>
import axios from "axios";
import QRCode from "qrcode";


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    onClick: async function () {
      try {
        const usuario = document.getElementById('idk').value;
        const prueba1 = await axios.post(
          `http://localhost:5000/test/generar_usuario?user=${usuario}`,
        );
        console.log(prueba1);
        QRCode.toDataURL(prueba1.data, function (err, data_url) {
          const qrcodeurl = data_url;
          const qrimg = document.getElementById("qrcodegenerate");
          qrimg.setAttribute("src", qrcodeurl);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
