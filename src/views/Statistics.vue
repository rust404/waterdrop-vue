<template>
  <layout>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <template v-slot:header>
      <top-bar>
        <radio-group v-model="moneyType">
          <radio-button label="expenditure">支出</radio-button>
          <radio-button label="income">收入</radio-button>
        </radio-group>
      </top-bar>
    </template>
    <div class="date" @click="showDatePicker = true">
      {{dateStr}}&#9660;
    </div>
    <v-echarts :option="option"/>
    <pop-up v-model="showDatePicker" position="bottom">
      <DatePicker type="year-month" v-model="curDate" @ok="showDatePicker = !showDatePicker"/>
    </pop-up>
  </layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Layout from "@/components/Layout.vue";
import NavBar from "@/components/NavBar.vue";
import DatePicker from "@/components/DatePicker/DatePicker.vue";
import PopUp from "@/components/PopUp.vue";
import TopBar from "@/components/TopBar.vue";
import RadioButton from "@/components/Radio/RadioButton.vue";
import RadioGroup from "@/components/Radio/RadioGroup.vue";
import VEcharts from "@/components/VEcharts.vue";
import dayjs from "dayjs";
import {CategoryState, MoneyRecord, MoneyRecordState, MoneyType} from "@/store/modules/module-types";
import {State} from "vuex-class";


@Component({
  components: {
    Layout,
    NavBar,
    DatePicker,
    PopUp,
    TopBar,
    RadioButton,
    RadioGroup,
    VEcharts,
  }
})
export default class Statistics extends Vue {
  @State('category') readonly categoryState!: CategoryState
  @State('record') readonly recordState!: MoneyRecordState
  curDate = new Date()
  showDatePicker = false
  moneyType: MoneyType = 'expenditure'
  get dateStr() {
    return dayjs(this.curDate).format('YYYY年M月')
  }
  get dateArr() {
    return Array(dayjs(this.curDate).daysInMonth()).fill(0).map((_, index) => index + 1)
  }
  get option() {
    return {
      xAxis: {
        type: 'category',
        data: this.dateArr
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.sumByDates,
        type: 'bar'
      }]
    }
  }
  get sumByDates() {
    let records = this.recordState.recordList
    records = this.getRecordsByMoneyType(records, this.moneyType)
    records = this.getRecordsByMonth(records, this.curDate)
    const ret = this.dateArr.map(_ => 0)
    return records.reduce((acc, record) => {
      acc[dayjs(record.time).date() - 1] += record.amount
      return acc
    }, ret)
  }
  getRecordsByMonth(records: MoneyRecord[], time: Date) {
    return records.filter(record => {
      return dayjs(record.time).year() === dayjs(time).year() && dayjs(record.time).month() === dayjs(time).month()
    })
  }
  getRecordsByMoneyType(records: MoneyRecord[], type: MoneyType) {
    return records.filter(record => {
      return record.moneyType === type
    })
  }
  getRecordsByCategoryId(records: MoneyRecord[], id: number) {
    return records.filter(record => {
      return record.categoryId === id
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

.date {
  text-align: center;
  color: $brand-color;
  background-color: $grey-1;
  line-height: 30px;
}
</style>