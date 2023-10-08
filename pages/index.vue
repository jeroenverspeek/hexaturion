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
      await this.$axios.get('http://192.168.1.136:3000/');
    },
    async stop () {
      await this.$axios.get('http://192.168.1.136:3000/stop');
    }
  }
}
</script>

<style scoped>

</style>
