import React from "react";

import Backdrop from "../../../views/shared/Backdrop";

import { defaultData, Props } from "./types";
import { getPicture } from "./api";
import ApodTitle from "./ApodTitle";
import "./Apod.sass";

const Unsplash: React.FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
}) => {
  const [picture, setPicture] = React.useState(cache);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    getPicture(data, loader).then(setCache);
    if (mounted.current || !picture) getPicture(data, loader).then(setPicture);
    mounted.current = true;
  }, [data.customDate, data.date]);

  return (
    <div className="Apod fullscreen">
      {picture?.media_type === "video" ? (
        <div className="video-container fullscreen">
          <iframe
            src={`${picture.url}?start=${data.videoTime}&autoplay=1&controls=0&disablekb=1&loop=1&modestbranding=1&playsinline=1&rel=0`}
            title={picture.title}
            frameBorder="0"
            allow="autoplay"
            className="video fullscreen"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      ) : (
        <Backdrop
          className="picture fullscreen"
          ready={!!(picture?.hdurl || picture?.url)}
          style={{
            backgroundImage: `url(${picture?.hdurl || picture?.url})`,
          }}
        />
      )}

      {picture && data.showTitle && (
        <ApodTitle title={picture.title} copyright={picture.copyright} />
      )}
    </div>
  );
};

export default Unsplash;
