export interface GraphicItem {
  name: string;
  type?: 'RAIN' | 'WATER_LEVEL';
  data: [number, number][];
}
