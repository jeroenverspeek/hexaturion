<script setup>
const clockType = ref('digital');
const language = ref('Nederlands');
const animationInterval = ref(null);
const loading = ref(false);
const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

async function showSmartClock() {
  loading.value = true;
  // build command and command line options;
  const cubeAppCommand = ['ts-node', appSrcDir + 'smartClock/smartClock.ts'];
  cubeAppCommand.push('--clockType');
  cubeAppCommand.push(clockType.value);
  if (animationInterval.value) {
    cubeAppCommand.push('--animationInterval');
    cubeAppCommand.push(animationInterval.value);
  }
  cubeAppCommand.push('--language');
  cubeAppCommand.push(language.value);
  const response = await start(cubeAppCommand)
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
          <option value="null">no animation</option>
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