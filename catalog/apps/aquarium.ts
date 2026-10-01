import { showTime, speed, zenith } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "aquarium",
  title: "Aquarium",
  description: "Fish, seaweed, bubbles, and a pufferfish that puffs up.",
  icon: "fish",
  category: "worlds",
  script: "aquarium/showAquarium.ts",
  params: [speed, zenith("Which way is up."), showTime],
});
