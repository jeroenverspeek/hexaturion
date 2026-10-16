<script setup lang="ts">
import type { Device } from "~/composables/useDevices";

/** Which device the GUI talks to: the cube, the panel. Not there when there is only one. */
const { devices, active, select, defaults } = useDevices();
const { t } = useLanguage();

/** A device by its name; the cube and the panel, as the site comes with them, by their name in the language spoken. */
function labelOf(device: Device): string {
  const coming = defaults().find((one) => one.id === device.id);
  return coming?.label === device.label && (device.id === "cube" || device.id === "panel") ? t(`device.label.${device.id}`) : device.label;
}
const route = useRoute();

async function turnTo(id: string): Promise<void> {
  select(id);
  // the page of an app is that device's: the other one may not have such an app
  if (route.path === "/app") await navigateTo("/");
}
</script>

<template>
  <div v-if="devices.length > 1" class="device-switcher" role="group" :aria-label="t('nav.devices')">
    <div v-if="devices.length <= 3" class="buttons has-addons">
      <button
        v-for="device in devices"
        :key="device.id"
        type="button"
        class="button is-small"
        :class="{ 'is-primary is-selected': device.id === active.id }"
        :aria-pressed="device.id === active.id"
        @click="turnTo(device.id)"
      >
        {{ labelOf(device) }}
      </button>
    </div>
    <div v-else class="select is-small">
      <select :value="active.id" :aria-label="t('nav.devices')" @change="turnTo(($event.target as HTMLSelectElement).value)">
        <option v-for="device in devices" :key="device.id" :value="device.id">{{ labelOf(device) }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.device-switcher {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 0.5rem;
}

.device-switcher .buttons {
  flex-wrap: nowrap;
  margin-bottom: 0;
}

.device-switcher .button {
  margin-bottom: 0;
}
</style>
