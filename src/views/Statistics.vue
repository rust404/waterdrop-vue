<template>
  <layout>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <template v-slot:header>
      <top-bar>
        水滴记账
      </top-bar>
    </template>
    <div class="date" @click="showDatePicker = true">
      {{ dateStr }}&#9660;
    </div>
    <v-echarts height="200px" :option="option" :listeners="echartsListeners"/>
    <ol class="category-rank-list">
      <li class="rank-list-item" v-for="item in categoryRankData" :key="item.category.id">
        <div class="icon-wrapper"><icon class="icon" size="24" :name="item.category.icon"/></div>
        <div class="info">
          <span class="text-info">
            <span class="icon-name">{{item.category.name}}</span>
            <span class="percent">{{item.percent.toFixed(2)}}%</span>
            <span class="amount">{{item.sum}}</span>
          </span>
          <div class="percent-bar" :style="{width: item.percent + '%'}"></div>
        </div>
      </li>
    </ol>
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
import Icon from "@/components/Icon/Icon.vue";
import VEcharts from "@/components/VEcharts.vue";
import dayjs from "dayjs";
import {Category, CategoryState, MoneyRecord, MoneyRecordState, MoneyType} from "@/store/modules/module-types";
import {State} from "vuex-class";
import {EChartOption} from "echarts";

type CategoryToRecordsMap = { [categoryId: number]: MoneyRecord[] }
type CategoryToSumMap = { [categoryId: number]: number }

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
    Icon,
  }
})
export default class Statistics extends Vue {
  @State('category') readonly categoryState!: CategoryState
  @State('record') readonly recordState!: MoneyRecordState
  curDate = new Date()
  showDatePicker = false
  moneyType: MoneyType = 'expenditure'
  echartsListeners = {
    'legendselectchanged': (e: { type: string; name: string; select: object }) => {
      this.handleLegendChanged(e.name)
    }
  }

  get dateStr() {
    return dayjs(this.curDate).format('YYYY年M月')
  }

  get dateArr() {
    return Array(dayjs(this.curDate).daysInMonth()).fill(0).map((_, index) => index + 1)
  }

  get categoryRankData() {
    let records = this.recordState.recordList
    records = this.getRecordsByMonth(records, this.curDate)
    records = this.getRecordsByMoneyType(records, this.moneyType)
    const sumByCategory = this.getSumByCategory(records)
    const ret = Object.entries(sumByCategory)
    const total = ret.reduce((acc, item) => acc + item[1], 0)
    ret.sort((a, b) => b[1] - a[1])
    return ret.map(item => {
      return {
        category: this.getCategoryById(this.categoryState.categoryList, parseInt(item[0])),
        sum: item[1],
        percent: item[1] / total * 100
      }
    })
  }

  handleLegendChanged(name: string) {
    if (name === '收入') {
      this.moneyType = 'income'
    }
    if (name === '支出') {
      this.moneyType = 'expenditure'
    }
  }

  get option(): EChartOption {
    const seriesData = this.getSumByDates(this.recordState.recordList, this.curDate)
    return {
      color: ['#ef5350', '#66bb6a'],
      title: {
        text: '月度趋势图',
        top: 10,
        left: 6,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      legend: {
        selectedMode: 'single',
        top: 10,
      },
      xAxis: {
        type: 'category',
        data: this.dateArr
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '支出',
        data: seriesData['expenditure'],
        type: 'bar'
      }, {
        name: '收入',
        data: seriesData['income'],
        type: 'bar'
      }]
    }
  }

  getCategoryById(categories: Category[], id: number) {
    return categories.filter(category => category.id === id)[0]
  }

  getSumByDates(records: MoneyRecord[], date: Date) {
    records = this.getRecordsByMonth(records, date)
    const ret = {
      income: this.dateArr.map(_ => 0),
      expenditure: this.dateArr.map(_ => 0)
    }
    return records.reduce((acc, record) => {
      acc[record.moneyType][dayjs(record.time).date() - 1] += record.amount
      return acc
    }, ret)
  }

  getSumByCategory(records: MoneyRecord[]): CategoryToSumMap {
    function getCategoryToRecordMap(records: MoneyRecord[]) {
      const map: CategoryToRecordsMap = {}
      return records.reduce((acc, record) => {
        if (acc[record.categoryId]) {
          acc[record.categoryId].push(record)
        } else {
          acc[record.categoryId] = [record]
        }
        return acc
      }, map)
    }

    const map = getCategoryToRecordMap(records)
    const ret: { [categoryId: number]: number } = {}
    for (const i in map) {
      if (!Object.prototype.hasOwnProperty.call(map, i)) continue
      ret[i] = map[i].reduce((acc, record) => acc + record.amount, 0)
    }
    return ret
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
.category-rank-list {
  padding: 10px;
  .rank-list-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid $grey-2;
    .icon-wrapper {
      width: 40px;
      height: 40px;
      background-color: $grey-1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      margin-right: 10px;
      .icon {
        fill: $brand-color;
      }
    }
    .info {
      flex: 1;
      .text-info {
        display: flex;
        align-items: center;
        .percent {
          font-size: 12px;
          margin-left: 6px;
        }
        .amount {
          margin-left: auto;
        }
      }
      .percent-bar {
        margin: 4px 0;
        height: 6px;
        width: 100%;
        border-radius: 5px;
        background-color: $brand-color;
      }
    }
  }
}
</style>