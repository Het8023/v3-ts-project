<template>
  <render />
</template>
<script setup lang="ts">
import { h, resolveComponent } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: string
    size?: string | number
    name?: string
  }>(),
  {
    name: '',
    size: 18
  }
)

const render = () => {
  if (props.name && props.name?.startsWith('ele-')) {
    return h(resolveComponent('el-icon'), { color: props.color, size: props.size }, [
      h(resolveComponent(props.name))
    ])
  } else {
    return h('i')
  }
}
</script>
<style lang="scss" scoped></style>
