<template>
  <div v-if="data.length" style="margin-bottom: 80px">
    <table v-for="(item, index) in data" :key="item.id" border="1">
      <tr style="text-align: center">
        <td border="0" colspan="2">
          第
          {{ item.week_time }}
          周报
        </td>
      </tr>
      <tr>
        <td width="120px">实习单位</td>
        <td>
          <el-input :disabled="!item.modifiable" v-model="item.unit" />
        </td>
      </tr>
      <tr>
        <td width="120px">周报内容</td>
        <td>
          <el-input
            :disabled="!item.modifiable"
            v-model="item.content"
            type="textarea"
            show-word-limit
            rows="8"
            maxlength="800"
          />
        </td>
      </tr>
      <tr>
        <td>教师批复</td>
        <td>
          <el-input
            :disabled="true"
            v-model="item.reply"
            type="textarea"
            show-word-limit
            rows="8"
            maxlength="800"
          />
        </td>
      </tr>
      <tr v-if="item.modifiable">
        <td>确定修改</td>
        <td>
          <el-button type="primary" style="display: block; width: 100%" @click="update(item)"
            >确认修改</el-button
          >
        </td>
      </tr>
    </table>
  </div>
  <el-empty v-else description="暂时没有提交周报" />
</template>
<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
let data = ref([]);
let key = ref(0);
watchEffect(() => {
  let _key = key.value;
  axios.get("/weekly/student").then(res => {
    data.value = res.data.data;
  });
});
function update(params) {
  axios.put(`/weekly/student/${params.id}`, params).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      key.value++;
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
</script>
<style scoped lang="scss">
table {
  border-color: rgb(189, 189, 189);
  margin-top: 50px;
  width: 80%;
  text-align: center;
}
td {
  padding: 10px;
}
</style>
