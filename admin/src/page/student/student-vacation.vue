<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="时间" width="230">
      <template v-slot="scope">
        <el-date-picker
          style="width: 200px"
          v-model="scope.row.time"
          type="datetime"
          :readonly="true"
        />
      </template>
    </el-table-column>
    <el-table-column label="假条状态" width="80">
      <template v-slot="scope">
        <el-tag v-if="scope.row.state == '1'" type="success">已处理</el-tag>
        <el-tag v-if="scope.row.state == '0'" type="danger">未处理</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="问题反馈" width="180">
      <template v-slot="scope">
        <div @click="open('问题反馈', scope.row.reason)" class="ovh">{{ scope.row.reason }}</div>
      </template>
    </el-table-column>
    <el-table-column label="教师反馈" width="180">
      <template v-slot="scope">
        <div v-if="scope.row.notes" @click="open('问题反馈', scope.row.notes)" class="ovh">
          {{ scope.row.notes }}
        </div>

        <el-tag v-else>暂未回复</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="删除" width="180">
      <template v-slot="scope">
        <el-button type="danger" @click="remove(scope.row.id, scope.$index)"> 删除 </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";

let tableData = ref([]);
axios.get("/vacation").then(res => {
  tableData.value = res.data.data;
});

const open = (title, text) => {
  ElMessageBox.alert(text, title, {
    confirmButtonText: "关闭",
    closeOnClickModal: true,
  });
};

function remove(id, index) {
  axios.delete(`/vacation/${id}`).then(res => {
    if (res.data.success) {
      ElMessage.success("删除成功");
      tableData.value.splice(index, 1);
    } else {
      ElMessage.error("删除失败");
    }
  });
}
</script>
<style scoped lang="scss">
.ovh {
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
