import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '079175a29ab85e93356d17745c7b3e8b',
    apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
    location: 'ru',
    favoriteCities: ['Москва', 'Ижевск', 'Санкт-Петербург', 'Тальятти'],
  },
  getters: {
    getApiKey: state => {
      return state.apiKey;
    },
    getApiUrl: state => {
      return state.apiUrl;
    },
    getlocation: state => {
      return state.location;
    },
    getFavoriteCities: state => {
      return state.favoriteCities;
    },
    getFavoriteCitiesLength: state => {
      return state.favoriteCities.length;
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
    }
  },
  actions: {
    addToFavoriteCities({commit}) {
      commit('addToFavoriteCities');
    },
    removeFromFavoriteCities({commit}) {
      commit('removeFromFavoriteCities');
    },
  }
})
