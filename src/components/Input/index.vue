<template>
  <el-input :value="value" @input="handlerInput" v-bind="$attrs" v-on="$listeners" oninput="value=value.replace(/^\s*/g,'')"></el-input>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number]
    }
  },
  methods: {
    handlerInput(e) {
      this.$emit('input', e)
    }
  }

}
</script>

<style>

</style>