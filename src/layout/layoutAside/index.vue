<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const Logo = defineAsyncComponent(() => import('./logo.vue'))
const VerticalMenu = defineAsyncComponent(() => import('./vertcialMenu.vue'))
</script>

<template>
  <!--左侧菜单区域-->
  <el-aside class="layout-aside-menu-200 layout-aside">
    <!--logo-->
    <Logo></Logo>
    <!--menu-->
    <VerticalMenu></VerticalMenu>
  </el-aside>
</template>

<style lang="scss" scoped></style>
