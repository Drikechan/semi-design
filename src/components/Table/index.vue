<template>
  <div>
    <el-table v-bind="$attrs" v-on="$listeners">
      <template v-for="item in columns">
        <el-table-column v-bind="item" :key="item.prop" :align="item.align || 'left'"></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OrsdTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  }

}
</script>

<style>

</style>