import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  BoxGeometry,
  SphereGeometry,
  Group,
  PlaneGeometry,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  GridHelper,
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Card, Text } from "react-native-paper";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useRef } from "react";

const GraphCard = () => {
  const boom = useRef<Group>(new Group());
  const GRID_SIZE = 10;

  /************GRAPH RENDERING***************/

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
    camera.position.set(GRID_SIZE / 2, GRID_SIZE / 2, GRID_SIZE); // this sets the boom's length
    camera.lookAt(GRID_SIZE / 2, GRID_SIZE / 2, 0); // camera looks at the boom's zero

    // create cube
    // define geometry
    const geometry = new SphereGeometry(0.5);
    const material = new MeshBasicMaterial({
      color: "cyan",
    });

    const sphere = new Mesh(geometry, material);
    const sphere1 = new Mesh(geometry, material);
    const sphere2 = new Mesh(geometry, material);
    const sphere3 = new Mesh(geometry, material);
    const sphere4 = new Mesh(geometry, material);
    const grid_xz = new GridHelper(GRID_SIZE, GRID_SIZE);
    const grid_xy = new GridHelper(GRID_SIZE, GRID_SIZE);
    const grid_yz = new GridHelper(GRID_SIZE, GRID_SIZE);
    // add cube to scene
    scene.add(sphere);
    scene.add(sphere1);
    scene.add(sphere2);
    scene.add(sphere3);
    scene.add(sphere4);
    scene.add(grid_xz);
    scene.add(grid_xy);
    scene.add(grid_yz);

    sphere1.position.x += 1;
    sphere2.position.x += 2;
    sphere3.position.x += 3;
    sphere4.position.x += 4;

    grid_xz.position.x += GRID_SIZE / 2;
    grid_xz.position.y += GRID_SIZE / 2;
    grid_xz.rotateX(Math.PI / 2);

    grid_xy.position.x += GRID_SIZE / 2;

    grid_yz.rotateZ(Math.PI / 2);
    grid_yz.position.y += GRID_SIZE / 2;

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

  /*****************************************/

  /***************GESTURE CONTROLS ****************/

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      boom.current.rotation.y += e.changeX / -100;
      boom.current.rotation.x += e.changeY / -100;
    })
    .maxPointers(1);

  const pinchGesture = Gesture.Pinch().onChange((e) => {
    boom.current.position.z *= e.scaleChange * 100 - 100;
    boom.current.position.x *= e.scaleChange * 100 - 100;
    boom.current.position.y *= e.scaleChange * 100 - 100;
  });

  const gestureControls = Gesture.Race(pinchGesture, panGesture);

  /**************************************************/

  return (
    <Card style={{ height: 350, margin: 10 }} mode="elevated" elevation={2}>
      <GestureDetector gesture={gestureControls}>
        <GLView
          onContextCreate={onContextCreate}
          style={{ width: "100%", height: "100%" }}
        />
      </GestureDetector>
    </Card>
  );
};

export default GraphCard;
