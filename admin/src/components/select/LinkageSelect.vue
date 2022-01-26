<template>
  <el-select v-model="value.college" placeholder="选择学院" @change="change('college')">
    <el-option v-for="item in list.college" :key="item" :label="item" :value="item"></el-option>
  </el-select>
  <el-select
    v-model="value.major"
    placeholder="选择专业"
    @change="change('major')"
    style="margin-left: 10px"
  >
    <el-option v-for="item in list.major" :key="item" :label="item" :value="item"></el-option>
  </el-select>
  <el-select
    v-model="value.class"
    placeholder="选择班级"
    @change="change('class')"
    style="margin-left: 10px"
  >
    <el-option v-for="item in list.class" :key="item" :label="item" :value="item"></el-option>
  </el-select>
</template>
<script setup>
import { reactive, watchEffect, toRefs } from "vue";
import axios from "axios";
let list = reactive({
  college: [],
  major: [],
  class: [],
});

let value = reactive({
  college: "",
  major: "",
  class: "",
});

axios.get("/college").then(res => {
  list.college = res.data.data;
});

watchEffect(() => {
  if (value.college) {
    axios.get(`/college/${value.college}`).then(res => {
      list.major = res.data.data;
      list.class = [];
    });
  }
});

watchEffect(() => {
  if (value.major) {
    axios.get(`/major/${value.major}`).then(res => {
      list.class = res.data.data;
    });
  }
});

/**
 * @params noinit 初次因为修改学院触发watchEffect不清除数据
 */
let props = defineProps(["college", "major", "class"]);
let emit = defineEmits();
let stop = watchEffect(() => {
  if (Object.values(props).some(item => !!item)) {
    value.college = props.college;
    value.major = props.major;
    value.class = props.class;
    setTimeout(() => {
      stop();
    }, 0);
  }
});

function change(key) {
  emit(`update:${key}`, value[key]);
  // 重新设置学院列表后清除专业列表和班级列表以及所选的值
  if (key == "college") {
    list.major = [];
    list.class = [];
    value.major = "";
    value.class = "";
  }
}
</script>
<style scoped lang="scss">
.el-select {
  width: 200px;
}
</style>
