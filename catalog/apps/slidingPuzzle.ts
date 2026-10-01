import { pictureDirs, rubikSizes, showTime } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "slidingPuzzle",
  title: "Sliding puzzle",
  description: "The 15-puzzle, but in 3D.",
  icon: "puzzle-piece",
  category: "puzzles",
  script: "rubiksQube/slidingPuzzleSolve.ts",
  startLabel: "Solve",
  preview: "/images/{nRubik}x{nRubik}/solved.{nRubik}x{nRubik}.png",
  params: [
    {
      id: "mode",
      label: "Facelets",
      type: "select",
      flag: "--mode",
      default: "rectangle",
      choices: [
        { value: "rectangle", label: "colours" },
        { value: "number", label: "numbers" },
        { value: "image", label: "a picture" },
      ],
    },
    {
      id: "pictureDir",
      label: "Picture from",
      type: "select",
      flag: "--pictureDir",
      default: "family",
      choices: pictureDirs,
      showIf: { mode: "image" },
    },
    {
      id: "nRubik",
      label: "Size",
      type: "select",
      flag: "--nRubik",
      default: 3,
      choices: rubikSizes,
    },
    {
      id: "nSlides",
      label: "Number of slides",
      type: "number",
      flag: "--nSlides",
      default: 20,
      min: 1,
      required: true,
    },
    {
      id: "solver",
      label: "Solver",
      type: "select",
      flag: "--solver",
      default: "reversedPath",
      choices: [
        { value: "reversedPath", label: "reversed path" },
        { value: "aStar", label: "a* shortest path" },
        { value: "bestFirst", label: "best first" },
      ],
    },
    {
      id: "heuristic",
      label: "Heuristic",
      type: "select",
      flag: "--heuristic",
      default: "taxiCube3D",
      choices: [
        { value: "taxiCube3D", label: "taxicube" },
        { value: "taxiCubeReduced3D", label: "taxicube reduced" },
        { value: "euclidian3D", label: "Euclidian" },
      ],
      showIf: { solver: ["aStar", "bestFirst"] },
    },
    showTime,
  ],
});
