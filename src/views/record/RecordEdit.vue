<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <radio-group v-model="moneyType">
          <radio-button label="expenditure">支出</radio-button>
          <radio-button label="income">收入</radio-button>
        </radio-group>
        <template v-slot:right>
          <button class="delete-btn" @click="handleDelete">删除</button>
        </template>
      </top-bar>
    </template>
    <div class="category-list-wrapper">
      <category-list type="manage" v-model="selectedId" :listData="selectedCategoryList" @manage="onManageClick"/>
    </div>
    <div class="control-panel">
      <calc-str-bar :calcStr="calcStr"/>
      <number-pad
        :showEqual="operator.length !== 0"
        v-model="curDate"
        @input:number="handleNumber"
        @input:operator="handleOperator"
        @input:dot="handleDot"
        @input:submit="handleSubmit"
        @input:getResult="getCalcResult"
        @input:clear="handleClear"
      />
    </div>
  </layout>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import NavBar from "@/components/NavBar.vue";
import Icon from "@/components/Icon/Icon.vue";
import TopBar from "@/components/TopBar.vue";
import RadioButton from "@/components/Radio/RadioButton.vue";
import RadioGroup from "@/components/Radio/RadioGroup.vue";
import CategoryList from "./common/CategoryList.vue";
import NumberPad from "./common/NumberPad.vue";
import CalcStrBar from "./common/CalcStrBar.vue";
import {MoneyType, Category, MoneyRecord} from '@/store/modules/module-types';

import {
  State,
  Action,
} from 'vuex-class'

@Component({
  components: {
    Layout,
    NavBar,
    Icon,
    TopBar,
    RadioButton,
    RadioGroup,
    CategoryList,
    NumberPad,
    CalcStrBar,
  },
})
export default class RecordAdd extends Vue {
  moneyType: MoneyType = 'expenditure'
  left = '0'
  right = ''
  operator = ''
  selectedId = -1
  curDate: Date
  @State(state => state.category.categoryList) categoryList!: Category[]
  @State(state => state.record.recordList) recordList!: MoneyRecord[]
  @Action('record/edit') editRecord!: Function
  @Action('record/delete') deleteRecord!: Function

  created() {
    const record = this.recordList.filter(record => record.id === parseInt(this.$route.params.id))[0]
    if (!record) {
      this.$router.push('/')
    }
    this.left = '' + record.amount
    this.selectedId = record.categoryId
    this.moneyType = record.moneyType
    this.curDate = new Date(record.createAt)
  }

  get calcStr() {
    return this.left + this.operator + this.right
  }

  get selectedCategoryList() {
    return this.categoryList.filter(item => item.moneyType === this.moneyType)
  }

  onManageClick() {
    this.$router.push('/category/manage')
  }

  handleDelete() {
    this.deleteRecord(parseInt(this.$route.params.id))
    this.$message({type: 'success', message: '删除成功'})
    this.$router.back()
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

  validate() {
    if (this.selectedId === -1) {
      this.$message({type: 'warning', message: '分类不能为空'})
      return false
    } else if (this.calcStr === '0') {
      this.$message({type: 'warning', message: '数值不能为0'})
      return false
    }
    return true
  }

  handleSubmit(date: Date) {
    this.getCalcResult()
    if (!this.validate()) {
      return
    }
    this.editRecord({
      id: parseInt(this.$route.params.id),
      moneyType: this.moneyType,
      categoryId: this.selectedId,
      amount: +this.calcStr,
      createAt: this.curDate.toISOString()
    })
    this.handleClear()
    this.$message({type: 'success', message: '编辑成功', duration: 1000})
    this.$router.push('/record/detail')
  }

  handleClear() {
    this.left = '0'
    this.right = ''
    this.operator = ''
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

.category-list-wrapper {
  flex: 1;
  overflow: auto;
}

.control-panel {
  flex-shrink: 0;
}

.delete-btn {
  color: $danger;
}
</style>
