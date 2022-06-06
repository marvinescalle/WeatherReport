<template>
<div>
    <header v-if="addCityActive" class="container add-city">
        <nav>
            <span>Weather Report</span>

            <!-- Bouttons Reload et Add -->
            <div class="right">
                <i @click="reloadApp" class="fas fa-sync"></i>
                <i @click="addCity" class="fas fa-plus"></i>
            </div>
        </nav>
    </header>
    <!-- Permet de changer la couleur du header en fonction de l'heure -->
    <header v-else class="container" :class="{ day: isDay, night: isNight }">
        <nav>
            <router-link class="router-link" :to="{ name: 'AddCity' }">
                <i class="fas fa-plus"></i>
            </router-link>

            <!-- Date actuelle en français -->
            <span>
                {{ new Date().toLocaleString("fr", { weekday: "long" }) }}
                {{ new Date().toLocaleString("fr", { day: "2-digit" }) }}
                {{ new Date().toLocaleString("fr", { month: "short" }) }}
            </span>
            <span>&deg; C</span>
        </nav>
    </header>
</div>

</template>

<script>
export default {
    name: "theNavigationBar",
    props: ["addCityActive", "isDay", "isNight"],
    methods: {
        addCity() {
            this.$emit('add-city');
        },
        reloadApp() {
            location.reload();
        },
    },
};
</script>

<style lang="scss" scoped>
.add-city{
    background: #313640; 
}

header {
      z-index: 99;
      position: fixed;
      max-width: 1024px;
      width: 100%;

    nav {
        display: flex;
        color: #fff;
        padding: 30px 0;
        justify-content: space-between;
    }

    .router-link {
        color: #fff
    }

    .right {
        i {
            font-size: 20px;
        }

        i:nth-child(2),
        i:nth-child(3) {
            margin-left: 16px;
        }
    }

    span {
        font-weight: 600;
    }
}

</style>