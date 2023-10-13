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


<template>
  <div>
    <h1>Hexaturion</h1>
    
    <button @click="rubiks">Start rubiks</button><br>
    <br>

    <span> nRubik: {{ nRubik }}</span><br> 
    <br>

    <div>nRubik:

     <select v-model="nRubik">
       <option disabled value="">Please select one</option>
       <option>2</option>
       <option>3</option>
       <option>4</option>
       </select>
    </div>
    <h3>_______________</h3>
    <button @click="clock">Start clock</button>
    <h3>_______________</h3>
    <button @click="stop">Stop</button>
  </div>
</template>
