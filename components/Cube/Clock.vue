<script setup>
const showBackground = ref(false);
const clockType = ref('digital');
const language = ref('Nederlands');
const animationInterval = ref();
const loading = ref(false);
const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

// build command and command line options;
const cubeAppCommand = computed(() => {
  if ((clockType.value == 'digital') && (showBackground.value)) {
    const command = ['ts-node', appSrcDir + 'celestialBodies/showDayNightMap.ts'];
    command.push('--zenith');
    command.push('LBU'); // cube standing on corner
    command.push('--realTime');
    command.push('--digitalClock');
    return command;
  } else {
    const command = ['ts-node', appSrcDir + 'smartClock/smartClock.ts'];
    command.push('--clockType');
    command.push(clockType.value);
    if (animationInterval.value) {
      command.push('--animationInterval');
      command.push(animationInterval.value);
    }
    command.push('--language');
    command.push(language.value);
    return command;
  }
})

async function showSmartClock() {
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
      <label class="label">Type:</label>
      <div class="control">
        <label class="radio">
          <input type="radio" id="'digital'" value="digital" v-model="clockType" />
          Digital
        </label>
        <label class="radio">
          <input type="radio" id="word" value="word" v-model="clockType" />
          Word
        </label>
      </div>
    </div>
    <div class="field">
      <label class="label">Animation every:</label>
      <div class="select">
        <select v-model="animationInterval" :disabled="(clockType != 'word')">
          <option :value="undefined">no animation</option>
          <option value="1">1 minute</option>
          <option value="5">5 minutes</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
        </select>
      </div>
      <!-- <span> TEST animationInterval: {{ animationInterval }}</span><br> -->
    </div>
    <div class="field">
      <label class="label">Language:</label>
      <div class="select">
        <select v-model="language" :disabled="(clockType != 'word')">
          <option value="Nederlands">Nederlands</option>
          <option value="English">English</option>
          <option value="Deutsch">Deutsch</option>
          <option value="Français">Français</option>
        </select>
      </div>
      <!-- <span> TEST language: {{ language }}</span><br> -->
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="showBackground" :disabled="(clockType != 'digital')">
        Show day/night background
      </label>
    </div>
    <!--<div style="word-break: break-all;">{{ cubeAppCommand }}</div>-->
    <div class="field is-grouped">
      <p class="control">
        <button :disabled="!clockType" @click="showSmartClock" class="button is-primary"
          :class="{ 'is-loading': loading }">Show Clock</button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>