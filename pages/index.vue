<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      cubeAppName: '',
      cubeAppPath: '',
      cubeAppCommand: [],
      nRubik: null,
      clockType: 'digital',
      animationTime: null
    }
  },
  methods: {
    async pseudoRubikscubeSolve() {
      this.cubeAppName = 'pseudoRubiksCubeSolve';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'pseudoRubiksCube/'+ this.cubeAppName + '.ts';

      this.cubeAppCommand = [this.cubeAppPath];
      if (this.nRubik) {
        this.cubeAppCommand.push('--nRubik');
        this.cubeAppCommand.push(this.nRubik);
        this.cubeAppCommand.push('--nStep');
        this.cubeAppCommand.push(25);
      }

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });
      
    },
    async smartClock() {
      await this.$axios.post('/smartClock', {
        'clockType': this.clockType,
        'animationTime': this.animationTime
      });
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
    <h1>Hexaturion version 0.11</h1>
    <!-- <span id="theTime"></span> -->
    <button @click="pseudoRubikscubeSolve">Start Rubik's cube pseudosolve</button><br>
    <br>

    <span> TEST nRubik: {{ nRubik }}</span><br> 
    <div>Rubik's cube dimension:
     <select v-model="nRubik">
       <option disabled :value="null">dimension</option>
       <option :value="1">1x1</option>
       <option :value="2">2x2</option>
       <option :value="3">3x3</option>
       <option :value="4">4x4</option>
       <option :value="5">5x5</option>
       <option :value="6">6x6</option>
       <option :value="7">7x7</option>
       <option :value="8">8x8</option>
       <option :value="9">9x9</option>
     </select>
    </div>

    <h3>_______________</h3>
    <button :disabled="!clockType" @click="smartClock">Start clock</button><br>
    <br>
    <div>TEST clockType: {{ clockType }}</div>
    <div>type:
      <input type="radio" id="'digital'" value="digital" v-model="clockType" />
      <label for="digital">digital</label>
    
      <input type="radio" id="word" value="word" v-model="clockType" />
      <label for="word">word</label>
    </div>

    <span> TEST animationTime: {{ animationTime }}</span><br> 
    Animation every:
     <select v-model="animationTime" :disabled="(clockType!='word')">
       <option :value="null">no animation</option>
       <option :value="1">1 minute</option>
       <option :value="5">5 minutes</option>
       <option :value="15">15 minutes</option>
       <option :value="60">60 minutes</option>
     </select>

     <h3>_______________</h3>
    <button @click="stop">Stop</button>
  </div>

</template>