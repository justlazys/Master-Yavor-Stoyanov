<template>
    <div>
        <div>
            <h2>Информация</h2>
            <div style="margin: auto; margin-top:100px" class="col-9 ">
                <label style="float:left"> <strong>Име:</strong> {{ this.user.firstName }} </label>
                <label style="text-align:center"> <strong>Презиме:</strong> {{ this.user.secondName }} </label>
                <label style="float:right"> <strong>Фамилия:</strong> {{ this.user.thirdName }} </label>
            </div>
            <div style="margin: auto; margin-top:50px" class="col-9 ">
                <label style="float:left"><strong>Пол:</strong> {{ this.translateGender(this.user.gender) }} </label>
                <label style="text-align:center"> <strong>Фак. номер:</strong> {{ this.user.fakNumber }} </label>
                <label style="float:right"> <strong>Емайл:</strong> {{ this.user.email }} </label>
            </div>
            <div style="margin: auto;  margin-top:50px" class="col-9 ">
                <label style="float:left"><strong>ОКС:</strong> {{ this.translateGender(this.user.statusType) }} </label>
                <label style="text-align:center"> <strong>Факултет:</strong> {{ this.translateFaculty(this.user.faculty) }}
                </label>
                <label style="float:right"> <strong>Специалност:</strong> {{ this.translateMajor(this.user.major) }}
                </label>
            </div>
            <div style="margin: auto;  margin-top:50px" class="col-9 ">
                <label style="float:left"><strong>Вид прием:</strong> {{ this.translatetypeAdmission(this.user.typeAdmission)}}</label>
                <label style="text-align:center"><strong>Състояние:</strong> {{this.translateisActive(this.user.isSuccess) }}</label>
            </div>
        </div>
        <div style="margin-top: 50px;">
            <button class="btn btn-sm btn-primary" @click="back()">Назад</button>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { UserModel } from '../models/UserModel';

export default {
    name: "ViewStudent",
    data() {
        return {
            user: new UserModel()
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw=> {
            //@ts-ignore
            vw.retrieveMethod(from.params)
        })
    },
    methods: {
        translatetypeAdmission(param){
            if(param=='government'){
                return "държавна поръчка"
            }else{
                return "платена"
            }
        },


        translateisActive(param){
            if(param=='Y'){
                return "Действаш"
            }
        },
        translateGender(param) {
            if (param == 'bachelor') {
                return "бакалавър"
            } else {
                return "магистър"
            }
        },
        translateFaculty(param) {
            if (param == '01') {
                return "ФАГИОПМ"
            } else if (param == '02') {
                return "ФАИО"
            } else {
                return "ЦПМ"
            }
        },
        translateMajor(param) {
            if (param == '01') {
                return "КСТ"
            } else if (param == '02') {
                return "СИ"
            } else if (param == '03') {
                return "МИТ"
            } else {
                return "ОМ"
            }
        },
        translateStatusType(param) {
            if (param == 'Male') {
                return "Мъж"
            } else {
                return "Жена"
            }
        },
        async retrieveMethod(id: number) {
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    console.log(this.user);
                }
            })
        },
        back() {
            this.$router.back();
        }
    }
}
</script>
<style scoped></style>