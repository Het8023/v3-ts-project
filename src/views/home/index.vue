<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { getCategorySalesApi, getSalesApi, getTopApi } from '@/api/home'
import type { CategoryResType } from '@/api/home/types'
import { useLayoutConfigStore } from '@/stores/layoutConfig'

const store = useLayoutConfigStore()

const StaticBlock = defineAsyncComponent(() => import('./components/staticBlock.vue'))
const pieChart = defineAsyncComponent(() => import('@/components/chart/pieChart.vue'))
const barChart = defineAsyncComponent(() => import('@/components/chart/barChart.vue'))
const gaugeChart = defineAsyncComponent(() => import('@/components/chart/gaugeChart.vue'))
const lineChart = defineAsyncComponent(() => import('@/components/chart/lineChart.vue'))

onMounted(() => {
  loadCategoryData()
  loadTopData()
  loadSaleData()
})

// 初始化一个变量,用来分类销售统计数据
const categoryData = ref<CategoryResType[]>([])
// 获取分类销售统计数据
const loadCategoryData = async () => {
  try {
    const { data } = await getCategorySalesApi()
    categoryData.value = data
  } catch (e) {
    console.log(e)
  }
}
// loadCategoryData()
const theme = computed(() => (store.isDark ? 'dark' : ''))
const bgColor = computed(() => (store.isDark ? 'transparent' : ''))

// 获取会员消费top10的数据
// x轴的数据
const xAxisData = ref<string[]>([])
// y轴的数据
const yData = ref<number[]>([])
const loadTopData = async () => {
  try {
    const { data } = await getTopApi()
    let nameArr: string[] = []
    let valueArr: number[] = []

    data.forEach((item: any) => {
      nameArr.push(item.name)
      valueArr.push(item.consumeMoney)
    })

    xAxisData.value = nameArr
    yData.value = valueArr
    console.log('1', xAxisData.value)
    console.log('2', yData.value)
  } catch (e) {
    console.log(e)
  }
}
// loadTopData()

// 获取近30天销售数据
const linexAxisData = ref<number[]>([])
const lineyAxisData = ref<any>([])
const loadSaleData = async () => {
  try {
    const { data } = await getSalesApi()
    console.log(data)
    linexAxisData.value = data.last30Days
    lineyAxisData.value = [
      data.orderNumList,
      data.rechargeMoneyList,
      data.returnMoneyList,
      data.saleMoneyList
    ]
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <!-- 营业数据统计-->
    <StaticBlock></StaticBlock>
    <!-- 分类销售统计与近30天销售趋势-->
    <el-row :gutter="20">
      <el-col :lg="9" :md="11" :sm="24" :xs="24" class="mb15">
        <!--饼图-->
        <pieChart
          v-if="categoryData.length > 0"
          :bgColor="bgColor"
          :data="categoryData"
          :theme="theme"
          subtext="每种商品分类的近30天销售额"
          title="分类销售统计"
        ></pieChart>
      </el-col>
      <el-col :lg="15" :md="13" :sm="24" :xs="24" class="mb15">
        <!-- 折线图 -->
        <lineChart
          v-if="linexAxisData.length > 0"
          :data="lineyAxisData"
          :xAxisData="linexAxisData"
          title="近30天销售趋势"
        >
        </lineChart>
      </el-col>
    </el-row>
    <!-- 会员消费与气温仪表盘-->
    <el-row :gutter="20">
      <el-col :lg="15" :md="13" :sm="24" :xs="24" class="mb15">
        <!--柱状图-->
        <barChart
          v-if="yData.length > 0 && xAxisData.length > 0"
          :data="yData"
          :theme="theme"
          :xAxisData="xAxisData"
          subtext="单位:元"
          title="会员消费Top10"
        ></barChart>
      </el-col>
      <el-col :lg="9" :md="11" :sm="24" :xs="24" class="mb15">
        <!--  气温仪表盘-->
        <gaugeChart :data="38" title="气温仪表盘°C"></gaugeChart>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss"></style>
