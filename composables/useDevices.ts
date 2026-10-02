/** A device the GUI can talk to: the cube, the panel. */
export interface Device {
  /** What it is kept under in the browser; never shown. */
  id: string;
  /** What it is called in the switcher. */
  label: string;
  /** Where its server is: http://192.168.1.136:3000 */
  address: string;
}

const devicesKey = "hexaturion.devices";
const activeKey = "hexaturion.device";

function kept<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

function keep(key: string, value: unknown): void {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // a browser that keeps nothing: it holds for as long as the page is open
  }
}

function isDevice(value: unknown): value is Device {
  const device = value as Device;
  return typeof device?.id === "string" && typeof device.label === "string" && typeof device.address === "string";
}

/**
 An address as it is typed, made into one to fetch from: 192.168.1.50
 becomes http://192.168.1.50:3000 - the servers listen on port 3000, and
 not over https. Null when it cannot be an address.
*/
export function deviceAddress(typed: string): string | null {
  const text = typed.trim();
  if (text === "") return null;
  // any other kind of address than http(s) is not one a server of ours listens at
  if (text.includes("://") && !/^https?:\/\//i.test(text)) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(text) ? text : `http://${text}`);
    if (url.username !== "" || !/^[\w.-]+$/.test(url.hostname)) return null;
    // a port that was typed stays, also one that URL leaves out as the usual one
    const host = text.replace(/^https?:\/\//i, "").split("/")[0]!;
    const typedPort = /:(\d+)$/.exec(host)?.[1];
    const port = typedPort ?? (url.protocol === "http:" ? "3000" : "");
    return `${url.protocol}//${url.hostname}${port ? `:${port}` : ""}`;
  } catch {
    return null;
  }
}

/**
 The devices the GUI knows, and the one it talks to now: kept in the
 browser, so that each phone remembers its own choice. Until someone
 changes the list it is the one the site comes with - the cube and the
 panel at their addresses at home.
*/
export const useDevices = () => {
  const config = useRuntimeConfig().public;
  const defaults = (): Device[] => [
    { id: "cube", label: "Cube", address: config.API_BASE_URL },
    { id: "panel", label: "Panel", address: config.PANEL_BASE_URL },
  ];

  const devices = useState<Device[]>("devices", () => {
    const list = kept<unknown>(devicesKey);
    return Array.isArray(list) && list.length > 0 && list.every(isDevice) ? list : defaults();
  });
  const activeId = useState<string>("activeDevice", () => {
    const id = kept<unknown>(activeKey);
    return devices.value.some((device) => device.id === id) ? (id as string) : devices.value[0]!.id;
  });
  const active = computed<Device>(() => devices.value.find((device) => device.id === activeId.value) ?? devices.value[0]!);

  /** Whether the list is still the one the site comes with. */
  const areDefaults = computed(() => JSON.stringify(devices.value) === JSON.stringify(defaults()));

  /** What was known was about another device: forget it, and ask this one. */
  const turnTo = (): void => {
    const catalog = useCatalog();
    const status = useCubeStatus();
    catalog.reset();
    status.reset();
    useCubeSettings().reset();
    void catalog.load();
    void status.refresh();
  };

  /** Talk to another device from now on. */
  const select = (id: string): void => {
    if (id === activeId.value || !devices.value.some((device) => device.id === id)) return;
    activeId.value = id;
    keep(activeKey, id);
    turnTo();
  };

  /** A new list of devices. The one talked to stays, if it is still in it. */
  const save = (list: Device[]): void => {
    const before = active.value;
    devices.value = list;
    // the list the site comes with is not kept: it then follows the site's, should that change
    keep(devicesKey, areDefaults.value ? null : list);
    if (!list.some((device) => device.id === activeId.value)) {
      activeId.value = list[0]!.id;
      keep(activeKey, activeId.value);
    }
    if (active.value.id !== before.id || active.value.address !== before.address) turnTo();
  };

  const restoreDefaults = (): void => save(defaults());

  return { devices, active, areDefaults, select, save, restoreDefaults, defaults };
};

/**
 Which device is talked to now, to hold an answer against: one that comes
 back after the GUI has turned to another device is not about that one.
*/
export function deviceStamp(): string {
  const { active } = useDevices();
  return `${active.value.id} ${active.value.address}`;
}
