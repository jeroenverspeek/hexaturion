<script setup>
const rotate = ref(false);
const finalMessage = ref('WELKOM!');
//const tickerSymbols = ref(['AAPL']);
const loading = ref(false);
const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommand = computed(() => {
  // build command and command line options;
  const command = ['ts-node', appSrcDir + 'sprites/helloWorld.ts'];
  command.push('--finalMessage');
  command.push(finalMessage.value);
  return command;
});


async function helloWorld() {
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
      <label class="label">Final message to the world:</label>
      <div> <input v-model="finalMessage" maxlength=16 placeholder="WELKOM!">
      </div>
      <!-- <span> TEST language: {{ language }}</span><br> -->
    </div>
    <!--<div style="word-break: break-all;">{{ cubeAppCommand }}</div>-->
    <div class="field is-grouped">
      <p class="control">
        <button :disabled="!finalMessage" @click="helloWorld" class="button is-primary"
          :class="{ 'is-loading': loading }">Hello world</button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>