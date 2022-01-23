<template>
  <router-link class="city" :to="{ name: 'Home' }">
    <div class="city__name">{{ weather.name }}</div>
    <div class="city__temperature">
      <span>{{ weather.temperature }}</span
      >°
    </div>
    <div class="city__image-wrapper">
      <img :src="weather.image" alt="weather" class="city__image" />
    </div>
  </router-link>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "AppHomeFavoriteCity",
  props: {
    name: String,
  },
  data() {
    return {
      weather: {
        name: this.name,
        temperature: "",
        image: '',
      },
    };
  },
  computed: {
    ...mapGetters(["getApiKey", "getApiUrl", "getlocation", "getImageByName"]),
  },
  beforeMount() {
     axios
      .get(
        this.getApiUrl,
        {
          params: {
            q: this.weather.name,
            lang: this.getlocation,
            units: 'metric',
            appid: this.getApiKey
          }
        }
      )
      .then(result => {
        return result.data
      })
      .then(data => {
        this.weather.temperature = Math.round(data.main.temp);
        this.weather.image = this.getImageByName(data.weather[0].main);
      })
      .catch((error) => console.error(error));
  },
};
</script>
<style lang="scss" scoped>
.city {
  display: block;
  width: 100%;
  background: rgba(41, 46, 68, 0.5);
  padding: 23px 0 16px;
  border-radius: 6px;
  &__name {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 1.1;
    color: #fff;
    text-align: center;
  }
  &__temperature {
    margin-bottom: 2px;
    font-weight: 500;
    font-size: 40px;
    color: #fff;
    text-align: center;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    &-wrapper {
      width: 78px;
      height: 78px;
      margin: 0 auto;
    }
  }
}
</style>
