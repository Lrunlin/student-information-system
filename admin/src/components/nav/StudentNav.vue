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
        <el-icon><Avatar /></el-icon>
        <span>假期申请</span>
      </template>
      <el-menu-item index="/create-vacation">申请</el-menu-item>
      <el-menu-item index="/student-vacation">结果查询</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/student-set">
      <el-icon><Setting /></el-icon>
      信息修改
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import { Avatar, Setting,HomeFilled } from "@element-plus/icons-vue";
</script>
<style scoped lang="scss"></style>
