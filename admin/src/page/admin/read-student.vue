<template>
  <header>
    <el-select v-model="key" placeholder="Select">
      <el-option label="根据姓名查询" value="name" />
      <el-option label="根据班级查询" value="class" />
      <el-option label="根据ID查询" value="id" />
      <el-option label="根据性别查询性别" value="sex" />
    </el-select>
    <el-input v-model="value" v-show="key == 'name'" placeholder="请输入学生姓名" />
    <ClassSelect v-show="key == 'class'" v-model:value="value" :radio="true" />
    <el-input v-model="value" v-show="key == 'id'" placeholder="请输入学生ID" />
    <el-radio-group v-show="key == 'sex'" v-model="value">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>

    <el-button type="primary" @click="all">查询全部</el-button>
  </header>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="照片" width="180">
      <template v-slot="scope">
        <el-image style="width: 80px" :lazy="true" :src="`${URL}/image/${scope.row.id}.jpg`"
      /></template>
    </el-table-column>
    <el-table-column label="姓名" width="200">
      <template v-slot="scope">
        <div>{{ scope.row.name }}</div>
        <div>{{ scope.row.id }}</div>
      </template>
    </el-table-column>
    <el-table-column label="性别" width="70">
      <template v-slot="scope">
        <el-tag v-if="scope.row.sex == '男'">男</el-tag>
        <el-tag type="danger" v-else>女</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="所属班级">
      <template v-slot="scope">
        <div>
          <el-tag style="margin-top: 2px">{{ scope.row.college }}</el-tag>
        </div>
        <div>
          <el-tag style="margin-top: 2px">{{ scope.row.major }}</el-tag>
        </div>
        <div>
          <el-tag style="margin-top: 2px">{{ scope.row.class }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="编辑">
      <template v-slot="scope">
        <el-button type="primary" @click="link(scope.row.id)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref, watch, watchEffect, onMounted } from "vue";
import ClassSelect from "@/components/select/ClassSelect.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const URL = axios.defaults.baseURL;

let key = ref("name");
let value = ref("");
let tableData = ref([]);

watch(key, () => {
  value.value = "";
});

function all() {
  axios.get(`/student`).then(res => {
    console.log(res.data);
    tableData.value = res.data.data;
  });
}

onMounted(() => {
  all();
});
//修改条件或者值时重新搜索
watchEffect(() => {
  if (!value.value) return false;
  axios.get(`/student/${key.value}/${value.value}`).then(res => {
    tableData.value = res.data.data;
  });
});

let router = useRouter();
function link(id) {
  router.push(`/student/${id}`);
}
</script>
<style scoped lang="scss">
header {
  margin-top: 10px;
  margin-bottom: 20px;
  .el-select {
    margin-right: 20px;
  }
  .el-input {
    width: 300px;
  }
  .el-button {
    margin-left: 30px;
  }
}
</style>
