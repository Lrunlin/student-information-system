<template>
  <el-form label-width="120px">
    <el-form-item label="实习单位">
      <el-input v-model="form.unit" />
    </el-form-item>
    <el-form-item label="提交周次">
      <el-input-number v-model="form.week_time" :min="1" :max="100" />
    </el-form-item>
    <el-form-item label="周报内容">
      <el-input v-model="form.content" type="textarea" show-word-limit rows="8" maxlength="800" />
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" :disabled="AllowSubmit" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive,computed } from "vue";
import { ElMessage } from 'element-plus';
import axios from "axios";
let form = reactive({
  unit: "",
  content: "",
  week_time: "",
});
let AllowSubmit = computed(()=>Object.values(form).some(item=>!/^[\s\S]*.*[^\s][\s\S]*$/.test(item)));
function submit() {
    axios.post('/weekly/student',form).then(res=>{
        console.log(res.data);
        if (res.data.success) {
            ElMessage.success(res.data.message)
        }else{
            ElMessage.error(res.data.message)
        }
    })
  }
</script>
<style scoped lang="scss">
.el-form {
  width: 80%;
  max-width: 800px;
  margin: 0px auto;
  margin-top: 30px;
}
</style>
