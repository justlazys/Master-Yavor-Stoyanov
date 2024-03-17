<template>
    <div>
        <div class="container mt-3">
            <vue-good-table v-if="rows.length != 0" :columns="columns" :rows="rows" :pagination-options="{
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

                    <span v-if="props.column.field === 'functions'">
                        <div>
                           

                        </div>
                    </span>
                    <span v-else-if="props.column.field === 'control'">
                        <div>
                            <p>
                                {{ translateDisc(props.row.disc,  this.faculty) }} Тип: {{ this.translateType(props.row.type) }}, Оценка:{{ props.row.note }}  от {{props.row.fromUser  }} на {{ this.formatDateTime(props.row.date) }}  семестър {{ props.row.semester }}
                            </p>
                            </div>
                    </span>
                    <span   v-else-if="props.column.field === 'lecture'">
                        <div v-if="props.row.lecUser">
                            <font-awesome-icon size="xl" icon="fa-solid fa-check" style="color: #1ca62c;" />
                            <p class="mt-2"> От {{ props.row.lecUser }} на {{ this.formatDateTime(props.row.dateUser)  }}</p>
                        </div>
                    </span>
                    <span   v-else-if="props.column.field === 'laboratory'">
                        <div v-if="props.row.labUser">
                            <font-awesome-icon size="xl" icon="fa-solid fa-check" style="color: #1ca62c;" />
                            <p class="mt-2"> От {{ props.row.labUser }} на {{this.formatDateTime(props.row.dateUser)  }}</p>
                        </div>
                    </span>
                    <span   v-else-if="props.column.field === 'seminar'">
                        <div v-if="props.row.semUser">
                            <font-awesome-icon size="xl" icon="fa-solid fa-check" style="color: #1ca62c;" />
                            <p class="mt-2"> От {{ props.row.semUser }} на {{this.formatDateTime(props.row.dateUser)  }}</p>
                        </div>
                    </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import moment from 'moment';
export default{
    name:"Grade",
    data(){
        return{
            rows:[],
            faculty:'',
            nom: [],
            columns: [
                {
                    label: 'Дисциплина (форма на контрол)',
                    field: 'control',
                },
                {
                    label: 'Лекции',
                    field: 'lecture',
                },
                {
                    label: 'Лаб. упр.',
                    field: 'laboratory',
                },
                {
                    label: 'Сем. упр.',
                    field: 'seminar',
                },
            ]
        }
    },
    beforeRouteEnter(from, to, next) {
        next(vw => {
            console.log('from.params', from.params)
            //@ts-ignore
            vw.retrieveMethod(from.params)
        })
    },
    created(){
        this.loadNom()
    },
    methods:{
        formatDateTime(dateTime) {
            return moment(dateTime).format('DD.MM.YYYY');
        },
        async  retrieveMethod(id){
            await axios.post('http://localhost:8081/get_student', id).then(res => {
                if (res.data != 0) {
                    this.faculty=res.data.faculty;
                    this.rows=res.data.grade
                    console.log( res.data.grade);
                }
            })
        },
        async loadNom() {
            await axios.post('http://localhost:8081/nom_disc').then(res => {
                this.nom = res.data;
                console.log(this.nom);
            })
        },
        translateDisc(type:any,user:any){
            console.log('type',type);
            console.log('user',user);
            for(let x of this.nom){
                if(x.code==type && x.mainCode==user){
                    return x.name;
                }
            }
        },
        translateType(type){
            if(type=='exam'){
                return 'Изпит'
            }else if(type=='grade'){
                return 'Текуща оценка'

            }
            else if(type=='project'){
                return 'Курсов проект'

            }
            else if(type=='assigment'){
                return 'Курсова работа'

            }
            
        }
    }
}
</script>
<style scoped>
.container{
    width: 900px;
    margin-top: 10px;
}
</style>