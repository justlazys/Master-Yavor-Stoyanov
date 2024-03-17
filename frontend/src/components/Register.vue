<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <Message v-if="this.succses" severity="success">Успешна Регистрация</Message>
                <Message v-if="this.error" severity="error">Имейла вече е използван</Message>
                <Message v-if="this.vallidate" severity="error">{{ this.message }}</Message>

            </div>
        </div>

        <div class="row">
            <h2>Регистрация</h2>
            <div class="register">

                <div class="col-10">
                    <label>Име: </label>
                    <input v-model="this.register.firstName" class="ml-92 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>Презиме: </label>
                    <input v-model="this.register.secondName" class="ml-60 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>Фамилия: </label>
                    <input v-model="this.register.thirdName" class="ml-60 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>ЕГН: </label>
                    <input v-model="this.register.egn" class="ml-95 mt-2" type="text" />
                </div>

                <div class="col-10 mt-3">
                    <label>Е-Майл: </label>
                    <input v-model="this.register.email" class="ml-70 mt-2" type="text" />
                </div>
                <div class="col-10 mt-3">
                    <label>Дата на раждане: </label>
                    <Calendar v-model="this.register.born" showIcon class="cal mt-2" />
                </div>
                <div class="col-10 mt-3">
                    <label class="labelOne">Пол: </label>
                    <label class="labelTwo">Мъж: </label>
                    <input v-model="this.register.gender" type="radio" class="" value="Male" />
                    <label class="labelThree">Жена: </label>
                    <input v-model="this.register.gender" type="radio" value="Female" />
                </div>

                <div class="col-10 mt-3">
                    <label>Тип:</label>
                    <select v-model="this.register.type" class="ml-92 mt-2">
                        <option value="student">
                            студент
                        </option>
                        <option value="teacher">
                            преподавател
                        </option>
                    </select>
                </div>

                <div v-if="this.register.type == 'teacher'" class="col-10 mt-3">
                    <label>Научна степен: </label>
                    <select v-model="this.register.degree" class="ml-30 mt-2">
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

                <div v-if="this.register.type == 'teacher'" class="col-10 mt-3">
                    <label>Кабинет: </label>
                    <input id="room" v-model="this.register.room" class="ml-65 " type="text" />
                </div>

                <div v-if="this.register.type == 'student'" class="col-10 mt-3">
                    <label>ОКС: </label>
                    <select v-model="this.register.statusType" class="ml-92">
                        <option value="bachelor">
                            бакалавър
                        </option>
                        <option value="master">
                            магистър
                        </option>

                    </select>
                </div>

                <div v-if="this.register.type == 'student'" class="col-10 mt-3">
                    <label>Факултет: </label>
                    <select v-model="this.register.faculty" class="ml-60">
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

                <div v-if="this.register.type == 'student'" class="col-10 mt-3">
                    <label>Специалност: </label>
                    <select v-model="this.register.major" class="ml-30">
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


                <div v-if="this.register.type == 'student'" class="col-10 mt-3">
                    <label>Вид прием: </label>
                    <select v-model="this.register.typeAdmission" class="ml-50">
                        <option value="government">
                            държавна поръчка
                        </option>
                        <option value="paid">
                            платена
                        </option>

                    </select>
                </div>

                <div v-if="this.register.type == 'student'" class="col-10 mt-3">
                    <label>Форма на обучение: </label>
                    <select v-model="this.register.formStudy" class="ml-11">
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
                <div class="mt-3">
                    <button class="btn btn-sm btn-primary  " @click="back()">Назад </button>
                    <button style="margin-left: 15px;" class="btn btn-sm btn-primary  "
                        @click="registerService()">Запис</button>
                </div>
                <p v-if="this.number">Вашия факултетен номер е {{
                    this.localNumber }}</p>
            </div>



        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from '../models/UserModel'
import axios from 'axios';
export default {
    name: 'Register',
    data() {
        return {
            succses: false,
            error: false,
            register: new UserModel(),
            checkNumber: null,
            message: "",
            vallidate: false,
            number: false,
            localNumber: null,

           
        }
    },

    methods: {

        validateFields(register: UserModel) {
            let msgs: string[] = [];
            if (!register.firstName) {
                msgs.push("'Име'");
            }
            if (!register.secondName) {
                msgs.push("'Презиме'");
            }
            if (!register.thirdName) {
                msgs.push("'Фамилия'");
            }
            if (!register.egn) {
                msgs.push("'Егн'");
            }
            if (!register.born) {
                msgs.push("'Дата на раждане'");
            }
            if (!register.gender) {
                msgs.push("'Пол'");
            }
            if (!register.type) {
                msgs.push("'Тип'");
            }
            if (register.type == 'student') {

                if (!register.statusType) {
                    msgs.push("'ОКС'");
                }

                if (!register.faculty) {
                    msgs.push("'Факултет'");
                }

                if (!register.major) {
                    msgs.push("'Специалност'");
                }



                if (!register.typeAdmission) {
                    msgs.push("'Вид прием'");
                }

                if (!register.formStudy) {
                    msgs.push("'Форма на обучение'");
                }
            }
            if (register.type == 'teacher') {

                if (!register.degree) {
                    msgs.push("'Научна степен'");
                }

                if (!register.room) {
                    msgs.push("'Кабинет'");
                }
            }
            return msgs;
        },
        back() {
            this.$router.back();
        },
        addingZero(num, places) {
            return String(num).padStart(places, '0')
        },
        async registerService() {
            this.vallidate = false;
            this.number = false;
            this.localNumber = null;
            let validationMsgs = this.validateFields(this.register);
            if (validationMsgs.length > 0) {
                this.vallidate = true;
                this.message = `Моля попълнете задължителните полета : ${validationMsgs.join(',')} !`
                setTimeout(() => {
                    if (this.vallidate == true) {
                        this.vallidate = false;
                    }
                }, 3000)

            } else {
                if (this.register.email) {
                    this.register.email = this.register.email.trim();
                }
                // await axios.post('http://localhost:8081/check_email', this.register).then(res => {
                //     console.log(res.data);
                //     this.isRegister = res.data;
                // }).catch(error => {
                //     console.log("Error:", error);
                // })

                if (this.register.type == 'student') {
                    let number = '';
                    let currentYear = new Date().getFullYear().toString().substr(-2);
                    number += currentYear;
                    number += this.register.faculty;
                    number += this.register.major;

                    await axios.post('http://localhost:8081/check_number', this.register).then(res => {
                        console.log(res.data);
                        this.checkNumber = res.data;
                    }).catch(error => {
                        console.log("Error:", error);
                    })
                    console.log(this.checkNumber)
                    if (this.checkNumber != null) {
                        this.register.fakNumber = null;
                        console.log('checkNumber', this.checkNumber)
                        let newThreeDigits = this.checkNumber + 1;
                        console.log('newThreeDigits', newThreeDigits)
                        number = newThreeDigits.toString();
                        console.log('number', number)
                        this.register.fakNumber = Number(number);
                        console.log('fakNumber', this.register.fakNumber)
                    } else {
                        let newNumber = this.addingZero(1, 3);
                        console.log('newNumber', newNumber)
                        number += newNumber;
                        console.log('Else', number)
                        this.register.fakNumber = Number(number);
                        console.log('Else reg Number', this.register.fakNumber)
                    }

                    if (this.register.fakNumber) {
                        await axios.post('http://localhost:8081/create_account', this.register).then(res => {
                            console.log(res.data);
                            if (res.data !== false) {
                                this.localNumber = this.register.fakNumber;
                                this.register = new UserModel();
                                this.succses = true;
                                this.number = true;
                                console.log(' this.number', this.number)
                                setTimeout(() => {
                                    if (this.succses == true) {
                                        this.succses = false;
                                    }
                                }, 2000)
                            } else {
                                this.error = true
                                setTimeout(() => {
                                    if (this.error == true) {
                                        this.error = false;
                                    }
                                }, 2000)
                            }
                        })
                    }
                } else {
                    await axios.post('http://localhost:8081/create_account', this.register).then(res => {
                        console.log(res.data);
                        if (res.data !== false) {
                            this.register = new UserModel();
                            this.succses = true
                            setTimeout(() => {
                                if (this.succses == true) {
                                    this.succses = false;
                                }
                            }, 2000)
                        } else {
                            this.error = true
                            setTimeout(() => {
                                if (this.error == true) {
                                    this.error = false;
                                }
                            }, 2000)
                        }
                    })
                }

            }
        },

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

.ml-30 {
    margin-left: 30px;
}

.ml-50 {
    margin-left: 50px;
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

#room {
    width: 182px;
}

.ml-65 {
    margin-left: 65px;
}
</style>