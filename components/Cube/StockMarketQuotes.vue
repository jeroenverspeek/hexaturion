<script setup>
const rotate = ref(false);
const tickerSymbols = ref([]);
//const tickerSymbols = ref(['AAPL']);
const loading = ref(false);
const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommand = computed(() => {
  // build command and command line options;
  const command = ['ts-node', appSrcDir + 'stockMarketQuotes/showStockMarketQuotes.ts'];
  command.push('--tickerSymbols');
  command.push(tickerSymbols.value);
  return command;
});


async function showStockMarketQuotes() {
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
      <div class="select">
        <select v-model="tickerSymbols" :multiple="true">
          <option value="ASML.AS">ASML.AS</option>
          <option value="SHELL.AS">SHELL.AS</option>
          <option value="GOOG">GOOG</option>
          <option value="MSFT">MSFT</option>
          <option value="AAPL">AAPL</option>
        </select>
      </div>
      <!-- <span> TEST language: {{ language }}</span><br> -->
    </div>
    <br><br><br><br>
    <!--<div style="word-break: break-all;">{{ cubeAppCommand }}</div>-->
    <div class="field is-grouped">
      <p class="control">
        <button :disabled="!tickerSymbols" @click="showStockMarketQuotes" class="button is-primary"
          :class="{ 'is-loading': loading }">Show stock market quotes</button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>