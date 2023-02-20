import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  BoxGeometry,
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Card, Text } from "react-native-paper";

const GraphCard = () => {
  const onContextCreate = async (gl: any) => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };

    // set camera position away from cube
    camera.position.z = 2;

    const renderer = new Renderer({ gl });
    // set size of buffer to be equal to drawing buffer width
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // create cube
    // define geometry
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: "cyan",
    });

    const cube = new Mesh(geometry, material);

    // add cube to scene
    scene.add(cube);

    // create render function
    const render = () => {
      requestAnimationFrame(render);
      // create rotate functionality
      // rotate around x axis
      cube.rotation.x += 0.01;

      // rotate around y axis
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    // call render
    render();
  };

  return (
    <Card style={{ height: 350, margin: 10 }} mode="elevated" elevation={2}>
      <GLView
        onContextCreate={onContextCreate}
        style={{ width: "100%", height: "100%" }}
      />
    </Card>
  );
};

export default GraphCard;
