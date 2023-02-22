import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  BoxGeometry,
  SphereGeometry,
  Group,
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Card, Text } from "react-native-paper";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useRef } from "react";

const GraphCard = () => {
  const boom = useRef<Group>(new Group());

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

    boom.current.add(camera);
    scene.add(boom.current);
    camera.position.set(0, 0, 2); // this sets the boom's length
    camera.lookAt(0, 0, 0); // camera looks at the boom's zero

    // create cube
    // define geometry
    const geometry = new SphereGeometry(0.5);
    const material = new MeshBasicMaterial({
      color: "cyan",
    });

    const sphere = new Mesh(geometry, material);

    // add cube to scene
    scene.add(sphere);

    // create render function
    const render = () => {
      requestAnimationFrame(render);
      // create rotate functionality
      // rotate around x axis
      // cube.rotation.x += 0.01;

      // // rotate around y axis
      // cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    // call render
    render();
  };

  const gesture = Gesture.Pan().onChange((e) => {
    boom.current.rotation.x += e.translationX / 1000;
    boom.current.rotation.y += e.translationY / -1000;
  });
  return (
    <Card style={{ height: 350, margin: 10 }} mode="elevated" elevation={2}>
      <GestureDetector gesture={gesture}>
        <GLView
          onContextCreate={onContextCreate}
          style={{ width: "100%", height: "100%" }}
        />
      </GestureDetector>
    </Card>
  );
};

export default GraphCard;
