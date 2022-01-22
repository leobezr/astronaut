import Scene from "./lib/scene";
import Konva from "konva";

requestAnimationFrame(() => {
  //   const scene = new Scene("game");

  //   const circle = new Konva.Circle({
  //     x: scene.size.w / 2,
  //     y: scene.size.h / 2,
  //     radius: 70,
  //     fill: "red",
  //     stroke: "black",
  //     strokeWidth: 4,
  //   });

  //   const redLine = new Konva.Line({
  //     points: [5, 70, 140, 23, 250, 60, 300, 20],
  //     stroke: 'red',
  //     strokeWidth: 15,
  //     lineCap: 'round',
  //     lineJoin: 'round',
  //   });

  //   scene.add(circle, "circle");
  //   scene.add(redLine, "redLine");

  //   scene.render();

  //   console.log(scene.layerStorage)
  var stage = new Konva.Stage({
    container: "game", // id of container <div>
    width: 500,
    height: 500,
  });

  // then create layer
  var layer = new Konva.Layer();

  // create our shape
  var circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  // add the shape to the layer
  layer.add(circle);

  // add the layer to the stage
  stage.add(layer);

  // draw the image
  layer.draw();
});
