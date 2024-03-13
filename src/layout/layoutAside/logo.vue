<script lang="ts" setup>
import { useLayoutConfigStore } from '@/stores/layoutConfig'
import { computed } from 'vue'
const store = useLayoutConfigStore()
const isCollapse = computed(() => {
  return store.isCollapse
})
</script>

<template>
  <div class="layout-logo">
    <img alt="" class="logo" src="@/assets/logo.jpeg" />
    <span v-if="!isCollapse">后台管理系统</span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
