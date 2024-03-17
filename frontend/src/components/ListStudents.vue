<template>
    <div>
        <div class="row">
            <h3>Търсене на студент</h3>
            <Dialog v-model:visible="visible" modal header="Съобщение" :style="{ width: '80rem' }"
                :breakpoints="{ '1299px': '85vw', '675px': '110vw' }">
                <div style="text-align: center;"><label
                        style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">{{ this.txtUser }}</label></div>
                <hr />
                <div class="msg-container">
                    <span v-for="el of this.messages" :key="el.id">
                        <div>
                            <label>{{ formatDateTime(el.date) }}</label>
                        </div>
                        <div
                            :class="this.$store.getters.retrieveId == el.senderId ? 'sender-messages' : 'retriever-messages'">
                            <label>{{ el.text }}</label>
                        </div>
                    </span>
                </div>
                <hr />
                <div class="row">
                    <div>
                        <textarea placeholder="Текст" v-model="this.msg.text" rows="3" cols="140" />
                    </div>
                    <div>
                        <button style="width: 1050px; background-color: blue; text-shadow: 10mm; color: aliceblue;"
                            @click="sendMessages()">Изпращане</button>
                    </div>
                </div>
            </Dialog>
            <div class="container mt-2">
                <div class="col-12">
                    <label>Фак.номер:</label>
                    <input class="ml-12" v-model="this.user.fakNumber" type="text" />
                    <button style="margin-left:20px" @click="search()" class="btn btn-sm btn-primary">
                        <label>Търсене</label>
                    </button>
                    <button @click="back()" style="margin-left:20px" class="btn btn-sm btn-primary">
                        <label>Назад</label>
                    </button>
                </div>

            </div>
            <div class="mt-2">
                <vue-good-table v-if="this.result == false" :columns="columns" :rows="rows" :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    perPage: 5,
                    position: 'top',
                    perPageDropdown: [5, 10, 15],
                    nextLabel: 'Напред',
                    prevLabel: 'Назад',
                    rowsPerPageLabel: 'Елементи на страница',
                    ofLabel: 'от',
                    pageLabel: 'page', // for 'pages' mode
                    allLabel: 'All',

                }">
                
                    <template #table-row="props">
                        <span v-if="props.column.field === 'function'">
                            <div>

                                <router-link v-if="this.$store.getters.getRole == 'teacher' || this.$store.getters.getRole == 'Admin' "
                                    :to="'/edit-user-from-list/' + props.row.id">
                                    <font-awesome-icon size="xl" icon="fa-solid fa-pencil" />
                                </router-link>

                                <!-- <span v-if="this.$store.getters.getRole=='ADMIN'">
                                    <router-link :to="'/view_student/'+props.row.id">
                                    <font-awesome-icon icon="fa-solid fa-pencil" />
                                </router-link>
                                </span> -->
                                <router-link style="margin-left:15px" :to="'/view_student/' + props.row.id">
                                    <font-awesome-icon size="xl" icon="fa-solid fa-eye" />
                                </router-link>
                                <button v-if="props.row.id != this.$store.getters.retrieveId" class="button-cl"
                                    @click="openMassage(props.row)">
                                    <font-awesome-icon size="xl" icon="fa-solid fa-message" style="color: blue;" />
                                </button>
                            </div>

                        </span>
                        <span v-else-if="props.column.field === 'gender'">
                            <div v-if="props.row.gender">
                                <span v-if="props.row.gender == 'Male'">Мъж</span>
                                <span v-else>Жена</span>
                            </div>
                        </span>
                    </template>

                </vue-good-table>
                <label v-if="this.result" class="mt-3">Не е намерен такъв студент</label>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { UserModel } from '../models/UserModel';
import { TextMessagesModel } from '../models/TextMessagesModel';
import moment from 'moment';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
export default {
    name: "ListStudents",
    components: {
        Dialog,
        Textarea
    },
    data() {
        return {
            user: new UserModel(),
            msg: new TextMessagesModel(),
            visible: false,
            result: false,
            messages: [],
            txtUser: '',
            columns: [
                {
                    label: 'Име',
                    field: 'firstName',
                },

                {
                    label: 'Презиме',
                    field: 'secondName',

                },

                {
                    label: 'Фамилия',
                    field: 'thirdName',

                },

                {
                    label: 'Емайл',
                    field: 'email',

                },

                {
                    label: 'Фак.номер',
                    field: 'fakNumber',

                },

                {
                    label: 'Пол',
                    field: 'gender',

                },

                {
                    label: 'Функция',
                    field: 'function',

                },

            ],
            rows: [],
        }
    },
    created() {
        console.log('store', this.$store.getters.FakultyNumber)

    },
    methods: {
        formatDateTime(dateTime) {
            return moment(dateTime).format('DD.MM.YYYY');
        },

        async sendMessages() {
            this.messages = [];
            this.msg.date = new Date();
            await axios.post('http://localhost:8081/send_msg', this.msg).then(res => {
                this.messages = res.data;
                this.msg.text = null;
                console.log('here', this.messages);
            }).catch(error => {
                console.log('Error', error);
            })

        },
        async openMassage(el) {

            this.messages = [];
            console.log('el', el);
            this.txtUser = el.firstName + ' ' + el.secondName + ' ' + el.thirdName
            this.msg.senderId = this.$store.getters.retrieveId;
            this.msg.retrieverId = el.id;
            await axios.post('http://localhost:8081/retrieve_msg', this.msg).then(res => {
                if (res.data != 'Empty') {
                    this.messages = res.data;
                }

                console.log('here', this.messages);
            }).catch(error => {
                console.log('Error', error);
            })
            this.visible = true;
        },
        back() {
            this.$router.back();
        },
        async search() {
            this.result = false;
            if (this.user.fakNumber == '') {
                this.user.fakNumber = null;
            }
            console.log('this.$store.getters.retrieveEmail', this.$store.getters.retrieveEmail)
            this.user.userEmail = this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/retrieve_student', this.user)
                .then(res => {
                    if (res.data != 0) {
                        this.rows = res.data;
                        console.log(this.rows);
                    } else {
                        this.result = true;
                    }
                })
        }
    }
}
</script>
<style scoped>
.sender-messages {
    display: table;
    max-width: 50%;
    min-width: 20px;
    padding: 2px;
    margin: 3px;
    background: #00BFFF;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    border: 1px solid #00BFFF;

}

.retriever-messages {
    display: table;
    max-width: 50%;
    min-width: 20px;
    padding: 2px;
    margin: 3px;
    background: #808080;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    border: 1px solid #808080;

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

.container {
    width: 800px;
    margin: auto;
    display: inline-block;
}

.msg-container {
    width: 1050px;
    overflow-y: scroll;
    height: 300px;
    margin: auto;
    display: inline-block;
}

.ml-12 {
    margin-left: 30px;
}

input {
    height: 25px;
    ;
}
</style>