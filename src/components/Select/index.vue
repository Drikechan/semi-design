<template>
  <div>
    <el-select v-bind="$attrs" v-on="$listeners" :filter-method="filterMethod"
      v-el-select-loadmore="loadMore(rangeNumber)" :loading="searchLoad" filterable @visible-change="visibleChange">
      <div class="select-action" v-if="isMultiline">
        <button @click="selectAllSeller" class="select-all-btn">Select All</button>
        <button @click="deselectAllSeller" class="deselect-all-btn">Deselect All</button>
      </div>        
      <el-option v-for="item in dataList.slice(0, rangeNumber)" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    isMultiline: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    relatedOpen: false,
    courseList: [],
    rangeNumber: 20,
    searchLoad: false /* 下拉框的loading状态 */,
    timer: null,
    tableLoading: false,
    isHasPermission: true,
    dataList: []
  }),
  directives: {
    "el-select-loadmore": (el, binding) => {
      // 获取element UI定义好的scroll元素
      const SELECTWRAP_ROM = el.querySelector(
        ".el-select-dropdown .el-select-dropdown__wrap"
      );
      if (SELECTWRAP_ROM) {
        // 添加scroll事件
        SELECTWRAP_ROM.addEventListener("scroll", function () {
          // 判断滚动
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          condition && binding.value();
        });
      }
    },
  },
  methods: {
    loadMore(n) {
      return () => (this.rangeNumber += 20);
    },
    filterMethod(query) {
      if (this.timer != null) clearTimeout(this.timer);
      !this.searchLoad && (this.searchLoad = true);
      this.timer = setTimeout(() => {
        this.dataList = !!query
          ? this.options.filter((el) =>
              el.text.toLowerCase().includes(query.toLowerCase())
            )
          : this.options;
        clearTimeout(this.timer);
        this.searchLoad = false;
        this.rangeNumber = 20;
        this.timer = null;
      }, 500);
    }, // 监听select下拉框的显示和隐藏
    visibleChange(flag) {
      // 显示时初始化列表
      flag && this.filterMethod(""); // 初始化默认值
      this.rangeNumber = 10;
    },
    selectAllSeller() {
      // this.logisticsModel.itemCode = [];
      // this.options.map((item) => {
      //   this.logisticsModel.itemCode.push(item.value);
      // });
      this.$emit('select-all', list)
    },
    deselectAllSeller() {
      // this.logisticsModel.itemCode = [];
      this.$emit('de-select-all', list)
    },
  },
};
</script>

<style lang="scss" scoped>
.select-action {
  display: flex;
  padding: 0 10px;
  margin-top: 10px;
  .deselect-all-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }
  .select-all-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button {
    width: 49.5%;
    background-color: #fff;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
}
</style>
<style scoped>
/deep/ .el-select__tags-text {
  display: inline-block;
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}



.select-dropdown__item {
  display: inline-block;
  max-width: 260px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>