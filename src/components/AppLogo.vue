<template>
  <router-link :to="{name: 'Home'}" class="logo">
    <img src="../assets/images/logo.svg" alt="Logo">
    <span class="logo__text">WeatherCheck</span>
  </router-link>
</template>
<script>
export default ({
  name: 'AppLogo',
})
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  &__text {
    margin-left: 12px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
  }
}
</style>