<template>
<main-screen v-if="statusGame === 'default'" @onStart="onChangeScreen($event)"></main-screen>
<interact-screen
  v-if="statusGame === 'inGame'"
  :cardsContext="setting.cardContent"
  @onFinish="onGetResult()"></interact-screen>
<result-screen v-if="statusGame === 'result'" :timer="timer" @onStartAgain="statusGame = 'default'"/>
<copy-right/>
</template>

<script>

import MainScreen from './components/MainScreen.vue'
import InteractScreen from './components/InteractScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import CopyRight from './components/CopyRightScreen.vue'

import {shuffled} from './utils/array.js'

export default {
  name: 'App',
  components: {
    MainScreen,
    InteractScreen,
    ResultScreen,
    CopyRight,
  },
  data() {
    return {
      setting : {
        totalOfBlock: 0,
        cardContent: [],
        startedAt: null, 
      },
      statusGame: 'default',
      timer: 0,
    }
  },
  methods: {
    onChangeScreen(config) {
      console.log('onChangeScreen');
      this.setting.totalOfBlock = config.blocks;

      const firstCards = Array.from(
        {length: this.setting.totalOfBlock / 2},
        (_, i) => i + 1,
      );

      const secondCards = [...firstCards];
      const cards = [...firstCards, ...secondCards];

      this.setting.cardContent = shuffled(shuffled(shuffled(cards)));

      this.setting.startedAt = new Date().getTime();

      this.statusGame = 'inGame';
    },
    onGetResult() {
      this.timer = new Date().getTime() - this.setting.startedAt;
      this.statusGame = "result";
    }
  }
}
</script>

<style>
</style>
