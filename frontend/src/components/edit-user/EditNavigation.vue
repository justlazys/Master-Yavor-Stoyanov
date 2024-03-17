<template>
    <div>
      <div style="margin-left:150px;"  class="row">
        <nav  style="color: transparent !important;" class="navbar navbar-expand-lg ">
  <button  style="margin: auto !important;" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkupEdit" aria-controls="navbarNavAltMarkupEdit" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkupEdit">
    <div class="navbar-nav">
        <router-link  class="nav-item nav-link active" :to="'/edit-info/'+this.id">Информация </router-link>
      <router-link  class="nav-item nav-link active" :to="'/edit-health-care/'+this.id">Здравно осигуряване  </router-link>
      <router-link  class="nav-item nav-link active" :to="'/edit-disciplines/'+this.id">Заверки и оценки</router-link>
      <router-link  class="nav-item nav-link active" :to="'/edit-sport/'+this.id">Спорт</router-link>
      <router-link  class="nav-item nav-link active" :to="'/edit-scholarship/'+this.id">Стипендии</router-link>
      <router-link  class="nav-item nav-link active" :to="'/edit-dorm/'+this.id">Общежития</router-link>
    </div>
  </div>
</nav>
      </div>
      
    </div>
</template>
<script lang="ts">
export default{
    props:{
        id:{
            type:Number,
            required:false,
            default:0
        }
    },
    name:'EditNavigation',
    data(){
        return{

        }
    },

}

</script>