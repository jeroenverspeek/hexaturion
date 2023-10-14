<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      nRubik: null,
    }
  },
  methods: {
    async rubiks() {
      await this.$axios.post('/start', {
        'nRubik': this.nRubik
      });
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
    
    <button :disabled="!nRubik" @click="rubiks">Start rubiks</button><br>
    <br>

    <span> nRubik: {{ nRubik }}</span><br> 
    <br>

    <div>nRubik:

     <select v-model="nRubik">
       <option disabled :value="null">Please select one</option>
       <option :value="2">2</option>
       <option :value="3">3</option>
       <option :value="4">4</option>
     </select>
    </div>
    <h3>_______________</h3>
    <button @click="clock">Start clock</button>
    <h3>_______________</h3>
    <button @click="stop">Stop</button>
  </div>
</template>
