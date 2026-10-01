import { defineApp } from "../types";

export default defineApp({
  id: "superDemo",
  title: "Super demo",
  description: "One app after another, each for a while.",
  icon: "shuffle",
  category: "demo",
  script: "superDemo/superDemo.py",
  runner: "python3",
  startLabel: "Super demo",
  params: [
    {
      id: "nLoops",
      label: "Number of loops",
      type: "number",
      flag: "--n_loops",
      default: 1,
      min: 1,
      required: true,
    },
    {
      id: "showTime",
      label: "Show time per app",
      type: "number",
      flag: "--show_time",
      default: 60,
      min: 20,
      unit: "s",
      required: true,
    },
  ],
});
