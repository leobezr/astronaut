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
  duplicatedLayer:
    "Layer already exists, can't create another, try updating layer",
};

class Scene {
  private container!: string;

  private dim = {
    w: 0,
    h: 0,
  };

  public stage!: Konva.Stage;
  public layerStorage: LayerStorage = {};

  constructor(target: string) {
    this.container = target;
    this.updateMonitorSize();

    this.stage = new Konva.Stage({
      container: target,
      width: this.dim.w,
      height: this.dim.h,
    });
  }

  private updateMonitorSize(): void {
    const { w, h } = getContainerProps(this.container);

    this.dim.w = w;
    this.dim.h = h;
  }

  public get size(): ContainerProp {
    return {
      w: this.dim.w,
      h: this.dim.h
    }
  }

  private createStage(): void {
    const { w, h } = getContainerProps(this.container);

    if (w !== this.dim.w || h !== this.dim.h) {
      this.updateMonitorSize();
      this.clearStage();
      this.clearAllLayers();
      
      this.stage = new Konva.Stage({
        container: this.container,
        width: this.dim.w,
        height: this.dim.h,
      });
    }
  }

  public render(): void {
    this.createStage();
    this.stage.draw();
  }

  public createLayer(layerName: string): Konva.Layer {
    if (this.layerStorage[layerName]) {
      throw Error("SCENE ERROR: " + ERRORS.duplicatedLayer);
    }

    this.layerStorage[layerName] = new Konva.Layer();
    return this.layerStorage[layerName];
  }

  public add(shape: Konva.Shape, layerName: string): void {
    if (this.layerStorage[layerName]) {
      const layer = this.layerStorage[layerName];

      layer.add(shape);
    } else {
      const layer = this.createLayer(layerName);

      this.add(shape, layerName);
      this.stage.add(layer);
    }
  }

  public clearLayer(layerName: string): void {
    if (this.layerStorage[layerName]) {
      this.layerStorage[layerName].clear();
      delete this.layerStorage[layerName];
    }
  }

  public clearAllLayers(): void {
    for(const key in this.layerStorage) {
      this.layerStorage[key].remove();
    }

    this.layerStorage = {};
  }

  public clearStage(): void {
    const $canvas = document.getElementById(this.container);
    const $container = document.querySelector(".konvajs-content");

    this.stage.clear();

    if ($canvas && $container) {
      $canvas.removeChild($container);
    }
  }
}

export default Scene;
