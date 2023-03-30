<template>
    <div class="screen">
        <h1>POKE MEMORIES</h1>
        <h3>Selectmode to start game</h3>
        <div class="actions">
            <button @click="onStart(16)">
                <span>4x4</span>
                <span>Easy</span>
            </button>
            <button @click="onStart(36)">
                <span>6x6</span>
                <span>Normal</span>
            </button>
            <button @click="onStart(64)">
                <span>8x8</span>
                <span>Hard</span>
            </button>
            <button @click="onStart(100)">
                <span>10x10</span>
                <span>Super Hard</span>
            </button>
        </div>
        </div>
</template>

<script>
export default {
  name: 'MainScreen',
  methods : {
    onStart(blocks){
        this.$emit('onStart', {blocks});
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>