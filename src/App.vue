<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default ({
  name: 'App',
  methods: {
    init() {
      let favoritesFromLS = JSON.parse(localStorage.getItem('favorites'));
      if (favoritesFromLS !== null && favoritesFromLS.length > 0) {
        this.$store.commit('loadFavoriteCitiesFromLS', favoritesFromLS)
      } else {
        localStorage.setItem('favorites', JSON.stringify(this.$store.getters.getFavoriteCities))
      }
    }
  },
  beforeMount() {
    this.init()
  }
})
</script>


<style lang="scss">
// Global styles
@import url(../src/assets/fonts/SFProDisplay/stylesheet.css);
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'SF Pro Display';
}

a {
  text-decoration: none;
  color: inherit;
}

input, 
button,
textarea {
  outline: none;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  padding: 0 34px;
}

@media screen and (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
}
</style>
