<template>
  <div class="search">
    <div class="search__inner">
      <input @input="searchCity()" v-model="inputCity" type="text" class="search__input" placeholder="Укажите город">
    </div>
    <transition name="fade">
      <div class="search-result" v-if="results.length > 0">
        <router-link v-for="(item, index) in results" :key="index" :to="`/city/${item}`" class="search-result__item">{{ item }}</router-link>
      </div>
    </transition>
  </div>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default ({
  name: 'AppSearch',
  data() {
    return {
      results: [],
      inputCity: ''
    }
  },
  computed: {
    ...mapGetters(["getApiKeyDadata", "getApiUrlDadata"])
  },
  methods: {
    searchCity() {
      if (this.inputCity.length >= 3) {
        let requestCityList = setTimeout(() => {
          axios
            .post(
              this.getApiUrlDadata,
              {
                'query' : this.inputCity,
                'count': 5,
                "from_bound": { "value": "city" },
                "to_bound": { "value": "city" } 
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'Token ' + this.getApiKeyDadata
                } 
              }
            )
            .then(response => {
              this.results = response.data.suggestions.map(item => item.data.city);
              clearTimeout(requestCityList);
            })
            .catch(error => {
              console.error(error);
              clearTimeout(requestCityList);
            })
        }, 200)
      } else {
        this.results = [];
      }
    },
    shuffle: function () {
      this.results = _.shuffle(this.results)
    }
  }
})
</script>
<style lang="scss" scoped>
  .search {
    position: relative;
    &__input {
      width: 100%;
      padding: 18px 20px 19px;
      background: #2A2F45;
      border-radius: 2px;
      border: none;
      font-family: 'SF Pro Display';
      font-size: 16px;
      line-height: 19px;
      color: #fff;
      &::placeholder {
        color: #8A91AB;
      }
    }
    &-result {
      position: absolute;
      width: 100%;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -3px);
      &__item {
        display: block;
        width: 100%;
        background-color: #30354B;
        padding: 20px;
        color: #fff;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity 200ms;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


