<template>
  <el-table-column v-bind="$attrs"
    v-on="$listeners"
    :prop="column.prop"
    :label="column.label">
    <template v-if="column.slotName">
      <template slot-scope="scope">
        <slot :name="column.slotName" :record="scope.row" :index="scope.$index" />
      </template>        
    </template>  
    <template v-if="column.children">
      <oris-column v-for="(col, index) in column.children"
        :key="index"
        :column="col">
      </oris-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'OrisColumn',
  props: {
    column: {
      type: Object
    },

  },

}
</script>