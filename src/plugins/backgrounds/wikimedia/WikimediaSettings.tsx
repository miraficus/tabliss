import React from "react";
import "./WikimediaSettings.sass";
import { DebounceInput } from "../../shared";
import { WikimediaDate, defaultData, Props } from "./types";

const WikimediaSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="ApodSettings">
    <label>
      Date of the picture
      <select
        value={data.date}
        onChange={(event) =>
          setData({ ...data, date: event.target.value as WikimediaDate })
        }
      >
        <option value="today">Today</option>
        <option value="custom">Custom date</option>
      </select>
    </label>

    {data.date === "custom" && (
      <label>
        Date
        <DebounceInput
          type="date"
          value={data.customDate}
          min="2005-01-01"
          className="date"
          onChange={(value) => setData({ ...data, customDate: value })}
          wait={500}
        />
      </label>
    )}

    <label>
      <input
        type="checkbox"
        checked={data.showTitle}
        onChange={() => setData({ ...data, showTitle: !data.showTitle })}
      />{" "}
      Show title
    </label>
  </div>
);

export default WikimediaSettings;

