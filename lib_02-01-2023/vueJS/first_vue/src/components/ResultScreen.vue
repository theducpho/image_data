<template>
    <p> { Math.round(timer/1000) } seconds
    </p>
</template>

<script>
export default {
  name: 'ResultScreen',
  props: {
    timer: {
      type: Number,
      required: true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
