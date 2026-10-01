/** What an app's page needs to know about its parameters and their values. */
import type {
  ActionDefinition,
  AppDefinition,
  Choice,
  Condition,
  ParamDefinition,
  ParamValue,
  ParamValues,
} from "../catalog/types";

/** A parameter of an action, with the flag that action sends it under. */
export interface ActionParam {
  param: ParamDefinition;
  flag: string;
}

export function holds(condition: Condition | undefined, values: ParamValues): boolean {
  if (!condition) return true;
  return Object.entries(condition).every(([id, wanted]) => {
    const value = values[id];
    if (Array.isArray(wanted)) return wanted.some((one) => one === value);
    return wanted === value;
  });
}

export function isEmpty(value: ParamValue | undefined): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (typeof value === "number") return Number.isNaN(value);
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/** What there is to choose from for a parameter, given the other values. */
export function choicesFor(param: ParamDefinition, values: ParamValues): Choice[] {
  if (param.choicesBy) {
    return param.choicesBy.choices[String(values[param.choicesBy.param])] ?? [];
  }
  return param.choices ?? [];
}

/** The parameters an action takes that apply with these values, in its order. */
export function actionParams(app: AppDefinition, action: ActionDefinition, values: ParamValues): ActionParam[] {
  const found: ActionParam[] = [];
  for (const ref of action.params) {
    const id = typeof ref === "string" ? ref : ref.id;
    const param = app.params.find((one) => one.id === id);
    if (!param) throw new Error(`catalog ERROR - ${app.id}: action ${action.id} takes '${id}', which is not a parameter of the app`);
    if (!holds(param.showIf, values)) continue;
    found.push({ param, flag: typeof ref === "string" ? param.flag : ref.flag });
  }
  return found;
}

function emptyValue(param: ParamDefinition): ParamValue {
  switch (param.type) {
    case "boolean": return false;
    case "multiselect": return [];
    case "number": return null;
    default: return "";
  }
}

function hasRightType(param: ParamDefinition, value: unknown): value is ParamValue {
  switch (param.type) {
    case "boolean": return typeof value === "boolean";
    case "multiselect": return Array.isArray(value) && value.every((one) => typeof one === "string");
    case "number": return value === null || value === "" || typeof value === "number";
    case "text": return typeof value === "string";
    case "select": return typeof value === "string" || typeof value === "number";
  }
}

/**
 Values a select or multiselect can no longer have, each with what to set
 instead: the default if that is still on offer, else the first choice.
 Needed when one parameter's choices depend on another (the Rubik's
 patterns on the size), and for values remembered from an earlier visit.
*/
export function outOfChoice(app: AppDefinition, values: ParamValues): ParamValues {
  const fixes: ParamValues = {};
  for (const param of app.params) {
    const offered = choicesFor(param, { ...values, ...fixes }).map((choice) => choice.value);
    const value = values[param.id];
    if (param.type === "select") {
      if (offered.some((one) => one === value)) continue;
      const fallback = offered.some((one) => one === param.default) ? param.default : offered[0];
      fixes[param.id] = fallback ?? emptyValue(param);
    } else if (param.type === "multiselect" && Array.isArray(value)) {
      const kept = value.filter((one) => offered.includes(one));
      if (kept.length !== value.length) fixes[param.id] = kept;
    }
  }
  return fixes;
}

/**
 The values an app's page starts with: its defaults, with what was
 remembered from the last visit laid over them where that still fits.
*/
export function initialValues(app: AppDefinition, remembered: Record<string, unknown> = {}): ParamValues {
  const values: ParamValues = {};
  for (const param of app.params) {
    const kept = remembered[param.id];
    values[param.id] = hasRightType(param, kept) ? kept : param.default ?? emptyValue(param);
  }
  return { ...values, ...outOfChoice(app, values) };
}

function outOfRange(param: ParamDefinition, value: ParamValue | undefined): boolean {
  if (typeof value !== "number") return false;
  return (param.min !== undefined && value < param.min) || (param.max !== undefined && value > param.max);
}

/** The parameters that stand in the way of starting the action: left empty though required, or out of range. */
export function unmetParams(app: AppDefinition, action: ActionDefinition, values: ParamValues): ParamDefinition[] {
  return actionParams(app, action, values)
    .map(({ param }) => param)
    .filter((param) => {
      const value = values[param.id];
      return isEmpty(value) ? param.required === true : outOfRange(param, value);
    });
}

/** An action's preview image for these values, or undefined if it has none. */
export function previewUrl(action: ActionDefinition, values: ParamValues): string | undefined {
  return action.preview?.replace(/\{(\w+)\}/g, (_, id: string) => encodeURIComponent(String(values[id] ?? "")));
}
