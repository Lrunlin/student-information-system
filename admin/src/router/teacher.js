const teacher = [{
    path: '/teacher-vacation',
    component: () => import('@/page/teacher/teacher-vacation.vue')
}, {
    path: '/teacher-read-student',
    component: () => import('@/page/teacher/teacher-read-student.vue')
}, {
    path: '/teacher-weekly',
    component: () => import('@/page/teacher/TeacherWeeklyList.vue')
}]
export default teacher;