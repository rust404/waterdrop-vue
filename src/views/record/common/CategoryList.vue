<template>
  <ul class="category-list">
    <li
      :class="listItemClassName(category)"
      v-for="category in listData"
      :key="category.id"
      @click="handleClick(category.id)"
    >
      <div class="category-icon-wrapper">
        <Icon :size="30" class="category-icon" :name="category.icon" />
      </div>
      {{category.name}}
    </li>
  </ul>
</template>

<script lang="ts">
import {Vue, Component, Model, Prop, Watch} from "vue-property-decorator";
import Icon from '@/components/Icon.vue';
import classNames from 'classnames';
import {Category, MoneyType} from "@/store/modules/module-types";


@Component({
  components: {
    Icon,
  }
})
export default class CategoryList extends Vue {
  @Model('change', { type: Number }) readonly selectedCategoryId!: number;
  @Prop() readonly listData!: Category[];

  listItemClassName(category: Category) {
    return classNames('category-list-item', {
      'is-active': this.selectedCategoryId === category.id
    })
  }
  handleClick(id: number) {
    this.$emit('change', id)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/variable';
$gap: 20px;
.category-list {
  display: flex;
  flex-wrap: wrap;
  padding: $gap / 2;
  align-items: flex-start;
  .category-list-item {
    width: calc((100vw - #{$gap * 6}) / 5);
    margin: $gap / 2;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    .category-icon-wrapper {
      width: 100%;
      height: calc((100vw - #{$gap * 6}) / 5);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background-color: $grey-2;
      margin-bottom: 6px;
    }
    &.is-active .category-icon-wrapper {
      background-color: $brand-color;
      .category-icon {
        fill: $grey-2;
      }
    }
  }
}
</style>
