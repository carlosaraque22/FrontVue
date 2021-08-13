<template>
  <div class="home">
    <h1>Zonamerica Uruguay</h1>
    <img alt="ZA logo" src="../assets/ZA_logo.png">
    <HelloWorld msg="Crea tu token personal"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
