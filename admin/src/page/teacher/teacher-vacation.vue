<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="student" label="学生" width="180" />

    <el-table-column label="内容" width="80">
      <template v-slot="scope">
        <el-popover title="内容" :width="200" trigger="hover" :content="scope.row.reason">
          <template #reference>
            <span>查看</span>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="状态" width="100">
      <template v-slot="scope">
        <el-tag v-if="scope.row.state == '1'" type="success">结束</el-tag>
        <el-tag v-if="scope.row.state == '0'" type="danger">正在进行</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="处理">
      <template v-slot="scope">
        <el-button type="primary" @click="edit(scope.row)">处理</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="activeData" title="回复" width="30%">
    <div>
      <el-select v-model="activeData.state">
        <el-option label="正在进行" :value="0"> </el-option>
        <el-option label="结束" :value="1"> </el-option>
      </el-select>
      <el-input v-model="activeData.notes" :rows="2" type="textarea" placeholder="填写回复内容" />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="activeData = false">关闭</el-button>
        <el-button type="primary" @click="change">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

let tableData = ref([]);
let key = ref(0); //在修改假条后触发watchEffect更新
watchEffect(() => {
  let _key = key.value;
  axios.get("/vacation").then(res => {
    tableData.value = res.data.data;
  });
});

let activeData = ref(false);
function edit(data) {
  activeData.value = Object.assign({}, data); //深拷贝
}
function change() {
  axios
    .put(`/vacation/${activeData.value.id}`, {
      state: activeData.value.state,
      notes: activeData.value.notes,
    })
    .then(res => {
      if (res.data.success) {
        ElMessage.success("处理成功");
        key.value++;
        activeData.value = false;
      } else {
        ElMessage.error("处理失败");
      }
    });
}
</script>
<style scoped lang="scss">
.el-textarea {
  margin-top: 10px;
}
</style>
