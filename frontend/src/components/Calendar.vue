<template>
    <div>
        <button v-if="this.$store.getters.getRole == 'teacher' || this.$store.getters.getRole == 'Admin' " class="button-cl" @click="newEvent()">Добавяне</button>
        <button class="button-cl" @click="back()">Назад</button>
        <div class=" mt-2">
            <div class="row">
                <div class="col-2">
                    <label>Събитие:</label>
                    <input v-model="this.filter.title" class="w-100" type="text" />
                </div>
                <div style="margin-left: 15px;" class="col-2">
                    <label>Тип:</label>
                    <select v-model="this.filter.color" class="w-100">
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
                <div style="margin-left: 15px;" class="col-2">
                    <label>Специалност:</label>
                    <select v-model="this.filter.topic" class="w-100">
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
                <div style="margin-left: 15px;" class="col-2">
                    <label>Семестър:</label>
                    <select v-model="this.filter.semester" class="w-100">
                        <option value="I">
                            първи
                        </option>
                        <option value="II">
                            втори
                        </option>
                        <option value="III">
                            трети
                        </option>
                        <option value="IV">
                            четвърти
                        </option>
                    </select>
                </div>
                <div style="margin-left: 15px;" class="col-2">
                    <label>До Група:</label>
                    <input v-model="this.filter.stream" class="w-100" type="text" />
                </div>
            </div>
        </div>
        <div class="mt-3">
            <div style="margin: auto;" class="col-2">
                <button @click="search()" class="btn btn-sm btn-primary">Търсене</button>
            </div>
        </div>
        <Dialog v-model:visible="deleteDialog" modal header="Добавяне на събитие" :style="{ width: '80rem' }"
            :breakpoints="{ '1299px': '85vw', '675px': '110vw' }">
            <div class="col-12">
                <label>Сигурни ли сте, че искате да изтриете събитието ? </label>
            </div>
            <button class=" btn btn-sm btn-primary mt-2" @click="deleteDialog = false">Затваряне</button>
            <button class=" btn btn-sm btn-primary mt-2" style="margin-left: 550px;;" @click="deleteEvent()">Да</button>
        </Dialog>
        <Dialog v-model:visible="visible" modal header="Добавяне на събитие" :style="{ width: '80rem' }"
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
                        <label>Специалност:</label>
                        <select v-model="this.desc.topic">
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
                    <div style="margin-left:55px;" class="col-2">
                        <label>Стая:</label>
                        <input v-model="this.desc.location" type="text" />
                    </div>
                    <div style="margin-left:55px;" class="col-2">
                        <label>Семестър:</label>
                        <select v-model="this.desc.semester">
                            <option value="I">
                                първи
                            </option>
                            <option value="II">
                                втори
                            </option>
                            <option value="III">
                                трети
                            </option>
                            <option value="IV">
                                четвърти
                            </option>
                        </select>

                    </div>
                    <div style="margin-top: 12px;" class="row">
                        <div class="col-2">
                            <label>До Група:</label>
                            <input v-model="this.desc.stream" type="text" />
                        </div>
                        <div style="margin-left:55px;" class="col-2">
                            <label>Нотификация:</label>
                            <select v-model="this.desc.isImportant">
                                <option :value="true">
                                    Да
                                </option>
                                <option :value="false">
                                    Не
                                </option>
                            </select>
                        </div>
                      
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
            <button class="btn btn-sm btn-primary mt-2" style="margin-left: 550px;;" v-if="!this.isEdit"
                @click="addEvent()">Добави</button>
            <button class="btn btn-sm btn-primary mt-2" style="margin-left: 550px;;" v-if="this.isEdit"
                @click="editDisc()">Редакция</button>
        </Dialog>
    </div>
    <Qalendar class="mt-3" :key="forceUpdate" :events="events" :config="config" @delete-event="deletes($event)"
        @edit-event="edit($event)" />
</template>
  
<script lang="ts">
import { Qalendar } from "qalendar";
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import { AddDisciplines } from "../models/AddDisciplines";
import axios from 'axios';
import { Filterisciplines } from "../models/FilterDisciplines";
import {ROLES} from '../constants/constants'
export default {
    components: {
        Qalendar,
        Dialog,
        Textarea
    },

    data() {
        return {
            roles:ROLES,
            visible: false,
            file: '',
            modalShow: false,
            forceUpdate: 0,
            deleteDialog: false,
            desc: new AddDisciplines(),
            delDisc: new AddDisciplines(),
            filter: new Filterisciplines(),
            events: [],
            isEdit: false,
            config: {
                // see configuration section
                dayIntervals: {
                    height: 20,
                    length: 15,

                },

                week: {
                    // Takes the value 'sunday' or 'monday'
                    // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
                    startsOn: 'monday',
                    // Takes the values 5 or 7.
                    nDays: 7,
                    // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
                    // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
                    scrollToHour: 5,
                },
                month: {
                    // Hide leading and trailing dates in the month view (defaults to true when not set)
                    showTrailingAndLeadingDates: false,

                },

                locale: 'bg-BG',
                // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
                // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
                defaultMode: 'day',
                // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
                isSilent: true,
                showCurrentTime: true, // Display a line indicating the current time 

            }
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw => {
            console.log('from.params', from.params)
            //@ts-ignore
            vw.retrieveMethod();
        })
    },
    methods: {
        async search() {
            this.events = [];
            this.filter.userEmail = this.$store.getters.retrieveEmail;
            console.log('this.filter',this.filter)
            if(this.filter.title==''){
                this.filter.title=null;
            }
            if(this.filter.stream==''){
                this.filter.stream=null;
            }
            await axios.post(`http://localhost:8081/filter_discipline`, this.filter).then(res => {
                console.log('res.data',res.data)
                for (let i of res.data) {
                    let setColor = "";
                    if (i.color == 'lecture') {
                        setColor = 'blue'
                    } else if (i.color == 'exam') {
                        setColor = 'red'
                    }
                    else if (i.color == 'assigment') {
                        setColor = 'green'
                    }
                    else if (i.color == 'project') {
                        setColor = 'yellow'
                    }
                    this.events.push({
                        id: i.id,
                        title: i.title,
                        with: i.withs,
                        topic: i.topic,
                        color: setColor,
                        isEditable: true,
                        time: {
                            start: i.start.toString(),
                            end: i.end.toString()
                        },
                        description: i.description,
                        location: i.location
                    })
                }
            })
            this.forceUpdate++;
        },
        async deleteEvent() {
            this.events = [];
            console.log('this.delDisc', this.delDisc)
            this.delDisc.userEmail = this.$store.getters.retrieveEmail;
            await axios.post(`http://localhost:8081/delete_discipline`, this.delDisc).then(res => {

                for (let i of res.data) {
                    let setColor = "";
                    if (i.color == 'lecture') {
                        setColor = 'blue'
                    } else if (i.color == 'exam') {
                        setColor = 'red'
                    }
                    else if (i.color == 'assigment') {
                        setColor = 'green'
                    }
                    else if (i.color == 'project') {
                        setColor = 'yellow'
                    }

                    this.events.push({
                        id: i.id,
                        title: i.title,
                        with: i.withs,
                        topic: i.topic,
                        color: setColor,
                        isEditable: true,
                        time: {
                            start: i.start.toString(),
                            end: i.end.toString()
                        },
                        description: i.description,
                        location: i.location
                    })
                }
            })
            this.deleteDialog = false;
            this.forceUpdate++;
        },
        back() {
            this.$router.back();
        },
        newEvent() {
            this.visible = true;
            this.isEdit = false;
            this.desc = new AddDisciplines();


        },
        async retrieveMethod() {
            await axios.post('http://localhost:8081/retrieve_all_discipline', this.desc).then(res => {
                ;
                if (res.data) {
                    for (let i of res.data) {
                        let setColor = "";
                        if (i.color == 'lecture') {
                            setColor = 'blue'
                        } else if (i.color == 'exam') {
                            setColor = 'red'
                        }
                        else if (i.color == 'assigment') {
                            setColor = 'green'
                        }
                        else if (i.color == 'project') {
                            setColor = 'yellow'
                        }

                        this.events.push({
                            id: i.id,
                            title: i.title,
                            with: i.withs,
                            topic: i.topic,
                            color: setColor,
                            isEditable: true,
                            time: {
                                start: i.start.toString(),
                                end: i.end.toString()
                            },
                            description: i.description,
                            location: i.location
                        })
                    }
                }
            })
            this.forceUpdate++;
        },
        deletes(el) {
            if (this.$store.getters.getRole !== 'student') {
                this.deleteDialog = true;
                this.delDisc.id = el;

            }
        },
        async edit(el) {
            if (this.$store.getters.getRole !== 'student') {
                this.visible = true;
                this.isEdit = true;
                let editDisc = new AddDisciplines();
                editDisc.id = el;

                await axios.post(`http://localhost:8081/retrieve_discipline_by_id`, editDisc).then(res => {
                    this.desc = res.data;
                })
            }
        },
        async editDisc() {
            this.events = [];
            this.desc.userEmail = this.$store.getters.retrieveEmail;
            await axios.post(`http://localhost:8081/updated_discipline`, this.desc).then(res => {

                for (let i of res.data) {
                    let setColor = "";
                    if (i.color == 'lecture') {
                        setColor = 'blue'
                    } else if (i.color == 'exam') {
                        setColor = 'red'
                    }
                    else if (i.color == 'assigment') {
                        setColor = 'green'
                    }
                    else if (i.color == 'project') {
                        setColor = 'yellow'
                    }

                    this.events.push({
                        id: i.id,
                        title: i.title,
                        with: i.withs,
                        topic: i.topic,
                        color: setColor,
                        isEditable: true,
                        time: {
                            start: i.start.toString(),
                            end: i.end.toString()
                        },
                        description: i.description,
                        location: i.location
                    })
                }
            })
            this.visible = false;


            this.forceUpdate++;
        },
        async addEvent() {
            this.events = [];
            this.desc.userEmail = this.$store.getters.retrieveEmail;
            await axios.post('http://localhost:8081/add_discipline', this.desc,
            ).then(res => {
                console.log('here', res.data);

                for (let i of res.data) {
                    let setColor = "";
                    if (i.color == 'lecture') {
                        setColor = 'blue'
                    } else if (i.color == 'exam') {
                        setColor = 'red'
                    }
                    else if (i.color == 'assigment') {
                        setColor = 'green'
                    }
                    else if (i.color == 'project') {
                        setColor = 'yellow'
                    }
                    console.log('start', i.start)
                    console.log('end', i.end)
                    this.events.push({
                        id: i.id,
                        title: i.title,
                        with: i.withs,
                        topic: i.topic,
                        color: setColor,
                        isEditable: true,
                        time: {
                            start: i.start.toString(),
                            end: i.end.toString()
                        },
                        description: i.description,
                        location: i.location
                    })

                }

            }).catch(error => {
                console.log('NESTAWAVA', error);
            })

            this.forceUpdate++;
            this.desc = new AddDisciplines();
            this.visible = false;
        }
    }
}
</script>
<style>
@import "qalendar/dist/style.css";
</style>
<style scoped>
.fd-4 {
    width: 570px;
    border: none;
}

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