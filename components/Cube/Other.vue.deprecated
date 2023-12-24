<script lang="ts">
const { appDir, appSrcDir, hZellerDir, cubeOptions } = useConfig();
let imageDir = '/images/';

export default {
  name: 'IndexPage',
  computed: {
  },
  data() {
    return {
      cubeAppName: '',
      cubeAppPath: '',
      cubeAppCommand: [],
      nRubik: 3,
      pattern: '',
      patternImage: '/images/3x3/solved.3x3.png',
      rollOfJoy: false,
      solver: 'reversedPath',
      heuristic: 'taxiCube3D',
    }
  },

  //mounted() {
  //  this.importAll(require.context(imageDir, true, /\.png$/));
  //},

  watch: {
    // whenever pattern changes, this function will run
    nRubik() {
      this.patternImage = `${imageDir}${this.nRubik}x${this.nRubik}/solved.${this.nRubik}x${this.nRubik}.png`;
      //alert(this.patternImage);
    },
    pattern(rubikPattern) {
      this.patternImage = `${imageDir}${this.nRubik}x${this.nRubik}/${rubikPattern}.${this.nRubik}x${this.nRubik}.png`;
      //const imgUrl = new URL('./img.png', import.meta.url).href // vite instead of webpack
      //this.patternImage = getImageUrl(this.patternImage)
      //this.patternImage = getImgUrl(this.patternImage)
      //alert('patterImage: ' + this.patternImage);
    },

  },

  methods: {

    async getDirectory() {
      if (!window.showDirectoryPicker) {
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
      this.cubeAppPath = appSrcDir + 'pseudoRubiksCube/pseudoRubiksCubeSolve.ts';

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
      this.cubeAppPath = appSrcDir + 'rubiksCube/showRubiksCubePattern.ts';

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
      this.cubeAppPath = appSrcDir + 'rubiksCube/scrambleSolveRubiksCube.ts';
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
      this.cubeAppPath = appSrcDir + 'rubiksCube/scrambleSolveRubiksCube.ts';

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

    async slidingPuzzleSolve() {
      this.cubeAppPath = appSrcDir + 'rubiksQube/slidingPuzzleSolve.ts';

      // add command and command line options;
      this.cubeAppCommand = ['ts-node', this.cubeAppPath];
      this.cubeAppCommand.push('--nRubik');
      this.cubeAppCommand.push(this.nRubik);
      this.cubeAppCommand.push('--nSlides');
      this.cubeAppCommand.push(10);
      this.cubeAppCommand.push('--solver');
      this.cubeAppCommand.push(this.solver);
      this.cubeAppCommand.push('--heuristic');
      this.cubeAppCommand.push(this.heuristic);
    },


    async start() {
      const response = await this.$axios.post('/start', {
        'cubeAppCommand': this.cubeAppCommand
      });
      console.log(response.data)
    },

    async stop() {
      const response = await this.$axios.get('/stop');
      console.log(response.data)
    },
  }
}
</script>

<style scoped></style>

<template>
  <div>

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

    <span> TEST nRubik: {{ nRubik }}</span><br>
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

    <!--<span>{{ images }}</span><br>-->
    <button @click="pseudoRubiksCubeSolve">pseudosolve</button>
    <button @click="scrambleRubiksCube">scramble</button>
    <button @click="solveRubiksCube">solve</button>
    <button @click="showRubiksCubePattern">pattern</button>
    <br>

    <span> TEST pattern: {{ pattern }}</span><br>
    <span> TEST patternImage: {{ patternImage }}</span><br>

    <div>Patterns:
      <select v-model="pattern" size="5" v-if="(nRubik == 1)">
        <option value="wholeCubeMoves">whole cube moves</option>
      </select>

      <select v-model="pattern" size="5" v-if="(nRubik == 2)">
        <option value="wholeCubeMoves">whole cube moves</option>
        <option value="checkerboard">checkerboard</option>
        <option value="cubex2">cubex2</option>
        <option value="fourColumns">4 columns</option>
        <option value="fourSideCheckerboard">4 side checkerboard</option>
        <option value="pillar">pillar</option>
        <option value="spiral">spiral</option>
        <option value="zigzag">zigzag</option>
      </select>

      <select v-model="pattern" size="5" v-if="(nRubik == 3)">
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

      <select v-model="pattern" size="5" v-if="(nRubik == 4)">
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

      <select v-model="pattern" size="5" v-if="(nRubik == 5)">
        <option value="wholeCubeMoves">whole cube moves</option>
        <option value="checkerboard">checkerboard</option>
        <option value="cubex3">cubex3</option>
        <option value="flippedEdges">flipped edges</option>
        <option value="plusminus">plusminus</option>
        <option value="sixSpots">six spots</option>
        <option value="triCheckerboard">tri-checkerboard</option>
        <option value="twinPeaks">twin peaks</option>
      </select>

      <select v-model="pattern" size="5" v-if="(nRubik == 6)">
        <option value="wholeCubeMoves">whole cube moves</option>
        <option value="fourDots">4 dots</option>
        <option value="plusminus">plusminus</option>
        <option value="twister">twister</option>
      </select>

      <select v-model="pattern" size="5" v-if="(nRubik == 7)">
        <option value="wholeCubeMoves">whole cube moves</option>
        <option value="checkerboard">checkerboard</option>
        <option value="crossChecker">crossChecker</option>
        <option value="plusminus">plusminus</option>
        <option value="triCheckerboard">triCheckerboard</option>
      </select>

      <select v-model="pattern" size="5" v-if="(nRubik == 8)">
        <option value="wholeCubeMoves">whole cube moves</option>
        <option value="anaconda">anaconda</option>
        <option value="plusminus">plusminus</option>
      </select>

      <select v-model="pattern" size="5" v-if="(nRubik == 9)">
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
      <img :src="`${patternImage}`" alt="image not found" width="300px" height="300px" />
      <!--<img v-bind:src="testImage" alt="image not found" width="300" height="227"/>-->
    </div>

    <h3>_______________</h3>
    <button @click="slidingPuzzleSolve">sliding puzzle</button>

    <span> TEST solver: {{ solver }}</span><br>
    <div>Solver:
      <select v-model="solver">
        <option value="reversedPath">reversed path</option>
        <option value="a*">a* shortest path</option>
        <option value="best-first">best first</option>
      </select>
    </div>

    <span> TEST heuristic: {{ heuristic }}</span><br>
    <div>Heuristic:
      <select v-model="heuristic">
        <option value="taxiCube3D">taxicube</option>
        <option value="taxiCubeReduced3D">taxicube reduced</option>
      </select>
    </div>


    <br><span> cubeAppCommand: {{ this.cubeAppCommand }}</span><br><br>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
  </div>
</template>
