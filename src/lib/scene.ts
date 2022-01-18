import Konva from "konva";
import { LayerStorage, ContainerProp } from "../core/type";

const getContainerProps = (id: string): ContainerProp => {
  const $element = document.getElementById(id);

  if ($element) {
    return {
      w: $element.offsetWidth,
      h: $element.offsetHeight,
    };
  }

  return {
    w: 0,
    h: 0,
  };
};

const ERRORS = {
  duplicatedLayer: "Layer already exists, can't create another, try updating layer"
}

class Scene {
  private dim = {
    w: 0,
    h: 0,
  }
  
  public stage!: Konva.Stage;
  public layerStorage: LayerStorage = {};

  constructor(target: string) {
    const { w, h } = getContainerProps(target);

    this.dim.w = w;
    this.dim.h = h;

    this.stage = new Konva.Stage({
      container: target,
      width: w,
      height: h,
    });
  }

  public get size(): ContainerProp {
    return this.dim;
  }

  public render(): void {
    this.stage.draw();
  }

  public createLayer(layerName: string): void {
    if (this.layerStorage[layerName]) {
      throw Error("SCENE ERROR: " + ERRORS.duplicatedLayer);
    }

    this.layerStorage[layerName] = new Konva.Layer()
  }

  public add(shape: Konva.Shape, layerName: string): void {
    if (this.layerStorage[layerName]) {
      const layer = this.layerStorage[layerName];

      layer.add(shape);
      this.stage.add(layer);
      layer.draw();
    } else {
      this.createLayer(layerName);
      this.add(shape, layerName);
    }
  }

  public clearLayer(layerName: string): void {
    if (this.layerStorage[layerName]) {
      this.layerStorage[layerName].clear();
      delete this.layerStorage[layerName];
    }
  }
}

export default Scene;
