<template>
    <div>
      <div style="margin-left:150px;"  class="row">
        <nav  style="color: transparent !important;" class="navbar navbar-expand-lg ">
  <button  style="margin: auto !important;" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <router-link  class="nav-item nav-link active" :to="'/info/'+this.$store.getters.retrieveId">Информация </router-link>
      <router-link  class="nav-item nav-link active" :to="'/health-status/'+this.$store.getters.retrieveId">Здравно осигуряване  </router-link>
      <router-link  class="nav-item nav-link active" :to="'/grade/'+this.$store.getters.retrieveId">Заверки и оценки</router-link>
      <router-link  class="nav-item nav-link active" :to="'/sport/'+this.$store.getters.retrieveId">Спорт</router-link>
      <router-link  class="nav-item nav-link active" :to="'/scholarship/'+this.$store.getters.retrieveId">Стипендии</router-link>
      <router-link  class="nav-item nav-link active" :to="'/dorm/'+this.$store.getters.retrieveId">Общежития</router-link>
    </div>
  </div>
</nav>
      </div>
      
    </div>
</template>
<script lang="ts">
export default{
    name:'Navigation',
    data(){
        return{

        }
    },

}

</script>