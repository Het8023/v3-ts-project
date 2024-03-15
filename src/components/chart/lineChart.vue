<script lang="ts" setup>
import { useCharts } from '@/hooks/useCharts'

let props = withDefaults(
  defineProps<{
    title?: string
    subtext?: string
    theme?: string
    bgColor?: string
    width?: string
    height?: string
    data: any
    xAxisData: any[]
  }>(),
  {
    width: '100%',
    height: '380px',
    data: () => [],
    xAxisData: () => []
  }
)

console.log(Array.from(props.data[0]))

const option = {
  title: {
    text: 'Bump Chart (Ranking)'
  },
  tooltip: {
    trigger: 'item'
  },
  grid: {
    left: 30,
    right: 0,
    bottom: 30,
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    data: props.xAxisData
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: Array.from(props.data[0]),
      type: 'line'
    },
    {
      data: Array.from(props.data[1]),
      type: 'line'
    },
    {
      data: Array.from(props.data[2]),
      type: 'line'
    },
    {
      data: Array.from(props.data[3]),
      type: 'line'
    }
  ]
}
const { chartRef } = useCharts({
  props,
  option
})
</script>

<template>
  <el-card shadow="hover">
    <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
  </el-card>
</template>

<style lang="scss" scoped></style>
