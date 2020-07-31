<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
export default {
  name: 'App'
};
</script>

<style lang="scss">
@import "~@/style/reset.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
