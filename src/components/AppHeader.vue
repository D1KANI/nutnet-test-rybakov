<template>
  <header class="header">
    <app-logo></app-logo>
  </header>
</template>
<script>
import AppLogo from '@/components/AppLogo.vue'
export default ({
  name: 'AppHeader',
  components: {
    AppLogo
  }
})
</script>
<style lang="scss" scoped>
  .header {
    height: 65px;
    display: flex;
    align-items: center;
    padding: 0 23px;
    background-color: #2A2F45;
  }
  @media screen and (max-width: 560px) {
    .header {
      background-color: #161B30;
    }
  }
</style>
