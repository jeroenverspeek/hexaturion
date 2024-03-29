<script setup>
const nRubik = ref(3);
const pattern = ref('solved');
const rollOfJoy = ref(false);
const nSteps = ref(20);

const loading = ref(false);
const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

let imageDir = '/images/';


const patternImage = computed(() => {
  return `${imageDir}${nRubik.value}x${nRubik.value}/${pattern.value}.${nRubik.value}x${nRubik.value}.png`;
});


const solveCubeAppCommand = computed(() => {
  // build command and command line options;
  const command = ['ts-node', appSrcDir + 'rubiksCube/scrambeSolveRubiksCube.ts'];
  command.push('--solve');
  if (nRubik) {
    command.push('--nRubik');
    command.push(nRubik.value);
  }
  if (rollOfJoy.value) {
    command.push('--rollOfJoy');
  }
  return command;
});


const scrambleCubeAppCommand = computed(() => {
  // build command and command line options;
  const command = ['ts-node', appSrcDir + 'rubiksCube/scrambleSolveRubiksCube.ts'];
  if (nRubik) {
    command.push('--nRubik');
    command.push(nRubik.value);
  }
  command.push('--nMoves');
  command.push(nSteps.value);
  if (rollOfJoy.value) {
    command.push('--rollOfJoy');
  }
  return command;
});


const patternCubeAppCommand = computed(() => {
  // build command and command line options;
  const command = ['ts-node', appSrcDir + 'rubiksCube/showRubiksCubePattern.ts'];
  if (nRubik) {
    command.push('--nRubik');
    command.push(nRubik.value);
  }
  if (pattern) {
    command.push('--pattern');
    command.push(pattern.value);
  }
  if (rollOfJoy.value) {
    command.push('--rollOfJoy');
  }
  return command;
});


const pseudoSolveCubeAppCommand = computed(() => {
  // build command and command line options;
  const command = ['ts-node', appSrcDir + 'pseudoRubiksCube/pseudoSolveRubiksCube.ts'];
  if (nRubik) {
    command.push('--nRubik');
    command.push(nRubik.value);
  }
  if (nSteps) {
    command.push('--nSteps');
    command.push(nSteps.value);
  }
  return command;
});

async function solveRubiksCube() {
  loading.value = true;
  // build command and command line options;
  const response = await start(solveCubeAppCommand.value)
  console.log(response.data)

  loading.value = false;
}


async function scrambleRubiksCube() {
  loading.value = true;
  // build command and command line options;
  const response = await start(scrambleCubeAppCommand.value)
  console.log(response.data)

  loading.value = false;
}


async function showRubiksCubePattern() {
  loading.value = true;
  // build command and command line options;
  const response = await start(patternCubeAppCommand.value)
  console.log(response.data)

  loading.value = false;
}


async function pseudoSolveRubiksCube() {
  loading.value = true;
  // build command and command line options;
  const response = await start(pseudoSolveCubeAppCommand.value)
  console.log(response.data)

  loading.value = false;
}


</script>

<template>
  <div>
    <div class="field">
      <select v-model="nRubik" @change="onChange(pattern='solved')" >
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

    <div class="field">
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
  
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" id="rollOfJoy" v-model="rollOfJoy">
        Roll of joy 
      </label>
    </div>
  </div>

  <div>
      <img :src="`${patternImage}`" alt="image not found" width="300px" height="300px" />
  </div>

  Number of steps: <input type="number" v-model="nSteps" :min="1"><br><br>
  
  <!--
  <span> TEST pattern: {{ pattern }}</span><br>
  <span> TEST patternImage: {{ patternImage }}</span><br>
  <div style="word-break: break-all;">{{ solveCubeAppCommand }}</div>
  <div style="word-break: break-all;">{{ scrambleCubeAppCommand }}</div>
  <div style="word-break: break-all;">{{ patternCubeAppCommand }}</div>
  <div style="word-break: break-all;">{{ pseudoSolveCubeAppCommand }}</div>
  -->
  <div class="field is-grouped">
    <p class="control">
      <button @click="solveRubiksCube" class="button is-primary"
        :class="{ 'is-loading': loading }">Solve</button>
    </p>
    <p class="control">
      <button @click="scrambleRubiksCube" class="button is-primary"
        :class="{ 'is-loading': loading }">Scramble</button>
    </p>
    <p class="control">
      <button @click="showRubiksCubePattern" class="button is-primary"
        :class="{ 'is-loading': loading }">Pattern</button>
    </p>
    <p class="control">
      <button @click="pseudoSolveRubiksCube" class="button is-primary"
        :class="{ 'is-loading': loading }">PseudoSolve</button>
    </p>
    <p class="control">
      <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
    </p>
  </div>
</template>