<template>
    <p class="copyright">
    This game owned by HPT in Vue 3
  </p>
</template>

<script>
export default {
  name: 'CopyRightScreen',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.copyright {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1.5rem;
  color: var(--light);
  z-index: 3;
  font-size: 1.5rem;
}
</style>