<script setup lang="ts">
import type { ParamDefinition, ParamValue, SettingDefinition, SettingValue } from "~/types/catalog";

const props = defineProps<{ setting: SettingDefinition }>();

const model = defineModel<SettingValue>({ required: true });

/** A choice or a text is shown as a parameter of an app is. */
const asParam = computed<ParamDefinition>(() => ({
  id: props.setting.id,
  label: props.setting.label,
  type: props.setting.type === "select" ? "select" : "text",
  flag: "",
  help: props.setting.help,
  choices: props.setting.choices,
  maxLength: props.setting.maxLength,
  placeholder: props.setting.placeholder,
}));
const single = computed<ParamValue>({
  get: () => (Array.isArray(model.value) ? null : model.value),
  set: (value) => {
    if (typeof value === "string" || typeof value === "number") model.value = value;
  },
});

// --- a list: the ones in it, each with a cross, and a field to add one

const list = computed<string[]>(() => (Array.isArray(model.value) ? model.value : []));
const adding = ref("");
/** Why what is typed cannot be added, once that has been tried. */
const refusal = ref("");
const full = computed(() => props.setting.maxItems !== undefined && list.value.length >= props.setting.maxItems);

function add(): void {
  const one = adding.value.trim();
  if (one === "") return;
  if (props.setting.pattern !== undefined && !new RegExp(props.setting.pattern).test(one)) {
    refusal.value = `Not ${props.setting.patternHelp ?? "one that can be added"}`;
    return;
  }
  if (list.value.includes(one)) {
    refusal.value = `${one} is in the list already`;
    return;
  }
  model.value = [...list.value, one];
  adding.value = "";
  refusal.value = "";
}

function remove(one: string): void {
  model.value = list.value.filter((other) => other !== one);
}
</script>

<template>
  <AppParamField v-if="setting.type !== 'list'" v-model="single" :param="asParam" :choices="setting.choices ?? []" />

  <div v-else class="field">
    <label class="label" :for="`setting-${setting.id}`">{{ setting.label }}</label>

    <div class="tags">
      <span v-for="one in list" :key="one" class="tag is-medium">
        {{ one }}
        <button type="button" class="delete is-small" :aria-label="`Remove ${one}`" @click="remove(one)"></button>
      </span>
      <span v-if="list.length === 0" class="has-text-grey">None</span>
    </div>

    <div class="field has-addons">
      <div class="control">
        <input
          :id="`setting-${setting.id}`"
          v-model="adding"
          class="input"
          :class="{ 'is-danger': refusal }"
          type="text"
          autocapitalize="characters"
          autocomplete="off"
          :maxlength="setting.maxLength"
          :placeholder="setting.placeholder"
          :disabled="full"
          @input="refusal = ''"
          @keydown.enter.prevent="add"
        />
      </div>
      <div class="control">
        <button type="button" class="button" :disabled="full || adding.trim() === ''" @click="add">Add</button>
      </div>
    </div>

    <p v-if="refusal" class="help is-danger">{{ refusal }}</p>
    <p v-else-if="full" class="help">That is as many as there can be: {{ setting.maxItems }}.</p>
    <p v-else-if="setting.help" class="help">{{ setting.help }}</p>
  </div>
</template>
