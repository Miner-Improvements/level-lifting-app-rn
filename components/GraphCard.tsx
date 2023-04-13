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
import { createRef, useEffect, useRef, useState } from "react";
import { Accelerometer_Data } from "../reducers/workoutsReducer";
import { Alert } from "react-native";
import { WORKOUT_DATA_LENGTH } from "../hooks/useWorkout";

const GraphCard = ({ accel_data }: { accel_data: Accelerometer_Data[] }) => {
  const boom = useRef<Group>(new Group());
  let camera = useRef<PerspectiveCamera>();
  const spheres = useRef<Mesh[]>([]);
  const GRID_SIZE = 10;

  /************GRAPH RENDERING***************/

  const onContextCreate = async (gl: any) => {
    const scene = new Scene();
    camera.current = new PerspectiveCamera(
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
    camera.current.position.z = 2;

    const renderer = new Renderer({ gl });
    // set size of buffer to be equal to drawing buffer width
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    boom.current.add(camera.current);
    scene.add(boom.current);
    boom.current.position.set(GRID_SIZE / 2, GRID_SIZE / 2, 0); // this sets the boom's length
    camera.current.position.set(0, 0, GRID_SIZE); // this sets the boom's length
    camera.current.lookAt(GRID_SIZE / 2, GRID_SIZE / 2, 0); // camera looks at the boom's zero

    // create cube
    // define geometry
    const geometry = new SphereGeometry(0.2);
    const material = new MeshBasicMaterial({
      color: "cyan",
    });

    const grid_xz = new GridHelper(GRID_SIZE, GRID_SIZE);
    const grid_xy = new GridHelper(GRID_SIZE, GRID_SIZE);
    const grid_yz = new GridHelper(GRID_SIZE, GRID_SIZE);
    // add cube to scene

    scene.add(grid_xz);
    scene.add(grid_xy);
    scene.add(grid_yz);
    for (let i = 0; i < 100; i++) {
      spheres.current.push(new Mesh(geometry, material));
      scene.add(spheres.current[i]);
      spheres.current[i].position.x =
        accel_data[Math.floor(i * (accel_data.length / 100))].x;
      spheres.current[i].position.y =
        accel_data[Math.floor(i * (accel_data.length / 100))].y;
      spheres.current[i].position.z = 2.5;
    }

    const spheres1 = [];
    for (let i = 0; i < 20; i++) {
      spheres1.push(new Mesh(geometry, material));
      spheres1[i].position.y = 10 - i * 0.5;
      spheres1[i].position.x = Math.pow(
        (spheres1[i].position.y - 5) / -3,
        1 / 3
      );
      spheres1[i].position.z = -2.5;
      scene.add(spheres1[i]);
    }

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

      renderer.render(scene, camera.current!);
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
    if (camera.current) camera.current.position.z *= 1 / e.scaleChange;
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
