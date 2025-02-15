import React from "react";
import { useEffect } from "react";
import { defaultData, Props } from "./types";

const data_mode = "Current";
const language = "en";
const data_days = "3";
const isFarenheit = true;
let location = "32d72n117d16/san-diego"

const Weather: React.FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://weatherwidget.io/js/widget.min.js";
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, [data.theme, data.label_1, data.label_2]);

  if (data.customUrl) {
    location = data.customUrl.match(/forecast7\.com\/en\/([^"]+)/)?.[1] || location;
  }
    console.log("location:", location);
  const widgets_url = `https://forecast7.com/${language}/${location}${isFarenheit ? "?unit=us" : ""}`;

  return (
    <div className="WeatherWidget-io">
      <a className="weatherwidget-io" href={widgets_url} data-label_1={data.label_1} data-label_2={data.label_2} data-days={data_days} data-mode={data_mode} data-icons="Climacons Animated" data-theme={data.theme} style={{ pointerEvents: "none" }}></a>
    </div>
  );
};

export default Weather;
