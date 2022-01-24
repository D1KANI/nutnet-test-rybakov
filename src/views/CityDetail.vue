<template>
  <div class="city-detail">
    <app-header v-if="!isMobile"></app-header>
    <main class="main">
      <div class="container">
        
        <div class="city-detail__head">
          <router-link :to="{ name: 'Home' }" class="city-detail__back">Назад</router-link>
          <div @click="changeFavoriteStatus()" class="favorite">
            <svg
              v-if="!isFavorite"
              v-svg
              symbol="bookmark"
              size="0 0 24 24"
              class="favorite__image"
            ></svg>
            <svg
              v-else
              v-svg
              symbol="bookmarkUse"
              size="0 0 24 24"
              class="favorite__image"
            ></svg>
          </div>
        </div>
        <div class="city-detail__content">
          <div class="city-detail__name">{{ weather.name }}</div>
          <div class="city-detail__desc">{{ weather.description }}</div>
          <div class="city-detail__flex">
          <div class="city-detail__temp"><span>{{ weather.temperature }}</span>°</div>
          <div class="city-detail__image-wrapper">
            <img :src="this.weather.image" alt="" class="city-detail__image">
          </div>
          </div>
          <div class="city-detail__pressure">
            <svg
              v-svg
              symbol="barometer"
              size="0 0 24 24"
            ></svg>
            <span>{{ weather.pressure }} мм рт. ст.</span>
          </div>
          <div class="city-detail__sunset">Закат в {{ weather.sunsetTime }}</div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import AppHeader from "@/components/AppHeader.vue";
export default {
  name: "CityDetail",
  components: {
    AppHeader,
  },
  data() {
    return {
      weather: {
        name: this.$route.params.city_name,
        description: "",
        temperature: "",
        pressure: "",
        sunsetTime: "",
        image: null,
      },
    };
  },
  computed: {
    ...mapGetters([
      "getApiKey",
      "getApiUrl",
      "getlocation",
      "getImageByName",
      "getFavoriteCities",
    ]),
    isFavorite() {
      if (this.getFavoriteCities.includes(this.weather.name)) {
        return true;
      } else {
        return false;
      }
    },
    isMobile() {
      let width = window.screen.width
      if (width < 768) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions(["addToFavoriteCities", "removeFromFavoriteCities"]),
    changeFavoriteStatus() {
      if (this.isFavorite) {
        this.removeFromFavoriteCities(this.weather.name)
      } else {
        this.addToFavoriteCities(this.weather.name)
      }
    }
  },
  beforeMount() {
    axios
      .get(this.getApiUrl, {
        params: {
          q: this.weather.name,
          lang: this.getlocation,
          units: "metric",
          appid: this.getApiKey,
        },
      })
      .then((result) => {
        return result.data;
      })
      .then((data) => {
        let unixTime = data.sys.sunset,
            date = new Date(unixTime * 1000),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            descriptionAsArray = data.weather[0].description
              .toLowerCase()
              .split('');
        this.weather.temperature = Math.round(data.main.temp);
        this.weather.image = this.getImageByName(data.weather[0].main);
        this.weather.pressure = Math.round(data.main.pressure * 0.75006);
        this.weather.sunsetTime = `${hours}:${minutes}`;
        descriptionAsArray[0] = descriptionAsArray[0].toUpperCase();
        this.weather.description = descriptionAsArray.join("");
      })
      .catch((error) => console.error(error));
  },
};
</script>
<style lang="scss" scoped>
$gray: #8A91AB;
.city-detail {
  flex-grow: 1;
  background: radial-gradient(80.36% 80.36% at 50% 0%, #5A607C 0%, #161B30 100%);
  display: flex;
  flex-direction: column;
  .container, .main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  &__head {
    display: flex;
    justify-content: space-between;
    margin: 24px 0 28px;
  }
  &__back {
    padding-left: 36px;
    font-size: 16px;
    line-height: 1.1;
    color: $gray;
    position: relative;
      transition: color 175ms ease-out;
    &::before,
    &::after {
      content: "";
      display: block;
      height: 2px;
      width: 12px;
      background-color: $gray;
      position: absolute;
      left: 7px;
      top: 50%;
      transition: background-color 175ms ease-out;
    }
    &::before {
      transform: translateY(calc(-50% - 8px)) rotate(-45deg);
    }
    &::after {
      transform: translateY(calc(-50%)) rotate(45deg);
    }
    &:hover {
      color: #fff;
      &::before,
      &::after {
        background-color: #fff;
      }
    }
  }
  &__content {
    padding-bottom: 50px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__name {
    margin-bottom: 16px;
    text-align: center;
    font-weight: 500;
    font-size: 56px;
    color: #fff;
    line-height: 1.1;
  }
  &__desc {
    margin-bottom: 16px;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
  &__flex {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
  }
  &__temp {
    font-weight: 600;
    font-size: 130px;
    line-height: 1.1;
    background: -webkit-linear-gradient(#fff, rgba(255, 255, 255, 0));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &__image {
    display: block;
    width: 100%;
    height: auto;
    &-wrapper {
      width: 191px;
      height: 191px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__pressure {
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
    }
    span {
      margin-left: 8px;
      color: #fff;
      font-size: 16px;
      line-height: 19px;
    }
  }
  &__sunset {
    text-align: center;
    font-size: 16px;
    line-height: 1.1;
    color: $gray;
  }
}

@media screen and (max-width: 590px) {
  .city-detail {
    &__name {
      font-size: 24px;
    }
    &__desc {
      font-size: 14px;
    }
    &__flex {
      flex-direction: column;
      margin-bottom: 16px;
    }
    &__temp {
      font-size: 120px;
    }
  }
}

.favorite {
  cursor: pointer;
  &__image {
    width: 24px;
    height: 24px;
  }
}
</style>