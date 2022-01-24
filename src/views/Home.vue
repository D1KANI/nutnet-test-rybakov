<template>
  <div class="home">
    <app-header></app-header>
    <main class="main">
      <div class="container">
        <div class="home-body">
          <div class="home-body__search">
            <AppSearch/>
          </div>
          <component :is="activeComponent"></component>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AppHeader from '@/components/AppHeader.vue';
import AppSearch from '@/components/AppSearch.vue';
import AppHomeEmptyFavorite from '@/components/AppHomeEmptyFavorite.vue';
import AppHomeFavoriteCities from '@/components/AppHomeFavoriteCities.vue';
export default {
  name: 'Home',
  components: {
    AppHeader,
    AppSearch,
    AppHomeEmptyFavorite,
    AppHomeFavoriteCities
  },
  computed: {
    ...mapGetters(['getFavoriteCitiesLength']),
    activeComponent() {
      if (this.getFavoriteCitiesLength === 0) {
        return 'AppHomeEmptyFavorite'
      } else {
        return 'AppHomeFavoriteCities'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.home {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #161B30;
  &-body {
    padding-top: 80px;
    &__search {
      width: 510px;
      max-width: 100%;
      margin: 0 auto;
    }
  }
}

@media screen and (max-width: 560px) {
  .home {
    &-body {
      padding-top: 20px;
    }
  }
}

</style>
