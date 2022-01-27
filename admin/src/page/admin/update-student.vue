<template>
  <el-form label-width="120px">
    <el-form-item label="照片">
      <input
        type="file"
        id="image"
        @change="changeImage"
        style="display: none"
        accept="image/jpeg,image/jpg,image/png"
      />
      <label for="image">
        <div class="avatar-uploader">
          <img v-if="imageSrc" :src="imageSrc" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </div>
      </label>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.name" placeholder="指导学生姓名"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="身份证号">
      <el-input v-model="form.id_number" placeholder="学生身份证号"></el-input>
    </el-form-item>
    <el-form-item label="家庭住址">
      <el-input v-model="form.address" placeholder="学生家庭住址"></el-input>
    </el-form-item>
    <el-form-item label="入职时间">
      <el-date-picker v-model="form.time" type="date" placeholder="填写入职时间" />
    </el-form-item>
    <el-form-item label="所在班级">
      <LinkageSelect
        v-model:college="form.college"
        v-model:major="form.major"
        v-model:class="form.class"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="update">修改</el-button>
      <el-button style="margin-left: 20px" type="danger" @click="dialogVisible = true"
        >删除学生</el-button
      >
    </el-form-item>
  </el-form>

  <el-dialog v-model="dialogVisible" title="警告:删除学生后无法恢复信息" width="30%">
    <p>
      确定删除学生<b>{{ form.name }}</b
      >,账号:<span style="color: red">{{ id }}</span>
    </p>
    <p>删除学生的同时会同步删除请假记录</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button style="margin-left: 20px" type="danger" @click="remove">删除学生</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import axios from "axios";
import LinkageSelect from "@/components/select/LinkageSelect.vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
let route = useRoute();
let router = useRouter();
const URL = axios.defaults.baseURL;
let id = route.params.id;

let imageSrc = ref(`${URL}/image/${id}.jpg`);

let form = reactive({
  name: "",
  time: "",
  sex: "",

  college: "",
  major: "",
  class: "",

  id_number: "",
  address: "",
});
axios.get(`/student/id/${id}`).then(res => {
  if (!res.data.success) {
    ElMessage.error("未找到对应的学生");
    return false;
  }
  let _data = res.data.data[0];
  delete _data.password;
  form = Object.assign(form, _data);
});
function changeImage() {
  let url = window.URL.createObjectURL(document.getElementById("image").files[0]);
  imageSrc.value = url;
}
function update() {
  let formData = new FormData();
  formData.append("name", form.name);
  formData.append("sex", form.sex);
  formData.append("time", form.time);
  formData.append("college", form.college);
  formData.append("major", form.major);
  formData.append("_class", form.class);
  formData.append("id_number", form.id_number);
  formData.append("address", form.address);
  if (document.getElementById("image").files[0]) {
    formData.append("image", document.getElementById("image").files[0]);
  }

  axios.put(`/student/${id}`, formData).then(res => {
    if (res.data.success) {
      ElMessage.success("添加成功");
      router.go(0);
    } else {
      ElMessage.error("创建失败");
    }
  });
}
let dialogVisible = ref(false);
function remove() {
  axios.delete(`/student/${id}`).then(res => {
    if (res.data.success) {
      ElMessage.success("删除成功");
      router.replace("/student");
    } else {
      ElMessage.error("删除失败");
    }
  });
}
</script>
<style scoped lang="scss">
.el-form {
  margin-top: 30px;
  .el-input {
    width: 500px;
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
