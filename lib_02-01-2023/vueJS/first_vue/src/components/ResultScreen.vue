<template>
    <div class="screen">
      <p> {{ Math.round(timer/1000) }} seconds
      </p>
      <button @click="onStartAgain()">Start again</button>
    </div>
</template>

<script>
export default {
  name: 'ResultScreen',
  props: {
    timer: {
      type: Number,
      required: true,
    }
  },
  methods: {
    onStartAgain() {
      this.$emit('onStartAgain');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
