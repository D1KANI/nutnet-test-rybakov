<template>
  <section class="home-empty" id="home-empty">
    <p class="home-empty__text">
      Используйте значок «закладки», чтобы закрепить город на главной
    </p>
    <svg
      v-svg
      symbol="bookmark"
      size="0 0 40 40"
      class="home-empty__image"
    ></svg>
  </section>
</template>
<script>
export default {
  name: "AppHomeEmptyFavorite",
};
</script>
<style lang="scss" scoped>
.home-empty {
  width: 244px;
  max-width: 100%;
  margin: 88px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  line-height: 19px;
  color: #8A91AB;
  &__text {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }
  &__image {
    width: 40px;
    height: 40px;
  }
}
</style>