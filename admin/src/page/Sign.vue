<template>
  <div class="login">
    <div class="top">
      <div class="header">
        <div class="title">档案信息系统</div>
      </div>
    </div>
    <div class="main">
      <el-form ref="formDOM" :rules="rules" :model="form" label-width="70px">
        <el-form-item label="账号" prop="id">
          <el-input :prefix-icon="User" v-model="form.id" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input  type="password"  show-password :prefix-icon="Lock" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="身份" >
          <el-select v-model="form.identity" placeholder="身份选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
            <template #prefix>
                <el-icon><Grid /></el-icon>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" auto-insert-space>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useRouter } from "vue-router";
import { User, Lock,Grid } from "@element-plus/icons-vue";
let router = useRouter();
let form = ref({ id: "", password: "", identity: "student" });
let rules = {
  id: [
    {
      required: true,
      message: "请填写账号",
      trigger: "blur",
    },
    {
      min: 3,
      max: 30,
      message: "账号长度在3-30",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请填写密码",
      trigger: "blur",
    },
  ],
};
let formDOM = ref(null);
function submitForm() {
  formDOM.value.validate(valid => {
    if (!valid) {
      return false;
    }
    axios
      .post("/sign", { id: form.value.id, password: form.value.password,identity:form.value.identity })
      .then(res => {
        if (res.data.success) {
          ElMessage.success(res.data.message);
          localStorage.authorization_token = res.data.data;
          router.replace("/");
        } else {
          ElMessage.error(res.data.message);
        }
      });
  });
}

let options = [
  {
    label: "学生",
    value: "student",
  },
  {
    label: "指导教师",
    value: "teacher",
  },
  {
    label: "管理员",
    value: "admin",
  },
];
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  background: #f0f2f5;
  background-size: 100%;
  position: relative;
  user-select: none;
  a {
    text-decoration: none;
  }
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      padding-top: 20px;
      .title {
        text-align: center;
        font-size: 30px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
  }
  .main {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;
    margin-top: 30px;
  }
}
.el-button {
  display: block;
  width: 100%;
}
.el-select {
  width: 100%;
}
</style>
