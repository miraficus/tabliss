import React from "react";
import { WidgetPosition, WidgetState } from "../../db/state";
import { getConfig } from "../../plugins";
import Plugin from "../shared/Plugin";
import "./Slot.sass";
import Widget from "./Widget";

type Props = {
  position: WidgetPosition;
  widgets: WidgetState[];
};

const Slot: React.FC<Props> = ({ position, widgets }) => (
  <div className={`Slot ${position}`}>
    {widgets.map(({ display, id, key }) => {
      try {
        const config = getConfig(key);
        return (
          <Widget key={id} {...display}>
            <Plugin id={id} component={config.dashboardComponent} />
          </Widget>
        );
      } catch (error) {
        console.error(`Error loading widget ${key}:`, error);
        return (
          <Widget key={id} {...display}>
            <div className="widget-error">
              <p>Widget unavailable: {key}</p>
              <small>{error instanceof Error ? error.message : 'Unknown error'}</small>
            </div>
          </Widget>
        );
      }
    })}
  </div>
);

export default Slot;
