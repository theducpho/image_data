<template>
<main-screen v-if="statusGame === 'default'" @onStart="onChangeScreen($event)"></main-screen>
<interact-screen v-if="statusGame === 'inGame'"></interact-screen>
</template>

<script>

import MainScreen from './components/MainScreen.vue'
import InteractScreen from './components/InteractScreen.vue'

export default {
  name: 'App',
  components: {
    MainScreen,
    InteractScreen
  },
  data() {
    return {
      statusGame: 'default', 
    }
  },
  methods: {
    onChangeScreen(config) {
      console.log(config);
      this.statusGame = 'inGame';
    }
  }
}
</script>

<style>
</style>
