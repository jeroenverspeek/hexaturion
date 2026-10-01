import { rubikSizes, showTime } from "../common";
import type { Choice } from "../types";
import { defineApp } from "../types";

/**
 The patterns showRubiksCubePattern.ts knows for each size, as
 listRubiksPatterns.ts on the device prints them (without its test pattern,
 innerLayersOnly).
*/
const everySize = ["anaconda", "checkerboard", "crosses", "cubex2", "cubex3", "cubex4", "cubex9", "sixSpots", "superflip", "zigzag"];
const patternNames: Record<string, string[]> = {
  1: [],
  2: [...everySize, "fourColumns", "fourSideCheckerboard", "pillar", "spiral"],
  3: [...everySize, "cross", "fourSpots", "greenMamba", "lines", "linesOnFourSides", "plusminus", "sixColourCubex3", "smiley", "twist"],
  4: [...everySize, "checkerboardFourSides", "columns", "cornerWrapper", "displacedMotif", "dots", "linesOnSixSides", "oppositeBoxes", "python", "sixColourPeak", "smallBoxBigBox"],
  5: [...everySize, "flippedEdges", "plusminus", "triCheckerboard", "twinPeaks"],
  6: [...everySize, "fourDots", "plusminus", "twister"],
  7: [...everySize, "crossChecker", "plusminus", "triCheckerboard"],
  8: [...everySize, "plusminus"],
  9: [...everySize, "plusminus"],
};

/** fourSideCheckerboard -> four side checkerboard */
function spelledOut(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

const patterns: Record<string, Choice[]> = {};
for (const [size, names] of Object.entries(patternNames)) {
  patterns[size] = ["wholeCubeMoves", ...names.sort()].map((name) => ({
    value: name,
    label: spelledOut(name),
  }));
}

export default defineApp({
  id: "rubiksCube",
  title: "Rubik's cube",
  description: "Patterns, scrambles and solves, from 1x1 up to 9x9.",
  icon: "cube",
  category: "puzzles",
  params: [
    {
      id: "nRubik",
      label: "Size",
      type: "select",
      flag: "--nRubik",
      default: 3,
      choices: rubikSizes,
    },
    {
      id: "pattern",
      label: "Pattern",
      type: "select",
      flag: "--pattern",
      default: "wholeCubeMoves",
      choicesBy: { param: "nRubik", choices: patterns },
    },
    {
      id: "nSteps",
      label: "Number of moves",
      type: "number",
      flag: "--nMoves",
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
        { value: "reversedPath", label: "the scramble backwards" },
        { value: "humanLike", label: "like a person" },
      ],
      help: "Solving like a person takes many moves, and on the big cubes a long time.",
    },
    {
      id: "rollOfJoy",
      label: "Roll of joy",
      type: "boolean",
      flag: "--rollOfJoy",
      default: false,
      help: "A full turn of the cube at the end.",
    },
    showTime,
  ],
  actions: [
    {
      id: "pattern",
      label: "Pattern",
      script: "rubiksCube/showRubiksCubePattern.ts",
      params: ["nRubik", "pattern", "rollOfJoy", "showTime"],
      preview: "/images/{nRubik}x{nRubik}/{pattern}.{nRubik}x{nRubik}.png",
    },
    {
      id: "scramble",
      label: "Scramble",
      script: "rubiksCube/scrambleSolveRubiksCube.ts",
      params: ["nRubik", "nSteps", "showTime"],
      preview: "/images/{nRubik}x{nRubik}/scrambled.{nRubik}x{nRubik}.png",
    },
    {
      id: "solve",
      label: "Solve",
      script: "rubiksCube/solveRubiksCubeCli.ts",
      params: ["nRubik", "nSteps", "solver", "rollOfJoy", "showTime"],
      preview: "/images/{nRubik}x{nRubik}/solved.{nRubik}x{nRubik}.png",
    },
    {
      id: "pseudoSolve",
      label: "Pseudo solve",
      script: "pseudoRubiksCube/pseudoSolveRubiksCube.ts",
      params: ["nRubik", { id: "nSteps", flag: "--nSteps" }, "showTime"],
      preview: "/images/{nRubik}x{nRubik}/solved.{nRubik}x{nRubik}.png",
    },
  ],
});
