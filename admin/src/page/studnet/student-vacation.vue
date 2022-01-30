<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="起始时间" width="230">
      <template v-slot="scope">
        <el-date-picker
          style="width: 200px"
          v-model="scope.row.start_time"
          type="datetime"
          :readonly="true"
        />
      </template>
    </el-table-column>
    <el-table-column label="结束时间" width="230">
      <template v-slot="scope">
        <el-date-picker
          style="width: 200px"
          v-model="scope.row.start_time"
          type="datetime"
          :readonly="true"
        />
      </template>
    </el-table-column>
    <el-table-column label="假条状态" width="80">
      <template v-slot="scope">
        <el-tag v-if="scope.row.state == '2'">未处理</el-tag>
        <el-tag v-if="scope.row.state == '1'" type="success">已批准</el-tag>
        <el-tag v-if="scope.row.state == '0'" type="danger">未通过</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="请假原因" width="80">
      <template v-slot="scope">
        <el-button type="primary" size="small" @click="open('请假原因', scope.row.reason)"
          >查看</el-button
        >
      </template>
    </el-table-column>
    <el-table-column label="教师反馈" width="180">
      <template v-slot="scope">
        <el-button
          type="primary"
          v-if="scope.row.notes"
          size="small"
          @click="open('教师反馈', scope.row.notes)"
        >
          查看
        </el-button>
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
<style scoped lang="scss"></style>
