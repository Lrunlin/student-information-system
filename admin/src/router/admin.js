const admin=[
     {
         path: '/create-teacher',
         component: () => import('@/page/admin/create-teacher.vue')
     }, {
         path: '/teacher/:id',
         component: () => import('@/page/admin/update-teacher.vue')
     }, {
         path: '/teacher',
         component: () => import('@/page/admin/read-teacher.vue')
     }, {
         path: '/email',
         component: () => import('@/page/admin/Email.vue')
     }, {
         path: '/admin',
         component: () => import('@/page/admin/updata-password.vue')
     }, {
         path: '/student',
         component: () => import('@/page/admin/read-student.vue')
     }, {
         path: '/create-student',
         component: () => import('@/page/admin/create-student.vue')
     }, {
         path: '/student/:id',
         component: () => import('@/page/admin/update-student.vue')
     }
]
export default admin;