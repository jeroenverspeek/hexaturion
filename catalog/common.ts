/** Parameters that many apps have in common. */
import type { Choice, ParamDefinition } from "./types";

/**
 Which point of the cube is on top. Empty leaves it to the cube's own
 setting (ledcube.local.json on the device), which is what one wants unless
 the cube has just been put down differently.
*/
export function zenith(help: string): ParamDefinition {
  return {
    id: "zenith",
    label: "Cube stands",
    type: "select",
    flag: "--zenith",
    default: "",
    choices: [
      { value: "", label: "as set on the cube" },
      { value: "U", label: "on a side" },
      { value: "LBU", label: "on a corner" },
    ],
    help,
    advanced: true,
  };
}

export const showTime: ParamDefinition = {
  id: "showTime",
  label: "Stop after",
  type: "number",
  flag: "--showTime",
  min: 1,
  unit: "s",
  placeholder: "never",
  advanced: true,
};

export const speed: ParamDefinition = {
  id: "speed",
  label: "Speed",
  type: "number",
  flag: "--speed",
  min: 0.1,
  step: 0.1,
  placeholder: "1",
  help: "Simulated time per real time.",
  advanced: true,
};

/** The sizes of a Rubik's cube: 1x1 to 9x9. */
export const rubikSizes: Choice[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
  value: n,
  label: `${n}x${n}`,
}));

/** The directories of apps/cube_pictures/ on the device. */
export const pictureDirs: Choice[] = [
  { value: "family" },
  { value: "chess_set", label: "chess" },
  { value: "emoji", label: "emoji's" },
  { value: "flag", label: "flags" },
  { value: "borg" },
];
