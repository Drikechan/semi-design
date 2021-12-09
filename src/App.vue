<template>
  <div id="app">
    <el-button @click="show">点击</el-button>
    <el-dialog :visible="visibleFlag">
        <michael-select v-model="value1.name" :options="options" :multiple="true" :collapse-tags="true" class="select-style" ></michael-select>
    </el-dialog>
  </div>
</template>

<script>
import michaelSelect from '@/components/Select/index'
export default {
  components: {
    michaelSelect
  }, 
  data: () => ({
    value1: {
      name: []
    },
    options: [],
    visibleFlag: false
  }),
  created () {
    this.createData();
  },
  methods: {
    createData () {
      for (let i = 0; i < 10000; i++) {
        this.options.push({label: `选项${i}`, value: i})
      }
    },
    show() {
      this.visibleFlag = true;
      this.value1.name = [5000]
    }
  }
}
</script>

<style >
>>>.el-select-dropdown__item {
  display: inline-block;
  max-width: 260px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>