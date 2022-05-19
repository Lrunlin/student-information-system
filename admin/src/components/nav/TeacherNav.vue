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
    <el-menu-item index="/teacher-vacation">
      <el-icon><List /></el-icon>
      问题反馈
    </el-menu-item>

    <el-menu-item index="/teacher-read-student">
      <el-icon><Avatar /></el-icon>
      学生查询</el-menu-item
    >
    <el-menu-item index="/teacher-weekly">
      <el-icon><Collection /></el-icon>
      周报</el-menu-item
    >
    <el-menu-item index="/student-set">
      <el-icon><Setting /></el-icon>
      信息修改
    </el-menu-item>
    <SignOut />
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import SignOut from "./SignOut.vue";
import { Avatar, List, Setting, HomeFilled ,Collection} from "@element-plus/icons-vue";
</script>
<style scoped lang="scss"></style>
