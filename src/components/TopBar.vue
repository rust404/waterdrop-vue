<template>
  <div class="top-bar">
    <span class="left"><slot name="left"></slot></span>
    <span class="center"><slot></slot></span>
    <span class="right"><slot name="right"></slot></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class TopBar extends Vue {}
</script>

<style lang="scss" scoped>
@import '~@/style/variable.scss';
$x-space: 20px;
$y-space: 8px;
.top-bar {
  display: flex;
  position: relative;
  padding: $y-space 0px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px #e0e0e0;
  line-height: 1.5;
  flex-shrink: 0;
  .left, .right {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .left {
    left: $x-space;
  }
  .right {
    right: $x-space;
  }
}
</style>
