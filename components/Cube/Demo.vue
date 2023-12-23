<script setup>
const rotate = ref(false);
const demoNumber = ref(10);
//const tickerSymbols = ref(['AAPL']);
const loading = ref(false);
const { appSrcDir, hZellerDir } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommand = computed(() => {
  // build command and command line options;
  const cubeAppName = 'demo';
  const command = ['demo', hZellerDir + 'examples-api-use/' + cubeAppName];
  command.push('-D');
  command.push(demoNumber.value);
  return command;
});


async function ledDemo() {
  loading.value = true;
  // build command and command line options;
  const response = await start(cubeAppCommand.value)
  console.log(response.data)

  loading.value = false;
}

</script>

<template>
  <div>
    <div class="field">
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
    <div style="word-break: break-all;">{{ cubeAppCommand }}</div>
    <div class="field is-grouped">
      <p class="control">
        <button :disabled="!demoNumber" @click="ledDemo" class="button is-primary"
          :class="{ 'is-loading': loading }">Zeller demo</button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>