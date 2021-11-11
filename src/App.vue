<template>
  <div id="app">
    <michael-select v-model="value" :options="options" multiple :collapse-tags="true" :isMultiline="true"></michael-select>
  </div>
</template>

<script>
import michaelSelect from '@/components/Select/index'
export default {
  components: {
    michaelSelect
  }, 
  data: () => ({
    value: [],
    options: []
  }),
  created () {
    this.createData();
  },
  methods: {
    createData () {
      for (let i = 0; i < 10000; i++) {
        this.options.push({label: `选项${i}`, value: i})
      }
    }
  }
}
</script>

<style>

</style>