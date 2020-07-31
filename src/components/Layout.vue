<template>
  <div class="layout">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout"
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  header,
  footer {
    flex: 0 0 0;
  }
  main {
    flex: 1;
    overflow: auto;
  }
}
</style>