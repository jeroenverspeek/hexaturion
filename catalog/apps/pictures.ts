import { pictureDirs } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "pictures",
  title: "Pictures",
  description: "A picture on every face of the cube.",
  icon: "image",
  category: "media",
  params: [
    {
      id: "cubePictureDir",
      label: "Pictures",
      type: "select",
      flag: "--cubePictureDir",
      default: "emoji",
      choices: pictureDirs,
    },
    {
      id: "showTime",
      label: "Show for",
      type: "number",
      flag: "--showTime",
      default: 20,
      min: 1,
      unit: "s",
      placeholder: "ever",
    },
  ],
  actions: [
    {
      id: "pictures",
      label: "Pictures",
      script: "cubePictures/showCubePictures.ts",
      params: ["cubePictureDir", "showTime"],
    },
    {
      id: "slideShow",
      label: "Slide show",
      script: "cubePictures/showBufferImage.ts",
      params: ["cubePictureDir", "showTime"],
    },
  ],
});
