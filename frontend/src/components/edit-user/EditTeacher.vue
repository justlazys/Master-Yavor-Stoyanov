<template>
    <div>
        <div class="col-12 mt-3">
            <h2 style="margin-left: 35px;">Редакция на Преподавател</h2>
            <button @click="back()" class="back">Назад</button>
        </div>
        <Message v-if="this.showMessage == '1'" severity="success">Успешен запис</Message>
        <Message v-if="this.showMessage == '2'" severity="error">Грешка при запис</Message>
        <div class="row">
            <div class="register">
                <div class="col-10">
                    <label>Име: </label>
                    <input disabled v-model="this.user.firstName" class="ml-92 mt-2" type="text" />
                </div>
                <div class="col-10">
                    <label>Презиме: </label>
                    <input disabled v-model="this.user.secondName" class="ml-60 mt-2" type="text" />
                </div>
                <div class="col-10">
                    <label>Фамилия: </label>
                    <input disabled v-model="this.user.thirdName" class="ml-60 mt-2" type="text" />
                </div>
                <div class="col-10">
                    <label>ЕГН: </label>
                    <input disabled v-model="this.user.egn" class="ml-95 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>Е-Майл: </label>
                    <input v-model="this.user.email" class="ml-70 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>Дата на раждане: </label>
                    <Calendar disabled v-model="this.user.born" showIcon class="cal mt-2" />
                </div>
                <div class="col-10 mt-3">
                    <label class="labelOne">Пол: </label>
                    <label class="labelTwo">Мъж: </label>
                    <input disabled v-model="this.user.gender" type="radio" class="" value="Male" />
                    <label class="labelThree">Жена: </label>
                    <input disabled v-model="this.user.gender" type="radio" value="Female" />
                </div>
                <div class="col-10 mt-3">
                    <label>Тип:</label>
                    <select disabled v-model="this.user.type" class="ml-92 mt-2">
                        <option value="student">
                            студент
                        </option>
                        <option value="teacher">
                            преподавател
                        </option>
                    </select>
                </div>

                <div class="col-10 mt-3">
                    <label>Научна степен: </label>
                    <select disabled v-model="this.user.degree" class="ml-30 mt-2">
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
                    <input id="roomEdit" v-model="this.user.room" class="ml-65 " type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label style="word-wrap:break-word;margin-left:60px;">Действаш:
                        <input style="vertical-align:middle;width: 20px; height: 20px;" type="checkbox" class=""
                            v-model="this.user.isSuccess" value="Y" />

                    </label>
                </div>
            </div>
            <div class="mt-3">
                <button @click="update()" class="btn btn-sm btn-primary  ">
                    Запис
                </button>

            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from '../../models/UserModel';
import axios from 'axios';
export default {
    name: "EditTeacher",
    data() {
        return {
            user: new UserModel(),
            showMessage: null
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw => {
            console.log('from.params', from.params)
            //@ts-ignore
            vw.retrieveMethod(from.params)
        })
    },
    methods: {
        async retrieveMethod(id: number) {
            await axios.post('http://localhost:8081/retrieve_edit_teacher', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    console.log(this.user.isSuccess);
                }
            })
        },
        back() {
            this.$router.push({ name: 'edit-user-list' })
        },
        async update() {
            console.log('user', this.user)
            if (this.user.isSuccess == true) {
                this.user.isSuccess = true;
            }
            await axios.post('http://localhost:8081/update_edit_teacher', this.user).then(res => {
                console.log('executed', res.data);
                this.showMessage = '1'
                setTimeout(() => {
                    if (this.showMessage == '1') {
                        this.showMessage = null;
                    }
                }, 1000)
            }).catch(error => {
                this.showMessage = '2'
                setTimeout(() => {
                    if (this.showMessage == '2') {
                        this.showMessage = null;
                    }
                }, 1000)
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

.ml-95 {
    margin-left: 95px;
}

.ml-60 {
    margin-left: 60px;
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

.cal {
    margin-left: 15px;
    width: 200px;
    font-size: 13px;
    height: calc(1.5em + 0.5rem + 2px) !important;
}

select {
    width: 185px;
    height: 30px;
}

.ml-30 {
    margin-left: 30px;
}

.ml-70 {
    margin-left: 70px;
}

#roomEdit {
    width: 182px;
}

.ml-65 {
    margin-left: 65px;
}

.back {
    background-color: red;
    color: white;
    font-size: 8px;
    margin-left: 10px;
}
</style>