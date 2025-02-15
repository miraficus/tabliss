import React, { FC } from "react";
// import LocationInput from "./LocationInput";
import { defaultData, Props } from "./types";

const themes = [
  "original",
  "pure",
  "orange",
  "gray",
  "dark",
  "desert",
  "candy",
  "beige",
  "blank",
  "salmon"
]

const WeatherSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="WeatherWidget-ioSettings">
    <label>
        HTML Snippet
        <textarea
          rows={3}
          style={{ fontFamily: "monospace" }}
          value={data.customUrl}
          onChange={(event) => setData({ ...data, customUrl: event.target.value })}
        />
      </label>

    <label>
      Theme
      <select
        value={data.theme}
        onChange={(event) => {
          console.log(`Setting theme to ${event.target.value}`);
          setData({ ...data, theme: event.target.value as typeof data.theme })
        }}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}

      </select>
    </label>

    <label>
      Label 1
      <input
        type="text"
        value={data.label_1}
        onChange={(event) =>
          setData({ ...data, label_1: event.target.value })
        }
      />
    </label>

    <label>
      Label 2
      <input
        type="text"
        value={data.label_2}
        onChange={(event) =>
          setData({ ...data, label_2: event.target.value })
        }
      />
    </label>

        <p>
          <a
            href="https://weatherwidget.io/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Weather Widget from weatherwidget.io
          </a>
        </p>
  </div>
);

export default WeatherSettings;

