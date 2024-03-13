<script lang="ts" setup>
import { getStatisticsApi } from '@/api/home'
import { ref } from 'vue'
import type { StatisticsResType } from '@/api/home/types'

// 营业额的数据
const StaticData = ref<StatisticsResType>()
export type BlockListType = {
  name: string
  unit: string
  content: string
  startColor: string
  endColor: string
  column: string
}
// 营业额的列表样式数据
const blockList = ref<BlockListType[]>([
  {
    name: '订单笔数',
    unit: '笔',
    content: '订单笔数=(商品消费+快速消费+计次消费)的订单数',
    startColor: 'red',
    endColor: 'blue',
    column: 'totalOrderNum'
  },
  {
    name: '销售总额',
    unit: '元',
    content: '销售总额=商品消费+快速消费+计次消费的合计金额',
    startColor: 'red',
    endColor: 'blue',
    column: 'totalSaleMoney'
  },
  {
    name: '退款总额',
    unit: '元',
    content: '退款总额=退货或撤单的退款总金额',
    startColor: 'red',
    endColor: 'blue',
    column: 'totalReturnedMoney'
  },
  {
    name: '综合收入',
    unit: '元',
    content: '综合收入是指店铺实际进帐金额',
    startColor: 'red',
    endColor: 'blue',
    column: 'totalIncomeMoney'
  }
])

// 加载营业额的数据
const loadStaticData = async () => {
  try {
    const res = await getStatisticsApi()
    StaticData.value = res.data
  } catch (e) {
    console.log(e)
  }
}
loadStaticData()
</script>

<template>
  <div class="home-static">
    <div class="home-static-title">营业数据统计</div>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in blockList" :key="index" :span="6">
        <el-card shadow="hover"> {{ item.name }} </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.home-static {
  .home-static-title {
    font-size: 18px;
    line-height: 25px;
    height: 25px;
    padding-left: 10px;
    margin: 15px 0;
    border-left: 2px solid var(--el-color-primary);
  }
}
</style>
