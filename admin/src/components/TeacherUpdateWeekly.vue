<template>
  <el-descriptions :column="2" border>
    <el-descriptions-item label="实习单位">
      <el-input v-model="data.unit" />
      {{ data.unit }}
    </el-descriptions-item>
    <el-descriptions-item label="是否可修改"
      ><el-switch v-model="data.modifiable"
    /></el-descriptions-item>
    <el-descriptions-item label="周报">
      {{ data.content }}
      <!-- <el-input
        v-model="data.content"
        maxlength="800"
        :row="8"
        placeholder="周报内容"
        show-word-limit
        type="textarea"
      /> -->
    </el-descriptions-item>
    <el-descriptions-item label="批复">
      <el-input
        v-model="data.reply"
        maxlength="800"
        :row="8"
        placeholder="批复"
        show-word-limit
        type="textarea"
      />
    </el-descriptions-item>
    <el-descriptions-item label="保存">
      <el-button type="primary" @click="update">保存</el-button>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
let props = defineProps(["option"]);
let data = ref({});
watchEffect(() => {
  if (!data.value.id) {
    let option = props.option;
    //深拷贝，防止使用同一块内存
    data.value = {
      id: option.id,
      unit: option.unit,
      reply: option.reply,
      modifiable: !!option.modifiable,
      content: option.content,
    };
  }
});
function update() {
  axios
    .put(`/weekly/teacher/${data.value.id}`, {
      reply: data.value.reply,
      modifiable: data.value.modifiable,
    })
    .then(res => {
      if (res.data.success) {
        ElMessage.success(res.data.message);
      } else {
        ElMessage.error(res.data.message);
      }
    });
}
</script>
<style scoped lang="scss"></style>
