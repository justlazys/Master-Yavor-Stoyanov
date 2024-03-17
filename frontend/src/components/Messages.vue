<template>
    <div>
        <h2>Съобщения</h2>
        <button class="btn btn-sm btn-primary mt-2" @click="back()">Назад</button>
        <div class="row mt-2">
            <div class="col-10">
                <div class="mt-3">
                    <label class="labelTwo">Преглед:</label>
                    <input type="radio" v-model="type" value="view">
                    <label class="labelThree">Създаване:</label>
                    <input type="radio" v-model="type" @change="checkAuthority()" value="create">
                </div>

            </div>
            <div v-if="type == 'create'">
                <Dialog v-model:visible="authority" modal header="Логване" :style="{ width: '80rem' }"
                    :breakpoints="{ '1299px': '85vw', '675px': '110vw' }">
                    <div class="col-12">
                        <div class="row">
                            <div style="margin-left:250px;" class="col-2">
                                <label>Емайл:</label>
                                <input v-model="this.messageSend.email" placeholder="....@fdiba.tu-sofia.bg" type="text" />
                            </div>
                            <div style="margin-left:55px;" class="col-2">
                                <label>Парола:</label>
                                <input v-model="this.messageSend.password" type="password" />
                            </div>
                            <div class="col-10 mt-3">
                                <button style="margin-left:250px;" class="btn btn-sm btn-primary mt-2"
                                    @click="close()">Затваряне</button>
                                <button style="margin-left:250px;" class="btn btn-sm btn-primary mt-2"
                                    @click="saveAuth()">Запис</button>
                            </div>
                        </div>


                    </div>

                </Dialog>
                <div>
                    <div class="mt-3">
                        <label>От:</label>
                        <input class="fd-1 mt-2" v-model="this.messageSend.from" type="text" />
                    </div>
                    <div class="mt-3">
                        <label>До:</label>
                        <input class="fd-1 mt-2" v-model="this.messageSend.to" type="text" />
                    </div>
                    <div class="mt-3">
                        <input class="fd-2 mt-2" placeholder="Тема" v-model="this.messageSend.subject" type="text" />
                    </div>
                    <div class="mt-3">
                        <label>Файлове:
                            <input class="fd-4 mt-2" type="file" id="files" ref="files" multiple
                                v-on:change="handleFilesUpload()" /> </label>

                        <div v-for="(file, key) in this.files" class="file-listing"> {{ file.name }} <span
                                v-on:click="removeFile(key)" class="remove-file">Remove</span></div>

                    </div>
                    <div class="mt-3">
                        <textarea placeholder="Текст" v-model="this.messageSend.text" class="fd-3 mt-2" rows="5"
                            cols="150" />
                    </div>
                    <div class="row mt-3">
                        <div class="col-10">

                            <button class="btn btn-sm btn-primary mt-2 ml-200" @click="sendEmail()">Изпращане</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="type == 'view'">
                <div>
                    <Dialog v-model:visible="visible" modal header="Съобщение" :style="{ width: '80rem' }"
                        :breakpoints="{ '1299px': '85vw', '675px': '110vw' }">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-2">
                                    <label>Мероприятие:</label>
                                    <input v-model="this.desc.title" type="text" />
                                </div>
                                <div style="margin-left:55px;" class="col-2">
                                    <label>Преподавател:</label>
                                    <input v-model="this.desc.withs" type="text" />
                                </div>
                                <div style="margin-left:55px;" class="col-2">
                                    <label>Стая:</label>
                                    <input v-model="this.desc.location" type="text" />
                                </div>

                                <div style="margin-left:55px;" class="col-2">
                                    <label>Тип:</label>
                                    <select v-model="this.desc.color">
                                        <option value="lecture">
                                            лекция
                                        </option>
                                        <option value="exam">
                                            изпит
                                        </option>
                                        <option value="assigment">
                                            курсова задача
                                        </option>
                                        <option value="project">
                                            курсова проект
                                        </option>
                                    </select>

                                </div>
                            </div>

                            <div style="margin-top: 12px;" class="row">

                                <div class="col-2">
                                    <label>От:</label>
                                    <input v-model="this.desc.start" type="text" />
                                </div>
                                <div style="margin-left:55px;" class="col-2">
                                    <label>До:</label>
                                    <input v-model="this.desc.end" type="text" />
                                </div>

                            </div>
                            <div style="margin-top: 12px;" class="row">
                                <div class="col-3">
                                    <label>Описание:</label>
                                    <Textarea v-model="this.desc.description" rows="5" cols="130" />
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-primary mt-2" @click="visible = false">Затваряне</button>
                    </Dialog>

                    <div class="mt-2">
                        <vue-good-table :columns="columns" :rows="rows" :pagination-options="{
                            enabled: true,
                            mode: 'pages',
                            perPage: 5,
                            position: 'top',
                            perPageDropdown: [5, 10, 15],

                            nextLabel: 'Напред',
                            pageLabel: 'Страници',
                            prevLabel: 'Назад',
                            rowsPerPageLabel: 'Елементи на страница',
                            ofLabel: 'от',
                            allLabel: 'All',
                        }" :search-options="{
    enabled: true,
    placeholder: 'Търсене'
}">
                            <template #table-row="props">
                                <span v-if="props.column.field === 'function'">
                                    <div>

                                        <button class="button-cl" @click="getMessageById(props.row.id)">
                                            <font-awesome-icon size="xl" icon="fa-solid fa-eye" style="color: blue;" />
                                        </button>
                                    </div>

                                </span>
                                <span v-else-if="props.column.field === 'color'">
                                    <div>
                                        <span>{{ translateDegree(props.row.color) }}</span>
                                    </div>
                                </span>
                            </template>
                        </vue-good-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import { AddDisciplines } from '../models/AddDisciplines';
import { SendEmailModel } from '../models/SendEmails';

export default {
    name: "Messages",
    components: {
        Dialog,
        Textarea
    },
    data() {
        return {
            messageSend: new SendEmailModel(),
            authority: false,
            visible: false,
            files: [],
            type: '',
            desc: new AddDisciplines(),
            columns: [
                {
                    label: 'Заглавие',
                    field: 'title'
                },
                {
                    label: 'От',
                    field: 'withs'
                },
                {
                    label: 'Тип',
                    field: 'color'
                },
                {
                    label: 'От',
                    field: 'start'
                },
                {
                    label: 'Стая',
                    field: 'location'
                },
                {
                    label: 'Преглед',
                    field: 'function'
                },
            ],
            rows: []
        }
    },
    created() {
        this.messageSend.files = [];
        this.messageSend.filesName = [];
        console.log('this.$store.getters.retrieveSendEmail', this.$store.getters.retrieveSendEmail)
        if (this.$store.getters.retrieveSendEmail && this.$store.getters.retrieveSendPass) {
            this.messageSend.email = this.$store.getters.retrieveSendEmail;
            this.messageSend.password = this.$store.getters.retrieveSendPass;
        }
    },
    methods: {
        translateDegree(row) {
            if (row == 'lecture') {
                return 'Лекция'
            } else if (row == 'exam') {
                return 'Изпит'
            } else if (row == 'assigment') {
                return 'Kурсова задача'
            } else if(row=='project') {
                return 'Kурсова проект'
            }
        },
        async sendEmail() {
            await axios.post(`http://localhost:8081/send_email`, this.messageSend).then(res => {
                console.log('data', res.data);
                this.messageSend = new SendEmailModel();
                this.files = [];
            }).catch(error => {
                console.log(`ERROR:${error}`);
            })
        },
        close() {
            this.authority = false;
            this.type = 'view';
        },
        saveAuth() {
            this.$store.commit('setSendEmail', {
                value: this.messageSend.email
            });
            this.$store.commit('setSendPass', {
                value: this.messageSend.password
            });
            this.authority = false;
        },
        checkAuthority() {
            console.log('this.messageSend.email', this.messageSend.email)
            if (this.messageSend.email == undefined && this.messageSend.password == undefined) {
                this.authority = true;
            }
        },
        removeFile(key) {
            this.files.splice(key, 1);
            this.messageSend.filesName.push(key, 1);
            this.messageSend.files.push(key, 1);
        },
        handleFilesUpload() {
            let uploadedFiles = this.$refs.files.files;

            console.log('files', this.messageSend.files)
            for (var i = 0; i < uploadedFiles.length; i++) {
                this.messageSend.filesName.push(uploadedFiles[i].name);
                this.messageSend.files.push(uploadedFiles[i].path);
                this.files.push(uploadedFiles[i])
            }
        },
        async getMessageById(id) {
            this.visible = true;

            let viewByid = new AddDisciplines();
            viewByid.id = id;
            console.log('id', id)
            await axios.post(`http://localhost:8081/retrieve_discipline_by_id`, viewByid).then(res => {

                this.desc = res.data;
                console.log(' this.desc', this.desc)
            })
        },
        back() {
            this.$router.back();
        },
        async retrieveMassages(id: number) {
            console.log('id', id)
            await axios.post('http://localhost:8081/load_messages', id).then(res => {
                if (res.data.length >= 1) {
                    this.rows = res.data;
                }
                console.log('res', res.data)
            }).catch(error => {
                console.log(error);
            })
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw => {
            //@ts-ignore
            vw.retrieveMassages(from.params);
        })
    }
}
</script>
<style scoped>
.remove-file {
    cursor: pointer;
}

.remove-file:hover {
    cursor: pointer;
    text-shadow: red;
    color: red;
}

input[type=file] {
    opacity: 0;
}

.ml-200 {
    margin-left: 200px;
}

.fd-1:focus {
    outline: none;
}

.fd-1 {
    margin-left: 30px;
    width: 500px;
    border: none;
    border-bottom: 0.01mm solid black;
}

.fd-2:focus,
.fd-3:focus {
    outline: none;
    border: none;
    border-bottom: 0.01mm solid black;
}

.fd-2:hover,
.fd-3:hover {
    outline: none;
    border: none;
    border-bottom: 0.01mm solid black;
}

.fd-2,
.fd-4 {
    width: 570px;
    border: none;
}

.fd-3 {
    width: 870px;
    border: none;
}

.labelTwo {
    margin-left: 180px;
    margin-right: +5px;
}

.labelThree {
    margin-left: +50px;
    margin-right: +5px;
}

.button-cl {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: border-color 0.25s;
}

select {
    width: 185px;
    height: 30px;
}
</style>