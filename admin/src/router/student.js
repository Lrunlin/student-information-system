const student = [{
    path: '/create-vacation',
    component: () => import('@/page/student/create-vacation.vue')
}, {
    path: '/student-vacation',
    component: () => import('@/page/student/student-vacation.vue')
}, {
    path: '/student-set',
    component: () => import('@/page/student/student-set.vue')
}, {
    path: '/archives/:id',
    component: () => import('@/page/teacher/archives/index.vue')
}, {
    path: '/write-weekly',
    component: () => import('@/page/student/WriteWeekly.vue')
}, {
    path: '/student-weekly',
    component: () => import('@/page/student/ReadWeekly.vue')
}]
export default student;