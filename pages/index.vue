<script>
const appDir = '/home/pi/led-hexahedron/apps/';
const appSrcDir = appDir + 'src/';
//const pictureBaseDir = appDir + 'cube_pictures/'
const hZellerDir = '/home/pi/rpi-rgb-led-matrix/';
// led-cube specific options
// no leading or trailing spaces allowed:
const cubeOptions = ['--led-rows', '64',
                        '--led-cols', '64',
                        '--led-chain', '2',
                        '--led-parallel', '3',
                        '--led-slowdown-gpio', '3'
                    ];
let imageDir = '/images/';
//import testImage from '../images/2x2/cubeInAcube.2x2.png';

export default {
  name: 'IndexPage',
  computed: { // preload all images in images folder
      //images () {
        //const path = require.context('../images', 
        //                             true, 
        //                             /\.png$/)
        //return path.keys().map(path)
      //},
      now() {
        return Date.now(); 
      },
    },
  data() {
    return {
      cubeAppName: '',
      cubeAppPath: '',
      cubeAppCommand: [],
      cubePictureDir: 'emoji',
      nRubik: 3,
      pattern: '',
      patternImage:'/images/3x3/solved.3x3.png',
      rollOfJoy: false,
      clockType: 'digital',
      animationInterval: null,
      celestialBody: 'earth',
      rotate: false,
      finalMessage: null,
      tickerSymbols: '',
      tickerSymbolsLimit: 3,
      movie: '',
      animatedGif: '',
      demoNumber: 10, 
      //dirName: '',
      //testImage
    }
  },
  
  //mounted() {
  //  this.importAll(require.context(imageDir, true, /\.png$/));
  //},

  watch: {
    // whenever pattern changes, this function will run
    nRubik(){
      this.patternImage = `${imageDir}${this.nRubik}x${this.nRubik}/solved.${this.nRubik}x${this.nRubik}.png`;
      //alert(this.patternImage);
    },
    pattern(rubikPattern){
      this.patternImage = `${imageDir}${this.nRubik}x${this.nRubik}/${rubikPattern}.${this.nRubik}x${this.nRubik}.png`;
      //const imgUrl = new URL('./img.png', import.meta.url).href // vite instead of webpack
      //this.patternImage = getImageUrl(this.patternImage)
      //this.patternImage = getImgUrl(this.patternImage)
      //alert('patterImage: ' + this.patternImage);
    },

  },

  methods: {

    async getDirectory(){
      if(!window.showDirectoryPicker){
        alert('Unsupported Browser Notice');
        return;
      }
      //const verify = confirm('Ask user to confirm');
      //if(!verify) return 'File picker canceled.';
      const dirHandle = await window.showDirectoryPicker();
      this.dirName = dirHandle.name;
      alert(this.dirName)
      return this.dirName;
    },
    //getImageUrl(name) {
    //  return new URL(`${name}`, import.meta.url).href
    //},
    //getImgUrl(pic) {
    //return require(pic)
    //},
    //importAll(r) {
    //  r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key })));
    //},
    async pseudoRubiksCubeSolve() {
      this.cubeAppName = 'pseudoRubiksCubeSolve';
      this.cubeAppPath = appSrcDir + 'pseudoRubiksCube/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      if (this.nRubik) {
        this.cubeAppCommand.push('--nRubik');
        this.cubeAppCommand.push(this.nRubik);
        this.cubeAppCommand.push('--nSteps');
        this.cubeAppCommand.push(25);
      }
    },

    async showRubiksCubePattern() {
      this.cubeAppName = 'showRubiksCubePattern';
      this.cubeAppPath = appSrcDir + 'rubiksCube/' + this.cubeAppName + '.ts';
      
      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
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

    async scrambleRubiksCube() {
      this.cubeAppName = 'scrambleSolveRubiksCube';
      this.cubeAppPath = appSrcDir + 'rubiksCube/' + this.cubeAppName + '.ts';
      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      if (this.nRubik) {
        this.cubeAppCommand.push('--nRubik');
        this.cubeAppCommand.push(this.nRubik);
      }
      this.cubeAppCommand.push('--nMoves');
      this.cubeAppCommand.push(this.nRubik * 2);
      if (this.rollOfJoy) {
        this.cubeAppCommand.push('--rollOfJoy');
      }
    },

    async solveRubiksCube() {
      this.cubeAppName = 'scrambleSolveRubiksCube';
      this.cubeAppPath = appSrcDir + 'rubiksCube/' + this.cubeAppName + '.ts';
      
      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      this.cubeAppCommand.push('--solve');
      if (this.nRubik) {
        this.cubeAppCommand.push('--nRubik');
        this.cubeAppCommand.push(this.nRubik);
      }
      this.cubeAppCommand.push('--nMoves');
      //nMoves = this.nRubik * 2
      this.cubeAppCommand.push(this.nRubik * 2);
      if (this.rollOfJoy) {
        this.cubeAppCommand.push('--rollOfJoy');
      }
    },

    async smartClock() {
      this.cubeAppName = 'smartClock';
      this.cubeAppPath = appSrcDir + 'smartClock/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      this.cubeAppCommand.push('--clockType');
        this.cubeAppCommand.push(this.clockType);
      if (this.animationInterval) {
        this.cubeAppCommand.push('--animationInterval');
        this.cubeAppCommand.push(this.animationInterval);
      }
    },

    async showFireworks() {
      this.cubeAppName = 'showFireworks';
      this.cubeAppPath = appSrcDir + 'fireworks/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      //this.cubeAppCommand.push('--showTime');
      //this.cubeAppCommand.push(15000);
    },

    async showCubePictures() {
      this.cubeAppName = 'showCubePictures';
      this.cubeAppPath = appSrcDir + 'cubePictures/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      if (this.cubePictureDir) {
        this.cubeAppCommand.push('--cubePictureDir');
        this.cubeAppCommand.push(this.cubePictureDir);
      }
      this.cubeAppCommand.push('--showTime');
      this.cubeAppCommand.push(20);
    },

    async loopCubePictures() {
      this.cubeAppName = 'led-image-viewer';
      this.cubeAppPath = hZellerDir + 'utils/' + this.cubeAppName;

      // add command and command line options;
      this.cubeAppCommand = ['sudo', this.cubeAppPath, ...cubeOptions, '-f', '-w3', '-s'];
      if (this.cubePictureDir) {
        this.cubeAppCommand.push(appDir + 'cube_pictures/' + this.cubePictureDir + '/*.png');
      }
    },


    async showCubemap() {
      this.cubeAppName = 'showCubemap';
      this.cubeAppPath = appSrcDir + 'cubemap/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      //this.cubeAppCommand.push('-d');
      //this.cubeAppCommand.push('/home/pi/led-hexahedron/apps/cube_maps/3x2/');
      //this.cubeAppCommand.push('-i');
      this.cubeAppCommand.push('atlas1_CUBE.png');
    },

    async showCubeLatlonmap() {
      this.cubeAppName = 'showCubeLatlonmap';
      this.cubeAppPath = appSrcDir + 'cubeLatlonmap/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      //this.cubeAppCommand.push('-d');
      //this.cubeAppCommand.push('/home/pi/led-hexahedron/apps/cube_latlon_maps/');
      if (this.celestialBody) {
        this.cubeAppCommand.push('-i');
        this.cubeAppCommand.push(this.celestialBody);
      }
      if (this.rotate) {
        this.cubeAppCommand.push('--rotate');
      }
    },

    async showStockMarketQuotes() {
      this.cubeAppName = 'showStockMarketQuotes';
      this.cubeAppPath = appSrcDir + 'stockMarketQuotes/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      if (this.tickerSymbols) {
        this.cubeAppCommand.push('--tickerSymbols');
        this.cubeAppCommand.push(this.tickerSymbols);
      }
    },

    async slidingPuzzleSolve() {
      this.cubeAppName = 'slidingPuzzleSolve';
      this.cubeAppPath = appSrcDir + 'rubiksQube/'+ this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
    },

    async sprinkle() {
      this.cubeAppName = 'showSprinkle';
      this.cubeAppPath = appSrcDir + 'sprinkle/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
    },

    async sparkle() {
      this.cubeAppName = 'showSparkle';
      this.cubeAppPath = appSrcDir + 'sparkle/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
    },

    async videoViewer() {
      this.cubeAppName = 'video-viewer';
      this.cubeAppPath = hZellerDir + 'utils/' + this.cubeAppName;

      // add command and command line options;
      //this.cubeAppCommand = [this.cubeAppPath];
      //this.cubeAppCommand.push.apply(this.cubeAppCommand, cubeOptions);
      this.cubeAppCommand = [this.cubeAppPath, ...cubeOptions];
      this.cubeAppCommand.push(this.movie);
      //this.cubeAppCommand.push('apps/videos/trippy2.mp4'); // use relative path
    },

    async gifViewer() {
      this.cubeAppName = 'led-image-viewer';
      this.cubeAppPath = hZellerDir + 'utils/' + this.cubeAppName;

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath, ...cubeOptions];
      this.cubeAppCommand.push(this.animatedGif);
      //this.cubeAppCommand.push('apps/animated_gifs/squares.gif'); // use relative path
    },

    async ledDemo() {
      this.cubeAppName = 'demo';
      this.cubeAppPath = hZellerDir + 'examples-api-use/' + this.cubeAppName;

      // add command and command line options;
      this.cubeAppCommand = [this.cubeAppPath, ...cubeOptions];
      this.cubeAppCommand.push('-D');
      this.cubeAppCommand.push(this.demoNumber);
    },

    async welcome() {
      this.cubeAppName = 'welcome';
      this.cubeAppPath = appSrcDir + 'sprites/' + this.cubeAppName + '.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
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
    },
  }
}
</script>

<style scoped>
</style>

<template>
  <div>
    <h1>Hexaturion version 0.20 now:{{ now }}</h1>

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
    <button @click="showCubePictures">Cube pictures</button>
    <button @click="loopCubePictures">Cube pictures slide show</button><br><br>
    
    <span> TEST cubePictureDir: {{ cubePictureDir }}</span><br>
    Pictures:
     <select v-model="cubePictureDir">
       <option value="family">family</option>
       <option value="chess_set">chess</option>
       <option value="emoji">emoji's</option>
       <option value="flag">flags</option>
       <option value="borg">borg</option>
     </select>

     <!--
    <div class="file">
      <input type="file"  webkitdirectory = "true" directory :name="uploadFieldName"
        class="input-file">
    </div>
    <br>
    <br>
    <form>
     <input type="file" id="file-upload"  webkitdirectory mozdirectory msdirectory odirectory directory />
     <label for="file-upload">Upload file</label>
     <div id="file-upload-filename"></div>
    </form>
    -->
    
    <!--
    <button @click="getDirectory">get directory {{ dirName }}</button>
    <span> TEST dirName: {{ dirName }}</span><br>
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
       <option value="3">3x3</option>
       <option value="4">4x4</option>
       <option value="5">5x5</option>
       <option value="6">6x6</option>
       <option value="7">7x7</option>
       <option value="8">8x8</option>
       <option value="9">9x9</option>
     </select>
    </div>

    <span> TEST nRubik: {{ nRubik }}</span><br>
    <!--<span>{{ images }}</span><br>-->
    <button @click="pseudoRubiksCubeSolve">pseudosolve</button>
    <button @click="scrambleRubiksCube">scramble</button>
    <button @click="solveRubiksCube">solve</button>
    <button @click="showRubiksCubePattern">pattern</button>
    <br>

    <span> TEST pattern: {{ pattern }}</span><br>
    <span> TEST patternImage: {{ patternImage }}</span><br>

    <div>Patterns:
     <select v-model="pattern" size="5" v-if="(nRubik==1)">
      <option value="wholeCubeMoves">whole cube moves</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==2)">
       <option value="wholeCubeMoves">whole cube moves</option>
       <option value="checkerboard">checkerboard</option>
       <option value="cubex2">cubex2</option>
       <option value="fourColumns">4 columns</option>
       <option value="fourSideCheckerboard">4 side checkerboard</option>
       <option value="pillar">pillar</option>
       <option value="spiral">spiral</option>
       <option value="zigzag">zigzag</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==3)">
       <option value="wholeCubeMoves">whole cube moves</option>
       <option value="anaconda">anaconda</option>
       <option value="checkerboard">checkerboard</option>
       <option value="cross">cross</option>
       <option value="cubex2">cubex2</option>
       <option value="cubex3">cubex3</option>
       <option value="dots">dots</option>
       <option value="fourSpots">four spots</option>
       <option value="greenMamba">green mamba</option>
       <option value="lines">lines</option>
       <option value="linesOnFourSides">lines on 4 sides</option>
       <option value="plusminus">plusminus</option>
       <option value="sixColourCubex3">6 colour cubex3</option>
       <option value="sixSpots">six spots</option>
       <option value="smiley">( ! ) (ˆ⌣ˆԅ)</option>
       <option value="superflip">superflip</option>
       <option value="twist">twist</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==4)">
      <option value="wholeCubeMoves">whole cube moves</option>
      <option value="checkerboardFourSides">checkerboardFourSides</option>
      <option value="columns">columns</option>
      <option value="cornerWrapper">corner wrapper</option>
      <option value="cubex2">cubex2</option>
      <option value="cubex3">cubex3</option>
      <option value="cubex4">cubex4</option>
      <option value="displacedMotif">displaced motif</option>
      <option value="dots">dots</option>
      <option value="linesOnSixSides">lines on six sides</option>
      <option value="oppositeBoxes">opposite boxes</option>
      <option value="python">python</option>
      <option value="sixColourPeak">6 colour peak</option>
      <option value="smallBoxBigBox">small box big box</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==5)">
       <option value="wholeCubeMoves">whole cube moves</option>
       <option value="checkerboard">checkerboard</option>
       <option value="cubex3">cubex3</option>
       <option value="flippedEdges">flipped edges</option>
       <option value="plusminus">plusminus</option>
       <option value="sixSpots">six spots</option>
       <option value="triCheckerboard">tri-checkerboard</option>
       <option value="twinPeaks">twin peaks</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==6)">
       <option value="wholeCubeMoves">whole cube moves</option>
       <option value="fourDots">4 dots</option>
       <option value="plusminus">plusminus</option>
       <option value="twister">twister</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==7)">
       <option value="wholeCubeMoves">whole cube moves</option>
       <option value="checkerboard">checkerboard</option>
       <option value="crossChecker">crossChecker</option>
       <option value="plusminus">plusminus</option>
       <option value="triCheckerboard">triCheckerboard</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==8)">
       <option value="wholeCubeMoves">whole cube moves</option>
       <option value="anaconda">anaconda</option>
       <option value="plusminus">plusminus</option>
     </select>

     <select v-model="pattern" size="5" v-if="(nRubik==9)">
       <option value="wholeCubeMoves">whole cube moves</option>
       <option value="cubex9">cubex9</option>
       <option value="plusminus">plusminus</option>
       <option value="sixSpots">sixSpots</option>
     </select>

    </div>

    <div>
      <input type="checkbox" id="rollOfJoy" v-model="rollOfJoy">
      <label for="checkbox">Roll of joy</label>
    </div>

    
    <div>
    <!--  <img src="../images/3x3-dots-300x227.png" alt="image not found" width="300" height="227">
  <img :src="require(`~/assets/img/${image}.png`)" />
    -->
    <span> TEST patternImage: {{ patternImage }}</span><br>
    <!--<span> TEST testImage: {{ testImage }}</span><br>-->
        <!--<img :src="patternImage" alt="image not found" width="300" height="227">-->
        <!--<img :src="require(`${patternImage}`)" alt="image not found" width="300" height="227">-->
        <img :src="`${patternImage}`" alt="image not found" width="300px" height="300px"/>
        <!--<img v-bind:src="testImage" alt="image not found" width="300" height="227"/>-->
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
    
     <div>
      <input type="checkbox" id="rotate" v-model="rotate">
      <label for="checkbox">rotate</label>
    </div>


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
    <button @click="videoViewer">Video viewer</button>
    <span> TEST movie: {{ movie }}</span><br>
    Movie:
     <select v-model="movie" >
      <option value="apps/videos/rotto.mp4">rotto</option>
      <option value="apps/videos/space.mp4">space</option>
      <option value="apps/videos/trippy1.mp4">trippy1</option>
      <option value="apps/videos/trippy2.mp4">trippy2</option>
     </select>

     <h3>_______________</h3>
    <button @click="gifViewer">Animated gif viewer</button>
    <span> TEST animatedGif: {{ animatedGif }}</span><br>
    animated gifs:
     <select v-model="animatedGif" >
      <option value="apps/animated_gifs/birthday_animated_gif/happy-birthday.gif">happy birthday</option>
      <option value="apps/animated_gifs/fruit.gif">fruit</option>
      <option value="apps/animated_gifs/galaxy.gif">galaxy</option>
      <option value="apps/animated_gifs/globe.gif">globe</option>
      <option value="apps/animated_gifs/pingpong.gif">pingpong</option>
      <option value="apps/animated_gifs/psychedelic-kotdwara.gif">psychedelic</option>
      <option value="apps/animated_gifs/space.gif">space</option>
      <option value="apps/animated_gifs/spinning_colors.gif">spinning colors</option>
      <option value="apps/animated_gifs/squares.gif">squares</option>
      <option value="apps/animated_gifs/thingy.gif">thingy</option>
      <option value="apps/animated_gifs/tumblr_a5fa375fa82ae7f2d505069080ffa807_cf9380bd_500.gif">tumbler</option>
      <option value="apps/animated_gifs/tunnel.gif">tunnel</option>
      <option value="apps/animated_gifs/wolfenstein.gif">Wolfenstein</option>
     </select>

     <h3>_______________</h3>
     <button @click="ledDemo">Demo</button>
     <span> TEST demoNumber: {{ demoNumber }}</span><br>
     <div>Demo:
     <select v-model="demoNumber">
       <option value="0">rotating square</option>
       <!--<option value="1">forward scrolling an image</option>-->
       <!--<option value="2">backward scrolling an image</option>-->
       <!--<option value="3">square</option>-->
       <option value="4">Pulsing color</option>
       <option value="5">Grayscale Block</option>
       <option value="6">Abelian sandpile model</option>
       <option value="7">Conway's game of life</option>
       <option value="8">Langton's ant</option>
       <option value="9">Volume bars</option>
       <option value="10">Evolution of color</option>
       <option value="11">Brightness pulse generator</option>
     </select>
    </div>



    <h3>_______________</h3>
    <button @click="welcome">Welcome</button>

    <!--<p>TEST Message: {{ finalMessage }}</p> -->
    <div>Enter final message: <input v-model="finalMessage" maxlength=16 placeholder="WELKOM!">
    </div>

    <h3>_______________</h3>
    <button @click="sprinkle">Sprinkle</button>    <button @click="sparkle">Sparkle</button>
    <h3>_______________</h3>

    <br><span> cubeAppCommand: {{ this.cubeAppCommand }}</span><br><br>
    <button @click="start">Start</button> 
    <button @click="stop">Stop</button>
  </div>

</template>
