import { Config } from "../../types";
import Spotify from "./Spotify";
import SpotifySettings from "./SpotifySettings";

const config: Config = {
  key: "widget/spotify",
  name: "Spotify",
  description: "Control and view your Spotify playback.",
  dashboardComponent: Spotify,
  settingsComponent: SpotifySettings,
};

export default config;