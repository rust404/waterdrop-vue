<template>
  <layout>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <div>record detail</div>
  </layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    Layout,
    NavBar
  }
};
</script>
