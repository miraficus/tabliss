import { API } from "../../types";

export type WikimediaDate = "today" | "custom";

export interface Data {
  date: WikimediaDate;
  customDate?: string;
  showTitle: boolean;
}

export interface Image {
  image: {
    description: {
      html: string;
      text: string;
    };
    artist: {
      html: string;
      text: string;
    };
    image: {
      source: string;
    };
  };
}

type Cache = Image;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  date: "today",
  showTitle: true,
};
