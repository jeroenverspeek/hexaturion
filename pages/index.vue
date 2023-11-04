<script>
let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
let imageDir = '/images/';

export default {
  name: 'IndexPage',

  data() {
    return {
      cubeAppName: '',
      cubeAppPath: '',
      cubeAppCommand: [],
      nRubik: null,
      pattern: '',
      patternImage:'.jpg',
      rollOfJoy: false,
      clockType: 'digital',
      animationInterval: null,
      celestialBody: 'earth',
      finalMessage: null,
      tickerSymbols: '',
      tickerSymbolsLimit: 3,
    }
  },

  watch: {
    // whenever pattern changes, this function will run
    pattern(rubikPattern){
      //this.patternImage = `${imageDir}${rubikPattern}${this.nRubik}x${this.nRubik}.jpg`;
      this.patternImage = `${rubikPattern}${this.nRubik}x${this.nRubik}.jpg`;
    },
  },

  methods: {

    async pseudoRubiksCubeSolve() {
      this.cubeAppName = 'pseudoRubiksCubeSolve';
      this.cubeAppPath = appSrcDir + 'pseudoRubiksCube/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      if (this.nRubik) {
        this.cubeAppCommand.push('--nRubik');
        this.cubeAppCommand.push(this.nRubik);
        this.cubeAppCommand.push('--nSteps');
        this.cubeAppCommand.push(25);
      }
    },

    async showRubiksCube() {
      this.cubeAppName = 'showRubiksCube';
      this.cubeAppPath = appSrcDir + 'rubiksCube/'+ this.cubeAppName + '.ts';
      
      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      if (this.nRubik) {
        this.cubeAppCommand.push('--nRubik');
        this.cubeAppCommand.push(this.nRubik);
      }
      //this.cubeAppCommand.push('--algorithm');
      //this.cubeAppCommand.push("R F U' R2 U F' R U F2 R2");
      if (this.pattern != '') {
        this.cubeAppCommand.push('--pattern');
        this.cubeAppCommand.push(this.pattern);
      }
      if (this.rollOfJoy) {
        this.cubeAppCommand.push('--rollOfJoy');
      }
    },

    async smartClock() {
      this.cubeAppName = 'smartClock';
      this.cubeAppPath = appSrcDir + 'smartClock/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      this.cubeAppCommand.push('--clockType');
        this.cubeAppCommand.push(this.clockType);
      if (this.animationInterval) {
        this.cubeAppCommand.push('--animationInterval');
        this.cubeAppCommand.push(this.animationInterval);
      }
    },

    async showFireworks() {
      this.cubeAppName = 'showFireworks';
      this.cubeAppPath = appSrcDir + 'fireworks/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      //this.cubeAppCommand.push('--showTime');
      //this.cubeAppCommand.push(15000);
    },

    async showCubeIcons() {
      this.cubeAppName = 'showCubeIcons';
      this.cubeAppPath = appSrcDir + 'cubeIcons/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      this.cubeAppCommand.push('--cube_icon_dir');
      this.cubeAppCommand.push('/home/pi/led-hexahedron/apps/cube_icons/family/');
      this.cubeAppCommand.push('--showTime');
      this.cubeAppCommand.push(15000);
    },

    async showCubemap() {
      this.cubeAppName = 'showCubemap';
      this.cubeAppPath = appSrcDir + 'cubemap/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      //this.cubeAppCommand.push('-d');
      //this.cubeAppCommand.push('/home/pi/led-hexahedron/apps/cube_maps/3x2/');
      //this.cubeAppCommand.push('-i');
      this.cubeAppCommand.push('atlas1_CUBE.png');
    },

    async showCubeLatlonmap() {
      this.cubeAppName = 'showCubeLatlonmap';
      this.cubeAppPath = appSrcDir + 'cubeLatlonmap/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      //this.cubeAppCommand.push('-d');
      //this.cubeAppCommand.push('/home/pi/led-hexahedron/apps/cube_latlon_maps/');
      if (this.celestialBody) {
        this.cubeAppCommand.push('-i');
        this.cubeAppCommand.push(this.celestialBody);
      }
    },

    async showStockMarketQuotes() {
      this.cubeAppName = 'showStockMarketQuotes';
      this.cubeAppPath = appSrcDir + 'stockMarketQuotes/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      if (this.tickerSymbols) {
        this.cubeAppCommand.push('--tickerSymbols');
        this.cubeAppCommand.push(this.tickerSymbols);
      }
    },

    async slidingPuzzleSolve() {
      this.cubeAppName = 'slidingPuzzleSolve';
      this.cubeAppPath = appSrcDir + 'rubiksQube/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
    },

    async sprinkle() {
      this.cubeAppName = 'showSprinkle';
      this.cubeAppPath = appSrcDir + 'sprinkle/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
    },

    async sparkle() {
      this.cubeAppName = 'showSparkle';
      this.cubeAppPath = appSrcDir + 'sparkle/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
    },

    async welcome() {
      this.cubeAppName = 'welcome';
      this.cubeAppPath = appSrcDir + 'sprites/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      if (this.finalMessage) {
        this.cubeAppCommand.push('--finalMessage');
        this.cubeAppCommand.push(this.finalMessage);
      }
    },

    async start () {
      const response = await this.$axios.post('/start', {
        'cubeAppCommand': this.cubeAppCommand
      });
      console.log(response.data)
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
    <h1>Hexaturion version 0.16</h1>

    <nuxt-link to="/about">About page</nuxt-link><br><br>

    <h3>_______________</h3>
    <button :disabled="!clockType" @click="smartClock">Clock</button>
    <br>
    <div>type:
      <input type="radio" id="'digital'" value="digital" v-model="clockType" />
      <label for="digital">digital</label>
    
      <input type="radio" id="word" value="word" v-model="clockType" />
      <label for="word">word</label>
    </div>

    <!-- <span> TEST animationInterval: {{ animationInterval }}</span><br> -->
    Animation every:
     <select v-model="animationInterval" :disabled="(clockType!='word')">
       <option value="null">no animation</option>
       <option value="1">1 minute</option>
       <option value="5">5 minutes</option>
       <option value="15">15 minutes</option>
       <option value="30">30 minutes</option>
       <option value="60">60 minutes</option>
     </select>

    <h3>_______________</h3>
    <button @click="showCubeIcons">Cube icons</button>
    
    <!--
    <div class="dropbox">
      <input type="file" :name="uploadFieldName"
        accept="*" class="input-file">
    </div>
    -->
    
    <h3>_______________</h3>
    <button @click="showCubemap">Cube map</button>

    <h3>_______________</h3>
    <button @click="showFireworks">Fireworks</button>

    <h3>_______________</h3>

    <div>Rubik's cube dimension:
     <select v-model="nRubik">
       <option value="1">1x1</option>
       <option value="2">2x2</option>
       <option value=null>3x3</option>
       <option value="4">4x4</option>
       <option value="5">5x5</option>
       <option value="6">6x6</option>
       <option value="7">7x7</option>
       <option value="8">8x8</option>
       <option value="9">9x9</option>
     </select>
    </div>

    <span> TEST nRubik: {{ nRubik }}</span><br>
    <!--
    <button @click="rubiksCubeScramble">scramble</button>
    <button @click="rubiksCubeSolve">solve</button>
    -->
    <button @click="pseudoRubiksCubeSolve">pseudosolve</button>
    <button @click="showRubiksCube">pattern</button>
    <br>

    <span> TEST pattern: {{ pattern }}</span><br>
    <span> TEST patternImage: {{ patternImage }}</span><br>

    <div>Patterns:
     <select v-model="pattern" size="5" v-if="(nRubik==1)">
       <option value="whole cube moves">whole cube moves</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==2)">
       <option value="four columns">4 columns</option>
       <option value="four side checkerboard">4 side checkerboard</option>
       <option value="anaconda">anaconda</option>
       <option value="zigzag">zigzag</option>
       <option value="cube in a cube">cube in a cube</option>
       <option value="checkerboard">checkerboard</option>
       <option value="pillar">pillar</option>
       <option value="spiral">spiral</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik=='null')">
       <option value="cube in a cube">cube in a cube</option>
       <option value="cube in a cube in a cube">cube in a cube in a cube</option>
       <option value="four spots">four spots</option>
       <option value="six spots">six spots</option>
       <option value="cross">cross</option>
       <option value="green mamba">green mamba</option>
       <option value="anaconda">anaconda</option>
       <option value="lines">lines</option>
       <option value="dots">dots</option>
       <option value="lines on 4 sides">lines on 4 sides</option>
       <option value="superflip">superflip</option>
       <option value="6 colour cube in a cube in a cube">6 colour cube in a cube in a cube</option>
       <option value="twist">twist</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==4)">
      <option value="columns">columns</option>
      <option value="checkerboard">checkerboard</option>
      <option value="6 colour peak">6 colour peak</option>
      <option value="stripes">stripes</option>
      <option value="cube in a cube v1">cube in a cube v1</option>
      <option value="cube in a cube v2">cube in a cube v2</option>
      <option value="dots">dots</option>
      <option value="6 colour cube in a cube">6 colour cube in a cube</option>
      <option value="small box big box">small box big box</option>
      <option value="corner wrapper">corner wrapper</option>
      <option value="3x3 in 4x4">3x3 in 4x4</option>
      <option value="opposite boxes">opposite boxes</option>
      <option value="rings">rings</option>
      <option value="four spots">four spots</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==5)">
       <option value="plusminus">plusminus</option>
       <option value="checkerboard">checkerboard</option>
       <option value="cube in a cube">cube in a cube</option>
       <option value="flipped egdes">flipped edges</option>
       <option value="tri-checkerboard">tri-checkerboard</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==6)">
       <option value="plusminus">plusminus</option>
       <option value="4 dots">4 dots</option>
       <option value="4 dots in anaconda">4 dots in anaconda</option>
       <option value="4 dots in checkerboard">4 dots in checkerboard</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==7)">
       <option value="plusminus">plusminus</option>
       <option value="tri-checker">tri-checker</option>
       <option value="cross checker">cross checker</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==8)">
       <option value="plusminus">plusminus</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==9)">
       <option value="plusminus">plusminus</option>
     </select>

    </div>

    <div>
      <input type="checkbox" id="rollOfJoy" v-model="rollOfJoy">
      <label for="checkbox">Roll of joy</label>
    </div>

    
    <div>
    <!--  <img src="../images/3x3-dots-300x227.jpg" alt="image not found" width="300" height="227">
          <img :src="imageDir + patternImage" alt="image not found" width="300" height="227">
  -->
          <span> TEST patternImage: {{ patternImage }}</span><br>
          <img v-bind:src="'/images/zigzag2x2.jpg'" alt="image not found" width="300" height="227"/>
    </div>
    
    
    <h3>_______________</h3>
    <button @click="showCubeLatlonmap">Celestial body</button>

    <br>
    <span> TEST celestialBody: {{ celestialBody }}</span><br>
    Celestial body:
     <select v-model="celestialBody" >
      <option value="earth.jpg">earth</option>
      <option value="sun.jpg">sun</option>
      <option value="moon.jpg">moon</option>
      <option value="mercury.jpg">mercury</option>
      <option value="venus.jpg">venus</option>
      <option value="mars.jpg">mars</option>
      <option value="jupiter.jpg">jupiter</option>
      <option value="blackhole.jpg">blackhole</option>
     </select>
    
    <h3>_______________</h3>
    <button @click="showStockMarketQuotes">Stock market quotes</button>

    <span> TEST tickerSymbols: {{ tickerSymbols }}</span><br>
    <select  v-model="tickerSymbols" :multiple="true" >
      <option value="ASML.AS">ASML.AS</option>
      <option value="SHELL.AS">SHELL.AS</option>
      <option value="GOOG">GOOG</option>
      <option value="MSFT">MSFT</option>
      <option value="AAPL">AAPL</option>
    </select>

    <h3>_______________</h3>
    <button @click="slidingPuzzleSolve">Sliding puzzle</button>

    <h3>_______________</h3>
    <button @click="welcome">Welcome</button>

    <!--<p>TEST Message: {{ finalMessage }}</p> -->
    <div>Enter final message: <input v-model="finalMessage" maxlength=16 placeholder="WELKOM!">
    </div>

    <h3>_______________</h3>
    <button @click="sprinkle">Sprinkle</button>    <button @click="sparkle">Sparkle</button>
    <h3>_______________</h3>

    <br><span> cubeAppCommand: {{ this.cubeAppCommand }}</span><br><br>
    <button @click="start">Start</button>      <button @click="stop">Stop</button>
  </div>

</template>
