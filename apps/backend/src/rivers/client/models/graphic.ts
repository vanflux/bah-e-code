import { GraphicItem } from './graphic-item';

export interface Graphic {
  title: string;
  items: GraphicItem[];
  severeFloodValue?: number;
  floodValue?: number;
  alertValue?: number;
  attentionValue?: number;
}
