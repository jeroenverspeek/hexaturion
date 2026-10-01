import { showTime } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "sparkle",
  title: "Sparkle",
  description: "Some sparkles.",
  icon: "star",
  category: "effects",
  script: "sparkle/showSparkle.ts",
  params: [showTime],
});
