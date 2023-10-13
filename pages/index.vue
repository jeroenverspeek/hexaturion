<template>
  <h1>Hexaturion Cube Commander</h1>
  <div>
    <button @click="rubiks">Start rubiks</button>
    <button @click="stop">Stop</button>
    <button @click="clock">Start clock</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    async rubiks() {
      await this.$axios.get('/start');
    },
    async clock() {
      await this.$axios.get('/clock');
    },
    async stop () {
      const response = await this.$axios.get('/stop');
      console.log(response.data) 
    }
  }
}
</script>

<style scoped>

</style>
