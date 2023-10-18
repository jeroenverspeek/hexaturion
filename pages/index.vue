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
      animationInterval: null
    }
  },
  methods: {
    async pseudoRubiksCubeSolve() {
      this.cubeAppName = 'pseudoRubiksCubeSolve';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'pseudoRubiksCube/'+ this.cubeAppName + '.ts';

      this.cubeAppCommand = [this.cubeAppPath];
      if (this.nRubik) {
        this.cubeAppCommand.push('--nRubik');
        this.cubeAppCommand.push(this.nRubik);
        this.cubeAppCommand.push('--nSteps');
        this.cubeAppCommand.push(25);
      }

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });
      
    },

    async showRubiksCube() {
      this.cubeAppName = 'showRubiksCube';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'rubiksCube/'+ this.cubeAppName + '.ts';

      // add command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      this.cubeAppCommand.push('--moveSequence');
      this.cubeAppCommand.push("");
      //this.cubeAppCommand.push("R F U' R2 U F' R U F2 R2");

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });

    },

    async smartClock() {
      this.cubeAppName = 'smartClock';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'smartClock/'+ this.cubeAppName + '.ts';

      this.cubeAppCommand = [this.cubeAppPath];
      this.cubeAppCommand.push('--clockType');
        this.cubeAppCommand.push(this.clockType);
      if (this.animationInterval) {
        this.cubeAppCommand.push('--animationInterval');
        this.cubeAppCommand.push(this.animationInterval);
      }

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });

      //await this.$axios.post('/smartClock', {
      //  'clockType': this.clockType,
      //  'animationInterval': this.animationInterval
      //});
    },

    async showFireworks() {
      this.cubeAppName = 'showFireworks';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'fireworks/'+ this.cubeAppName + '.ts';

      // add command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      this.cubeAppCommand.push('--showTime');
      this.cubeAppCommand.push(15);

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });

    },

    async showCubeIcons() {
      this.cubeAppName = 'showCubeIcons';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'cubeIcons/'+ this.cubeAppName + '.ts';

      // add command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      this.cubeAppCommand.push('--cube_icon_dir');
      this.cubeAppCommand.push('/home/pi/led-hexahedron/apps/cube_icons/family/');
      this.cubeAppCommand.push('--showTime');
      this.cubeAppCommand.push(15);
      
      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });

    },

    async showCubemap() {
      this.cubeAppName = 'showCubemap';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'cubemap/'+ this.cubeAppName + '.ts';

      // add command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      //this.cubeAppCommand.push('-d');
      //this.cubeAppCommand.push('/home/pi/led-hexahedron/apps/cube_maps/3x2/');
      //this.cubeAppCommand.push('-i');
      this.cubeAppCommand.push('atlas1_CUBE.png');

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });

    },

    async showCubeLatLonmap() {
      this.cubeAppName = 'showCubeLatLonmap';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'cubeLatLonmap/'+ this.cubeAppName + '.ts';

      // add command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      //this.cubeAppCommand.push('-d');
      //this.cubeAppCommand.push('/home/pi/led-hexahedron/apps/cube_latlon_maps/');
      this.cubeAppCommand.push('-i');
      this.cubeAppCommand.push('earth.jpg');
      //this.cubeAppCommand.push('moon.jpg');
      //this.cubeAppCommand.push('sun.jpg');
      //this.cubeAppCommand.push('mercury.jpg');
      //this.cubeAppCommand.push('venus.jpg');
      //this.cubeAppCommand.push('mars.jpg');
      //this.cubeAppCommand.push('jupiter.jpg');
      //this.cubeAppCommand.push('blackhole.jpg');

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });

    },

    async showStockMarketQuotes() {
      this.cubeAppName = 'showStockMarketQuotes';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'stockMarketQuotes/'+ this.cubeAppName + '.ts';

      // add command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      this.cubeAppCommand.push('--tickerSymbols');
      this.cubeAppCommand.push("['ASML.AS', 'MSFT', 'AAPL']");

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });
    },

    async slidingPuzzleSolve() {
      this.cubeAppName = 'slidingPuzzleSolve';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'rubiksQube/'+ this.cubeAppName + '.ts';

      // add command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      this.cubeAppCommand.push('--nSlides');
      this.cubeAppCommand.push('23');

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
      });
    },

    async welcome() {
      this.cubeAppName = 'welcome';
      this.cubeAppRoute = '/'+this.cubeAppName;
      let appSrcDir = '/home/pi/led-hexahedron/apps/src/';
      this.cubeAppPath = appSrcDir + 'sprites/'+ this.cubeAppName + '.ts';

      // add command line options;
      this.cubeAppCommand = [this.cubeAppPath];
      this.cubeAppCommand.push('--finalMessage');
      this.cubeAppCommand.push('!!!WELKOM!!!');

      // test code:
      alert('this.cubeAppCommand: ' + this.cubeAppCommand);

      await this.$axios.post(this.cubeAppRoute, {
        'cubeAppCommand': this.cubeAppCommand
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
    <h1>Hexaturion version 0.15</h1>
    <!-- <span id="theTime"></span> -->
    <button @click="pseudoRubiksCubeSolve">Start Rubik's cube pseudosolve</button><br>
    <br>

    <span> TEST nRubik: {{ nRubik }}</span><br>
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
    <button :disabled="!clockType" @click="smartClock">Start clock</button><br>
    <br>
    <div>TEST clockType: {{ clockType }}</div>
    <div>type:
      <input type="radio" id="'digital'" value="digital" v-model="clockType" />
      <label for="digital">digital</label>
    
      <input type="radio" id="word" value="word" v-model="clockType" />
      <label for="word">word</label>
    </div>

    <span> TEST animationInterval: {{ animationInterval }}</span><br>
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
    <button @click="showFireworks">Show fireworks</button><br>
    <br>

    <h3>_______________</h3>
    <button @click="showCubeIcons">Show cube icons</button><br>
    <br>

    <h3>_______________</h3>
    <button @click="showCubemap">Show cube map</button><br>
    <br>

    <h3>_______________</h3>
    <button @click="showFireworks">Show fireworks</button><br>
    <br>

    <h3>_______________</h3>
    <button @click="showRubiksCube">Show Rubiks cube</button><br>
    <br>

    <h3>_______________</h3>
    <button @click="cubeLatLonmap">Show selestial body</button><br>
    <br>

    <h3>_______________</h3>
    <button @click="showStockMarketQuotes">Show stock marktet quotes</button><br>
    <br>

    <h3>_______________</h3>
    <button @click="slidingPuzzleSolve">Solve sliding puzzle</button><br>
    <br>

    <h3>_______________</h3>
    <button @click="welcome">Welcome</button><br>
    <br>

    <h3>_______________</h3>
    <button @click="stop">Stop</button>
  </div>

</template>