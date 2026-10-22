/**
 Hexaturion's own texts, in English and in Dutch (useLanguage.ts). {name}
 in a text is filled in where it is used; {device} and {theDevice} are the
 device talked to - "cube", "the cube"; "kubus", "de kubus" - and {Device}
 and {TheDevice} the same with a capital, to begin a sentence with.

 What the cube and the panel tell themselves - their apps, settings and
 messages - is theirs, in their own language.
*/

export const languages = ["en", "nl"] as const;
export type Language = (typeof languages)[number];

export const english = {
  "language.en": "English",
  "language.nl": "Nederlands",
  "language.choose": "Language",

  "nav.home": "Home",
  "nav.gallery": "Gallery",
  "nav.settings": "Settings",
  "nav.about": "About",
  "nav.devices": "Device",

  "device.cube": "cube",
  "device.panel": "panel",
  "device.label.cube": "Cube",
  "device.label.panel": "Panel",

  "apps.title": "Apps",
  "apps.all": "All apps",
  "apps.asking": "Asking {theDevice} for its apps...",
  "apps.theirs": "The apps are {theDevice}'s to tell. {problem}",
  "apps.tryAgain": "Try again",
  "app.none": "There is no such app",
  "app.askingWhether": "Asking {theDevice} whether it has one by now...",
  "app.advanced": "Advanced",
  "app.command": "Command",
  "app.defaults": "Back to the defaults",

  "stats.title": "Solve statistics",
  "stats.solves": "Solves",
  "stats.solved": "Solved",
  "stats.moves": "Moves",
  "stats.time": "Time",
  "stats.note": "Of the last {window} solves of this puzzle - this size, solver and goal: how many succeeded, and the moves and the time on average of those that did. The time is the solver's thinking, not the moves shown afterwards.",

  "playing.noAnswer": "{TheDevice} does not answer",
  "playing.justStarted": "just started",
  "playing.minutes": "for {minutes} min",
  "playing.hours": "for {hours} h {minutes} min",
  "playing.failed": "stopped with an error",
  "playing.nothing": "Nothing is running",

  "pad.title": "Play",
  "pad.hint": "Play on {theDevice} with these buttons, or with the arrow keys of a keyboard.",
  "pad.hintKeys": "Play on {theDevice} with these buttons, or with the keys of a keyboard: the letter for a move, with Shift the other way.",
  "pad.hintButtons": "Play on {theDevice} with these buttons.",
  "pad.typed": "Another move",
  "pad.typedPlaceholder": "e.g. 3R",
  "pad.turn": "Turn",
  "pad.up": "Up",
  "pad.down": "Down",
  "pad.left": "Left",
  "pad.right": "Right",
  "pad.fire": "Fire",
  "pad.start": "Start",
  "pad.pause": "Pause",
  "stop": "Stop",

  "settings.title": "Settings",
  "settings.of": "Settings of {theDevice}",
  "settings.default": "Back to the default",
  "settings.save": "Save",
  "settings.saved": "Saved on {theDevice}",
  "settings.notSaved": "Not saved yet",
  "settings.asking": "Asking {theDevice} for its settings...",
  "settings.devices": "Devices",
  "settings.power": "Power",
  "settings.reboot": "Reboot {device}",
  "settings.shutdown": "Shut down {device}",
  "settings.rebootQuestion": "Reboot {theDevice}?",
  "settings.shutdownQuestion": "Shut {theDevice} down? It takes the power switch to start it again.",
  "setting.remove": "Remove {name}",
  "setting.none": "None",
  "setting.add": "Add",
  "setting.full": "That is as many as there can be: {max}.",
  "setting.not": "Not {what}",
  "setting.notAddable": "one that can be added",
  "setting.twice": "{name} is in the list already",
  "setting.addList": "Add a ready list...",
  "setting.fetching": "Fetching the list...",
  "setting.added": "{count} added, from {source}",
  "setting.clear": "Empty the list",

  "devices.needsName": "A device needs a name.",
  "devices.needsAddress": "{name} needs an address, such as 192.168.1.136",
  "devices.twice": "There are two devices called {name}.",
  "devices.name": "Name",
  "devices.address": "Address",
  "devices.remove": "Remove {name}",
  "devices.kept": "Kept in this browser. An address without a port is taken to be on 3000, where the servers listen.",
  "devices.save": "Save devices",
  "devices.add": "Add a device",
  "devices.backToDefaults": "Back to the cube and the panel",

  "problem.noAnswer": "{TheDevice} does not answer. Is it on, and on the same network as you?",
  "problem.wrong": "Something went wrong! See console for details.",
  "error.notFound": "Page not found",
  "error.other": "An error occurred",
  "error.home": "Home page",

  "about.title": "About Hexaturion",
  "about.version": "version {version}",
  "about.motto": "Commander of the six faces",
  "about.picture": "Hexaturion cube",
  "about.production": "A Verspeek production",
  "about.contact": "Contact: {address}",
  "about.back": "Back to Home page",

  "gallery.title": "Hexaturion Video Gallery",
  "gallery.subtitle": "Watch the animations of the LED Hexahedron.",
  "gallery.close": "Close video",
};

export type TextKey = keyof typeof english;

export const dutch: Record<TextKey, string> = {
  "language.en": "English",
  "language.nl": "Nederlands",
  "language.choose": "Taal",

  "nav.home": "Start",
  "nav.gallery": "Galerij",
  "nav.settings": "Instellingen",
  "nav.about": "Over",
  "nav.devices": "Apparaat",

  "device.cube": "kubus",
  "device.panel": "paneel",
  "device.label.cube": "Kubus",
  "device.label.panel": "Paneel",

  "apps.title": "Apps",
  "apps.all": "Alle apps",
  "apps.asking": "Ik vraag {theDevice} welke apps er zijn...",
  "apps.theirs": "Welke apps er zijn, vertelt {theDevice} zelf. {problem}",
  "apps.tryAgain": "Opnieuw proberen",
  "app.none": "Die app is er niet",
  "app.askingWhether": "Ik vraag {theDevice} of die er inmiddels is...",
  "app.advanced": "Geavanceerd",
  "app.command": "Opdracht",
  "app.defaults": "Terug naar de standaardwaarden",

  "stats.title": "Oplosstatistieken",
  "stats.solves": "Keer",
  "stats.solved": "Opgelost",
  "stats.moves": "Zetten",
  "stats.time": "Tijd",
  "stats.note": "Van de laatste {window} keer van deze puzzel - deze grootte, oplosser en doel: hoe vaak het lukte, en de zetten en de tijd gemiddeld van de keren dat het lukte. De tijd is het denkwerk van de oplosser, niet het tonen van de zetten daarna.",

  "playing.noAnswer": "{TheDevice} antwoordt niet",
  "playing.justStarted": "net gestart",
  "playing.minutes": "al {minutes} min",
  "playing.hours": "al {hours} u {minutes} min",
  "playing.failed": "is gestopt met een fout",
  "playing.nothing": "Er draait niets",

  "pad.title": "Spelen",
  "pad.hint": "Speel op {theDevice} met deze knoppen, of met de pijltjestoetsen van een toetsenbord.",
  "pad.hintKeys": "Speel op {theDevice} met deze knoppen, of met de toetsen van een toetsenbord: de letter voor een zet, met Shift de andere kant op.",
  "pad.hintButtons": "Speel op {theDevice} met deze knoppen.",
  "pad.typed": "Een andere zet",
  "pad.typedPlaceholder": "bijv. 3R",
  "pad.turn": "Draai",
  "pad.up": "Omhoog",
  "pad.down": "Omlaag",
  "pad.left": "Links",
  "pad.right": "Rechts",
  "pad.fire": "Vuur",
  "pad.start": "Start",
  "pad.pause": "Pauze",
  "stop": "Stop",

  "settings.title": "Instellingen",
  "settings.of": "Instellingen van {theDevice}",
  "settings.default": "Terug naar de standaardwaarde",
  "settings.save": "Opslaan",
  "settings.saved": "Opgeslagen op {theDevice}",
  "settings.notSaved": "Nog niet opgeslagen",
  "settings.asking": "Ik vraag {theDevice} om zijn instellingen...",
  "settings.devices": "Apparaten",
  "settings.power": "Aan en uit",
  "settings.reboot": "{Device} herstarten",
  "settings.shutdown": "{Device} uitzetten",
  "settings.rebootQuestion": "{TheDevice} herstarten?",
  "settings.shutdownQuestion": "{TheDevice} uitzetten? Alleen met de aan/uit-schakelaar gaat het weer aan.",
  "setting.remove": "{name} weghalen",
  "setting.none": "Geen",
  "setting.add": "Toevoegen",
  "setting.full": "Meer kunnen er niet bij: {max}.",
  "setting.not": "Niet {what}",
  "setting.notAddable": "iets dat erbij kan",
  "setting.twice": "{name} staat al in de lijst",
  "setting.addList": "Een kant-en-klare lijst toevoegen...",
  "setting.fetching": "De lijst ophalen...",
  "setting.added": "{count} toegevoegd, uit {source}",
  "setting.clear": "De lijst leegmaken",

  "devices.needsName": "Een apparaat heeft een naam nodig.",
  "devices.needsAddress": "{name} heeft een adres nodig, zoals 192.168.1.136",
  "devices.twice": "Er zijn twee apparaten die {name} heten.",
  "devices.name": "Naam",
  "devices.address": "Adres",
  "devices.remove": "{name} weghalen",
  "devices.kept": "Bewaard in deze browser. Een adres zonder poort krijgt poort 3000, waar de servers luisteren.",
  "devices.save": "Apparaten opslaan",
  "devices.add": "Apparaat toevoegen",
  "devices.backToDefaults": "Terug naar de kubus en het paneel",

  "problem.noAnswer": "{TheDevice} antwoordt niet. Staat het aan, en op hetzelfde netwerk als jij?",
  "problem.wrong": "Er ging iets mis! Zie de console voor de details.",
  "error.notFound": "Pagina niet gevonden",
  "error.other": "Er ging iets mis",
  "error.home": "Startpagina",

  "about.title": "Over Hexaturion",
  "about.version": "versie {version}",
  "about.motto": "Gebieder over de zes vlakken",
  "about.picture": "De Hexaturion-kubus",
  "about.production": "Een Verspeek-productie",
  "about.contact": "Contact: {address}",
  "about.back": "Terug naar de startpagina",

  "gallery.title": "Hexaturion-videogalerij",
  "gallery.subtitle": "Bekijk de animaties van de LED Hexahedron.",
  "gallery.close": "Video sluiten",
};

/**
 The headings of the apps' categories in Dutch, by the category's id: the
 cube and the panel give them in English. One that is not here keeps the
 device's own heading.
*/
export const dutchCategories: Record<string, string> = {
  info: "Klok en nieuws",
  puzzles: "Puzzels en spellen",
  worlds: "Werelden",
  effects: "Effecten",
  media: "Foto's en video",
  demo: "Demo",
};

/** The Dutch article of the devices the site knows: "de kubus", "het paneel". */
export const dutchArticle: Record<string, string> = { kubus: "de", paneel: "het" };
