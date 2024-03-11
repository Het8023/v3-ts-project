<template>
  <RouterView></RouterView>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getList } from './api/test'

const init = async () => {
  try {
    const res = await getList({
      current: 1,
      size: 10
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

init()
</script>
<style lang="scss" scoped></style>
