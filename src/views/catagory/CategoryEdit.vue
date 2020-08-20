<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <template v-slot:right>
          <button class="finished-btn" @click="handleFinished">完成</button>
        </template>
        编辑分类
      </top-bar>
    </template>
    <div class="category-info">
      <span class="category-icon-wrapper is-active">
        <icon class="category-icon" :name="categoryIcon"/>
      </span>
      <input type="text" class="icon-name" v-model="categoryName" placeholder="分类名称">
    </div>
    <ul class="category-icon-list">
      <li v-for="name in iconList" :key="name" @click="categoryIcon = name">
        <span :class="getIconWrapperClass(name)">
          <icon class="category-icon" :name="name"/>
        </span>
      </li>
    </ul>
  </layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Layout from "@/components/Layout.vue";
import TopBar from "@/components/TopBar.vue";
import Icon from "@/components/Icon/Icon.vue";
import {CategoryState} from "@/store/modules/module-types";
import {CATEGORY_ICON_NAMES} from "@/assets/icon";
import {Action, State} from "vuex-class";

@Component({
  components: {
    Layout,
    TopBar,
    Icon,
  }
})
export default class CategoryEdit extends Vue {
  @State('category') readonly categoryState!: CategoryState
  @Action('category/edit') readonly categoryEdit!: Function
  iconList = CATEGORY_ICON_NAMES
  categoryName = ''
  categoryIcon = ''
  created() {
    const category = this.categoryState.categoryList.filter(category => category.id === Number(this.$route.params.id))[0]
    if (!category) {
      this.$router.push('/')
    }
    this.categoryName = category.name
    this.categoryIcon = category.icon
  }
  handleBack() {
    this.$router.back()
  }
  handleFinished() {
    if (!this.validate()) return
    this.categoryEdit({
      id: Number(this.$route.params.id),
      icon: this.categoryIcon,
      name: this.categoryName
    })
    this.$message({type: 'success', message: '编辑分类成功'})
    this.$router.back()
  }
  getIconWrapperClass(iconName: string) {
    return  {
      'category-icon-wrapper': true,
      'is-active': this.categoryIcon === iconName
    }
  }
  validate() {
    if (this.categoryName.length === 0) {
      this.$message({type: 'warning', message: '分类名称不能为空'})
      return false
    }
    if (this.categoryName.length > 6) {
      this.$message({type: 'warning', message: '分类名称不能长于6个字'})
      return false
    }
    if (this.categoryIcon === '') {
      this.$message({type: 'warning', message: '请选择分类图标'})
      return false
    }
    return true
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';

.finished-btn {
  color: $brand-color;
}
.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: $grey-2;
  &.is-active {
    background-color: $brand-color;
    .category-icon {
      fill: #fff;
    }
  }
  .category-icon {
    width: 30px;
    height: 30px;
  }
}
.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  .icon-name {
    width: 0;
    flex: 1;
    border: none;
    outline: none;
    text-align: right;
    line-height: 24px;
    font-size: 20px;
  }
}
.category-icon-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  .category-icon-wrapper {
    margin: 10px 10px;
  }
}
</style>
