import { LineConfig } from "konva/lib/shapes/Line";
import { Shape } from "konva/lib/Shape";
import Konva from "konva";
import Scene from "./scene";

interface Defaults {
  config: LineConfig;
  speeds: {
    slow: number;
    fast: number;
    multiplier: number;
  };
  mhz: number;
}

const DEFAULTS: Defaults = {
  config: {
    lineAmount: 3,
    lineWidth: 2,
    standalone: false,
    color: "#323238",
    lineJoin: "round",
    lineCap: "round",
  },
  speeds: {
    slow: 3,
    fast: 4,
    multiplier: 6,
  },
  mhz: 144,
};

export default class SpaceDust {
  private shapes: Shape[] = [];
  private speed = DEFAULTS.speeds.slow;
  private starFold = false;

  public stage!: Konva.Stage;
  public scene!: Scene;
  public config!: LineConfig;

  constructor(scene: Scene, config: LineConfig = DEFAULTS.config) {
    this.stage = scene.stage;
    this.scene = scene;
    this.config = { ...DEFAULTS.config, ...config };

    this.standalone();
  }

  private rnd(min: number, max: number): number {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  private movement(posY: number): number {
    if (this.starFold) {
      return Math.sqrt(posY * this.speed) || this.speed * 3;
    } else {
      return this.speed * 3;
    }
  }

  private lineProps(): number[] {
    const max = 450,
      min = 80;

    const points = [this.rnd(min, max), this.rnd(min, max)].sort(
      (a: number, b: number) => a - b
    );

    return [0, points[0], 0, points[1]];
  }

  private spaceDustLinear(): Konva.Line {
    return new Konva.Line({
      x: this.rnd(0, this.scene.size.w),
      y: this.rnd(0, this.scene.size.h),
      points: this.lineProps(),
      stroke: this.config.color,
      strokeWidth: this.config.lineWidth,
      lineCap: "round",
      lineJoin: "round",
    });
  }

  private spaceDustCircular(): Konva.Circle {
    return new Konva.Circle({
      radius: 3,
      fill: this.config.color,
    });
  }

  public get whatSpeed(): string {
    return this.starFold ? "fast" : "slow";
  }

  public resetShapes(): void {
    this.scene.clearAllLayers();
    this.shapes = [];
  }

  public generateDust(amountMultiplier: number = 1): void {
    for (let x = 0; x < this.config.lineAmount * amountMultiplier; x++) {
      const dust = this.spaceDustLinear();

      this.shapes.push(dust);
      this.scene.add(dust, "background");
    }
  }

  public generateFragment(amountMultiplier: number = 1): void {
    const fragmentAmount =
      Math.floor((this.config.lineAmount * amountMultiplier) / 3) || 1;

    for (let x = this.shapes.length; x < fragmentAmount; x++) {
      const fragment = this.spaceDustCircular();

      this.shapes.push(fragment);
      this.scene.add(fragment, "background");
    }
  }

  public slowSpeed(): void {
    this.resetShapes();
    this.speed = DEFAULTS.speeds.slow;
    this.starFold = false;

    this.generateDust();
    this.generateFragment();
  }

  public fastSpeed(): void {
    this.resetShapes();
    this.speed = DEFAULTS.speeds.fast;
    this.starFold = true;

    this.generateDust(DEFAULTS.speeds.multiplier);
    this.generateFragment(DEFAULTS.speeds.multiplier);
  }

  public switchSpeed(speed: "fast" | "slow"): void {
    if (speed === "fast") {
      this.fastSpeed();
    } else {
      this.slowSpeed();
    }
  }

  public moveShapes(): void {
    this.shapes.forEach((shape) => {
      const posY = shape.y();

      if (posY > this.scene.size.h) {
        shape.y(shape.getClientRect().height * -1);
        shape.x(this.rnd(0, this.scene.size.w));
      } else {
        shape.y(posY + this.movement(posY));
      }
    });
  }

  private standalone(): void {
    if (this.config.standalone) {
      this.slowSpeed();
      setInterval(this.moveShapes.bind(this), 1000 / DEFAULTS.mhz);
    }
  }
}
