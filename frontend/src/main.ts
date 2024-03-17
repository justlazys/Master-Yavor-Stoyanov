import { createApp } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as config from './config/config';
import Login from './components/Login.vue'
import Menu from './components/Menu.vue'
import Logs from './components/Logs.vue'
import Messages from './components/Messages.vue'
import Register from './components/Register.vue'
import LoginProfessor from './components/LoginProfessor.vue'
import ListStudents from './components/ListStudents.vue'
import ListProfessor from './components/ListProfessors.vue'
import EditUserGradeFromList from './components/EditUserGradeFromList.vue'
import StudentInfo from './components/StudentInfo.vue'
import Info from './components/student-info/Info.vue'
import HealthStatus from './components/student-info/HealthStatus.vue'
import Scholarship from './components/student-info/Scholarship.vue'
import Grade from './components/student-info/Grade.vue'
import Dorm from './components/student-info/Dorm.vue'
import Sport from './components/student-info/Sport.vue'
import ViewStudent from './components/ViewStudent.vue'
import EditUserList from './components/EditUserList.vue'
import EditUser from './components/edit-user/EditUser.vue'
import EditInfo from './components/edit-user/EditInfo.vue'
import EditHealthCare from './components/edit-user/EditHealthCare.vue'
import EditSport from './components/edit-user/EditSport.vue'
import EditScholarship from './components/edit-user/EditScholarship.vue'
import EditDorm from './components/edit-user/EditDorm.vue'
import EditDisciplines from './components/edit-user/EditDisciplines.vue'
import EditTeacher from './components/edit-user/EditTeacher.vue'
import Calendar from './components/Calendar.vue'
import ViewProfessor from './components/ViewProfessor.vue'
import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'
import '@vuepic/vue-datepicker/dist/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { createStore } from 'vuex'
import "bootstrap/dist/js/bootstrap.js";
library.add(faUserSecret)
const store = createStore({
    state() {
        return {
            id: null,
            fakNumber: null,
            role: '',
            name: '',
            email:'',
            sendEmail:'',
            sendPass:'',
        }
    },
    mutations: {
        setSendEmail(state,payload){
            state.sendEmail=payload.value;
        },
        setSendPass(state,payload){
            state.sendPass=payload.value;
        },
        getId(state, payload) {
            state.id = payload.value;
        },
        setMail(state,payload){
            state.email=payload.value;
        },
        addFacultyNumber(state, payload) {
            state.fakNumber = payload.value
            console.log('add', state.fakNumber)
        },
        addName(state, payloadOne) {
            state.name = payloadOne.firstName + ' ' + payloadOne.secondName + ' ' + payloadOne.thirdName
        },
        addRole(state, payload) {
            state.role = payload.value
        }

    },
    actions: {
        addFacultyNumber(context, payload) {
            context.commit('addFacultyNumber', payload)
        }
    },
    getters: {
        retrieveSendEmail(state) {
            return state.sendEmail;
        },
        retrieveSendPass(state) {
            return state.sendPass;
        },
        retrieveId(state) {
            return state.id;
        },
        retrieveEmail(state) {
            return state.email;
        },
        FakultyNumber(state) {
            return state.fakNumber
        },
        getRole(state) {
            return state.role
        },
        getName(state) {
            return state.name
        }
    }
})
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/forgot-number',
            name: 'forgot-number',
            component: Login
        },
        {
            path: '/professor',
            name: 'professor',
            component: LoginProfessor
        },
        {
            path: '/menu',
            name: 'menu',
            component: Menu
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/list-students',
            name: 'list-students',
            component: ListStudents
        },
        {
            path: '/list-professors',
            name: 'list-professors',
            component: ListProfessor
        },
        {
            path: '/logs',
            name: 'logs',
            component: Logs
        },
        {
            path: '/messages/:id',
            name: 'messages',
            component: Messages
        },
        
        {
            path: '/edit-user-list',
            name: 'edit-user-list',
            component: EditUserList
        },
        {
            path: '/edit-user-from-list/:id',
            name: 'edit-user-from-list',
            component: EditUserGradeFromList
        },
        {
            path: '/edit-teacher/:id',
            name: 'edit-teacher',
            component: EditTeacher
        },
        {
            path: '/edit-user/:id',
            name: 'edit-user',
            component: EditUser ,
            children: [
                {
                    path: '/edit-info/:id',
                    name: 'editInfo',
                    component: EditInfo
                },
                {
                    path: '/edit-health-care/:id',
                    name: 'editHealthCare',
                    component: EditHealthCare
                },
                {
                    path: '/edit-sport/:id',
                    name: 'editSport',
                    component: EditSport
                },
                {
                    path: '/edit-scholarship/:id',
                    name: 'editScholarship',
                    component: EditScholarship
                },
                {
                    path: '/edit-dorm/:id',
                    name: 'editDorm',
                    component: EditDorm
                },
                {
                    path: '/edit-disciplines/:id',
                    name: 'editDisciplines',
                    component: EditDisciplines
                },
                
            ]
        },
        
        {
            path: '/student-info/:id',
            name: 'student-info',
            component: StudentInfo,
            children: [
                {
                    path: '/info/:id',
                    name: 'info',
                    component: Info
                },
                {
                    path: '/health-status/:id',
                    name: 'healthstatus',
                    component: HealthStatus
                },
                {
                    path: '/scholarship/:id',
                    name: 'scholarship',
                    component: Scholarship
                },
                {
                    path: '/dorm/:id',
                    name: 'dorm',
                    component: Dorm
                },
                {
                    path: '/grade/:id',
                    name: 'grade',
                    component: Grade
                },
                {
                    path: '/sport/:id',
                    name: 'sport',
                    component: Sport
                },
                

            ]
        },
        {
            path: '/view_student/:id',
            name: 'viewStudent',
            component: ViewStudent
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar
        },
        {
            path: '/view-professor_view/:id',
            name: 'view-professor_view',
            component: ViewProfessor,
            
        },
        {
            path: '/view-professor_edit/:id',
            name: 'view-professor_edit',
            component: ViewProfessor,
            
        },
        {
            path: '/:notFound(.*)',
            redirect: "/"
        }
    ],
    scrollBehavior(from, to, savePosition) {
        if (savePosition) {
            return savePosition
        }
        return { left: 0, to: 0 }
    }
})
const app = createApp(App)
config.initFortAwesome()
config.initPrimeVue(app)
app.use(router)
app.use(store)
library.add(fas);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueGoodTablePlugin);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))

export default router;