<template>
  <el-select v-model="identity" placeholder="选择身份">
    <el-option label="全体教师" value="teacher" />
    <el-option label="全体学生" value="student" />
  </el-select>
  <el-input v-model="title" placeholder="输入发送标题" />
  <mavonEditor v-model="md" :toolbars="toolbars" :shortCut="false" />
  <el-button type="primary" @click="send">发送</el-button>
</template>
<script setup>
import { ref, computed } from "vue";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { marked } from "marked";
import axios from "axios";
import { ElMessage } from "element-plus";

let identity = ref("teacher");
let title = ref("");
let md = ref("");
let content = computed(() => marked(md.value));
let toolbars = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  code: true, // code
  table: true, // 表格
  fullscreen: true, // 全屏编辑
  readmodel: true, // 沉浸式阅读
  htmlcode: true, // 展示html源码
  help: true, // 帮助
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  navigation: true, // 导航目录
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  subfield: true, // 单双栏模式
  preview: true, // 预览
};
function send() {
  axios
    .post(`/email/${identity.value}`, { title: title.value, content: content.value })
    .then(res => {
      if (res.data.success) {
        ElMessage.success("发送成功");
        title.value = "";
        md.value = "";
      } else {
        ElMessage.error("发送失败");
      }
    });
}
</script>
<style scoped lang="scss">
.el-select {
  margin-top: 30px;
}
.el-input {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-button {
  margin-top: 50px;
}
</style>
