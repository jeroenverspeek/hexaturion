import { showTime } from "../common";
import type { Choice } from "../types";
import { defineApp } from "../types";

/** A cube map of apps/cube_maps/ on the device, with the layout it is stored in. */
function cubemap(layout: "3x2" | "6x1" | "cross", value: string, label: string): Choice {
  return { value, label, args: ["--cubemapLayout", layout, "--cubemap", value] };
}

export default defineApp({
  id: "cubemap",
  title: "Cube maps",
  description: "A place seen from its middle, all around you.",
  icon: "panorama",
  category: "media",
  script: "cubemap/showCubemap.ts",
  startLabel: "Show cube map",
  params: [
    {
      id: "cubemap",
      label: "Cube map",
      type: "select",
      flag: "--cubemap",
      default: "garage.jpg",
      choices: [
        cubemap("3x2", "atlas1_CUBE.png", "atlas"),
        cubemap("6x1", "canary", "canary"),
        cubemap("6x1", "forbidden_city", "forbidden city"),
        cubemap("6x1", "unsplashed", "unsplashed"),
        cubemap("cross", "garage.jpg", "garage"),
        cubemap("cross", "lake.png", "lake"),
        cubemap("cross", "temple.jpg", "temple"),
      ],
    },
    showTime,
  ],
});
