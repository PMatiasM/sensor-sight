import { VIEW } from "../enums/View";
import { Experiment } from "./Experiment";

export type ContextMenu = {
  view: VIEW;
  experiment: Experiment;
  positioning: {
    mouseY: number;
    mouseX: number;
  };
};
