<template>
  <h1>Hexaturion</h1>
  <div>
    <button @click="rubiks">Start rubiks</button>

    <div>nRubik: {{ nRubik }}</div>
    <select v-model="nRubik">
      <option disabled value="">Dimension of Rubikscube</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
    </select>

    <button @click="stop">Stop</button>

  </div>
  <div>
    <button @click="clock">Start clock</button>
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
