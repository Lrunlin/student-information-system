<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="2"
    text-color="#fff"
    :router="true"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>教师管理</span>
      </template>
      <el-menu-item index="/teacher">教师列表</el-menu-item>
      <el-menu-item index="/create-teacher">添加教师</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/email">
      <el-icon><Message /></el-icon>
      发送公告
    </el-menu-item>
    <el-menu-item index="/admin">
      <el-icon><Edit /></el-icon>
      修改密码
    </el-menu-item>
  </el-menu>
</template>
<script setup>
import { ref } from "vue";
import { Location, Message, Edit } from "@element-plus/icons-vue";
</script>
<style scoped lang="scss"></style>
