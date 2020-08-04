<template>
  <layout>
    <template v-slot:header>
      <top-bar>
        <radio-group v-model="moneyType">
          <radio-button label="income">收入</radio-button>
          <radio-button label="expenditure">支出</radio-button>
        </radio-group>
      </top-bar>
    </template>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <div class="catagory-list-wrapper">
      <catagory-list v-model="selectedId" :listData="catagoryState.catagoryList"/>
      {{JSON.stringify(recordState.recordList)}}
    </div>
    <div class="control-panel">
      <calc-str-bar :calcStr="calcStr"/>
      <number-pad :showEqual="operator.length !== 0" @change="onChange"/>
    </div>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import NavBar from "@/components/NavBar.vue";
import Icon from "@/components/Icon.vue";
import TopBar from "@/components/TopBar.vue";
import RadioButton from "@/components/Radio/RadioButton.vue";
import RadioGroup from "@/components/Radio/RadioGroup.vue";
import CatagoryList from "./common/CatagoryList.vue";
import NumberPad from "./common/NumberPad.vue";
import CalcStrBar from "./common/CalcStrBar.vue";
import {MoneyType, CatagoryState, MoneyRecordState} from '@/store/modules/module-types';

import {
  State,
  Mutation,
} from 'vuex-class'

type Operator = '+' | '-'
type NumberStr = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
type NumberPadHandlerVal = Operator | NumberStr | 'submit' | 'date' | 'clear'|'.'|'getResult'

@Component({
  components: {
    Layout,
    NavBar,
    Icon,
    TopBar,
    RadioButton,
    RadioGroup,
    CatagoryList,
    NumberPad,
    CalcStrBar,
  },
})
export default class RecordAdd extends Vue {
  moneyType: MoneyType = 'income'
  left = '0'
  right = ''
  operator = ''
  selectedId = -1
  @State('catagory') catagoryState!: CatagoryState
  @State('record') recordState!: MoneyRecordState
  @Mutation('record/add') addRecord!: Function

  get calcStr() {
    return this.left + this.operator + this.right
  }
  getCalcResult() {
    let result = 0
    if (this.operator === '+') {
      result = +this.left + +this.right
    } else {
      result = +this.left - +this.right
    }
    // 如果为.00，则说明为整数，可以去除
    this.left = result.toFixed(2).replace(/\.00$/, '')
    this.right = ''
    this.operator = ''
  }
  handleOperator(val: Operator) {
    if (this.right.length !== 0) {
      this.getCalcResult()
    }
    this.operator = val
  }
  handleNumber(val: NumberStr) {
    const reg = /\.\d{2,}$/
    if (this.operator) {
      if (reg.test(this.right)) return
      if (this.right === '0') {
        this.right = val
      } else {
        this.right += val
      }
    } else {
      if (reg.test(this.left)) return
      if (this.left === '0') {
        this.left = val
      } else {
        this.left += val
      }
    }
  }
  handleDot() {
    if (this.operator) {
      if (this.right.indexOf('.') === -1) {
        this.right += '.'
      }
    } else {
      if (this.left.indexOf('.') === -1) {
        this.left += '.'
      }
    }
  }
  handleSubmit() {
    this.getCalcResult()
    console.log(this.selectedId, this.moneyType, this.calcStr)
    this.addRecord({
      moneyType: this.moneyType,
      catagoryId: this.selectedId,
      amount: +this.calcStr
    })
  }
  handleClear() {
    this.left = '0'
    this.right = ''
    this.operator = ''
  }
  onChange(val: NumberPadHandlerVal) {
    switch(val) {
      case '+':
      case '-':
        this.handleOperator(val)
        break
      case 'submit':
        this.handleSubmit()
        break
      case 'clear':
        this.handleClear()
        break
      case 'date':
        // this.handleDate()
        break
      case '.':
        this.handleDot()
        break
      case 'getResult':
        this.getCalcResult()
        break
      default:
        this.handleNumber(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.catagory-list-wrapper {
  flex: 1;
  overflow: auto;
}
.control-panel {
  flex-shrink: 0;
}
</style>
