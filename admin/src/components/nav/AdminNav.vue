<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="2"
    text-color="#fff"
    :router="true"
  >
    <el-menu-item index="/">
      <el-icon><HomeFilled /></el-icon>
      首页公告
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><avatar /></el-icon>
        <span>教师管理</span>
      </template>
      <el-menu-item index="/teacher">教师列表</el-menu-item>
      <el-menu-item index="/create-teacher">添加教师</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><UserFilled /></el-icon>
        <span>学生管理</span>
      </template>
      <el-menu-item index="/student">学生列表</el-menu-item>
      <el-menu-item index="/create-student">添加学生</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/email">
      <el-icon><Message /></el-icon>
      发送公告
    </el-menu-item>
    <el-menu-item index="/admin">
      <el-icon><Edit /></el-icon>
      修改密码
    </el-menu-item>
    <SignOut />
  </el-menu>
</template>
<script setup>
import { ref } from "vue";
import { UserFilled, Message, Edit, Avatar, HomeFilled } from "@element-plus/icons-vue";
import SignOut from "./SignOut.vue";
</script>
<style scoped lang="scss"></style>
