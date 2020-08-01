<template>
  <div class="number-pad" @click="onClick">
    <button class="calc-button" data-type="1">1</button>
    <button class="calc-button" data-type="2">2</button>
    <button class="calc-button" data-type="3">3</button>
    <button class="date-picker-button" data-type="date">date</button>
    <button class="calc-button" data-type="4">4</button>
    <button class="calc-button" data-type="5">5</button>
    <button class="calc-button" data-type="6">6</button>
    <button class="calc-button" data-type="+">+</button>
    <button class="calc-button" data-type="7">7</button>
    <button class="calc-button" data-type="8">8</button>
    <button class="calc-button" data-type="9">9</button>
    <button class="calc-button" data-type="-">-</button>
    <button class="calc-button" data-type=".">.</button>
    <button class="calc-button" data-type="0">0</button>
    <button class="calc-button" data-type="clear">清零</button>
    <button v-if="!showEqual" class="submit-button" data-type="submit">完成</button>
    <button v-if="showEqual" class="equal-button" data-type="getResult">=</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  @Prop() showEqual!: boolean

  onClick(e: {target: HTMLInputElement}) {
    if (e.target.dataset.type) {
      this.$emit('change', e.target.dataset['type'])
    }
  }
}
</script>

<style lang="scss" scope>
@import '~@/style/variable';
$gap: 10px;
.number-pad {
  background: $grey-2;
  display: flex;
  flex-wrap: wrap;
  padding: $gap / 2;
  > button {
    font-size: 16px;
    display: inline-block;
    width: calc((100vw - #{$gap * 5}) / 4);
    margin:$gap / 2;
    line-height: 2;
    background: #fff;
    border: 1px solid #000;
    border-radius: 4px;
    transition: all 100ms ease-in;
    &:focus {
      outline: none;
    }
    &:active {
      color: #fff;
      background-color: $brand-color;
    }
    &.submit-button,
    &.equal-button {
      color: #fff;
      background-color: $brand-color;
      &:active {
        color: #000;
        background: #fff;
      }
    }
  }
}
</style>
