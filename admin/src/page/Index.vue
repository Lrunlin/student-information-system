<template>
  <el-alert :title="`${identity} 账号:${state.data.id} 为登录状态`" type="success" show-icon />
  <h1>公告</h1>
  <el-collapse
    v-if="data.length"
    v-model="activeNames"
    v-for="(item, index) in data"
    :key="index"
    :accordion="true"
  >
    <el-collapse-item :name="index">
      <template #title>
        <h3 style="width: 500px">
          {{ item.title }}
          -
          {{ item.time }}
        </h3>
        <el-button
          type="danger"
          size="small"
          @click="remove(item.id, index)"
          v-if="store.state.identity == 'admin'"
          >删除公告</el-button
        >
      </template>
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
  <el-empty description="展示没有发布的公告" v-else />
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";

let store = useStore();
let state = computed(() => store.state);
let identity = computed(() => {
  if (store.state.identity == "admin") {
    return "管理员";
  }
  if (store.state.identity == "teacher") {
    return "教师";
  }
  if (store.state.identity == "student") {
    return "学生";
  }
});
let activeNames = ref(0);
let data = ref([]);
axios.get("/target").then(res => {
  data.value = res.data.data;
});
function remove(id, index) {
  axios.delete(`/target/${id}`).then(res => {
    if (res.data.success) {
      ElMessage.success("删除成功");
      data.value.splice(index, 1);
    } else {
      ElMessage.error("删除失败");
    }
  });
}
</script>
<style scoped lang="scss">
.el-alert {
  margin: 0px auto;
  margin-top: 10px;
  width: 60%;
  min-width: 800px;
}
h1 {
  margin-top: 30px;
  text-align: center;
}
</style>
<style>
.el-collapse-item * {
  margin: 0px;
  padding: 0px;
}
</style>
