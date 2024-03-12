<script lang="ts" setup>
import { ref } from 'vue'

const active = ref<boolean>(false)
</script>

<template>
  <div class="layout-header-user">
    <!-- 全屏切换-->
    <div>
      <svg-icon name="ele-FullScreen"></svg-icon>
    </div>
    <!--主题切换-->
    <div>
      <el-switch
        v-model="active"
        active-icon="ele-Moon"
        inactive-icon="ele-Sunny"
        inline-prompt
        style="--el-switch-on-color: #333"
      ></el-switch>
    </div>
    <!--下拉菜单-->
  </div>
</template>

<style lang="scss" scoped></style>
