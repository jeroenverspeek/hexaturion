import { showTime } from "../common";
import type { Choice } from "../types";
import { defineApp } from "../types";

function video(name: string): Choice {
  return { value: `${name}.mp4`, label: name, group: "Videos" };
}

/** An animated gif of apps/animated_gifs/: showVideo.ts takes a path as well as a name in apps/videos/. */
function gif(file: string, label: string): Choice {
  return { value: `apps/animated_gifs/${file}.gif`, label, group: "Animated gifs" };
}

export default defineApp({
  id: "video",
  title: "Video",
  description: "Videos and animated gifs.",
  icon: "video",
  category: "media",
  script: "video/showVideo.ts",
  startLabel: "Play",
  params: [
    {
      id: "video",
      label: "Video",
      type: "select",
      flag: "--video",
      default: "rotto.mp4",
      choices: [
        video("rotto"),
        video("space"),
        video("trippy1"),
        video("trippy2"),
        gif("birthday_animated_gif/happy-birthday", "happy birthday"),
        gif("fruit", "fruit"),
        gif("galaxy", "galaxy"),
        gif("globe", "globe"),
        gif("pingpong", "pingpong"),
        gif("psychedelic-kotdwara", "psychedelic"),
        gif("space", "space"),
        gif("spinning_colors", "spinning colors"),
        gif("squares", "squares"),
        gif("thingy", "thingy"),
        gif("tumblr_a5fa375fa82ae7f2d505069080ffa807_cf9380bd_500", "tumbler"),
        gif("tunnel", "tunnel"),
        gif("wolfenstein", "Wolfenstein"),
      ],
    },
    {
      id: "loop",
      label: "Play it over and over",
      type: "boolean",
      flag: "--loop",
      default: true,
    },
    {
      id: "layout",
      label: "Layout",
      type: "select",
      flag: "--layout",
      default: "",
      choices: [
        { value: "", label: "the whole video on every face" },
        { value: "matrix", label: "one frame over all six faces" },
      ],
      advanced: true,
    },
    {
      id: "fit",
      label: "Fit",
      type: "select",
      flag: "--fit",
      default: "",
      choices: [
        { value: "", label: "fill and crop" },
        { value: "contain", label: "fit and letterbox" },
        { value: "stretch", label: "squeeze" },
      ],
      advanced: true,
    },
    showTime,
  ],
});
