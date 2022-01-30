<template>
  <h2>外出申请</h2>
  <el-form label-width="120px">
    <el-form-item label="外出时间段">
      <el-date-picker
        v-model="form.start_time"
        type="datetime"
        :disabledDate="timeDisabled"
        placeholder="何时开始"
      />
      <span style="margin: 0px 10px">-</span>
      <el-date-picker
        v-model="form.end_time"
        type="datetime"
        :disabledDate="timeDisabled"
        placeholder="何时结束"
      />
    </el-form-item>
    <el-form-item label="情况说明">
      <el-input v-model="form.reason" type="textarea" placeholder="请假原因"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">申请</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, computed } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
let router = useRouter();

const form = reactive({
  start_time: "",
  end_time: "",
  reason: "",
});
function timeDisabled(time) {
  return time.getTime() + 86400000 < +new Date();
}

const submit = () => {
  if (Object.values(form).some(item => !/^[\s\S]*.*[^\s][\s\S]*$/.test(item))) {
    ElMessage.warning("请将信息填写完整");
    return false;
  }
  if (+new Date(form.start_time) > +new Date(form.end_time)) {
    ElMessage.warning("起始时间不得大于结束时间");
    return false;
  }
  axios.post("/reason",form).then(res => {
    if (res.data.success) {
      ElMessage.success("申请成功，请等待批复");
      router.push('/student-vacation');
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
