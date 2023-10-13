<template>
  <h1>Hexaturion Cube Commander!</h1>
  <div>
    <h2>Rubikscube pseudosolve</h2>
    <button @click="rubiks">Start rubiks</button>
    nRubik: {{ nRubik }}
    <select v-model="nRubik">
      <option disabled value="">nRubik</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>
    <button @click="stop">Stop</button>
  <div>
  </div>
    <h2>smart clock</h2>
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
