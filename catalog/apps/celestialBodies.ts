import { showTime, zenith } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "celestialBodies",
  title: "Celestial bodies",
  description: "The earth, the moon, the sun and the planets.",
  icon: "earth-europe",
  category: "worlds",
  params: [
    {
      id: "body",
      label: "Celestial body",
      type: "select",
      flag: "--inputfile",
      default: "earth.jpg",
      choices: [
        { value: "earth.jpg", label: "earth" },
        { value: "sun.jpg", label: "sun" },
        { value: "moon.jpg", label: "moon" },
        { value: "mercury.jpg", label: "mercury" },
        { value: "venus.jpg", label: "venus" },
        { value: "mars.jpg", label: "mars" },
        { value: "jupiter.jpg", label: "jupiter" },
        { value: "blackhole.jpg", label: "black hole" },
      ],
    },
    {
      id: "rotate",
      label: "Rotate",
      type: "boolean",
      flag: "--rotate",
      default: false,
    },
    {
      id: "fixedSun",
      label: "Keep the sun where it is now",
      type: "boolean",
      flag: "--fixedSun",
      default: true,
      help: "Otherwise the earth turns under it.",
    },
    zenith("Where the north pole goes."),
    showTime,
  ],
  actions: [
    {
      id: "globe",
      label: "Globe",
      script: "celestialBodies/showCubeLatLonMap.ts",
      params: ["body", "rotate", "zenith", "showTime"],
    },
    {
      id: "dayNight",
      label: "Day and night",
      script: "celestialBodies/showDayNightMap.ts",
      params: ["fixedSun", "zenith", "showTime"],
    },
  ],
});
