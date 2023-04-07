<template>
    <div class="card" :class="{disabled : isDisabled }"
    :style="{
      height: `${(height / numberCardInRow - 16)}px`,
      width: `${((height / numberCardInRow - 16) * 3) / 4}px`,
      perspective: `${((height / numberCardInRow - 16) * 3) / 4 * 2}px`,
    }"
    >
      <div class="card_inner" :class="{'is-flipped' : isFlipped}" @click="onToggleFlipCard()">
        <div class="card_face card_face_front">
          <div class="card_content" :style="{
            'background-size': `${
              ((height / numberCardInRow - 16) * 3) / 4 / 3
            }px ${
              ((height / numberCardInRow - 16) * 3) / 4 / 3
            }px`,
          }"></div>
        </div>
        <div class="card_face card_face_back">
          <div class="card_content"
          :style = "{
            backgroundImage: `url(${require('@/assets/' + imgBackFaceUrl)})`,
          }"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CardFlip',
  data() {
    return {
      isDisabled : false,
      isFlipped : false,
      height : window.innerHeight - 80 - 16 * 2,
    }
  },
  methods: {
    onToggleFlipCard() {
      if (this.isDisabled) return false; 
      this.isFlipped = !this.isFlipped;
      if (this.isFlipped) this.$emit("onFlip", this.card);
    },

    onFlipBackCard() {
      this.isFlipped = false;
    },

    onDisableCard() {
      this.isDisabled = true;
    }
  },
  props: {
    card: {
      type: [Object],
    },
    numberCardInRow : {
      type: Number,
      required: true,
    },
    imgBackFaceUrl: {
      type: String,
      required: true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  .card_inner {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
  }

  .card_inner.is-flipped {
    transform: rotateY(-180deg);
  }

  .card_face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);
  }

  .card_face_back {
    background-color: var(--light);
    transform: rotateY(-180deg);
  }

  .card_face_front .card_content {
    background: url("../assets/images/icon_back.png") no-repeat center center;
    background-size: 40px 40px;
    height: 100%;
    width: 100%;
  }

  .card_face_back .card_content {
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
  }
</style>
