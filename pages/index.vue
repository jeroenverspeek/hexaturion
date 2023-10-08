<template>
  <div>
    <h1>Hexaturion</h1>
    <button @click="rubiks">Start rubiks</button>
    <button @click="stop">Stop</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    async rubiks() {
      await this.$axios.get('/start');
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
