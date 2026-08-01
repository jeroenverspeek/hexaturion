```vue
<script setup lang="ts">
const loading = ref<boolean>(false);

const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommandFireworks = computed<string[]>(() => {
  // Build command and command line options
  const command: string[] = [
    "node_modules/.bin/tsx",
    appSrcDir + "fireworks/showFireworks.ts",
  ];

  return command;
});

const cubeAppCommandSprinkle = computed<string[]>(() => {
  // Build command and command line options
  const command: string[] = ["node_modules/.bin/tsx", appSrcDir + "sprinkle/showSprinkle.ts"];

  return command;
});

const cubeAppCommandSparkle = computed<string[]>(() => {
  // Build command and command line options
  const command: string[] = ["node_modules/.bin/tsx", appSrcDir + "sparkle/showSparkle.ts"];

  return command;
});

async function showFireworks(): Promise<void> {
  loading.value = true;

  const response = await start(cubeAppCommandFireworks.value);

  console.log(response.data);

  loading.value = false;
}

async function sprinkle(): Promise<void> {
  loading.value = true;

  const response = await start(cubeAppCommandSprinkle.value);

  console.log(response.data);

  loading.value = false;
}

async function sparkle(): Promise<void> {
  loading.value = true;

  const response = await start(cubeAppCommandSparkle.value);

  console.log(response.data);

  loading.value = false;
}
</script>

<template>
  <div>
    <div class="field"></div>

    <!--
    <div style="word-break: break-all;">
      {{ cubeAppCommandFireworks }}
    </div>
    <div style="word-break: break-all;">
      {{ cubeAppCommandSprinkle }}
    </div>
    <div style="word-break: break-all;">
      {{ cubeAppCommandSparkle }}
    </div>
    -->

    <div class="field is-grouped">
      <p class="control">
        <button
          @click="showFireworks"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Fireworks
        </button>
      </p>

      <p class="control">
        <button
          @click="sprinkle"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Sprinkle
        </button>
      </p>

      <p class="control">
        <button
          @click="sparkle"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Sparkle
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
