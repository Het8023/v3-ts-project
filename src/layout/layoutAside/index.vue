<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'

const Logo = defineAsyncComponent(() => import('./logo.vue'))
const VerticalMenu = defineAsyncComponent(() => import('./vertcialMenu.vue'))

import { useLayoutConfigStore } from '@/stores/layoutConfig'
const store = useLayoutConfigStore()
const isCollapse = computed(() => {
  return store.isCollapse
})
</script>

<template>
  <!--左侧菜单区域-->
  <el-aside
    class="layout-aside"
    :class="isCollapse ? 'layout-aside-menu-60' : 'layout-aside-menu-200'"
  >
    <!--logo-->
    <Logo></Logo>
    <!--menu-->
    <VerticalMenu></VerticalMenu>
  </el-aside>
</template>

<style lang="scss" scoped></style>
