<template>

    <RouterView />
    <Central/>

</template>

<script>
import Central from "./views/Central.vue";
export default {
  name: "App",
  components: {
    Central
  }
};
</script>

<style scoped>
</style>
