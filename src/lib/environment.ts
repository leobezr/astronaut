import Scene from "./scene";
import SpaceDust from "./space-dust";

const createObjects = (): void => {
  const scene = new Scene("game");
  const dust = new SpaceDust(scene, {
    standalone: true
  });

  setInterval(() => {
    if (dust.whatSpeed === "fast") {
      dust.switchSpeed("slow");
    } else {
      dust.switchSpeed("fast");
    }
  }, 3000)
};

export default createObjects;
