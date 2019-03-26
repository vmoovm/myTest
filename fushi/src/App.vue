<template>
  <div id="app">
    <v_header></v_header>
  </div>
</template>

<script>
import header from './components/header/header.vue'
export default {
	components: {
  	v_header: header
	}
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
