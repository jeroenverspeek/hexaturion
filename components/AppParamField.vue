<script setup lang="ts">
import type { Choice, ParamDefinition, ParamValue } from "~/types/catalog";

const props = defineProps<{
  param: ParamDefinition;
  /** What there is to choose from, for a select or multiselect. */
  choices: Choice[];
  /** A picture is being uploaded for it, or deleted. */
  busy?: boolean;
}>();

const emit = defineEmits<{
  /** A picture was picked to upload, for a parameter that takes them. */
  upload: [file: File];
  /** The choice that was uploaded, to be deleted. */
  delete: [choice: Choice];
}>();

const model = defineModel<ParamValue>({ required: true });
const { t, dt } = useLanguage();

/** The choice now, when it is one that was uploaded: one that can be deleted. */
const uploaded = computed(() =>
  props.param.upload ? props.choices.find((choice) => choice.value === model.value && choice.group === props.param.upload!.group) : undefined,
);

function pictureChosen(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  // the same picture picked again is a change too
  input.value = "";
  if (file) emit("upload", file);
}

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

/** A number that can be forever (its forever): ticked while it is null, the field greyed out then. */
const forever = computed(() => props.param.forever !== undefined && model.value === null);
/** The number the field had before forever was ticked, to have back when it is unticked. */
let before: number | undefined;

function setForever(on: boolean): void {
  if (on) {
    if (typeof model.value === "number") before = model.value;
    model.value = null;
  } else {
    model.value = before ?? props.param.forever!.otherwise;
  }
}

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
        {{ dt(param.label) }}
      </label>
    </template>

    <template v-else>
      <label class="label" :for="`param-${param.id}`">{{ dt(param.label) }}</label>

      <div v-if="param.type === 'select'" class="control">
        <div class="select">
          <select :id="`param-${param.id}`" v-model="model">
            <template v-for="group in groups" :key="group.name">
              <optgroup v-if="group.name" :label="dt(group.name)">
                <option v-for="choice in group.choices" :key="choice.value" :value="choice.value">
                  {{ dt(choice.label) ?? choice.value }}
                </option>
              </optgroup>
              <template v-else>
                <option v-for="choice in group.choices" :key="choice.value" :value="choice.value">
                  {{ dt(choice.label) ?? choice.value }}
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
          {{ dt(choice.label) ?? choice.value }}
        </button>
      </div>

      <div v-else-if="param.type === 'number'" class="number-field">
        <div class="field has-addons mb-0">
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
              :placeholder="dt(param.placeholder)"
              :disabled="forever"
            />
          </div>
          <div v-if="param.unit" class="control">
            <span class="button is-static">{{ dt(param.unit) }}</span>
          </div>
        </div>
        <label v-if="param.forever" class="checkbox">
          <input type="checkbox" :checked="forever" @change="setForever(($event.target as HTMLInputElement).checked)" />
          {{ dt(param.forever.label) }}
        </label>
      </div>

      <div v-else class="control">
        <input
          :id="`param-${param.id}`"
          v-model="model"
          class="input"
          type="text"
          :maxlength="param.maxLength"
          :placeholder="dt(param.placeholder)"
        />
      </div>
    </template>

    <p v-if="param.help" class="help">{{ dt(param.help) }}</p>

    <div v-if="param.upload" class="buttons mt-2">
      <label class="button is-small" :class="{ 'is-loading': busy }" :disabled="busy || undefined">
        <input type="file" class="is-hidden" :accept="param.upload.accept" :disabled="busy" @change="pictureChosen" />
        <span class="icon"><i class="fa-solid fa-upload"></i></span>
        <span>{{ t("upload.add") }}</span>
      </label>
      <button
        v-if="uploaded"
        type="button"
        class="button is-small is-danger is-outlined"
        :disabled="busy"
        @click="emit('delete', uploaded)"
      >
        <span class="icon"><i class="fa-solid fa-trash"></i></span>
        <span>{{ t("upload.delete") }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.number-input {
  width: 8rem;
}

.number-field {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
}
</style>
