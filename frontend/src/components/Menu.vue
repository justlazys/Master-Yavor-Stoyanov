<template>
    <div>
        <div class="logo">
            <div class="navbar-brand">
                <span class="logo-img"></span>
            </div>
        </div>
        <div>
            <strong> <label>Име: {{ this.$store.getters.getName }} <span v-if="this.$store.getters.getRole == roles.STUDENT"> Фак.
                        номер: {{ this.$store.getters.FakultyNumber }}</span></label> </strong>
        </div>
        <div class="row mt-3">

            <button @click="info()" v-if="this.$store.getters.getRole==roles.STUDENT">
                <label>Информация</label>
            </button>

            <button @click="calendar()" class="mt-2">
                <label>Календар</label>
            </button>

            <button @click="listStudents()" class="mt-2">
                <label>Списък Студенти</label>
            </button>

            <button @click="listPorfessors()" class="mt-2">
                <label>Списък Преподатели</label>
            </button>


            <button @click="editUser()" v-if="this.$store.getters.getRole==roles.ADMIN"  class="mt-2">
                <label>Редакция</label>
            </button>

            <button @click="viewLogs()" v-if="this.$store.getters.getRole==roles.ADMIN"  class="mt-2">
                <label>Логове</label>
            </button>

            <button @click="viewMessages()"  class="mt-2">
                <label>Съобщения</label>
            </button>

            <button class="mt-2" @click="back()">
                <label>Изход</label>
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import {ROLES} from '../constants/constants'
export default {
    name: "Menu",
    data() {
        return {
            roles:ROLES
        }
    },
    methods: {
        calendar(){
            this.$router.push({name:"calendar"});
        },
        back() {
            this.$store.commit('setSendEmail',{value:null});
            this.$store.commit('setSendPass',{value:null});
            this.$store.commit('getId',{value:null});
            this.$store.commit('setMail',{value:null});
            this.$store.commit('addFacultyNumber',{value:null});
            this.$store.commit('addName',{firstName:null,secondName:null,thirdName:null});
            this.$store.commit('addRole',{value:null})
             this.$router.push({ name: 'login' });
        },
        listStudents() {
            this.$router.push({ name: 'list-students' });
        },
        listPorfessors() {
            this.$router.push({ name: 'list-professors' });
        },
        info() {
            console.log(this.$store.getters.retrieveId)
            this.$router.push({ name: 'student-info', params: { id: this.$store.getters.retrieveId } });
        },
        editUser(){
            this.$router.push({name:'edit-user-list'});
        },
        viewLogs(){
            this.$router.push({name:'logs'});
        },
        viewMessages(){
            this.$router.push({name:'messages',params:{id:this.$store.getters.retrieveId}});
        }
    }
}
</script>
<style scoped>
button {
    margin: auto;
    text-align: center;
}

button:hover {
    border-color: #646cff;
    cursor: pointer;
}

label {
    margin-left: 50px;
}

label:hover {
    border-color: #646cff;
    cursor: pointer;
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button {
  background-color: #f9f9f9;
}
</style>