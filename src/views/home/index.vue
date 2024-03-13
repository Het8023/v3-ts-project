<script lang="ts" name="Home" setup>
import { defineAsyncComponent } from 'vue'

const StaticBlock = defineAsyncComponent(() => import('./components/staticBlock.vue'))
</script>

<template>
  <div>
    <StaticBlock></StaticBlock>
  </div>
</template>

<style lang="scss"></style>
