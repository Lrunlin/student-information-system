<template>
  <el-dialog
    @close="emits('update:isShow', false)"
    v-model="isShow"
    :title="`${mode == 'create' ? '创建' : '更新'}档案记录`"
    width="30%"
    top="30px"
    destroy-on-close
  >
    <el-input v-model="data.title" placeholder="输入档案标题" />
    <el-input type="textarea" v-model="data.content" :rows="6" placeholder="输入档案内容" />
    <el-date-picker v-model="data.time" type="datetime" placeholder="设置时间" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emits('update:isShow', false)">关闭</el-button>
        <el-button type="primary" @click="create" v-if="mode == 'create'">创建</el-button>
        <el-button type="primary" @click="update" v-if="mode == 'update'">确认更新</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
let route = useRoute();
let router = useRouter();
let emits = defineEmits();
//是否显示(create,update) 展示的数据
let props = defineProps(["isShow", "data"]);
let data = ref({});
let mode = ref(false); //创建或者更新
let isShow = ref(); //是否显示
watchEffect(() => {
  isShow.value = !!props.isShow;
  data.value = props.data;
  mode.value = props.isShow;
});
function create() {
  if (
    !/^[\s\S]*.*[^\s][\s\S]*$/.test(data.value.title) ||
    !/^[\s\S]*.*[^\s][\s\S]*$/.test(data.value.content)
  ) {
    ElMessage.warning("请将内容填写完整");
    return false;
  }
  axios
    .post(`/archives`, {
      student: route.params.id,
      title: data.value.title,
      content: data.value.content,
      time: data.value.time,
    })
    .then(res => {
      if (res.data.success) {
        ElMessage.success("创建成功");
        emits("update:isShow", false);
        emits("updataData");
      } else {
        ElMessage.error("创建失败");
      }
    });
}
function update() {
  axios
    .put(`/archives/${data.value.id}`, {
      time: data.value.time,
      title: data.value.title,
      content: data.value.content,
    })
    .then(res => {
      if (res.data.success) {
        ElMessage.success("更新成功");
        emits("update:isShow", false);
        emits("updataData");
      } else {
        ElMessage.error("更新失败");
      }
    });
}
</script>
<style lang="scss">
.el-input,
.el-textarea {
  margin-top: 10px;
}
</style>
