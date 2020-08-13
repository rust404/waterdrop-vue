<template>
  <layout>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <date-picker v-model="date" picker-title="hello" @ok="onOk" @cancel="onCancel"/>
    {{date}}
  </layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Layout from "@/components/Layout.vue";
import NavBar from "@/components/NavBar.vue";
import DatePicker from "@/components/DatePicker/DatePicker.vue";

@Component({
  components: {
    Layout,
    NavBar,
    DatePicker
  }
})
export default class Statistics extends Vue {
  date = new Date()
  onOk(date: Date) {
    console.log(date)
  }
  onCancel() {
    console.log('cancel');
  }
}
</script>