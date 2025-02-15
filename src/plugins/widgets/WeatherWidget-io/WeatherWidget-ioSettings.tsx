import React, { FC } from "react";
import LocationInput from "./LocationInput";
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
    <LocationInput
      latitude={data.latitude}
      longitude={data.longitude}
      onChange={(location) => setData({ ...data, ...location })}
    />


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

    {data.latitude && data.latitude ? (
      <>
        <label>
          Name
          <input
            type="text"
            value={data.name || ""}
            placeholder="Optional name"
            onChange={(event) =>
              setData({ ...data, name: event.target.value || undefined })
            }
          />
        </label>

        <hr />

        <label>
          <input
            type="checkbox"
            checked={data.showDetails}
            onChange={() =>
              setData({ ...data, showDetails: !data.showDetails })
            }
          />{" "}
          Show extended details
        </label>

        <label>
          <input
            type="checkbox"
            checked={data.showCity}
            onChange={() =>
              setData({ ...data, showCity: !data.showCity })
            }
          />{" "}
          Show city name
        </label>


        <label>
          <input
            type="radio"
            checked={data.units === "si"}
            onChange={() => setData({ ...data, units: "si" })}
          />{" "}
          Metric units
        </label>

        <label>
          <input
            type="radio"
            checked={data.units === "us"}
            onChange={() => setData({ ...data, units: "us" })}
          />{" "}
          Imperial units
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
      </>
    ) : null}
  </div>
);

export default WeatherSettings;

