<template>
    <div>
        <div class="row">
            <Message v-if="this.showMessage == '1'" severity="success">Успешен запис</Message>
            <Message v-if="this.showMessage == '2'" severity="error">Грешка при запис</Message>
            <div class="register">
                <div class="col-10">
                    <label>Име: </label>
                    <input v-model="this.user.firstName" class=" ml-92 mt-2" type="text" />
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
                    <Calendar v-model="this.user.born" showIcon class="cal mt-2" />
                </div>
                <div class="col-10 mt-3">
                    <label class="labelOne">Пол: </label>
                    <label class="labelTwo">Мъж: </label>
                    <input v-model="this.user.gender" type="radio" class="" value="Male" />
                    <label class="labelThree">Жена: </label>
                    <input v-model="this.user.gender" type="radio" value="Female" />
                </div>

                <div class="col-10 mt-3">
                    <label>ОКС: </label>
                    <select v-model="this.user.statusType" class="ml-92">
                        <option value="bachelor">
                            бакалавър
                        </option>
                        <option value="master">
                            магистър
                        </option>

                    </select>
                </div>

                <div class="col-10 mt-3">
                    <label>Факултет: </label>
                    <select v-model="this.user.faculty" class="ml-60">
                        <option value="01">
                            ФАГИОПМ
                        </option>
                        <option value="02">
                            ФАИО
                        </option>
                        <option value="03">
                            ЦПМ
                        </option>
                    </select>
                </div>

                <div class="col-10 mt-3">
                    <label>Специалност: </label>
                    <select v-model="this.user.major" class="ml-30">
                        <option value="01">
                            КСТ
                        </option>
                        <option value="02">
                            СИ
                        </option>
                        <option value="03">
                            МИТ
                        </option>
                        <option value="04">
                            ОМ
                        </option>

                    </select>
                </div>


                <div class="col-10 mt-3">
                    <label>Вид прием: </label>
                    <select v-model="this.user.typeAdmission" class="ml-50">
                        <option value="government">
                            държавна поръчка
                        </option>
                        <option value="paid">
                            платена
                        </option>

                    </select>
                </div>

                <div class="col-10 mt-3">
                    <label>Форма на обучение: </label>
                    <select v-model="this.user.formStudy" class="ml-11">
                        <option value="regularly">
                            редовно
                        </option>
                        <option value="distance">
                            задочно
                        </option>
                        <option value="remotely">
                            дистанционно
                        </option>

                    </select>
                </div>

                <div class="col-10 mt-3">
                    <label>Група: </label>
                    <input id="group" v-model="this.user.group" class="ml-80  mt-2" type="text" />
                </div>

                <div class="col-10 mt-3">
                    <label>Поток: </label>
                    <input id="stream" v-model="this.user.stream" class="ml-80  mt-2" type="text" />
                </div>

                <div class="col-10 mt-3">
                    <label>Курс: </label>
                    <select v-model="course" class="ml-80">
                        <option value="1">
                            първи
                        </option>
                        <option value="2">
                            втори
                        </option>
                        <option value="3">
                            трети
                        </option>
                        <option value="4">
                            четвърти
                        </option>
                    </select>
                </div>

                <div class="col-10 mt-3">
                    <label>Семестър: </label>
                    <select v-model="semester" class="ml-60">
                        <option value="I">
                            I
                        </option>
                        <option value="II">
                            II
                        </option>
                        <option value="III">
                            III
                        </option>
                        <option value="IV">
                            IV
                        </option>
                        <option value="V">
                            V
                        </option>
                        <option value="VI">
                            VI
                        </option>
                        <option value="VII">
                            VII
                        </option>
                        <option value="VIII">
                            VIII
                        </option>
                    </select>
                </div>
                <div class="col-10 mt-3">
                    <label>Студент от: </label>
                    <Calendar v-model="this.user.from" showIcon class="cal-date mt-2" />
                </div>
                <div class="col-10 mt-3">
                    <label>Студент до: </label>
                    <Calendar v-model="this.user.to" showIcon class="cal-date mt-2" />
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
import { SemestersModel } from '../../models/SemestersModel';
import axios from 'axios';
export default {
    name: "EditInfo",
    data() {
        return {
            user: new UserModel(),
            course: '',
            semester: '',
            showMessage: null
        }
    },

    created() {

        this.user.isSuccess = 'Y'
        if (this.user.born) {

            this.user.born = new Date(this.user.born);
            console.log('here', this.user.born)
        }
        if (this.user.from) {
            this.user.from = new Date(this.user.from);
        }
        if (this.user.to) {
            this.user.to = new Date(this.user.to);
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
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    if (this.user.semesters != undefined) {
                        this.semester = this.user.semesters.semester;
                        this.course = this.user.semesters.course;
                    }
                    console.log(res.data);
                }
            })
        },
        async update() {

            if (this.semester != '' || this.course != '') {
                this.user.semesters = new SemestersModel();
                this.user.semesters.semester = this.semester;
                this.user.semesters.course = this.course;
                this.user.semesters.userId = this.user.id;
            }
            if (this.user.isSuccess == true) {
                this.user.isSuccess = true;
            }
            this.user.userEmail = this.$store.getters.retrieveEmail;
            console.log('this.user', this.user)
            await axios.post('http://localhost:8081/update_user', this.user).then(res => {
                console.log('executed', res.data)
                this.showMessage = '1'
                setTimeout(() => {
                    if (this.showMessage == '1') {
                        this.showMessage = null;
                    }
                }, 1000)
            }).catch(error => {
                console.log('error:', error);
                this.showMessage = '2'
                setTimeout(() => {
                    if (this.showMessage == '2') {
                        this.showMessage = null;
                    }
                }, 1000)
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

.ml-80 {
    margin-left: 80px;
}

.ml-95 {
    margin-left: 95px;
}

.cal {
    margin-left: 15px;
    width: 200px;
    font-size: 13px;
    height: calc(1.5em + 0.5rem + 2px) !important;
}

.cal-date {
    margin-left: 60px;
    width: 200px;
    font-size: 13px;
    height: calc(1.5em + 0.5rem + 2px) !important;
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

.ml-50 {
    margin-left: 50px;
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


select {
    width: 185px;
    height: 30px;
}

.ml-30 {
    margin-left: 30px;
}

#group {
    width: 185px;
}

#stream {
    width: 185px;
}

.ml-70 {
    margin-left: 70px;
}
</style>