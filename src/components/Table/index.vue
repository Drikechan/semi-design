<template>
  <div>
    <el-table :data="data" v-bind="$attrs" v-on="$listeners" :header-cell-style="defaultOptions.orisTableHeader"
      :stripe="defaultOptions.stripe" :span-method="this.merge ? this.mergeMethod : this.spanMethod">
      <template v-for="item in columns">
        <slot v-if="item.slot" :name="item.slot"></slot>
        <el-table-column v-else v-bind="item" :key="item.prop" :align="item.align || 'left'"></el-table-column>
      </template>
    </el-table>
    <div :class="paginationClassName">
      <el-pagination v-if="pagination" v-bind="$attrs" v-on="$listeners" :layout="layout" :page-sizes="pageSizes"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrisdTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100, 300, 500]
    },
    merge: {
      type: Array,
      default: () => []
    },
    paginationClassName: {
      type: String,
      default: 'pagination-wraaper__right'
    }
  },
  data: () => ({
    defaultOptions: {
      border: false,
      stripe: false,
      orisTableHeader: { background: '#EBEEF5', color: '#606266' },
    },
    mergeLine: {},
    mergeIndex: {}
  }),
  created() {
    this.getMergeArr(this.data, this.merge)
  },
  methods: {
    /* eslint-disable */
    getMergeArr (tableData, merge) {
      if (!merge) return
      this.mergeLine = {}
      this.mergeIndex = {}
      merge.forEach(item => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            this.mergeIndex[item] = this.mergeIndex[item] || [];
            this.mergeIndex[item].push(1);
            this.mergeLine[item] = 0;
          } else {
            if (data[item] === tableData[i - 1][item]) {
              this.mergeIndex[item][this.mergeLine[item]] += 1;
              this.mergeIndex[item].push(0);
            } else {
              this.mergeIndex[item].push(1);
              this.mergeLine[item] = i;
            }
          }
        })
      })

      
    },
    mergeMethod (data) {
      const { column, rowIndex } = data;
      const INDEX = this.merge.indexOf(column.property)
      if (INDEX > -1) {
        const ROW = this.mergeIndex[this.merge[INDEX]][rowIndex];
        const COL = ROW > 0 ? 1 : 0;
        return {
          rowspan: ROW,
          colspan: COL
        }
      }
    }
  },
  watch: {
    merge () {
      this.getMergeArr(this.data, this.merge)
    }    
  }
};
</script>

<style lang="scss" scoped>
.pagination-wraaper__right {
  width: 100%;
  text-align: right;
  margin-top: 20px;
}
</style>