import { showTime, speed, zenith } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "slosh",
  title: "Slosh",
  description: "Water sloshing, or two liquids swapping places, inside the cube.",
  icon: "water",
  category: "worlds",
  script: "slosh/showSlosh.ts",
  params: [
    {
      id: "mode",
      label: "Mode",
      type: "select",
      flag: "--mode",
      default: "water",
      choices: [
        { value: "water", label: "water under air" },
        { value: "layers", label: "two liquids" },
      ],
    },
    speed,
    zenith("Which way is up."),
    showTime,
  ],
});
