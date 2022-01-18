import Konva from "konva";

export interface LayerStorage {
  [key: string]: Konva.Layer;
}

export interface ContainerProp {
  w: number;
  h: number;
}
