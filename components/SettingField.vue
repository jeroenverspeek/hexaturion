<script setup lang="ts">
import type { ParamDefinition, ParamValue, SettingDefinition, SettingValue } from "~/types/catalog";

const props = defineProps<{ setting: SettingDefinition }>();

const model = defineModel<SettingValue>({ required: true });
const { t, dt } = useLanguage();

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
  // msft is MSFT, for a setting kept in capitals: the field shows it so as it is typed
  const typed = adding.value.trim();
  const one = props.setting.upperCase ? typed.toUpperCase() : typed;
  if (one === "") return;
  if (props.setting.pattern !== undefined && !new RegExp(props.setting.pattern).test(one)) {
    refusal.value = t("setting.not", { what: dt(props.setting.patternHelp) ?? t("setting.notAddable") });
    return;
  }
  if (list.value.includes(one)) {
    refusal.value = t("setting.twice", { name: one });
    return;
  }
  model.value = [...list.value, one];
  adding.value = "";
  refusal.value = "";
}

function remove(one: string): void {
  model.value = list.value.filter((other) => other !== one);
}

// --- ready lists to add at once, where the device has them (the setting's `lists`)

interface ReadyList {
  id: string;
  label: string;
  nl?: string;
}
const { language } = useLanguage();
const readyLists = ref<ReadyList[]>([]);
const picked = ref("");
/** What came of adding a list: how many were added, or why none could be. */
const listNote = ref("");
const fetching = ref(false);

onMounted(async () => {
  if (!props.setting.lists) return;
  try {
    readyLists.value = (await useCustomFetch<ReadyList[]>(props.setting.lists, { timeout: 4000 })).data;
  } catch {
    // an older device has none: the field is as it was
  }
});

/** The symbols of the list picked, those that are not in the list yet, as long as there is room. */
async function addList(): Promise<void> {
  const id = picked.value;
  if (!id || !props.setting.lists) return;
  fetching.value = true;
  listNote.value = "";
  try {
    const { data } = await useCustomFetch<{ symbols: string[]; source: string }>(`${props.setting.lists}/${id}`, { timeout: 30000 });
    const room = props.setting.maxItems === undefined ? Infinity : props.setting.maxItems - list.value.length;
    const adding = data.symbols.filter((one) => !list.value.includes(one)).slice(0, Math.max(0, room));
    model.value = [...list.value, ...adding];
    listNote.value = t("setting.added", { count: adding.length, source: data.source });
  } catch (e) {
    listNote.value = reasonOf(e);
  } finally {
    fetching.value = false;
    picked.value = "";
  }
}
</script>

<template>
  <AppParamField v-if="setting.type !== 'list'" v-model="single" :param="asParam" :choices="setting.choices ?? []" />

  <div v-else class="field">
    <label class="label" :for="`setting-${setting.id}`">{{ dt(setting.label) }}</label>

    <div class="tags">
      <span v-for="one in list" :key="one" class="tag is-medium">
        {{ one }}
        <button type="button" class="delete is-small" :aria-label="t('setting.remove', { name: one })" @click="remove(one)"></button>
      </span>
      <span v-if="list.length === 0" class="has-text-grey">{{ t("setting.none") }}</span>
    </div>

    <div class="field has-addons">
      <div class="control">
        <input
          :id="`setting-${setting.id}`"
          v-model="adding"
          class="input"
          :class="{ 'is-danger': refusal, 'is-upper-case': setting.upperCase }"
          type="text"
          autocapitalize="characters"
          autocomplete="off"
          :maxlength="setting.maxLength"
          :placeholder="dt(setting.placeholder)"
          :disabled="full"
          @input="refusal = ''"
          @keydown.enter.prevent="add"
        />
      </div>
      <div class="control">
        <button type="button" class="button" :disabled="full || adding.trim() === ''" @click="add">{{ t("setting.add") }}</button>
      </div>
    </div>

    <!-- multiline: on a phone "Empty the list" goes under the ready lists rather than past the edge -->
    <div v-if="readyLists.length" class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="select" :class="{ 'is-loading': fetching }">
          <select v-model="picked" :disabled="full || fetching" @change="addList">
            <option value="">{{ fetching ? t("setting.fetching") : t("setting.addList") }}</option>
            <option v-for="one in readyLists" :key="one.id" :value="one.id">{{ language === "nl" && one.nl ? one.nl : one.label }}</option>
          </select>
        </div>
      </div>
      <div class="control">
        <button type="button" class="button" :disabled="list.length === 0" @click="model = []">{{ t("setting.clear") }}</button>
      </div>
    </div>
    <p v-if="listNote" class="help">{{ listNote }}</p>

    <p v-if="refusal" class="help is-danger">{{ refusal }}</p>
    <p v-else-if="full" class="help">{{ t("setting.full", { max: setting.maxItems ?? "" }) }}</p>
    <p v-else-if="setting.help" class="help">{{ dt(setting.help) }}</p>
  </div>
</template>

<style scoped>
/* what is typed in a field kept in capitals shows so at once - the placeholder as it is */
.is-upper-case {
  text-transform: uppercase;
}

.is-upper-case::placeholder {
  text-transform: none;
}
</style>
