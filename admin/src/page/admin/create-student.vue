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
      <el-input v-model="form.name" placeholder="学生姓名" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="身份证号">
      <el-input v-model="form.id_number" placeholder="学生身份证号" />
    </el-form-item>
    <el-form-item label="家庭住址">
      <el-input v-model="form.address" placeholder="学生家庭住址" />
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
      <el-button type="primary" @click="create">创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import axios from "axios";
import LinkageSelect from "@/components/select/LinkageSelect.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
let router = useRouter();
let imageSrc = ref(false);
const form = reactive({
  name: "",
  time: new Date(),
  sex: "男",

  college: "",
  major: "",
  class: "",

  id_number: "",
  address: "",
});

function changeImage() {
  let url = window.URL.createObjectURL(document.getElementById("image").files[0]);
  imageSrc.value = url;
}
function create() {
  let formData = new FormData();
  formData.append("name", form.name);
  formData.append("sex", form.sex);
  formData.append("time", form.time);

  formData.append("college", form.college);
  formData.append("major", form.major);
  formData.append("_class", form.class);

  formData.append("id_number", form.id_number);
  formData.append("address", form.address);
  formData.append("image", document.getElementById("image").files[0]);

  if (!document.getElementById("image").files[0]) {
    ElMessage.warning("请上传学生照片");
    return false;
  }

  if (Object.values(form).some(item => !/^[\s\S]*.*[^\s][\s\S]*$/.test(item))) {
    ElMessage.warning("请将内容填写完整");
    return false;
  }

  axios.post("/student", formData).then(res => {
    if (res.data.success) {
      ElMessage.success("添加成功");
      router.go(0);
    } else {
      ElMessage.error("创建失败");
    }
  });
}
</script>
<style scoped lang="scss">
.el-form {
  margin: 0px auto;
  margin-top: 30px;
  .el-input {
    width: 300px;
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
