<template>
  <n-message-provider>
    <n-modal-provider>
    <router-view />
  </n-modal-provider>
  </n-message-provider>
</template>
<script>
export default {
name: "App",
};
</script>
<style lang="scss">
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
</style>