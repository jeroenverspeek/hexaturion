```vue
<script setup lang="ts">
const finalMessage = ref<string>("WELKOM!");
const loading = ref<boolean>(false);

const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommand = computed<string[]>(() => {
  // Build command and command line options
  const command: string[] = ["node_modules/.bin/tsx", appSrcDir + "sprites/helloWorld.ts"];

  command.push("--finalMessage");
  command.push(finalMessage.value);

  return command;
});

async function helloWorld(): Promise<void> {
  loading.value = true;

  const response = await start(cubeAppCommand.value);

  console.log(response.data);

  loading.value = false;
}
</script>

<template>
  <div>
    <div class="field">
      <label class="label"> Final message to the world: </label>

      <div>
        <input v-model="finalMessage" maxlength="16" placeholder="WELKOM!" />
      </div>
    </div>

    <!--
    <div style="word-break: break-all;">
      {{ cubeAppCommand }}
    </div>
    -->

    <div class="field is-grouped">
      <p class="control">
        <button
          :disabled="!finalMessage"
          @click="helloWorld"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Hello world
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
