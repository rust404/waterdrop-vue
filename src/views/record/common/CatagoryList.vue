<template>
  <ul class="catagory-list">
    <li
      :class="listItemClassName(catagory)"
      v-for="catagory in listData"
      :key="catagory.id"
      @click="handleClick(catagory.id)"
    >
      <div class="catagory-icon-wrapper">
        <Icon :size="30" class="catagory-icon" :name="catagory.icon" />
      </div>
      {{catagory.name}}
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from "vue-property-decorator";
import Icon from '@/components/Icon.vue';
import classNames from 'classnames';

type MoneyType = 'income' | 'expenditure';

export interface Catagory {
  name: string;
  icon: string;
  id: number;
  type: MoneyType;
}

@Component({
  components: {
    Icon,
  }
})
export default class CatagoryList extends Vue {
  @Model('change', { type: Number }) readonly selectedCatagoryId!: number;
  @Prop() readonly listData!: Catagory[];

  listItemClassName(catagory: Catagory) {
    return classNames('catagory-list-item', {
      'is-active': this.selectedCatagoryId === catagory.id
    })
  }
  handleClick(id: number) {
    this.$emit('change', id)
  }
}
</script>

<style lang="scss" scope>
@import '~@/style/variable';
$gap: 20px;
.catagory-list {
  display: flex;
  flex-wrap: wrap;
  padding: $gap / 2;
  align-items: flex-start;
  .catagory-list-item {
    width: calc((100vw - #{$gap * 6}) / 5);
    margin: $gap / 2;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    .catagory-icon-wrapper {
      width: 100%;
      height: calc((100vw - #{$gap * 6}) / 5);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background-color: $grey-2;
      margin-bottom: 6px;
    }
    &.is-active .catagory-icon-wrapper {
      background-color: $brand-color;
      .catagory-icon {
        fill: $grey-2;
      }
    }
  }
}
</style>
