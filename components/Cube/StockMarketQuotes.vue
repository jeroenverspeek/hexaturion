```vue
<script setup lang="ts">
const tickerSymbols = ref<string[]>([]);
const loading = ref<boolean>(false);

const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommand = computed<string[]>(() => {
  // Build command and command line options
  const command: string[] = [
    "node_modules/.bin/tsx",
    appSrcDir + "stockMarketQuotes/showStockMarketQuotes.ts",
  ];

  command.push("--tickerSymbols");
  command.push(...tickerSymbols.value);

  return command;
});

async function showStockMarketQuotes(): Promise<void> {
  loading.value = true;

  try {
    const response = await start(cubeAppCommand.value);
    console.log(response.data);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="field">
      <label class="label">Ticker symbols:</label>

      <div class="select">
        <select v-model="tickerSymbols" multiple :max="3">
          <option value="^AEX">AEX</option>
          <option value="ASML.AS">ASML</option>
          <option value="RABO.AS">RABO</option>
          <option value="SHELL.AS">SHELL</option>
          <option value="GOOG">GOOG</option>
          <option value="MSFT">MSFT</option>
          <option value="AAPL">AAPL</option>
        </select>
      </div>
    </div>

    <br />
    <br />
    <br />
    <br />

    <!-- TEST: show generated command
    <div style="word-break: break-all;">
      {{ cubeAppCommand }}
    </div>
    -->

    <div class="field is-grouped">
      <p class="control">
        <button
          :disabled="tickerSymbols.length === 0"
          @click="showStockMarketQuotes"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Show stock market quotes
        </button>
      </p>

      <p class="control">
        <button
          @click="stop"
          class="button is-danger"
          :class="{ 'is-loading': loading }"
        >
          Stop
        </button>
      </p>
    </div>
  </div>
</template>
```
