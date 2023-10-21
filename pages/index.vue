<script>
let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
export default {
  name: 'IndexPage',
  data() {
    return {
      cubeAppName: '',
      cubeAppPath: '',
      cubeAppCommand: [],
      nRubik: null,
      clockType: 'digital',
      animationInterval: null,
      celestialBody: 'earth',
      finalMessage: null,
      tickerSymbols: '',
      tickerSymbolsLimit: 3,
    }
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
      this.cubeAppCommand.push('--moveSequence');
      this.cubeAppCommand.push("");
      //this.cubeAppCommand.push("R F U' R2 U F' R U F2 R2");
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
    <h1>Hexaturion version 0.15</h1>

    <nuxt-link to="/about">About page</nuxt-link><br><br>

    <button @click="pseudoRubiksCubeSolve">Rubiks cube pseudosolve</button>
    <br>

    <!-- <span> TEST nRubik: {{ nRubik }}</span><br> -->
    <div>Rubik's cube dimension:
     <select v-model="nRubik">
       <option :value="1">1x1</option>
       <option :value="2">2x2</option>
       <option :value=null>3x3</option>
       <option :value="4">4x4</option>
       <option :value="5">5x5</option>
       <option :value="6">6x6</option>
       <option :value="7">7x7</option>
       <option :value="8">8x8</option>
       <option :value="9">9x9</option>
     </select>
    </div>

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
       <option :value="null">no animation</option>
       <option :value="1">1 minute</option>
       <option :value="5">5 minutes</option>
       <option :value="15">15 minutes</option>
       <option :value="30">30 minutes</option>
       <option :value="60">60 minutes</option>
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
    <button @click="showRubiksCube">Rubiks cube</button>

    <h3>_______________</h3>
    <button @click="showCubeLatlonmap">Celestial body</button>

    <br>
    <!--<span> TEST celestialBody: {{ celestialBody }}</span><br> -->
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
