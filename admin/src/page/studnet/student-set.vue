<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="修改密码" name="password">
      <el-form label-width="120px">
        <el-form-item label="密码">
          <el-input v-model="password" placeholder="输入新密码" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="isPassword" placeholder="确认密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="change" :disabled="changeDisabled">修改</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="认证邮箱" name="email">
      <el-form label-width="120px">
        <el-form-item label="邮箱">
          <el-input v-model="email" placeholder="输入需要绑定的邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeEmail" :disabled="changeEmailDisabled">
            发送
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
let rotuer = useRouter();

let password = ref("");
let isPassword = ref("");

let activeName = ref("password");
let changeDisabled = computed(() => {
  return !/^[\s\S]*.*[^\s][\s\S]*$/.test(password.value) || password.value != isPassword.value;
});
function change() {
  axios.put("/password", { password: password.value }).then(res => {
    if (res.data.success) {
      ElMessage.success("更新成功");
      localStorage.removeItem("authorization_token");
      rotuer.replace("/sign");
    } else {
      ElMessage.error("更新失败");
    }
  });
}

let email = ref("");
let changeEmailDisabled = computed(() => {
  return !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.value
  );
});
function changeEmail() {
  axios.put(`/email/${email.value}`).then(res => {
    console.log(res.data);
    if (res.data.success) {
      ElMessage.success("发送成功,请阅读邮件并点击激活链接");
      email.value = "";
    } else {
      ElMessage.error("发送失败");
    }
  });
}
</script>
<style scoped lang="scss">
.el-form-item {
  margin-top: 10px;
  .el-input {
    width: 400px;
  }
}
</style>
