<template>
  <section class="home-cities" id="home-cities">
    <div class="home-cities__flex">
      <div class="home-cities__item"
        v-for="(item, index) in getFavoriteCities"
        :key="index">
        <AppHomeFavoriteCity :name="item"/>
      </div>
    </div>
  </section>
</template>
<script>
import AppHomeFavoriteCity from '@/components/AppHomeFavoriteCity.vue'
import {mapGetters} from 'vuex'
export default ({
  name: 'AppHomeFavoriteCities',
  components: {
    AppHomeFavoriteCity
  },
  computed: {
    ...mapGetters(['getFavoriteCities'])
  }
})
</script>
<style lang="scss" scoped>
  .home-cities {
    width: 872px;
    max-width: 100%;
    margin: 0 auto;
    &__flex {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: wrap;
      margin: 55px -16px 0;
    }
    &__item {
      margin: 0 16px 30px;
      width: calc(100% / 3 - 32px);
    }
  }
  @media screen and ( max-width: 960px) {
    .home-cities {
      &__flex {
        margin: 32px -9px 0;
      }
      &__item {
        margin: 0 9px 30px;
        width: calc(100% / 2 - 18px);
      }
    }
  }
</style>