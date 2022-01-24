<template>
  <div class="search">
    <div class="search__inner">
      <input
        @input="searchCity($event.target.value)"
        @keyup.enter.prevent
        :value="inputCity"
        type="text"
        class="search__input"
        placeholder="Укажите город"
      />
      <transition name="fade">
        <div class="search-result" v-if="results.length > 0">
          <router-link
            v-for="(item, index) in results"
            :key="index"
            :to="`/city/${item}`"
            class="search-result__item"
            >{{ item }}</router-link
          >
        </div>
      </transition>
    </div>
    <div
      v-if="!getFavoriteCitiesLength > 0"
      class="search-example">
      Начните вводить город, например,
      <router-link :to="`/city/Ижевск`" class="search-example__link"
        >Ижевск</router-link
      >
      <div class="search-example__image">
        <svg
          v-svg
          symbol="arrow"
          size="0 0 38 32"
        ></svg>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "AppSearch",
  data() {
    return {
      results: [],
      inputCity: "",
    };
  },
  computed: {
    ...mapGetters(["getApiKeyDadata", "getApiUrlDadata", "getFavoriteCitiesLength"]),
  },
  methods: {
    searchCity(e) {
      this.inputCity = e
      if (this.inputCity.length >= 3) {
        let requestCityList = setTimeout(() => {
          axios
            .post(
              this.getApiUrlDadata,
              {
                query: this.inputCity,
                count: 5,
                from_bound: { value: "city" },
                to_bound: { value: "city" },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: "Token " + this.getApiKeyDadata,
                },
              }
            )
            .then((response) => {
              this.results = response.data.suggestions.map(
                (item) => item.data.city
              );
              clearTimeout(requestCityList);
            })
            .catch((error) => {
              console.error(error);
              clearTimeout(requestCityList);
            });
        }, 200);
      } else {
        this.results = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  position: relative;
  &__inner {
    position: relative;
  }
  &__input {
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 18px 20px 19px;
    background: #2a2f45;
    border-radius: 2px;
    border: none;
    font-family: "SF Pro Display";
    font-size: 16px;
    line-height: 19px;
    color: #fff;
    &::placeholder {
      color: #8a91ab;
    }
  }
  &-result {
    background-color: #30354b;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    width: 100%;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -3px);
    &__item {
      display: block;
      width: 100%;
      padding: 20px;
      color: #fff;
    }
  }
  &-example {
    position: relative;
    width: 175px;
    margin: 44px auto 0;
    color: #8a91ab;
    text-align: center;
    &__link {
      color: #fff;
      border-bottom: 1px dashed #fff;
    }
    &__image {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(calc(-100% - 4px), -50%);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>


