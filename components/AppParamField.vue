<script setup lang="ts">
import type { Choice, ParamDefinition, ParamValue } from "~/catalog/types";

const props = defineProps<{
  param: ParamDefinition;
  /** What there is to choose from, for a select or multiselect. */
  choices: Choice[];
}>();

const model = defineModel<ParamValue>({ required: true });

/** The choices under their group headings, those without a group first. */
const groups = computed(() => {
  const found: { name: string; choices: Choice[] }[] = [];
  for (const choice of props.choices) {
    const name = choice.group ?? "";
    let group = found.find((one) => one.name === name);
    if (!group) found.push((group = { name, choices: [] }));
    group.choices.push(choice);
  }
  return found;
});

const picked = computed<string[]>(() => (Array.isArray(model.value) ? model.value : []));

/** Picks or drops one choice of a multiselect, keeping the order of the choices. */
function toggle(value: string): void {
  const next = picked.value.includes(value)
    ? picked.value.filter((one) => one !== value)
    : [...picked.value, value];
  model.value = props.choices.map((choice) => String(choice.value)).filter((one) => next.includes(one));
}
</script>

<template>
  <div class="field">
    <template v-if="param.type === 'boolean'">
      <label class="checkbox">
        <input v-model="model" type="checkbox" />
        {{ param.label }}
      </label>
    </template>

    <template v-else>
      <label class="label" :for="`param-${param.id}`">{{ param.label }}</label>

      <div v-if="param.type === 'select'" class="control">
        <div class="select">
          <select :id="`param-${param.id}`" v-model="model">
            <template v-for="group in groups" :key="group.name">
              <optgroup v-if="group.name" :label="group.name">
                <option v-for="choice in group.choices" :key="choice.value" :value="choice.value">
                  {{ choice.label ?? choice.value }}
                </option>
              </optgroup>
              <template v-else>
                <option v-for="choice in group.choices" :key="choice.value" :value="choice.value">
                  {{ choice.label ?? choice.value }}
                </option>
              </template>
            </template>
          </select>
        </div>
      </div>

      <div v-else-if="param.type === 'multiselect'" class="buttons">
        <button
          v-for="choice in choices"
          :key="choice.value"
          type="button"
          class="button is-small is-rounded"
          :class="{ 'is-primary': picked.includes(String(choice.value)) }"
          :aria-pressed="picked.includes(String(choice.value))"
          @click="toggle(String(choice.value))"
        >
          {{ choice.label ?? choice.value }}
        </button>
      </div>

      <div v-else-if="param.type === 'number'" class="field has-addons">
        <div class="control">
          <input
            :id="`param-${param.id}`"
            v-model.number="model"
            class="input number-input"
            type="number"
            inputmode="decimal"
            :min="param.min"
            :max="param.max"
            :step="param.step"
            :placeholder="param.placeholder"
          />
        </div>
        <div v-if="param.unit" class="control">
          <span class="button is-static">{{ param.unit }}</span>
        </div>
      </div>

      <div v-else class="control">
        <input
          :id="`param-${param.id}`"
          v-model="model"
          class="input"
          type="text"
          :maxlength="param.maxLength"
          :placeholder="param.placeholder"
        />
      </div>
    </template>

    <p v-if="param.help" class="help">{{ param.help }}</p>
  </div>
</template>

<style scoped>
.number-input {
  width: 8rem;
}
</style>
