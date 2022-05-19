<template>
  <header>
    <el-button type="primary" style="margin-right: 20px" @click="tableData = data"
      >显示全部</el-button
    >

    <el-select v-model="key" style="margin-right: 20px" placeholder="Select">
      <el-option label="根据学生查询" value="student" />
      <el-option label="根据周次查询" value="week" />
    </el-select>
    <div v-if="key == 'student'">
      <el-input
        style="width: 400px"
        v-model="studentIDValue"
        placeholder="输入学生学号"
        @input="studentSelect"
      />
    </div>
    <div v-else>
      <el-input-number v-model="weekValue" :min="1" :max="100" @change="weekTimeSelect" />
    </div>
  </header>

  <el-table :data="tableData" style="width: 100%" >
    <el-table-column label="学生信息" width="180">
      <template v-slot="scope">
        {{ scope.row.student.name }} ({{ scope.row.student.id }})
      </template>
    </el-table-column>
    <el-table-column label="实习单位" width="180">
      <template v-slot="scope">
        {{ scope.row.unit }}
      </template>
    </el-table-column>
    <el-table-column label="周次">
      <template v-slot="scope">
        {{ scope.row.week_time }}
      </template>
    </el-table-column>
    <el-table-column label="周报" width="200" type="expand">
      <template #default="props">
          <TeacherUpdateWeekly :option="props.row" />
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import TeacherUpdateWeekly from "@/components/TeacherUpdateWeekly.vue";

let key = ref("student");
let weekValue = ref(0);
let studentIDValue = ref("");
let data = ref([]);
let tableData = ref([]);

axios.get(`/weekly/teacher`).then(res => {
  data.value = res.data.data;
  tableData.value = res.data.data;
});

function studentSelect() {
  tableData.value = data.value.filter(item => item.id.includes(studentIDValue.value));
}
function weekTimeSelect() {
  tableData.value = data.value.filter(item => item.week_time == weekValue.value);
}
</script>
<style scoped lang="scss">
header {
  display: flex;
  margin-top: 20px;
}
</style>
