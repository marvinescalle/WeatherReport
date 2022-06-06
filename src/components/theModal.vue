<template>
  <div @click="closeModal" class="theModal" ref="theModal">
      <div class="theModal-wrap" ref="theModalWrap">
          <label for="city-name">Entrez le nom d'un lieu:</label>
          <input type="text" name="city-name" placeholder="Chercher avec le nom d'une ville" v-model="city">
          <button @click="addCity">Ajouter</button>
      </div>
  </div>
</template>

<script>
import axios from "axios"
import db from "../firebase/firebaseinit"

export default {
    name: "theModal",
    props: ["APIkey", "cities"],
    data() {
        return {
            city: "",
        };
    },
    methods: {
        closeModal(e) {
            if(e.target === this.$refs.modal)  {
                this.$emit("close-modal");
            }
        },
        async addCity() {
            if (this.city === "") {
                alert("Ce champ ne peut pas être vide !");
            } else if (this.cities.some((res) => res.city === this.city.toLowerCase() )) {
                alert(`${this.city} existe déjà !`);
            } else {
                try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${this.APIkey}`
                );
                const data = await res.data;
                db.collection("cities")
                .doc()
                .set({
                    city: this.city.toLowerCase(),
                    currentWeather: data,
                })
                .then(() => {
                    this.$emit("close-modal");
                });

                } catch {
                    alert(`${this.city} n'existe pas, essayez à nouveau !`);
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>

.theModal { 
    z-index: 101;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
        color: #fff;
    }

    .theModal-wrap {
        max-width: 500px;
        border-radius: 8px;
        width: 80%;
        padding: 20px;
        background-color: #31363d;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        input {
        
            color: #fff;
            border: none;
            background-color: transparent;
            border-bottom: 1px solid #fff;
            padding: 6px 4px;
            margin: 10px 0 20px;
            width: 100%;
    
            &:focus {
                outline: none;
            }
        }

        button {
            background-color: #222325;
            color: #fff;
            padding: 6px 20px;
            border-radius: 8px;
            border: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
    }
}
</style>