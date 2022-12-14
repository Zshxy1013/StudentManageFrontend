import Vue from "vue"
import VueRouter from "vue-router";
import Login from '../components/Login'
import StudentIndex from '../components/StudentIndex'
import FogetPassword from '../components/ForgetPassword'
import UpdatePassword from '../components/UpdatePassword'
import StudentInformation from "../components/StudentInformation";
import TeacherIndex from "@/components/TeacherIndex";
import TeacherInformation from "@/components/TeacherInformation";
import AdminIndex from "@/components/AdminIndex";
import AdminInformation from "@/components/AdminInformation";
import StudentInformationManage from "@/components/StudentInformationManage";
import TeacherInformationManage from "@/components/TeacherInformationManage";
import AdminInformationManage from "@/components/AdminInformationManage";
import StudentRecordManage from "@/components/StudentRecordManage";
import TeacherRecordManage from "@/components/TeacherRecordManage";
import StudentRecord from "@/components/StudentRecord";
import TeacherRecord from "@/components/TeacherRecord";
import StudentRegister from "@/components/StudentRegister";
import StudentHealth from "@/components/StudentHealth";
import TeacherHealth from "@/components/TeacherHealth";
import StudentHealthRecord from "@/components/StudentHealthRecord";
import TeacherHealthRecord from "@/components/TeacherHealthRecord";
import StudentHealthRecordTeacher from "@/components/StudentHealthRecordTeacher";
import StudentHealthRecordManage from "@/components/StudentHealthRecordManage";
import TeacherHealthRecordManage from "@/components/TeacherHealthRecordManage";
import StudentLeave from "@/components/StudentLeave";
import StudentLeaveRecordTeacher from "@/components/StudentLeaveRecordTeacher";
import StudentLeaveRecord from "@/components/StudentLeaveRecord";
import StudentLeaveRecordManage from "@/components/StudentLeaveRecordManage";
import StudentCourse from "@/components/StudentCourse";
import StudentAllCourse from "@/components/StudentAllCourse";
import StudentCourseManage from "@/components/StudentCourseManage";
import StudentMyDormitory from "@/components/StudentMyDormitory";
import StudentPay from "@/components/StudentPay";
import StudentDormitory from "@/components/StudentDormitory";
import StudentPayManage from "@/components/StudentPayManage";
import StudentDormitoryManage from "@/components/StudentDormitoryManage";
import AdminDashBoard from "@/components/AdminDashBoard";
import TeacherDashBoard from "@/components/TeacherDashBoard";

Vue.use(VueRouter)

// eslint-disable-next-line no-unused-vars
const router = new VueRouter({
        routes: [
            {
                path: '/',
                component: Login,
                meta: {title: '????????????'}
            },
            {
                path: '/AdminIndex',
                component: AdminIndex,
                meta: {title: '???????????????'},
                children: [
                    {path: '/', component: AdminDashBoard, meta: {title: '????????????'}},
                    {path: 'UpdatePassword', component: UpdatePassword, meta: {title: '????????????'}},
                    {path: 'MyInformation', component: AdminInformation, meta: {title: '????????????'}},
                    {path: 'StudentInformationManage', component: StudentInformationManage, meta: {title: '????????????'}},
                    {path: 'TeacherInformationManage', component: TeacherInformationManage, meta: {title: '???????????????'}},
                    {path: 'AdminInformationManage', component: AdminInformationManage, meta: {title: '???????????????'}},
                    {path: 'StudentRecordManage', component: StudentRecordManage, meta: {title: "??????????????????"}},
                    {path: 'TeacherRecordManage', component: TeacherRecordManage, meta: {title: "??????????????????"}},
                    {
                        path: 'StudentHealthRecordManage',
                        component: StudentHealthRecordManage,
                        meta: {title: "??????????????????"}
                    },
                    {
                        path: 'TeacherHealthRecordManage',
                        component: TeacherHealthRecordManage,
                        meta: {title: "??????????????????"}
                    },
                    {path: 'StudentLeaveRecordManage', component: StudentLeaveRecordManage, meta: {title: '??????????????????'}},
                    {path: 'StudentCourseManage', component: StudentCourseManage, meta: {title: '??????????????????'}},
                    {path: 'StudentPayManage', component: StudentPayManage, meta: {title: '??????????????????'}},
                    {path: 'StudentDormitoryManage', component: StudentDormitoryManage, meta: {title: '??????????????????'}},
                ]
            },
            {
                path: '/StudentIndex',
                component: StudentIndex,
                meta: {title: '????????????'},
                children: [
                    {path: '/', component: StudentRegister, meta: {title: '????????????'}},
                    {path: 'UpdatePassword', component: UpdatePassword, meta: {title: '????????????'}},
                    {path: 'MyInformation', component: StudentInformation, meta: {title: '????????????'}},
                    {path: 'StudentRecord', component: StudentRecord, meta: {title: '????????????'}},
                    {path: 'StudentRegister', component: StudentRegister, meta: {title: '????????????'}},
                    {path: 'StudentHealth', component: StudentHealth, meta: {title: '????????????'}},
                    {path: 'StudentHealthRecord', component: StudentHealthRecord, meta: {title: '????????????'}},
                    {path: 'StudentLeave', component: StudentLeave, meta: {title: '????????????'}},
                    {path: 'StudentLeaveRecord', component: StudentLeaveRecord, meta: {title: '????????????'}},
                    {path: 'StudentCourse', component: StudentCourse, meta: {title: '????????????'}},
                    {path: 'StudentAllCourse', component: StudentAllCourse, meta: {title: '????????????'}},
                    {path: 'StudentMyDormitory', component: StudentMyDormitory, meta: {title: '????????????'}},
                    {path: 'StudentDormitory', component: StudentDormitory, meta: {title: '????????????'}},
                    {path: 'StudentPay', component: StudentPay, meta: {title: '??????'}},

                ]
            },
            {
                path: '/TeacherIndex',
                component: TeacherIndex,
                meta: {title: '???????????????'},
                children: [
                    {path: '/', component: TeacherDashBoard, meta: {title: '????????????'}},
                    {path: 'UpdatePassword', component: UpdatePassword, meta: {title: '????????????'}},
                    {path: 'MyInformation', component: TeacherInformation, meta: {title: '????????????'}},
                    {path: 'TeacherRecord', component: TeacherRecord, meta: {title: '????????????'}},
                    {path: 'TeacherHealth', component: TeacherHealth, meta: {title: '????????????'}},
                    {path: 'TeacherHealthRecord', component: TeacherHealthRecord, meta: {title: '????????????'}},
                    {path: 'StudentHealthRecordTeacher', component: StudentHealthRecordTeacher, meta: {title: '????????????'}},
                    {path: 'StudentLeaveRecordTeacher', component: StudentLeaveRecordTeacher, meta: {title: '????????????'}},


                ]
            },
            {
                path: '/forget',
                component: FogetPassword,
                meta: {title: '????????????'}
            },
        ],
    }
)

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === '/forget') {
        next()
    } else if (to.path === '/AdminIndex' || to.path === '/AdminIndex/UpdatePassword' || to.path === '/AdminIndex/MyInformation' || to.path === '/AdminIndex/StudentInformationManage' || to.path === '/AdminIndex/TeacherInformationManage' || to.path === '/AdminIndex/AdminInformationManage' || to.path === '/AdminIndex/StudentRecordManage' || to.path === '/AdminIndex/TeacherRecordManage' || to.path === '/AdminIndex/StudentHealthRecordManage' || to.path === '/AdminIndex/TeacherHealthRecordManage' || to.path === '/AdminIndex/StudentLeaveRecordManage' || to.path === '/AdminIndex/StudentCourseManage' || to.path === '/AdminIndex/StudentPayManage' || to.path === '/AdminIndex/StudentDormitoryManage') {
        if (JSON.parse(localStorage.getItem('userdata')) === null) {
            location.href = "/"
        } else if (JSON.parse(localStorage.getItem('userdata')).identity === 3) {
            next();
        } else {
            location.href = "/"
        }
    } else if (to.path === '/StudentIndex' || to.path === '/StudentIndex/UpdatePassword' || to.path === '/StudentIndex/MyInformation' || to.path === '/StudentIndex/StudentRecord' || to.path === '/StudentIndex/StudentRegister' || to.path === '/StudentIndex/StudentHealth' || to.path === '/StudentIndex/StudentHealthRecord' || to.path === '/StudentIndex/StudentLeave' || to.path === '/StudentIndex/StudentLeaveRecord' || to.path === '/StudentIndex/StudentCourse' || to.path === '/StudentIndex/StudentAllCourse' || to.path === '/StudentIndex/StudentMyDormitory' || to.path === '/StudentIndex/StudentDormitory' || to.path === '/StudentIndex/StudentPay') {
        if (JSON.parse(localStorage.getItem('userdata')) === null) {
            location.href = "/"
        } else if (JSON.parse(localStorage.getItem('userdata')).identity === 1) {
            next();
        } else {
            location.href = "/"
        }
    } else if (to.path === '/TeacherIndex' || to.path === '/TeacherIndex/UpdatePassword' || to.path === '/TeacherIndex/MyInformation' || to.path === '/TeacherIndex/TeacherRecord' || to.path === '/TeacherIndex/TeacherHealth' || to.path === '/TeacherIndex/TeacherHealthRecord' || to.path === '/TeacherIndex/StudentHealthRecordTeacher' || to.path === '/TeacherIndex/StudentLeaveRecordTeacher') {
        if (JSON.parse(localStorage.getItem('userdata')) === null) {
            location.href = "/"
        } else if (JSON.parse(localStorage.getItem('userdata')).identity === 2) {
            next();
        } else {
            location.href = "/"
        }
    } else {
        location.href = "/"
    }
})
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    document.title = to.meta.title
})

export default router
