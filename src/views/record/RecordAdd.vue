<template>
  <layout>
    <template v-slot:header>
      <top-bar>
        <radio-group v-model="moneyType">
          <radio-button label="expenditure">支出</radio-button>
          <radio-button label="income">收入</radio-button>
        </radio-group>
      </top-bar>
    </template>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <div class="category-list-wrapper">
      <category-list type="manage" v-model="selectedId" :listData="selectedCategoryList" @manage="onManageClick"/>
    </div>
    <div class="control-panel">
      <calc-str-bar :calcStr="calcStr"/>
      <calc-pad :date.sync="curDate" :calc.sync="calcStr" @submit="handleSubmit"/>
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
import CalcPad from "@/views/record/common/withCalc";
import {MoneyType, Category} from '@/store/modules/module-types';

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
    CalcPad
  },
})
export default class RecordAdd extends Vue {
  moneyType: MoneyType = 'expenditure'
  selectedId = -1
  calcStr = '0'
  curDate = new Date()
  @State(state => state.category.categoryList) categoryList!: Category[]
  @Action('record/add') addRecord!: Function

  get selectedCategoryList() {
    return this.categoryList.filter(item => item.moneyType === this.moneyType)
  }
  onManageClick() {
    this.$router.push('/category/manage')
  }
  validate() {
    if (this.selectedId === -1) {
      this.$message({type: 'warning', message: '分类不能为空'})
      return false
    } else if (this.calcStr === '0') {
      this.$message({type: 'warning', message: '数值不能为0'})
      return false
    } else if (parseFloat(this.calcStr) < 0) {
      this.$message({type: 'warning', message: '数值不能为负'})
      return false
    }
    return true
  }
  handleSubmit() {
    if (!this.validate()) {
      return
    }
    this.addRecord({
      moneyType: this.moneyType,
      categoryId: this.selectedId,
      amount: +this.calcStr,
      createAt: this.curDate.toISOString()
    })
    this.$message({type: 'success', message: '添加成功', duration: 1000})
    this.$router.push('/record/detail')
  }
}
</script>

<style lang="scss" scoped>
.category-list-wrapper {
  flex: 1;
  overflow: auto;
}
.control-panel {
  flex-shrink: 0;
}
</style>
