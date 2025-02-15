import { API } from "../../types";
import { Conditions } from "./conditions";

export type Coordinates = {
  latitude?: number;
  longitude?: number;
};

export type Data = Coordinates & {
  name?: string;
  showDetails: boolean;
  showCity: boolean;
  units: "auto" | "si" | "us"; // `auto` has been removed, but may still be present in settings
  theme: string;
  label_1: string;
  label_2: string;
};

export type Cache =
  | {
      timestamp: number;
      conditions: Conditions[];
    }
  | undefined;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  showDetails: false,
  showCity: true,
  units: "si",
  theme: "original",
  label_1: "",
  label_2: "",
};
