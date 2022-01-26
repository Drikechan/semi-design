<template>
  <div>
    <orsd-table :data="data" :columns="columns" @current-change="handlerCurrent" :merge="['name', 'proportion', 'material', 'value3']">
    </orsd-table>
  </div>
</template>

<script>
import OrsdTable from './components/Table/index.vue';
export default {
  name: 'App',
  components: {
    OrsdTable,
  },
  data: () => ({
    columns: [
      {
        prop: 'name',
        label: '行业',
      },
      {
        prop: 'proportion',
        label: '市场规模占比',
      },
      {
        prop: 'material',
        label: '主原材料',
      },
      {
        prop: 'value1',
        label: '最新价格',
      },
      {
        prop: 'value2',
        label: '比年初',
      },
      {
        prop: 'value3',
        label: '比上年同期',
      },
    ],
    data: [
      {
        name: ' 氮肥、复合肥',
        proportion: '15.23%',
        material: '尿素',
        value1: '2.04',
        value2: '2.00%',
        value3: '	13.97%',
      },
      {
        name: ' 氮肥、复合肥',
        proportion: '15.23%',
        material: '三元复合肥',
        value1: '2.74',
        value2: '0.37%',
        value3: '	2.24%',
      },
      {
        name: ' 氮肥、复合肥',
        proportion: '15.23%',
        material: '三元复合肥',
        value1: '3.05',
        value2: '0.33%',
        value3: '	2.35%',
      },
      {
        name: ' 种子生产',
        proportion: '6.83%',
        material: '玉米种子',
        value1: '24.3',
        value2: '-16.06%',
        value3: '	-5.70%',
      },
      {
        name: ' 种子生产',
        proportion: '6.83%',
        material: '水稻种子',
        value1: '24.3',
        value2: '-16.06%',
        value3: '	-5.70%',
      },
    ],
    pageInfo: {
      current: 1,
      pageSize: 5,
    },
    total: 0,
  }),
  methods: {
    getTableList() {
      const data = this.tableData;
      this.total = this.tableData.length;
      console.log(data);
    },
    handlerCurrent(current) {
      console.log(current);
    },
  },
};
</script>

<style>
</style>