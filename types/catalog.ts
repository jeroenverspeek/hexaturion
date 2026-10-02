/**
 The app catalog: every app of the cube described as data, so that one page
 can show any of them. The cube has it - a manifest.ts next to each app in
 led-hexahedron, apps/src/catalog/ - and its server hands it out at /apps;
 these are the types of what arrives.
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
  /**
   The setting of the cube this one goes by (see settings.ts): the page
   starts at what is set there, rather than at the default or at what it
   was the last time. For a multiselect the setting is a list, and that
   list is what there is to choose from, all of it picked at the start;
   the choices here are for a cube whose settings cannot be read.
  */
  setting?: string;

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

export interface Category {
  id: string;
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
  /** The id of its category. */
  category: string;
  params: ParamDefinition[];
  /** At least one. */
  actions: ActionDefinition[];
}

export type SettingType = "select" | "text" | "list";

/**
 A setting of the cube: something that is set once and seldom changes, such
 as which way up it stands. The settings are kept in ledcube.local.json,
 each under its id.
*/
export interface SettingDefinition {
  /** Its key in ledcube.local.json. */
  id: string;
  label: string;
  type: SettingType;
  /** What holds while it is not set. */
  default: string | number | string[];
  help?: string;
  /** Under which heading it comes on the settings page. */
  group: string;

  /** select: what there is to choose from. */
  choices?: Choice[];

  /** text: how long it may be. list: how long each one in it may be. */
  maxLength?: number;
  /** text, list: shown while empty. */
  placeholder?: string;
  /** list: what each one in it has to look like, as a regular expression - and that in words. */
  pattern?: string;
  patternHelp?: string;
  /** list: how many there may be. */
  maxItems?: number;
}

export type SettingValue = string | number | string[];
export type SettingValues = Record<string, SettingValue>;

/** What the catalog is the catalog of: the cube, or the single panel. */
export interface DeviceInfo {
  kind: "cube" | "panel";
  /** What to call it in a sentence: "the cube does not answer". */
  name: string;
}

/** What the cube's server hands out at /apps. */
export interface Catalog {
  device: DeviceInfo;
  /** In the order they come on the home page. */
  categories: Category[];
  /** In the order they come within their category. */
  apps: AppDefinition[];
  /** What can be set once for the cube. */
  settings: SettingDefinition[];
}
