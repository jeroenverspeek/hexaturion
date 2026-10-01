import { showTime, zenith } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "asteroids",
  title: "Asteroids",
  description: "The arcade game over all six faces, played by its autopilot.",
  icon: "rocket",
  category: "puzzles",
  script: "asteroids/showAsteroids.ts",
  // Playing it takes a keyboard on the cube: from here it only shows the autopilot.
  args: ["--demo"],
  startLabel: "Watch the autopilot",
  params: [
    zenith("Which way is up, for the texts and the ship's start."),
    showTime,
  ],
});
