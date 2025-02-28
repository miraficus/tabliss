import { backgroundConfigs } from "./backgrounds";
import { widgetConfigs } from "./widgets";
import React from "react";

export { backgroundConfigs } from "./backgrounds";
export { widgetConfigs } from "./widgets";

const configs = [...backgroundConfigs, ...widgetConfigs];

const DefaultComponent: React.FC = () => "Component not available";

export function getConfig(key: string) {
  const config = configs.find((config) => config.key === key);

  // if (!config) throw new Error(`Unable to find config for plugin: ${key}`); // WHY WOULD YOU BREAK THE ENTIRE APP IF A PLUGIN IS MISSING
  if (!config) {
    console.error(`Unable to find config for plugin: ${key}`);
    return {
      key,
      name: key,
      description:
        "The plugin id is not valid. If you need help, create an issue on the github repo.",
      settingsComponent: DefaultComponent,
      supportsBackdrop: false,
      dashboardComponent: DefaultComponent,
    };
  }

  return config;
}
