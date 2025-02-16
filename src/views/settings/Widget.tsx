import React from "react";
import { setWidgetDisplay } from "../../db/action";
import { WidgetState } from "../../db/state";
import { useToggle } from "../../hooks";
import { getConfig } from "../../plugins";
import { DownIcon, Icon, IconButton, RemoveIcon, UpIcon } from "../shared";
import PluginContainer from "../shared/Plugin";
import ToggleSection from "../shared/ToggleSection";
import "./Widget.sass";
import WidgetDisplay from "./WidgetDisplay";

interface Props {
  plugin: WidgetState;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
}

const Widget: React.FC<Props> = ({
  plugin,
  onMoveDown,
  onMoveUp,
  onRemove,
}) => {
  const [isOpen, toggleIsOpen] = useToggle(onRemove === undefined);
  const [error, setError] = React.useState<Error | null>(null);
  const [config, setConfig] = React.useState({
    name: 'Loading...',
    description: 'Loading widget configuration...',
    settingsComponent: undefined
  });

  React.useEffect(() => {
    try {
      const widgetConfig = getConfig(plugin.key);
      setConfig(widgetConfig);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error('Unknown error loading widget configuration'));
      }
      setConfig({
        name: 'Unavailable Widget',
        description: `Unable to load widget: ${plugin.key}`,
        settingsComponent: undefined
      });
    }
  }, [plugin.key]);

  const { description, name, settingsComponent } = config;

  const setDisplay = setWidgetDisplay.bind(null, plugin.id);

  return (
    <fieldset className={`Widget ${error ? 'has-error' : ''}`}>
      <div className="title--buttons">
        <IconButton onClick={onRemove} title="Remove widget">
          <RemoveIcon />
        </IconButton>

        {settingsComponent && (
          <IconButton
            onClick={toggleIsOpen}
            title={`${isOpen ? "Close" : "Edit"} widget settings`}
          >
            <Icon name="settings" />
          </IconButton>
        )}

        {onMoveDown && (
          <IconButton onClick={onMoveDown} title="Move widget down">
            <DownIcon />
          </IconButton>
        )}

        {onMoveUp && (
          <IconButton onClick={onMoveUp} title="Move widget up">
            <UpIcon />
          </IconButton>
        )}

        <h4 onClick={toggleIsOpen}>{name}</h4>
        {!isOpen && <p>{description}</p>}
      </div>

      {isOpen && (
        <div>
          {settingsComponent && (
            <div className="settings">
              <PluginContainer id={plugin.id} component={settingsComponent} />
            </div>
          )}

          <ToggleSection name="Display Settings">
            <WidgetDisplay display={plugin.display} onChange={setDisplay} />
          </ToggleSection>

          <ToggleSection name="Font Settings">
            <>
              <label>
                Font
                <input
                  type="text"
                  value={plugin.display.fontFamily}
                  onChange={(event) =>
                    setDisplay({ fontFamily: event.target.value })
                  }
                />
              </label>

              <label>
                Weight
                <select
                  value={plugin.display.fontWeight}
                  onChange={(event) =>
                    setDisplay({
                      fontWeight: event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    })
                  }
                >
                  <option value="">Default</option>
                  <option value="100">Thin</option>
                  <option value="300">Light</option>
                  <option value="400">Regular</option>
                  <option value="500">Medium</option>
                  <option value="700">Bold</option>
                  <option value="900">Black</option>
                </select>
              </label>

              <label>
                Colour
                <input
                  type="color"
                  value={plugin.display.colour ?? "#ffffff"}
                  onChange={(event) =>
                    setDisplay({ colour: event.target.value })
                  }
                />
              </label>
            </>
          </ToggleSection>
        </div>
      )}
    </fieldset>
  );
};

export default Widget;
