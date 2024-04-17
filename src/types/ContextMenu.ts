import { VIEW } from "../enums/View";
import { Experiment } from "./Experiment";
import { Positioning } from "./Positioning";

export type ContextMenu = {
  view: VIEW;
  experiment: Experiment;
  positioning: Positioning;
};
