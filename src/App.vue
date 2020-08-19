<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action} from "vuex-class";

@Component
export default class App extends Vue {
  @Action('category/load') readonly loadCategory!: Function
  @Action('record/load') readonly loadRecord!: Function

  mounted() {
    this.loadCategory()
    this.loadRecord()
  }
}
</script>

<style lang="scss">
@import "~@/style/reset.scss";
@import "~@/style/animation.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
