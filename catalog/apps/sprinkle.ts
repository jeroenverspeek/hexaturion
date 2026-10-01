import { showTime } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "sprinkle",
  title: "Sprinkle",
  description: "Some sprinkles.",
  icon: "spray-can-sparkles",
  category: "effects",
  script: "sprinkle/showSprinkle.ts",
  params: [showTime],
});
