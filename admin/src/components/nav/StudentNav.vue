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
        <span>问题反馈</span>
      </template>
      <el-menu-item index="/create-vacation">提出问题</el-menu-item>
      <el-menu-item index="/student-vacation">结果查询</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <Edit />
        </el-icon>
        <span>周报管理</span>
      </template>
      <el-menu-item index="/write-weekly">写周报</el-menu-item>
      <el-menu-item index="/student-weekly">周报查询</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/student-set">
      <el-icon><Setting /></el-icon>
      信息修改
    </el-menu-item>
    <SignOut />
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import { Edit, Avatar, Setting, HomeFilled } from "@element-plus/icons-vue";
import SignOut from "./SignOut.vue";
</script>
<style scoped lang="scss"></style>
