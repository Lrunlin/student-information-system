<template>
  <el-select multiple v-model="value" placeholder="选择班级" @change="change">
    <el-option v-for="item in options" :key="item" :label="item" :value="item"> </el-option>
  </el-select>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
let options = ref([]);
let value = ref("");
axios.get("/class").then(res => {
  options.value = res.data.data;
});

let props = defineProps(["value"]);
let emit = defineEmits();
let stop = watchEffect(() => {
  if (props.value) {
    value.value = props.value;
    setTimeout(() => {
      stop();
    }, 0);
  }
});
function change(val) {
  emit("update:value", val);
}
</script>
<style scoped lang="scss"></style>
