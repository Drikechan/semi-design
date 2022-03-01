<template>
  <div class="table-fragment">
    <el-table v-loading="tableLoading" :ref="tableRef" :data="tableData" v-bind="$attrs" v-on="$listeners" :header-cell-style="defaultOptions.orisTableHeader"
       :span-method="this.merge ? this.mergeMethod : this.spanMethod">
      <template v-if="columnType">
        <el-table-column v-if="columnType === 'expand'" type="expand" align="center">
          <template slot-scope="scope">
            <slot name="expand" v-bind="scope" />
          </template>
        </el-table-column>
        <el-table-column v-else :type="columnType" :label="columnTypeName" width="55" align="center" />
      </template>        
      <template v-for="item in column">
        <el-table-column v-if="item.slotName" :key="item.prop" v-bind="item" v-on="$listeners">
            <template slot-scope="scope">
              <slot :name="item.slotName" :record="scope.row" :index="scope.$index" />
            </template>
        </el-table-column>
        <el-table-column v-else  v-bind="item" v-on="$listeners" :key="item.prop" :align="item.align || 'left'"></el-table-column>
      </template>
    </el-table>
    <div :class="paginationClassName">
      <el-pagination v-if="pagination" v-bind="$attrs" v-on="$listeners" :layout="layout" :page-sizes="pageSizes"
        :current-page="pageInfo.page" :page-size="pageInfo.limit" :total="total" @current-change="currentChange"
        @size-change="sizeChange"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrisTable',
  props: {
    column: {
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
      default: 'pagination-wrapper__right'
    },
    query: {
      type: Object,
      default: () => {}
    },
    requestFn: {
      type: Function
    },
    tableRef: {
      type: String,
      default: 'tableRef'
    },
    columnType: {
      type: String
    },
    columnTypeName: {
      type: String
    },
    spanMethod: {
      type: Function
    },
  },
  data: () => ({
    tableData: [],
    defaultOptions: {
      border: false,
      orisTableHeader: { background: '#EBEEF5', color: '#606266' },
    },
    mergeLine: {},
    mergeIndex: {},
    total: 0,
    pageInfo: {
      page: 1,
      limit: 10
    },
    tableLoading: false
  }),
  mounted() {
     this.requestFn && this.getPageData();
    this.getMergeArr(this.tableData, this.merge);
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
    },
    getPageData(page) {
      page && (this.pageInfo.page = page);
      this.tableLoading = true;
      this.requestFn({...this.pageInfo, ...this.query}).then(res => {
        const {message, data, total} = res;
        if (res.status === 0) {
          this.$emit('returnData', data);
        } else {
          this.$message.error(message);
        }
        this.tableData = data;
        this.total = total;
        this.tableLoading = false;
      }).catch(e => {
        this.tableLoading = false;
        throw new Error(e);
      })
    },
    currentChange(current) {
      this.pageInfo.page = current;
      this.getPageData();
    },
    sizeChange(page) {
      this.pageInfo.limit = page;
      this.getPageData();
    },
  },
  watch: {
    merge () {
      this.getMergeArr(this.tableData, this.merge)
    }    
  }
};
</script>

<style lang="scss" scoped>
.table-fragment {
  margin-top: 20px;
  .pagination-wrapper__right {
    width: 100%;
    text-align: right;
    margin-top: 20px;
  }
}
</style>