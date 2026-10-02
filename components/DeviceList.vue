<script setup lang="ts">
import type { Device } from "~/composables/useDevices";

/** The devices the GUI knows, to change: what each is called and where its server is. */
const { devices, areDefaults, save, restoreDefaults } = useDevices();

const copy = (list: Device[]): Device[] => list.map((device) => ({ ...device }));
/** The list as it stands on the page, to be saved. */
const form = ref<Device[]>(copy(devices.value));
watch(devices, (now) => (form.value = copy(now)));

const problem = ref("");
const changed = computed(() => JSON.stringify(form.value) !== JSON.stringify(devices.value));

function add(): void {
  form.value.push({ id: `device-${Date.now().toString(36)}`, label: "", address: "" });
}

function remove(id: string): void {
  form.value = form.value.filter((device) => device.id !== id);
}

function saveDevices(): void {
  const list: Device[] = [];
  for (const device of form.value) {
    const label = device.label.trim();
    const address = deviceAddress(device.address);
    if (label === "") return void (problem.value = "A device needs a name.");
    if (address === null) return void (problem.value = `${label} needs an address, such as 192.168.1.136`);
    if (list.some((other) => other.label.toLowerCase() === label.toLowerCase())) {
      return void (problem.value = `There are two devices called ${label}.`);
    }
    list.push({ id: device.id, label, address });
  }
  problem.value = "";
  save(list);
}
</script>

<template>
  <form @submit.prevent="saveDevices">
    <div v-for="device in form" :key="device.id" class="field is-horizontal device">
      <div class="field-body">
        <div class="field device-label">
          <input v-model="device.label" class="input" type="text" maxlength="20" placeholder="Name" aria-label="Name" />
        </div>
        <div class="field">
          <input
            v-model="device.address"
            class="input"
            type="text"
            inputmode="url"
            autocapitalize="none"
            autocomplete="off"
            placeholder="192.168.1.136"
            aria-label="Address"
          />
        </div>
        <div class="field is-narrow">
          <button
            type="button"
            class="button is-ghost"
            :disabled="form.length === 1"
            :aria-label="`Remove ${device.label}`"
            @click="remove(device.id)"
          >
            <span class="icon"><i class="fa-solid fa-xmark"></i></span>
          </button>
        </div>
      </div>
    </div>

    <p v-if="problem" class="help is-danger mb-3">{{ problem }}</p>
    <p v-else class="help mb-3">
      Kept in this browser. An address without a port is taken to be on 3000, where the servers listen.
    </p>

    <div class="field is-grouped is-grouped-multiline">
      <p class="control">
        <button type="submit" class="button is-primary" :disabled="!changed">
          <span class="icon"><i class="fa-solid fa-floppy-disk"></i></span>
          <span>Save devices</span>
        </button>
      </p>
      <p class="control">
        <button type="button" class="button" @click="add">Add a device</button>
      </p>
      <p v-if="!areDefaults" class="control">
        <button type="button" class="button is-ghost" @click="restoreDefaults">Back to the cube and the panel</button>
      </p>
    </div>
  </form>
</template>

<style scoped>
.device {
  margin-bottom: 0.5rem;
}

.device-label {
  flex-grow: 0;
  flex-basis: 9rem;
}
</style>
