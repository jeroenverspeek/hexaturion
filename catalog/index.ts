/**
 Every app the GUI can start. Adding an app: describe it in a file in apps/,
 and list it here - the home page and its own page follow from that.
*/
import type { AppDefinition, Category } from "./types";
import aquarium from "./apps/aquarium";
import asteroids from "./apps/asteroids";
import celestialBodies from "./apps/celestialBodies";
import clock from "./apps/clock";
import cubemap from "./apps/cubemap";
import fireworks from "./apps/fireworks";
import fluid from "./apps/fluid";
import helloWorld from "./apps/helloWorld";
import life from "./apps/life";
import pictures from "./apps/pictures";
import rubiksCube from "./apps/rubiksCube";
import slidingPuzzle from "./apps/slidingPuzzle";
import slosh from "./apps/slosh";
import sparkle from "./apps/sparkle";
import sprinkle from "./apps/sprinkle";
import stockMarket from "./apps/stockMarket";
import superDemo from "./apps/superDemo";
import video from "./apps/video";
import weather from "./apps/weather";

/** In the order they come on the home page. */
export const categories: Category[] = [
  { id: "info", title: "Clock and news" },
  { id: "puzzles", title: "Puzzles and games" },
  { id: "worlds", title: "Worlds" },
  { id: "effects", title: "Effects" },
  { id: "media", title: "Pictures and video" },
  { id: "demo", title: "Demo" },
];

/** In the order they come within their category. */
export const apps: AppDefinition[] = [
  clock,
  weather,
  stockMarket,
  rubiksCube,
  slidingPuzzle,
  asteroids,
  celestialBodies,
  aquarium,
  fluid,
  slosh,
  life,
  fireworks,
  sparkle,
  sprinkle,
  helloWorld,
  pictures,
  cubemap,
  video,
  superDemo,
];

export function findApp(id: string): AppDefinition | undefined {
  return apps.find((app) => app.id === id);
}
