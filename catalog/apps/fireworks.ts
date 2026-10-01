import { showTime } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "fireworks",
  title: "Fireworks",
  description: "Fireworks over the cube.",
  icon: "wand-magic-sparkles",
  category: "effects",
  script: "fireworks/showFireworks.ts",
  params: [showTime],
});
