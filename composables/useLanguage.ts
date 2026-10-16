import type { AppDefinition } from "~/types/catalog";
import { dutch, dutchArticle, english, languages, type Language, type TextKey } from "~/utils/texts";

const languageKey = "hexaturion.language";

function keptLanguage(): Language | null {
  try {
    const kept = localStorage.getItem(languageKey);
    return languages.includes(kept as Language) ? (kept as Language) : null;
  } catch {
    return null;
  }
}

/** A text with a capital to begin with. */
const capital = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

/**
 The language the site speaks: English or Dutch, kept in this browser, so
 that each phone keeps its own - as it does its list of devices. The first
 time it is the browser's own language, Dutch for a Dutch one.
*/
export const useLanguage = () => {
  const language = useState<Language>("language", () => {
    const kept = keptLanguage();
    if (kept) return kept;
    return typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("nl") ? "nl" : "en";
  });

  /** Speak another language from now on. */
  const choose = (chosen: Language): void => {
    language.value = chosen;
    try {
      localStorage.setItem(languageKey, chosen);
    } catch {
      // a browser that keeps nothing: it holds for as long as the page is open
    }
  };

  /** The device talked to, in a sentence: its name, and with an article, each also with a capital. */
  const deviceWords = (): Record<string, string> => {
    const name = useDeviceName().value;
    const theDevice = language.value === "nl" ? (dutchArticle[name] ? `${dutchArticle[name]} ${name}` : name) : `the ${name}`;
    return { device: name, Device: capital(name), theDevice, TheDevice: capital(theDevice) };
  };

  /** A text in the language spoken, {name} in it filled in from `values` - and the device's words. */
  const t = (key: TextKey, values: Record<string, string | number> = {}): string => {
    const text = (language.value === "nl" ? dutch : english)[key];
    if (!text.includes("{")) return text;
    const all: Record<string, string | number> = { ...(text.match(/\{[Tt]he[Dd]evice\}|\{[Dd]evice\}/) ? deviceWords() : {}), ...values };
    return text.replace(/\{(\w+)\}/g, (whole, name: string) => (name in all ? String(all[name]) : whole));
  };

  /** An app's title and description in the language spoken: its Dutch, where the device gives it one. */
  const appText = (app: AppDefinition): { title: string; description: string } =>
    language.value === "nl" && app.nl ? app.nl : { title: app.title, description: app.description };

  return { language, choose, t, appText };
};
