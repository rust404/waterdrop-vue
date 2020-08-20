<template>
  <div id="app">
    <transition class="router-transition-wrapper" :name="transitionName">
      <router-view class="router-view"/>
    </transition>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import {Action} from "vuex-class";
import router from "@/router";

@Component
export default class App extends Vue {
  @Action('category/load') readonly loadCategory!: Function
  @Action('record/load') readonly loadRecord!: Function
  transitionName = ''
  pathHistories: string[] = [this.$route.path]

  created() {
    this.$router.beforeEach((to, from, next) => {
      function isNavigateBetweenBottomBar(path1: string, path2: string) {
        const arr = ['/record/add', '/statistics', '/record/detail']
        return arr.indexOf(path1) >= 0 && arr.indexOf(path2) >= 0
      }

      const len = this.pathHistories.length
      const lastPath = len - 2 >= 0 ? this.pathHistories[len - 2] : '/'
      if (isNavigateBetweenBottomBar(to.path, from.path)) {
        this.transitionName = ''
        this.pathHistories.push(to.path)
      } else if (lastPath === to.path) {
        this.transitionName = 'router-slide-from-left'
        this.pathHistories.pop()
      } else {
        this.transitionName = 'router-slide-from-right'
        this.pathHistories.push(to.path)
      }
      next()
    })
  }

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

.router-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
