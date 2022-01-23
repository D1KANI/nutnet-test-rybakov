import Vue from 'vue'
import Vuex from 'vuex'
import Clear from '../assets/images/weather/clear.svg'
import Clouds from '../assets/images/weather/clouds.svg'
import Drizzle from '../assets/images/weather/drizzle.svg'
import Dust from '../assets/images/weather/dust_sand_ash.svg'
import Mist from '../assets/images/weather/mist_smoke_haze_fog.svg'
import Rain from '../assets/images/weather/rain.svg'
import Snow from '../assets/images/weather/snow.svg'
import Squall from '../assets/images/weather/squall.svg'
import Thunderstorm from '../assets/images/weather/thunderstorm.svg'
import Tornado from '../assets/images/weather/tornado.svg'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '079175a29ab85e93356d17745c7b3e8b',
    apiKeyDadata: '27f51563c7beff093ce2d54bc450e0978dbf5c6e',
    apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
    apiUrlDadata: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
    location: 'ru',
    favoriteCities: ['Москва', 'Ижевск', 'Санкт-Петербург', 'Тольятти', 'Нью-Йорк'],
    images: {
      'Clear': Clear,
      'Drizzle': Drizzle,
      'Clouds': Clouds,
      'Dust': Dust,
      'Mist': Mist,
      'Rain': Rain,
      'Snow': Snow,
      'Squall': Squall,
      'Thunderstorm': Thunderstorm,
      'Tornado': Tornado,
    }
  },
  getters: {
    getApiKey: state => {
      return state.apiKey;
    },
    getApiKeyDadata: state => {
      return state.apiKeyDadata;
    },
    getApiUrl: state => {
      return state.apiUrl;
    },
    getApiUrlDadata: state => {
      return state.apiUrlDadata;
    },
    getlocation: state => {
      return state.location;
    },
    getFavoriteCities: state => {
      return state.favoriteCities;
    },
    getFavoriteCitiesLength: state => {
      return state.favoriteCities.length;
    },
    getImagesList: state => {
      return state.images
    },
    getImageByName: (state) => (name) => {
      return state.images[name]
    }
  },
  mutations: {
    addToFavoriteCities(state, payload) {
      state.favoriteCities.push(payload);
      state.favoriteCities = state.favoriteCities.sort();
    },
    removeFromFavoriteCities(state, payload) {
      let indexOfPayload = state.favoriteCities.indexOf(payload);
      if (indexOfPayload !== -1) {
        state.favoriteCities.splice(indexOfPayload, 1);
      }
    },
  },
  actions: {
    addToFavoriteCities({commit}) {
      commit('addToFavoriteCities');
    },
    removeFromFavoriteCities({commit}) {
      commit('removeFromFavoriteCities');
    }
  }
})
