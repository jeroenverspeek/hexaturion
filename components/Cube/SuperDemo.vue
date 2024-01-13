<script setup>
const nLoops = ref(1);
const showTime = ref(60);

const loading = ref(false);
const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const superDemoAppCommand = computed(() => {
  // build command and command line options;
  const command = ["sudo", appSrcDir + 'superDemo/superDemo.py'];
  command.push('--n_loops');
  command.push(nLoops.value);
  command.push('--show_time');
  command.push(showTime.value);
  return command;
});

async function superDemo() {
  loading.value = true;
  // build command and command line options;
  const response = await start(superDemoAppCommand.value)
  console.log(response.data)

  loading.value = false;
}

</script>

<template>

  Number of loops: <input type="number" v-model="nLoops" :min="1"><br><br>
  Show time per app: <input type="number" v-model="showTime" :min="20"> (seconds)<br><br>
  <div style="word-break: break-all;">{{ superDemoAppCommand }}</div>
  <div class="field is-grouped">
    <p class="control">
      <button @click="superDemo" class="button is-primary"
        :class="{ 'is-loading': loading }">Super demo</button>
    </p>
    <p class="control">
      <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
    </p>
  </div>
</template>