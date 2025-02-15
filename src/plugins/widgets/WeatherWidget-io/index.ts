import { Config } from "../../types";
import WeatherWidget from "./WeatherWidget-io";
import WeatherWidgetSettings from "./WeatherWidget-ioSettings";

const config: Config = {
  key: "widget/weatherwidget-io",
  name: "Weather Widget.io",
  description: "Weather from weatherwidget.io.",
  dashboardComponent: WeatherWidget,
  settingsComponent: WeatherWidgetSettings,
};

export default config;

