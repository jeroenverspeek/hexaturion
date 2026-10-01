/**
 The app catalog: every app of the cube described as data, so that one page
 can show any of them. It holds nothing but plain values - no functions - so
 that the cube can serve it as JSON later on (see PLAN.md, phase 2).
*/

export type ParamValue = string | number | boolean | string[] | null;
export type ParamValues = Record<string, ParamValue>;

/**
 Values of other parameters under which something applies: every entry has
 to match, and an array lists the values that will do.
*/
export type Condition = Record<string, string | number | boolean | (string | number)[]>;

export interface Choice {
  value: string | number;
  /** What the choice is called on the page. Default: the value. */
  label?: string;
  /** Choices with the same group are shown together under that heading. */
  group?: string;
  /** The arguments this choice stands for, instead of the flag and the value. */
  args?: string[];
}

export type ParamType = "boolean" | "select" | "multiselect" | "number" | "text";

export interface ParamDefinition {
  /** Its name among the app's parameters. */
  id: string;
  label: string;
  type: ParamType;
  /** The command line option, e.g. --clockType. An action can send it under another one. */
  flag: string;
  /**
   What the page starts with. A parameter left empty ('' or no default) is
   not sent, which leaves it to the app's own default.
  */
  default?: ParamValue;
  help?: string;
  /** Shown under "Advanced". */
  advanced?: boolean;
  /** Only shown, and only sent, under this condition. */
  showIf?: Condition;
  /** The app cannot be started while this is empty. */
  required?: boolean;

  /** boolean: sent after the flag when on, e.g. --background earth. Default: the flag alone. */
  value?: string;

  /** select, multiselect: what there is to choose from. */
  choices?: Choice[];
  /** select: the choices depend on another parameter - they are looked up by its value. */
  choicesBy?: { param: string; choices: Record<string, Choice[]> };
  /** multiselect: sent as one argument joined by this, instead of one argument each. */
  join?: string;

  /** number */
  min?: number;
  max?: number;
  step?: number;
  unit?: string;

  /** text */
  maxLength?: number;
  /** number, text: shown while empty - for an advanced parameter, the app's own default. */
  placeholder?: string;
}

/** A parameter an action sends under another flag than its own. */
export interface ParamRef {
  id: string;
  flag: string;
}

/** One thing an app can be started to do: one script, with some of the app's parameters. */
export interface ActionDefinition {
  id: string;
  /** On the start button, and on the tab when the app has several actions. */
  label: string;
  /** The script, relative to apps/src/ on the device. */
  script: string;
  /** What runs the script. Default: tsx. */
  runner?: "tsx" | "python3";
  /** Arguments that are always sent. */
  args?: string[];
  /** The parameters this action takes, in the order they are shown and sent. */
  params: (string | ParamRef)[];
  /** An image to go with the values: a URL with {parameter} in it, e.g. /images/{nRubik}.png. */
  preview?: string;
}

export type CategoryId = "info" | "puzzles" | "worlds" | "effects" | "media" | "demo";

export interface Category {
  id: CategoryId;
  title: string;
}

export interface AppDefinition {
  /** Its name in the address of its page. */
  id: string;
  title: string;
  /** One line, for the tile and the top of the page. */
  description: string;
  /** A Font Awesome solid icon, without the fa- in front. */
  icon: string;
  category: CategoryId;
  params: ParamDefinition[];
  /** At least one. */
  actions: ActionDefinition[];
}

/** An app with a single script that takes all of its parameters. */
export type SingleActionApp = Omit<AppDefinition, "actions"> & {
  script: string;
  runner?: ActionDefinition["runner"];
  args?: string[];
  /** On the start button. Default: Start. */
  startLabel?: string;
  preview?: string;
};

export function defineApp(app: AppDefinition | SingleActionApp): AppDefinition {
  if ("actions" in app) return app;
  const { script, runner, args, startLabel, preview, ...rest } = app;
  return {
    ...rest,
    actions: [{
      id: "start",
      label: startLabel ?? "Start",
      script,
      runner,
      args,
      preview,
      params: app.params.map((param) => param.id),
    }],
  };
}
