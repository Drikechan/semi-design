<template>
    <el-select  :value="value" @input="updateValue" v-bind="$attrs" v-on="$listeners"
      :filter-method="filterMethod" v-el-select-loadmore="loadMore(rangeNumber)" :loading="searchLoad" filterable
      @visible-change="visibleChange">
      <div class="select-all" v-if="$attrs.multiple">
        <button @click="selectAll" class="select-all__option">Select All</button>
        <button @click="deselectAll" class="deselect-all__option">Deselect All</button>
      </div>
      <el-option v-for="item in dataList.slice(0, rangeNumber)" :key="item.value" :label="item.text"
        :value="item.value"></el-option>
    </el-select>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Array, String, Number]
    }
  },
  data: () => ({
    relatedOpen: false,
    courseList: [],
    rangeNumber: 20,
    searchLoad: false /* 下拉框的loading状态 */,
    timer: null,
    dataList: [],
    list: [],
    modelValue: null
  }),
  directives: {
    "el-select-loadmore": (el, binding) => {
      // 获取element UI定义好的scroll元素
      const SELECTWRAP_ROM = el.querySelector(
        ".el-select-dropdown .el-select-dropdown__wrap"
      );
      if (SELECTWRAP_ROM) {
        // 添加scroll事件
        SELECTWRAP_ROM.addEventListener("scroll", function() {
          // 判断滚动
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          condition && binding.value();
        });
      }
    }
  },
  methods: {
    loadMore() {
      return () => (this.rangeNumber += 20);
    },
    filterMethod(query) {
      if (this.timer != null) clearTimeout(this.timer);
      !this.searchLoad && (this.searchLoad = true);
      this.timer = setTimeout(() => {
        this.dataList = !!query ? this.options.filter(el =>
            el.text.toLowerCase().includes(query.toLowerCase())
        ) : this.options;
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
    updateValue(value) {
      this.$emit("input", value);
    },
    selectAll() {
      let modelValueList = [];
      modelValueList = this.options.reduce((result, item) => {
        result.push(item.value);
        return result;
      }, []);
      this.updateValue(modelValueList);
    },
    deselectAll() {
      let modelValueList = [];
      this.updateValue(modelValueList);
    },
    initSelect() {
      /* 实现反渲染 */
      let map = new Map(),
        left = 0,
        len = this.value.length || 1,
        saveList = [];
      /* 这一步其实是将我们要渲染的数据插入到dataList中 */
      /* 这边用for循环是为了减少循环次数，找到所有符合条件的value我们就返回出去*/
      for (let i = 0; i < this.options.length; i++) {
        let item = this.options[i];
        /* 创建一个指针，这个执行会在函数执行的第一次，将value值插入map，但是不是无限制的插入，目前我们这边配置的是20条数据，一般单选是一条，多选的话展示其实20条应该也足够了 */
          while (left < (len > 20 ? 20 : len)) {
            map.set(Array.isArray(this.value) ? this.value[left] : this.value, left);
            left++;
          }
           /* 判断map里面是否存在循环的value */

          map.has(item.value) &&  saveList.push(item) ;
          
          if (saveList.length >= left || typeof this.value == 'string') return saveList;
      }
    }
  },
  created() {
    this.dataList = this.initSelect();
  }
};
</script>

<style lang="scss" scoped>
  .select-all {
    display: flex;
    padding: 0 10px;
    margin-top: 10px;
    .deselect-all__option {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
    }
    .select-all__option {
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