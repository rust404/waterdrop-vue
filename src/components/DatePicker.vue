<template>
  <div class="datepicker"></div>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import * as dayjs from 'dayjs';

@Component
export default class DatePicker extends Vue {
  @Model('change', {type: String}) readonly date!: string

  onDateChange() {
    console.log(dayjs)
    this.$emit('change', new Date().toISOString())
  }
}
</script>

<style lang="scss" scoped>
</style>
