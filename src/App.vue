<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

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

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
