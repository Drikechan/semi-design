<template>
  <div id="app">
    <el-button @click="show">点击</el-button>
    <el-dialog :visible="visibleFlag">
        <michael-select v-model="value1.name" :options="options" :multiple="true"  :collapse-tags="true" ></michael-select>
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
      for (let i = 0; i < 20000; i++) {
        this.options.push({text: `选项${i}`, value: i})
      }
    },
    show() {
      this.visibleFlag = true;
      this.value1.name = [19999]
    }
  }
}
</script>