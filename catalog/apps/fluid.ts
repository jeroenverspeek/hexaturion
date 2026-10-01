import { showTime, speed, zenith } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "fluid",
  title: "Fluid",
  description: "Ink, fire or a whirlpool flowing over all six faces.",
  icon: "droplet",
  category: "worlds",
  script: "fluid/showFluid.ts",
  params: [
    {
      id: "mode",
      label: "Mode",
      type: "select",
      flag: "--mode",
      default: "ink",
      choices: [
        { value: "ink", label: "ink" },
        { value: "fire", label: "fire" },
        { value: "whirlpool", label: "whirlpool" },
      ],
    },
    speed,
    zenith("Which way is up, for fire and the whirlpool."),
    showTime,
  ],
});
