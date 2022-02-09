<template>
  <header>
    <el-button type="primary" @click="dialogVisible = 'create'">添加</el-button>
  </header>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="标题" width="350" />
    <el-table-column label="添加教师" width="80">
      <template v-slot="scope">
        <el-popover :title="scope.row.teacher.name" :width="400">
          <div v-if="scope.row.teacher">
            <div>姓名:{{ scope.row.teacher.name }}</div>
            <div>性别:{{ scope.row.teacher.sex }}</div>
            <div>邮箱:{{ scope.row.teacher.email }}</div>
            <div>代理班级:{{ scope.row.teacher.class }}</div>
          </div>
          <div v-else>教师已被删除</div>
          <template #reference>
            <el-button type="primary" size="small">查看</el-button>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="内容" width="180">
      <template v-slot="scope">
        <el-popover :title="scope.row.title" :width="400" :content="scope.row.content">
          <template #reference>
            <el-button type="primary" size="small">查看</el-button>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="time" label="时间" />
    <el-table-column label="操作" width="180">
      <template v-slot="scope">
        <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="remove(scope.row.id, scope.$index)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <Create v-model:isShow="dialogVisible" :data="activeData" @updataData="updateKey++" />
</template>
<script setup>
import { ref, watchEffect, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Create from "./Create.vue";
import { ElMessage, ElMessageBox } from "element-plus";
let route = useRoute();

let dialogVisible = ref(false);
let activeData = ref({
  title: "",
  content: "",
  time: new Date(),
});

let tableData = ref([]);
let updateKey = ref(0);
watchEffect(() => {
  let key = updateKey.value; //触发更新
  axios.get(`/archives/${route.params.id}`).then(res => {
    activeData.value = {
      title: "",
      content: "",
      time: new Date(),
    };
    tableData.value = res.data.data;
  });
});
//删除
function remove(id, index) {
  ElMessageBox.confirm(`确定删除该条档案？`, "删除档案", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    axios.delete(`/archives/${id}`).then(res => {
      console.log(res.data);
      if (res.data.success) {
        tableData.value.splice(index, 1);
        updateKey.value++;
      } else {
        ElMessage.error("删除失败");
      }
    });
  });
}
//编辑
function edit(row) {
  activeData.value = Object.assign({}, row); //深拷贝
  dialogVisible.value = "update";
}
</script>
<style scoped lang="scss">
header {
  margin-top: 10px;
}
</style>
