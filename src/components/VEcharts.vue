<template>
  <div ref="charts" :style="{width: width, height: height}">echarts</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import echarts, {EChartOption, ECharts} from 'echarts';

@Component
export default class VEcharts extends Vue {
  @Prop(Object) readonly option!: EChartOption
  @Prop({default: "100%", type: String}) readonly width!: string
  @Prop({default: "300px", type: String}) readonly height!: string


  charts: ECharts | null = null
  mounted() {
    const container = this.$refs.charts as HTMLDivElement
    this.charts = echarts.init(container)
    this.charts.setOption(this.option)
  }
  @Watch('option')
  onOptionUpdate() {
    this.charts?.setOption(this.option)
  }
}
</script>

<style lang="scss" scoped>

</style>