<template>
  <div class="screen">
    <div class="screen-inner"
    :style="{
      width: `${
          (((height / Math.sqrt(cardsContext.length) - 16) * 3) / 4 + 16) * Math.sqrt(cardsContext.length)
        }px`,
    }">
      <card-flip
          v-for="(card, index) in cardsContext"
          :key="index"
          :ref="`card-${index}`"
          :imgBackFaceUrl="`images/${card}.png`"
          :card="{index, value: card}"
          :numberCardInRow="numberCardsInRow"
          @onFlip="checkRule($event)" />
    </div>
    
  </div>
</template>

<script>

import CardFlip from './CardFlip.vue'

export default {
  name: 'InteractScreen',
  components: {
    CardFlip
  },
  props: {
    cardsContext: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    checkRule(rule) {

      this.rules.push(rule);
      if (this.rules.length === 2 && this.rules[0].value === this.rules[1].value) {

        (this.$refs[`card-${this.rules[0].index}`])[0].onDisableCard();
        (this.$refs[`card-${this.rules[1].index}`])[0].onDisableCard();

        this.rules = [];

        const disabledElements = document.querySelectorAll(
          ".screen .card.disabled"
        );
        
        if (disabledElements && disabledElements.length === this.cardsContext.length - 2)
          setTimeout(() => {
            this.$emit("onFinish");
          }, 920);

      } else if (this.rules.length === 2 && this.rules[0].value !== this.rules[1].value) {
         setTimeout(() => {

          (this.$refs[`card-${this.rules[0].index}`])[0].onFlipBackCard();
          (this.$refs[`card-${this.rules[1].index}`])[0].onFlipBackCard();

          this.rules = [];

         }, 800);
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      height : window.innerHeight - 80 - 16 * 2,
      numberCardsInRow: Math.sqrt(this.cardsContext.length),
      rules: [],
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--dark);
  color: var(--light);
}

.screen-inner {
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
}
</style>
