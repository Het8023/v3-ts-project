<template>
  <div class="layout-header-breadcrumb">
    <svg-icon class="layout-header-expand-icon" name="ele-Fold"></svg-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="flex-center">
          <svg-icon :size="14" name="ele-Setting"></svg-icon>
          系统管理
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span class="flex-center">
          <svg-icon :size="14" name="ele-Menu"></svg-icon>
          菜单管理
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
