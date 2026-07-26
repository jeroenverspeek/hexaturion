```vue
<script setup lang="ts">
const nLoops = ref<number>(1);
const showTime = ref<number>(60);

const loading = ref<boolean>(false);

const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const superDemoAppCommand = computed<string[]>(() => {
  // Build command and command line options
  const command: string[] = ["sudo", appSrcDir + "superDemo/superDemo.py"];

  command.push("--n_loops");
  command.push(String(nLoops.value));

  command.push("--show_time");
  command.push(String(showTime.value));

  return command;
});

async function superDemo(): Promise<void> {
  loading.value = true;

  try {
    const response = await start(superDemoAppCommand.value);
    console.log(response.data);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    Number of loops:
    <input type="number" v-model.number="nLoops" :min="1" />

    <br />
    <br />

    Show time per app:
    <input type="number" v-model.number="showTime" :min="20" />
    (seconds)

    <br />
    <br />

    <!-- TEST: show generated command
    <div style="word-break: break-all;">
      {{ superDemoAppCommand }}
    </div>
    -->

    <div class="field is-grouped">
      <p class="control">
        <button
          @click="superDemo"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Super demo
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
