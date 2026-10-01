import { showTime } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "helloWorld",
  title: "Hello world",
  description: "Hello in every language, and a hidden message at the end.",
  icon: "door-open",
  category: "effects",
  script: "sprites/helloWorld.ts",
  startLabel: "Hello world",
  params: [
    {
      id: "finalMessage",
      label: "Final message to the world",
      type: "text",
      flag: "--finalMessage",
      default: "WELKOM!",
      placeholder: "WELKOM!",
      maxLength: 16,
      required: true,
    },
    {
      id: "nMessages",
      label: "Number of messages",
      type: "number",
      flag: "--nMessages",
      min: 1,
      placeholder: "300",
      advanced: true,
    },
    showTime,
  ],
});
