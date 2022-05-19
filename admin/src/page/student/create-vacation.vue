<template>
  <h2>问题反馈</h2>
  <el-form label-width="120px">
    <el-form-item label="情况说明">
      <el-input v-model="content" type="textarea" placeholder="情况说明"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">反馈</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
let router = useRouter();

const content = ref('');

const submit = () => {
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(content.value)) {
    ElMessage.warning("请将信息填写完整");
    return false;
  }
  axios.post("/reason", {content:content.value}).then(res => {
    if (res.data.success) {
      ElMessage.success("申请成功，请等待批复");
      router.push("/student-vacation");
    } else {
      ElMessage.error("申请出现错误");
    }
  });
};
</script>
<style lang="scss" scoped>
h2 {
  text-align: center;
  margin: 20px 0px;
}
.el-form {
  width: 600px;
  margin: 0px auto;
  margin-top: 60px;
}
.el-date-editor {
  width: 300px !important;
}
.el-textarea {
  width: 500px;
}
.el-button {
  width: 100%;
  display: block;
}
</style>
