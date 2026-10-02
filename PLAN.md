# Hexaturion: plan

From a row of hand-written tabs to a home screen of app tiles, a page per
app, a settings page, and a GUI that works for the cube (led-hexahedron) and
the single panel (led-tetragon) alike. Worked through one item at a time;
tick an item off when it is done.

## Decisions

- Every app is described as data, in an **app catalog**; one generic page
  renders an app from its description.
- The catalog lives **on the device**, next to each app, and is served by
  `server.js`.
- The GUI no longer starts hzeller's binaries (demo, video-viewer,
  led-image-viewer): Life and Video are TypeScript apps now.
- Settings that live on the device, to begin with: zenith, weather location
  and units, clock language, stock tickers.
- Playing interactive apps (Asteroids, the manual solvers) from the GUI comes
  later, and will need its own change to `server.js`. Until then Asteroids
  runs its autopilot.

## Phase 1 - the GUI, hexaturion only

Still talks to the present `/start` and `/stop`; nothing changes on the Pi.

- [x] 1.1 Catalog types, and the one function that turns an app and its
      values into a command
- [x] 1.2 Catalog entries for the apps the GUI had, without hzeller
- [x] 1.3 Catalog entries for the apps it lacked: aquarium, fluid, slosh,
      weather, life, asteroids (autopilot)
- [x] 1.4 Home page: a tile per app, grouped by category
- [x] 1.5 App page: the form for an app, an "Advanced" section, the last
      values remembered per app
- [x] 1.6 Settings page, with reboot and shut down (was the BOSS tab)
- [x] 1.7 Remove the tab components and the hzeller configuration

## Phase 2 - catalog, settings and safety on the cube

In led-hexahedron and here. Can be developed on a PC with `--simulate`.

- [x] 2.1 A manifest next to each app in led-hexahedron (`manifest.ts`,
      gathered in `apps/src/catalog/`); choices such as the Rubik's patterns,
      videos and picture directories are read from the device.
      `npm run listCatalog` prints it as JSON, `npm run testCatalog` holds
      every manifest against its app's `--help`. The copies in `catalog/`
      here stay until 2.8
- [x] 2.2 `GET /apps` serves the catalog. The server reads it once, when it
      starts (`sudo systemctl restart cube` after a change), and answers 503
      with the reason when a manifest is broken
- [x] 2.3 `POST /start` takes `{ app, action, params }`; the server checks
      them against its catalog and builds the command itself
      (`apps/src/catalog/startCommand.ts`), and the GUI sends that instead of
      a command. One app at a time, as intended: with an app running the
      answer is 409 and the GUI says which one to stop first. The raw
      `cubeAppCommand` form still works, for reboot and shut down and for
      the GUI as it is deployed now (until 2.4)
- [x] 2.4 The hole is closed: `/start` ran any command it was sent, as root,
      from any website. Now it only takes apps of the catalog; the raw
      `cubeAppCommand` form is refused; reboot and shut down have
      `POST /reboot` and `POST /shutdown`; pages of other sites than
      hexaturion.com (and localhost, for development) get 403; and only JSON
      is read, so a form on another site cannot ask either. What it is not:
      a lock - anyone on the home network can still ask the server directly.
      **The cube and the GUI now have to go live together**: the GUI as it
      is deployed sends commands, which the new server refuses
- [x] 2.5 `GET /status`, and a "now playing" bar with Stop on every page:
      which app runs and for how long, asked every 3 seconds while the page
      is looked at. It also says when the cube does not answer, and when the
      app started last stopped with an error. Only apps started through the
      server are known to it
- [x] 2.6 `GET` and `PUT /settings`, kept in `ledcube.local.json`: zenith
      (all 26 points of the cube), weather location and units, clock
      language, stock tickers. Which settings there are is part of the
      catalog (`apps/src/catalog/settings.ts`), for 2.7 to make its page
      from. Of these the apps themselves read only the zenith so far; the
      others reach an app through the GUI (2.7), not when it is started from
      a terminal or by the super demo
- [x] 2.7 Settings page for these, made from what the cube says there is
      to set; the app pages take them as defaults. A parameter names the
      setting it goes by (`setting: "location"`): its page starts at what is
      set, every time, rather than at what was on it the last time. The
      ticker symbols that are set are what the stock market offers, so ones
      the catalog does not list can be followed too
- [x] 2.8 The GUI fetches the catalog from the cube (`/apps`); its own
      `catalog/` and `utils/buildCommand.ts` are gone, and a new app on the
      cube shows up without a change here. The catalog of the last time is
      kept in the browser, so the tiles are there at once and while the cube
      does not answer. An app's page is `/app?id=clock` now, one page that
      static hosting can serve for every app. The command under "Advanced" is
      asked of the cube (`POST /command`)

## Phase 3 - the panel (led-tetragon)

- [x] 3.1 Its `server.js` could not start (`require` in an ES module): it
      has the same server as the cube now, and the same catalog files
      (`types.ts`, `startCommand.ts`, `localSettings.ts`, `listCatalog.ts`),
      kept the same by hand - `testSharedFiles.ts` in both holds them
      against each other. What differs is in each one's catalog: the catalog
      says which device it is (`device`: cube or panel) and where its
      settings are kept (`ledsquare.local.json`; a panel has no zenith).
      The server's own names no longer say cube: `LED_SIMULATE`,
      `LED_SETTINGS`, `LED_ALLOWED_ORIGINS`. The panel's catalog has no apps
      yet
- [x] 3.2 Manifests for its 19 apps, Snake included, adapted to what the
      panel's apps take: no zenith anywhere, a colour for the clock, the
      sliding puzzle with numbers or a picture from 2x2, the pseudo Rubik's
      cube as an app of its own, no Rubik's cube or cube maps. Its settings
      go by the manifests, as on the cube. `npm run testCatalog` runs the
      same five tests there
- [ ] 3.2b Snake on the cube needs a manifest too: it is on
      led-hexahedron's `main`, which `app-catalog` has not got yet, so that
      takes merging `main` into the branch first
- [x] 3.2c The GUI calls the device what its catalog calls it: "the panel
      does not answer", "Reboot panel". One that has not said so yet is
      taken for the cube
- [ ] 3.3 A list of devices and their addresses, kept in the browser,
      instead of the fixed `API_BASE_URL`
- [ ] 3.4 A device switcher in the navbar

## Later

- [ ] Interactive apps from the GUI: Asteroids, the manual Rubik's and
      sliding puzzle solvers (changes `server.js`)

## Found along the way, in led-hexahedron

- [x] `showRubiksCubePattern.ts` read `--nRubik` as text, so with
      `--nRubik 3` every pattern of that size alone (cross, greenMamba,
      smiley, ...) was refused as unknown. It is `type: 'int'` now; the cube
      needs this change before those patterns start from the GUI
- [ ] `smartClock.ts` accepts `'Français '` with a trailing space, so
      `--language Français` is refused (the GUI sends `French` meanwhile)
- [ ] `superDemo.py` starts `rubiksQube/slidingPuzzleImageSolve.ts`, which
      does not exist
- [ ] `superDemo.py` has `/home/ledcube64/...` paths written into it
