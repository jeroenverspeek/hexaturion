```vue
<script setup lang="ts">
const loading = ref(false);

const { start } = useAPI();

const shutdownCubeAppCommand = computed<string[]>(() => {
  // Build command and command line options
  const command: string[] = ["sudo", "shutdown", "-h", "now"];
  return command;
});

const rebootCubeAppCommand = computed<string[]>(() => {
  // Build command and command line options
  const command: string[] = ["sudo", "reboot"];
  return command;
});

async function cubeShutdown() {
  loading.value = true;

  const response = await start(shutdownCubeAppCommand.value);

  console.log(response.data);

  loading.value = false;
}

async function cubeReboot() {
  loading.value = true;

  const response = await start(rebootCubeAppCommand.value);

  console.log(response.data);

  loading.value = false;
}
</script>

<template>
  <div>
    <!--
    <div style="word-break: break-all;">{{ shutdownCubeAppCommand }}</div>
    <div style="word-break: break-all;">{{ rebootCubeAppCommand }}</div>
    -->

    <div class="field is-grouped">
      <p class="control">
        <button
          @click="cubeShutdown"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Shut down cube
        </button>
      </p>

      <p class="control">
        <button
          @click="cubeReboot"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Reboot cube
        </button>
      </p>
    </div>
  </div>
</template>
```
