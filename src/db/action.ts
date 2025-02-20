import { nanoid } from "nanoid";
import { DB } from "../lib";
import migrateFrom2 from "./migrations/migrate2";
import { selectWidgets } from "./select";
import { cache, db, WidgetDisplay } from "./state";

export const createId = (): string => nanoid(12);

// Background actions

/** Change the background */
export const setBackground = (key: string): void => {
  const current = DB.get(db, "background");
  const id = createId();
  DB.put(db, "background", {
    id,
    key,
    display: { blur: 0, luminosity: -0.2, nightDim: false },
  });
  DB.del(db, `data/${current.id}`);
  DB.del(cache, current.id);
};

// Widget actions

/** Add a new widget */
export const addWidget = (key: string): void => {
  const id = createId();
  const widgets = selectWidgets();
  const order = widgets.length > 0 ? widgets[widgets.length - 1].order + 1 : 0;
  DB.put(db, `widget/${id}`, {
    id,
    key,
    order,
    display: { position: "middleCentre" },
  });
};

/** Remove a widget */
export const removeWidget = (id: string): void => {
  DB.put(db, `widget/${id}`, null);
  DB.del(db, `data/${id}`);
  DB.del(cache, id);
};

/** Reorder a widget */
export const reorderWidget = (from: number, to: number): void => {
  const widgets = selectWidgets();
  widgets.splice(to, 0, widgets.splice(from, 1)[0]);
  widgets.forEach((widget, order) =>
    DB.put(db, `widget/${widget.id}`, { ...widget, order }),
  );
};

/** Set display properties of a widget */
export const setWidgetDisplay = (
  id: string,
  display: Partial<WidgetDisplay>,
) => {
  const widget = DB.get(db, `widget/${id}`);
  if (!widget) throw new Error("Widget not found while");
  DB.put(db, `widget/${id}`, {
    ...widget,
    display: { ...widget.display, ...display },
  });
};

// UI actions

/** Toggle dashboard focus mode */
export const toggleFocus = () => {
  DB.put(db, "focus", !DB.get(db, "focus"));
};

// Store actions

/** Import database from a dump */
export const importStore = (dump: any): void => {
  // TODO: Add proper schema validation
  if (typeof dump !== "object" || dump === null)
    throw new TypeError("Unexpected format");

  const shouldOverride = window.confirm(
    "Are you sure you want to import new settings? This action is non-reversible."
  );
  if (!shouldOverride) return;

  resetStore();
  if ("backgrounds" in dump) {
    // Version 2 config
    DB.put(db, `widget/default-time`, null);
    DB.put(db, `widget/default-greeting`, null);
    dump = migrateFrom2(dump);
  } else if (dump.version === 3) {
    // Version 3 config
    delete dump.version;
  } else if (dump.version > 3) {
    // Future version
    throw new TypeError("Settings exported from an newer version of Tabliss");
  } else {
    // Unknown version
    throw new TypeError("Unknown settings version");
  }
  // @ts-ignore
  Object.entries(dump).forEach(([key, val]) => DB.put(db, key, val));
};

/** Export a database dump */
export const exportStore = (): string => {
  return JSON.stringify({
    ...Object.fromEntries(DB.prefix(db, "")),
    version: 3,
  });
};

/** Reset the database */
export const resetStore = (): void => {
  clear(db);
  clear(cache);
};

const clear = (db: DB.Database): void => {
  // @ts-ignore
  for (const [key] of DB.prefix(db, "")) DB.del(db, key);
};

/** Import settings from URL parameters and persist them */
export function importFromUrl(): void {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const jsonParam = urlParams.get('config');
    
    if (jsonParam) {
      const state = JSON.parse(decodeURIComponent(jsonParam));
      
      // Ask the user if they really want to import new settings
      const shouldOverride = window.confirm(
        "Are you sure you want to import new settings from the URL? This action is non-reversible."
      );
      if (!shouldOverride) return;
      
      // Import the settings
      importStore(state);
      
      // Force a sync to storage
      DB.atomic(db, (trx) => {
        Object.entries(state).forEach(([key, val]) => {
          // @ts-ignore
          DB.put(trx, key, val);
        });
      });
      
      // Clean up URL after successful import
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  } catch (error) {
    console.warn('Failed to import settings from URL:', error);
    // Silently fail and use default/local settings
  }
}
