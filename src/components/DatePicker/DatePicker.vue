<template>
  <div class="datepicker">
    <div class="date-picker-header">
      <button class="cancel-btn" @click="onCancel">取消</button>
      <header class="title">{{ `${year}-${month}-${date}` }}</header>
      <button class="ok-btn" @click="onOk">确定</button>
    </div>
    <div class="picker-container">
      <picker-list v-model="year" :list-data="yearList"/>
      <picker-list v-model="month" :list-data="monthList"/>
      <picker-list v-model="date" :list-data="dateList"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Model, Prop} from "vue-property-decorator";
import dayjs from 'dayjs';
import PickerList from "@/components/DatePicker/PickerList.vue";

@Component({
  components: {
    PickerList
  }
})
export default class DatePicker extends Vue {
  @Model('change', {type: Date}) readonly value!: Date
  @Prop({default: '时间', type: String}) readonly pickerTitle?: string

  year = dayjs(this.value).year()
  // 从 1 开始
  month = dayjs(this.value).month() + 1
  date = dayjs(this.value).date()
  yearList: Array<string | number> = []

  created() {
    const ret = []
    for (let i = 0; i < 10; i++) {
      ret.unshift(this.year - i)
    }
    this.yearList = ret
  }

  get daysInMonth() {
    return dayjs().year(this.year).month(this.month - 1).daysInMonth()
  }

  get monthList() {
    return Array(12).fill(0).map((item, index) => index + 1)
  }

  get dateList() {
    return Array(this.daysInMonth).fill(0).map((item, index) => index + 1)
  }

  get fullDate() {
    return new Date(dayjs().year(this.year).month(this.month - 1).date(this.date).valueOf())
  }

  onDateChange() {
    this.$emit('change', this.fullDate)
  }

  onOk() {
    this.$emit('change', this.fullDate)
    this.$emit('ok', this.fullDate)
  }

  onCancel() {
    this.$emit('cancel', this.fullDate)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/_variable.scss';

$list-item-height: 30px;

.datepicker {
  .date-picker-header {
    padding: 6px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    > button {
      font-size: 16px;
      border: none;
      outline: none;
      background: transparent;
    }

    .cancel-btn {
      color: $grey-5;
    }

    .ok-btn {
      color: $brand-color;
    }
  }

  .picker-container {
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    > * {
      flex: 1;
    }
  }
}
</style>
