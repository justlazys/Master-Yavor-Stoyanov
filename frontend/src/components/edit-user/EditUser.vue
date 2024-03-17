<template>
    <div>
        <div class="col-12 mt-3">
            <h2 style="margin-left: 35px;">Редакция на Студент</h2>
            <button @click="back()" class="back">Назад</button>
        </div>

        <EditNavigation :id="this.user.id"/>
        <router-view ></router-view>
    </div>
</template>
<script lang="ts">
import EditNavigation from './EditNavigation.vue'
import { UserModel } from '../../models/UserModel';
import axios from 'axios';
export default{
    name:"EditUser",
    components: {
        EditNavigation
    },
    data(){
        return{
            user: new UserModel()
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw => {
           
            console.log('id',from.params)
            //@ts-ignore
            vw.retrieveMethod(from.params)
        })
    },
    methods:{
        async retrieveMethod(id: number) {
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    console.log(this.user);
                   
                }
            })
        },
        back(){
            this.$router.push({name:'edit-user-list'})
        }
    },
    created(){
        console.log(this.user)
    }
}
</script>
<style scoped>

.back {
    background-color: red;
    color: white;
    font-size: 8px;
    margin-left: 10px;
}
</style>