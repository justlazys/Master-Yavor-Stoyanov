<template>
    <div>
        <div class="row">
            <h2>Редакция на преподавател</h2>
            <div class="register">
                <div class="col-10">
                    <label>Име: </label>
                    <input v-model="this.user.firstName" class="ml-92 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>Презиме: </label>
                    <input v-model="this.user.secondName" class="ml-60 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>Фамилия: </label>
                    <input v-model="this.user.thirdName" class="ml-60 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>ЕГН: </label>
                    <input v-model="this.user.egn" class="ml-95 mt-2" type="text" />
                </div>

                <div class="col-10 mt-3">
                    <label>Е-Майл: </label>
                    <input v-model="this.user.email" class="ml-70 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>Дата на раждане: </label>
                    <Calendar v-model="this.user.born" showIcon  :key="this.key"  class="cal mt-2" />
                </div>
                <div class="col-10 mt-3">
                    <label class="labelOne">Пол: </label>
                    <label class="labelTwo">Мъж: </label>
                    <input v-model="this.user.gender" type="radio" class="" value="Male" />
                    <label class="labelThree">Жена: </label>
                    <input v-model="this.user.gender" type="radio" value="Female" />
                </div>

                <div class="col-10 mt-3">
                    <label>Тип:</label>
                    <select v-model="this.user.type" class="ml-92 mt-2">
                        <option value="student">
                            студент
                        </option>
                        <option value="teacher">
                            преподавател
                        </option>
                    </select>
                </div>

                <div  class="col-10 mt-3">
                    <label>Научна степен: </label>
                    <select v-model="this.user.degree" class="ml-30 mt-2">
                        <option value="assistant">
                            асистент
                        </option>
                        <option value="main-assistant">
                            главен асистент
                        </option>
                        <option value="docent">
                            доцент
                        </option>
                        <option value="professor">
                            професор
                        </option>

                    </select>
                </div>

                <div class="col-10 mt-3">
                    <label>Кабинет: </label>
                    <input id="room" v-model="this.user.room" class="ml-65 " type="text" />
                </div>

            </div>



        </div>
        <div class="mt-3">
                <button @click="back()" class="btn btn-sm btn-primary  ">
                    Назад
                </button>

                <button v-if="!isPreview" @click="save()" class="btn btn-sm btn-primary ml-20  ">
                    Запис
                </button>

            </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from '../models/UserModel'
import axios from 'axios';
import moment from 'moment';
export default{
    name:"ViewProfessor",
    data(){
        return{
            isPreview:false,
            key:0,
            user: new UserModel(),
        }
    },
    beforeRouteEnter(from,to,next){
        next(vw=>{
            console.log('from',from)
            
               //@ts-ignore
            vw.retrieveInfo(from.params)
            if(from.name=='view-professor_view'){
                //@ts-ignore
                vw.isPreview=true
            }
        })
    },
    created(){
        
        if(this.user.born){
            this.user.born=this.formatDateTime(this.user.born);
            this.key++;
            console.log('here',  this.user.born)
        }
    },
      methods:{
        formatDateTime(dateTime) {
            return moment(dateTime).format('DD.MM.YYYY');
        },
        retrieveInfo(id:number){
            axios.post('http://localhost:8081/retrieve_teacher_from_id',id).then(res=>{
                this.user=res.data;
            }).catch(error=>{
                console.log('error',error);
            })
        },
        back(){
            this.$router.back();
        },
       async save(){
        this.user.userEmail=this.$store.getters.retrieveEmail
            await axios.post('http://localhost:8081/update_edit_teacher', this.user).then(res => {
                console.log('executed', res.data)
            }).catch(error => {
                console.log('error:', error);
            })
        }
    }
}
</script>
<style scoped>
.register {
    width: 600px;
    margin: auto;
    display: inline-block;
}
.ml-92 {
    margin-left: 92px;
}
.ml-25{
    margin-left: 80px;
}
.ml-102 {
    margin-left: 30px;
}
.ml-95 {
    margin-left: 95px;
}

.ml-60 {
    margin-left: 60px;
}
.ml-70 {
    margin-left: 70px;
}
.cal {
    margin-left: 15px;
    width: 200px;
    font-size: 13px;
    height: calc(1.5em + 0.5rem + 2px) !important;
}
.ml-30 {
    margin-left: 30px;
}
.ml-65 {
    margin-left: 65px;
}
.labelOne {
    margin-right: 80px;
}

.labelTwo {
    margin-right: +5px;
}

.labelThree {
    margin-left: +30px;
    margin-right: +5px;
}
select {
    width: 185px;
    height: 30px;
}
.ml-20{
    margin-left:20px;
}
</style>