<template>
    <div>
        <div class="container">
            <div class="row">
                <div style="margin-left:100px;" class="col-9">
                    <label style="float: left;"><strong>ОКС: </strong><span>{{ this.translateType(this.user.statusType)
                    }}</span>
                    </label>
                    <label style="float: right;"><strong>Състояние: </strong> <span
                            v-if="this.user.isSuccess == 'Y'">Действащ</span> <span v-else>Неактивен</span> </label>
                </div>
            </div>
            <div class="row">
                <div style="margin-left:100px;" class="col-9">
                    <label style="float: left;"><strong>Фак. номер: </strong>{{ this.user.fakNumber }}</label>
                    <label style="float: right;"><strong>Записан семестър: </strong>{{this.semseter  }}</label>
                </div>
            </div>
            <div class="row">
                <div style="margin-left:100px;" class="col-9">
                    <label style="float: left;"><strong>Факултет: </strong> {{ this.translateFaculty(this.user.faculty) }}
                    </label>
                    <label style="float: right;"><strong>Заверен семестър: </strong>{{this.semseter  }}</label>
                </div>
            </div>
            <div class="row">
                <div style="margin-left:100px;" class="col-9">
                    <label style="float: left;"><strong>Специалност: </strong> {{ this.translateMajor(this.user.major) }}
                    </label>
                    <label style="float: right;"><strong>Поток: </strong>{{ this.user.stream }}</label>
                </div>
            </div>
            <div class="row">
                <div style="margin-left:100px;" class="col-9">
                    <label style="float: left;"><strong>Вид обучение: </strong>{{ this.translateTypeStudy(this.user.formStudy)}}</label>
                    <label style="float: right;"><strong>Личен e-mail: </strong>{{ this.user.email }}</label>
                </div>
            </div>
            <div class="row">
                <div style="margin-left:100px;" class="col-9">
                    <label style="float: left;"><strong>Група: </strong>{{ this.user.group }}</label>
                    <label style="float: right;"><strong>E-mail в ТУ: </strong>Попитайте във ФАГИОПМ
                    </label>
                </div>
            </div>
            <div class="row">
                <div style="margin-left:100px;" class="col-9">
                    <label style="float: left;"><strong>Вид прием: </strong>{{this.translateTypeAdmission(this.user.typeAdmission)  }}
                    </label>

                </div>
            </div>

            


        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from '../../models/UserModel';
import axios from 'axios';

export default {
    name: 'Info',
    data() {
        return {
            user: new UserModel(),
            semseter:null
        }
    },
    created() {
        console.log('d3d3d3d333')
    },
    beforeRouteEnter(from, to, next) {
        next(vw => {
            //@ts-ignore
            vw.retrieveMethod(from.params);
        })
    },
    methods: {
        async retrieveMethod(id: number) {
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.user = res.data;
                    this.semseter=this.user.semesters.semester
                    console.log(this.user);
                }
            })
        },
        translateType(el) {
            if (el == 'master') {
                return 'Магистър след бакалавър';
            } else if (el == 'bachelor') {
                return 'Бакалавър';
            }
        },
        translateFaculty(el) {
            if (el == '01') {
                return 'Факултет за германско инженерно обучение и промишлен мениджмънт';
            } else if (el == '02') {
                return 'Факултет за английско инженерно обучение';
            } else if (el == '03') {
                return 'Факултет Приложна математика и информатика';
            }
        },
        translateMajor(el) {
            if (el == '01') {
                return 'Компютърни системи и технологии (на немски език)';
            } else if (el == '02') {
                return 'Стопанско управление (на немски език)';
            } else if (el == '03') {
                return 'Мехатроника и информационна техника (на немски)';
            } else if (el == '04') {
                return 'Общо машиностроене (на немски)';
            }
        },
        translateTypeStudy(el) {
            if (el == 'regularly') {
                return 'Редовно';
            } else if (el == 'distance') {
                return 'Задочно';
            } else if (el == 'remotely') {
                return 'Дистанционно';
            }
        },
        translateTypeAdmission(el) {
            if (el == 'government') {
                return 'Държавна поръчка';
            } else if (el=='paid') {
                return 'Платена';
            }
        }
    }
}
</script>
<style scoped>
.container {
    margin: auto;
    width: 100%;
}
</style>