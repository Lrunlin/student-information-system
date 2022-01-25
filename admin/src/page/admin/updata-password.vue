<template>
  <el-form label-width="80px">
    <el-form-item label="输入密码">
      <el-input v-model="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="isPassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="beforeChange">修改</el-button>
    </el-form-item>
  </el-form>
  <el-dialog v-model="dialogVisible" title="确定修改密码" width="30%">
    <span
      >确定要将管理员:<b>{{ store.state.data.id }}</b
      >的密码修改为:{{ password }}</span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="change">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

let router = useRouter();
let store = useStore();

let password = ref("");
let isPassword = ref("");
let dialogVisible = ref(false);

function beforeChange() {
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(password.value)) {
    ElMessage.warning("请填写密码");
    return false;
  }
  if (password.value != isPassword.value) {
    ElMessage.warning("两次密码不一致");
    return false;
  }
  dialogVisible.value = true;
}
function change() {
  axios.put("/admin", { password: password.value }).then(res => {
    if (res.data.success) {
      ElMessage.success("修改成功");
      localStorage.removeItem("authorization_token");
      router.replace("/sign");
    } else {
      ElMessage.error("修改失败");
    }
  });
}
</script>
<style scoped lang="scss">
.el-form {
  width: 400px;
  margin: 0px auto;
  margin-top: 40px;
  .el-button {
    display: block;
    width: 100%;
  }
}
</style>
