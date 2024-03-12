<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <LayoutAside></LayoutAside>
    <el-container direction="vertical">
      <!-- 右侧头部 -->
      <LayoutHeader></LayoutHeader>
      <!-- 右侧主区域 -->
      <LayoutMain></LayoutMain>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
// 异步加载组件
import { defineAsyncComponent } from 'vue'

const LayoutAside = defineAsyncComponent(() => import('./layoutAside/index.vue'))
const LayoutHeader = defineAsyncComponent(() => import('./layoutHeader/index.vue'))
const LayoutMain = defineAsyncComponent(() => import('./layoutMain/index.vue'))
</script>
<style lang="scss" scoped></style>
