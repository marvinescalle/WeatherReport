<template>
  <div class="main">
    <theModal 
      v-if="theModalOpen" 
      v-on:close-modal="toggleModal" 
      :APIkey="APIkey" 
      :cities="cities"
    />
    <theNavigationBar 
      v-on:add-city="toggleModal" 
      :addCityActive="addCityActive"
      :isDay="isDay"
      :isNight="isNight"
    />
    <router-view 
      :isDay="isDay"
      :isNight="isNight"
      v-bind:cities="cities" 
      :APIkey="APIkey" 
      v-on:is-day="dayTime" 
      v-on:is-night="nightTime"
      v-on:resetDays="resetDays"
    />
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebaseinit";
import theNavigationBar from "./components/theNavigationBar";
import theModal from "./components/theModal";

export default{
  name: "App",
  components: {
    theNavigationBar,
    theModal,
  },
  data(){
    return {
      isDay: null,
      isNight: null,
      APIkey:"286092748372df8926fe9e286d766793" ,
      cities: [] ,
      theModalOpen: null,
      edit: null,
      addCityActive: null,
    };
  },
  // Permet le fonctionnement de la page
  created() {
    this.getCityWeather();
    this.checkRoute();
  },
  methods: {

    // Permet d'afficher les villes et leur température
    getCityWeather() {
      let firebaseDB = db.collection("cities");

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          console.log(doc.type);
          console.log(doc);
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              const response = await axios.get( 
                `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metric&APPID=${
                  this.APIkey
                }`
              );
              const data = response.data;
              firebaseDB
              .doc(doc.doc.id)
              .update({
                currentWeather: data,
              })
              .then(() => {
                this.cities.push(doc.doc.data());
              })
            } catch(err) {
              console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          }else if (doc.type === "removed") {
            this.cities = this.cities.filter(city => city.city !== doc.doc.data().city)
          }
        });
      });
    },

    // Permet d'ouvrir le bouton d'ajout de ville
    toggleModal () {
      this.theModalOpen = !this.theModalOpen;
    },

    // Ajouter une ville
    checkRoute() {
      if(this.$route.name === "AddCity") {
        this.addCityActive = true;
      }else{
        this.addCityActive = false;
      }
          console.log(this.addCityActive);
    },

    // Permet de savoir s'il fait jour ou nuit
    dayTime() {
      this.isDay = !this.isDay;
    },
    nightTime() {
      this.isNight = !this.isNight;
    },
    resetDays() {
      this.isDay = false;
      this.isNight = false;
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Quicksand", sans-serif;
  }

  .day {
    transition: 500ms ease all;
    background-color: rgb(59, 150, 249);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

}

.night {
    transition: 500ms ease all;
    background-color: rgb(20, 42, 95);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

}

  .main {
    max-width: 1024px;
    margin: 0 auto; 
    height: 100vh;

    .container {
      padding: 0 20px;
    }
  }
</style>  


  // getCurrentWeather() {
  //   axios
  //     .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&APPID=${this.APIkey}`)
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  //   },