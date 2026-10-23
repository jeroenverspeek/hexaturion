# How Hexaturion works

Hexaturion knows no app of its own. Every app is described as data on the
device - a **manifest** next to each app, gathered into the device's
**catalog** - and Hexaturion makes a tile and a page for each from that.
A new app on the cube or the panel shows up here without a change to
Hexaturion.

    phone or PC                          the cube's or the panel's Pi
    ┌──────────────────────┐   JSON over  ┌───────────────────────────────┐
    │ hexaturion.com       │   http, port │ server.ts (as root)           │
    │ (a static Nuxt site) │ ───────────▶ │  - the catalog, read at start │
    │                      │   3000       │  - starts one app at a time   │
    └──────────────────────┘              │  - settings, status, stats    │
                                          └───────────────┬───────────────┘
                                                          │ tsx / python3
                                                          ▼
                                                 an app in cube/ or panel/

The device side is led-hexahedron: `server.ts` in its root, and the
catalog in `common/src/catalog/` (what the cube and the panel share) and
`cube/src/catalog/` or `panel/src/catalog/` (each one's own). Its
`README.md` there has the server and the manifests in full; this file is
the whole from Hexaturion's side.

## The manifest

A `manifest.ts` next to an app says how to show it, how to start it and
what can be set:

```ts
export default defineApp({
  id: "fluid",                  // in the address of its page: /app?id=fluid
  title: "Fluid",
  description: "Ink, fire or a whirlpool flowing over all six faces.",
  icon: "droplet",              // a Font Awesome solid icon
  category: "worlds",
  script: "fluid/showFluid.ts", // relative to cube/src/
  params: [
    {
      id: "mode", label: "Mode", type: "select", flag: "--mode", default: "ink",
      choices: [{ value: "ink" }, { value: "fire" }, { value: "whirlpool" }],
    },
    speed, zenith("Which way is up."), showTime,   // shared ones, from common.ts
  ],
});
```

- **Parameters** are `boolean`, `select`, `multiselect`, `number` or
  `text`, each with the flag it is sent as. A parameter left empty is not
  sent, which leaves it to the app's own default.
- **Actions** are the ways an app can be started: a script each, with some
  of the app's parameters (under their own flag or another). An app with
  one `script` has one action; with several it gets a tab for each.
- **Conditions**: `showIf` shows and sends a parameter only when others
  have certain values; `choicesBy` makes the choices depend on another
  parameter (the Rubik's patterns on the size).
- **`setting`** ties a parameter to a setting of the device: its page
  starts at what is set there, every time.
- **`controls`** make an action playable from the page: the buttons to
  show while it runs, with `typed` and `controlsHelp`.
- **`preview`**: a picture to go with the values, a URL with
  `{parameter}` in it.
- **`forever`** on a number: a tick box next to the field ("forever")
  for no number at all - the field greyed out, nothing sent, which leaves
  it to the app. "Stop after" of every app has it, and the pictures'
  "Show for".
- **`upload`** on a select: pictures can be uploaded from the page to
  become choices of it (the cube map's, the pictures'), and deleted again.

Lists of what happens to be on the device - videos, picture folders, cube
maps, Rubik's and Life patterns - are read from it by the manifests, so a
file added there turns up on the page too. `npm run testCatalog` in
led-hexahedron holds every manifest against its app's `--help`.

## The catalog

`catalog.ts` on the device gathers the manifests into one object, and the
server hands that out at `GET /apps`. `types/catalog.ts` here describes it;
it follows `common/src/catalog/types.ts` there, kept the same by hand.

```ts
interface Catalog {
  device: { kind: "cube" | "panel"; name: string };  // "the cube does not answer"
  categories: Category[];         // in the order of the home page
  apps: AppDefinition[];          // in the order within their category
  settings: SettingDefinition[];  // what can be set once for the device
  nl?: Record<string, string>;    // the Dutch of the option, button and setting texts, by their English
}
```

On the way out the catalog gets each app's Dutch title and description
(`app.nl`), and a preview for every action that has none:
`/images/apps/<cube|panel>/<app>.png` (`<app>.<action>.png` for an app
with several actions). Those pictures are in `public/images/apps/` here,
made by `common/src/appPictures/makeAppPictures.ts` in led-hexahedron; one that is
missing is left out of the page.

The server reads the catalog once, when it starts: a change to a manifest
shows after `sudo systemctl restart cube` (or `square`). A broken manifest
makes `/apps` answer 503 with the reason.

## The server

| Request | Does |
|---|---|
| `GET /apps` | the catalog |
| `POST /start { app, action, params }` | starts that app; 409 while another runs |
| `POST /command { app, action, params }` | the command `/start` would run, without running it |
| `POST /stop` | stops what runs |
| `GET /status` | what runs and for how long, its `controls`; or how the last one ended |
| `POST /control { button, how }` | a button of the app that is played: `press`, `release` or `tap` |
| `GET` / `PUT /settings` | the setting definitions and their values; `PUT` changes the ones named, `null` back to the default |
| `GET /tickerLists`, `/tickerLists/:id` | ready lists of ticker symbols, for the stock market's setting |
| `POST /upload?app=&param=&name=` | a picture (the body) for a parameter with `upload`: answers `{ value }`, the choice made of it |
| `DELETE /upload?app=&param=&value=` | deletes a choice that was uploaded |
| `GET /stats` | the solve statistics of the Rubik's cube and the sliding puzzle |
| `POST /reboot`, `POST /shutdown` | the Pi |

Hexaturion never sends a command. `/start` gets which app, which action
and the values on the page, and the server makes the command from its own
catalog (`startCommand.ts`): the manifest's script and flags, and a value
only when the manifest allows it. Anything else is refused with 400 and
the reason. Besides that the server only answers pages of hexaturion.com
and of localhost, and reads only JSON. A refusal comes as
`{ error, nl }`, and `utils/reasonOf.ts` shows the one in the language
spoken.

## In the browser

The site is a static Nuxt app (`ssr: false`): `npm run generate` makes
it, and `.github/workflows/deploy.yml` puts it on GitHub Pages
(hexaturion.com) on each push to `main`. All it keeps, it keeps in the
browser's `localStorage`, so each phone has its own.

### Devices

`composables/useDevices.ts`: the list of devices and the one talked to
now. It starts as the cube and the panel at the addresses in
`nuxt.config.ts` (`API_BASE_URL`, `PANEL_BASE_URL`); the settings page
changes it (`DeviceList.vue`), and the switcher in the navbar
(`DeviceSwitcher.vue`) turns to another. Every request goes through
`useCustomFetch.ts`, to the device of now. Turning to another device
forgets its catalog, status and settings and asks the new one;
`deviceStamp()` makes sure an answer that comes in after the turn is
dropped.

### The catalog and the home page

`composables/useCatalog.ts` fetches `/apps` and keeps it under
`hexaturion.catalog.<device>`, so the tiles are there at once, and while
the device does not answer. Until a catalog is there, `CatalogMissing.vue`
says why. `pages/index.vue` shows a shelf per category, a tile
(`AppTile.vue`) per app.

### An app's page

`pages/app.vue` is one page for every app, `/app?id=clock`, which static
hosting can serve. It finds the app in the catalog, and is made anew when
the catalog's description of it changes. `components/AppPage.vue` and
`utils/appForm.ts` do the rest:

- **The form**: a field (`AppParamField.vue`) for each parameter of the
  action chosen whose `showIf` holds, the `advanced` ones under
  "Advanced". The choices come from `choicesFor()`: the manifest's, those
  of `choicesBy`, or the list of a setting.
- **Where it starts** (`initialValues()`): the manifest's defaults, with
  the values of the last visit laid over them
  (`hexaturion.app.<device>.<app>`). A parameter with a `setting` starts at
  the device's setting instead, and moves along when the settings come in,
  unless it was touched. `outOfChoice()` mends a value that is no longer on
  offer.
- **Start** sends `/start`, and is off while `unmetParams()` finds a
  required field empty or a number out of range. Under "Advanced" the page
  shows the command, asked of the device with `/command`.
- **The preview** is the action's `preview` with the values filled in.
- **Uploads**: a select with `upload` has "Upload a picture" under it.
  The picture is made small here first (`utils/shrinkPicture.ts`: at most
  2048 pixels, a JPEG, the right way up) and sent with `/upload`; the
  choice the device made of it is then started at once - in place of the
  app, when it runs already - and the catalog fetched again, which brings
  the new choice. A choice of the upload's group has "Delete" next to it.
- **Settings of the app** - a setting with `app`, such as the stock
  market's ticker symbols - are on its page (`SettingsForm.vue`), and solve
  statistics under the form (`SolveStats.vue`, from `/stats`).

### What runs, and playing it

`composables/useCubeStatus.ts` asks `/status`: the bar on every page
(`NowPlaying.vue`) every 3 seconds while the page is looked at, and
`useAPI.ts` after each request. The bar shows the app that runs with Stop,
how the last one ended, or that the device does not answer.

When the app that runs has `controls`, its page shows them
(`GamePad.vue`): a game's buttons (up, down, left, right, fire, start,
pause) as a pad, each telling `press` and `release`; any other button,
such as a Rubik's move, with its name or label on it, as a `tap`. Presses
go out one after the other, so a release never overtakes its press. A
keyboard works them too: the arrow keys, the letters of the moves, and the
key a button names. With `typed`, a field takes a move that has no button.

### Settings

`pages/settings.vue` shows the settings without an `app`, made from the
definitions `GET /settings` gives (`SettingsForm.vue`, a
`SettingField.vue` each), and saves with `PUT /settings`. The same page has
the list of devices, and reboot and shut down.

### Language

English or Dutch, chosen in the navbar (`LanguageSwitcher.vue`) and kept
under `hexaturion.language`, the browser's own the first time
(`composables/useLanguage.ts`). The site's own texts are in
`utils/texts.ts` (`t()`). The device's texts come in its catalog: `appText()`
takes an app's `nl`, `dt()` looks up an option, choice, button or setting
in the catalog's `nl`. The device is named as its catalog calls it
(`useDeviceName.ts`): the cube, the panel - de kubus, het paneel.

## Adding an app

Nothing to do in Hexaturion. On the device: a `manifest.ts` next to the
app, listed in `catalog.ts` where its tile should come, its Dutch in
`dutch.ts` and `dutchTexts.ts`, then `npm run testCatalog` and a restart
of the service. For its picture on the page, add
`public/images/apps/<cube|panel>/<app>.png` here.
