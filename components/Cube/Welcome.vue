<script setup>
const rotate = ref(false);
const finalMessage = ref('WELKOM!');
//const tickerSymbols = ref(['AAPL']);
const loading = ref(false);
const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommand = computed(() => {
  // build command and command line options;
  const command = ['ts-node', appSrcDir + 'sprites/welcome.ts'];
  command.push('--finalMessage');
  command.push(finalMessage.value);
  return command;
});


async function welcome() {
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
      <label class="label">Ticker symbols:</label>
      <div>Enter final message: <input v-model="finalMessage" maxlength=16 placeholder="WELKOM!">
      </div>
      <!-- <span> TEST language: {{ language }}</span><br> -->
    </div>
    <div style="word-break: break-all;">{{ cubeAppCommand }}</div>
    <div class="field is-grouped">
      <p class="control">
        <button :disabled="!finalMessage" @click="welcome" class="button is-primary"
          :class="{ 'is-loading': loading }">Welcome</button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>