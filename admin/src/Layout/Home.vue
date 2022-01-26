<template>
  <el-skeleton :rows="15" v-if="isLoad" />
  <component :is="NavComponent" />
  <router-view></router-view>
</template>
<script setup>
import { ref, onUnmounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Admin from "@/components/nav/AdminNav.vue";
import Teacher from "@/components/nav/TeacherNav.vue";
import Student from "@/components/nav/StudentNav.vue";
import { ElMessage } from "element-plus";

let store = useStore();
let router = useRouter();
let NavComponent = computed(() => {
  let list = {
    student: Student,
    admin: Admin,
    teacher: Teacher,
  };
  return list[store.state.identity];
});

let isLoad = ref(true); //是否在加载状态

axios
  .get("/user")
  .then(res => {
    store.commit("setUserData", { data: res.data.data, identity: res.data.identity });
    isLoad.value = false;
  })
  .catch(err => {
    ElMessage.error("请登录");
    router.push("/sign");
  });

document.body.classList.add("body-active");
onUnmounted(() => {
  document.body.classList.remove("body-active");
});
</script>
<style scoped lang="scss">
.el-menu {
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>
<style>
.body-active {
  padding-left: 210px;
}
</style>
