/**
 Turns an app, one of its actions and the values on its page into the
 command the cube's server makes of them - to show it on the app's page.

 The command that is run is the server's own (startCommand.ts in
 led-hexahedron): the page only sends the app, the action and the values.
 This copy goes when the catalog is fetched from the cube (PLAN.md, 2.8).
*/
import type { ActionDefinition, AppDefinition, ParamDefinition, ParamValues } from "../catalog/types";
import { actionParams, choicesFor, isEmpty } from "./appForm";

const appSrcDir = "apps/src/";
const runners = {
  tsx: ["node_modules/.bin/tsx"],
  python3: ["python3"],
};

/** The arguments one parameter comes to: none when it is off or left empty. */
function paramArgs(param: ParamDefinition, flag: string, values: ParamValues): string[] {
  const value = values[param.id];
  if (param.type === "boolean") {
    if (value !== true) return [];
    return param.value === undefined ? [flag] : [flag, param.value];
  }
  if (isEmpty(value)) return [];
  if (Array.isArray(value)) {
    return param.join === undefined ? [flag, ...value] : [flag, value.join(param.join)];
  }
  if (param.type === "select") {
    const choice = choicesFor(param, values).find((one) => one.value === value);
    if (choice?.args) return choice.args;
  }
  // a text travels as one argument with its flag, so that the app cannot take it for an option
  if (param.type === "text" && flag.startsWith("--")) return [`${flag}=${String(value).trim()}`];
  return [flag, String(value)];
}

export function buildCommand(app: AppDefinition, action: ActionDefinition, values: ParamValues): string[] {
  const command = [...runners[action.runner ?? "tsx"], appSrcDir + action.script, ...(action.args ?? [])];
  for (const { param, flag } of actionParams(app, action, values)) {
    command.push(...paramArgs(param, flag, values));
  }
  return command;
}
