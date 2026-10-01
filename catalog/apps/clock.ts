import { showTime, zenith } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "clock",
  title: "Clock",
  description: "A digital clock, or the time in words.",
  icon: "clock",
  category: "info",
  script: "smartClock/smartClock.ts",
  startLabel: "Show clock",
  params: [
    {
      id: "clockType",
      label: "Type",
      type: "select",
      flag: "--clockType",
      default: "digital",
      choices: [
        { value: "digital", label: "Digital" },
        { value: "word", label: "Word" },
      ],
    },
    {
      id: "language",
      label: "Language",
      type: "select",
      flag: "--language",
      default: "Dutch",
      choices: [
        { value: "Dutch", label: "Nederlands" },
        { value: "English", label: "English" },
        { value: "German", label: "Deutsch" },
        { value: "French", label: "Français" },
      ],
      showIf: { clockType: "word" },
    },
    {
      id: "animationInterval",
      label: "Animation every",
      type: "select",
      flag: "--animationInterval",
      default: "",
      choices: [
        { value: "", label: "no animation" },
        { value: 1, label: "1 minute" },
        { value: 5, label: "5 minutes" },
        { value: 15, label: "15 minutes" },
        { value: 30, label: "30 minutes" },
        { value: 60, label: "60 minutes" },
      ],
      help: "The time travels once round the cube.",
      showIf: { clockType: "word" },
    },
    {
      id: "background",
      label: "Show day/night background",
      type: "boolean",
      flag: "--background",
      value: "earth",
      default: false,
      help: "The earth as it is lit right now.",
      showIf: { clockType: "digital" },
    },
    {
      ...zenith("Where the earth's north pole goes."),
      showIf: { clockType: "digital", background: true },
    },
    showTime,
  ],
});
