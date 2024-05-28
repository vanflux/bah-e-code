import { GraphicItem } from './graphic-item';

export interface Graphic {
  items: GraphicItem[];
  alertValue?: number;
  floodValue?: number;
}
