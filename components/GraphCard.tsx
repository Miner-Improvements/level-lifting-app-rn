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
import {
  Badge,
  Card,
  FAB,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { createRef, useEffect, useRef, useState } from "react";
import { Accelerometer_Data } from "../reducers/workoutsReducer";
import { Alert, View, useWindowDimensions } from "react-native";
import { WORKOUT_DATA_LENGTH } from "../hooks/useWorkout";

const GraphCard = ({ accel_data }: { accel_data: Accelerometer_Data[] }) => {
  const boom = useRef<Group>(new Group());
  let camera = useRef<PerspectiveCamera>();
  const theme = useTheme();
  const spheres = useRef<Mesh[]>([]);
  const GRID_SIZE = 10;
  const INITIAL_TIME_PROGRESS = 0.01;
  const timeProgressRef = useRef(INITIAL_TIME_PROGRESS);
  const [timeProgress, setTimeProgress] = useState(INITIAL_TIME_PROGRESS);
  const screenSize = useWindowDimensions();
  const [animationActive, setAnimationActive] = useState(false);

  //*************SPHERE VISIBILITY MANAGER********/
  const setPercentageOfVisibleSpheres = (
    percentageStart: number,
    percentageEnd: number
  ) => {
    try {
      if (percentageEnd > percentageStart) {
        for (
          let i = (percentageStart = Math.floor(
            percentageStart * spheres.current.length
          ));
          i < Math.floor(percentageEnd * spheres.current.length);
          i++
        ) {
          spheres.current[i].visible = true;
        }
      } else {
        for (
          let i =
            percentageStart == 1
              ? spheres.current.length - 1
              : Math.floor(percentageStart * spheres.current.length);
          i > Math.floor(percentageEnd * spheres.current.length);
          i--
        ) {
          spheres.current[i].visible = false;
        }
      }
    } catch (e) {
      console.log(percentageStart);
      console.log(percentageEnd);
    }
    if (Math.abs(timeProgress - percentageEnd) > 0.1) {
      setTimeProgress(percentageEnd);
    }
  };

  //*************SPHERE VISIBILITY MANAGER END********/

  /****************TIME ANIMATION **************/

  useEffect(() => {
    if (animationActive) {
      const interval = setInterval(() => {
        if (timeProgressRef.current < 1) {
          timeProgressRef.current += 0.01;
          setPercentageOfVisibleSpheres(
            timeProgressRef.current - 0.01,
            timeProgressRef.current
          );
        } else {
          setAnimationActive(false);
          timeProgressRef.current = INITIAL_TIME_PROGRESS;
          setPercentageOfVisibleSpheres(1, INITIAL_TIME_PROGRESS);
          setTimeProgress(INITIAL_TIME_PROGRESS);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [animationActive]);

  /******************TIME ANIMATION END**********/

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

    // Alert.alert(
    //   "Accel Data",
    //   JSON.stringify(accel_data[Math.floor(accel_data.length - 1)])
    // );
    // Alert.alert(
    //   "Accel Data",
    //   JSON.stringify(accel_data[Math.floor(accel_data.length / 2)])
    // );
    // Alert.alert("Accel Data", JSON.stringify(accel_data[1]));
    for (let i = 0; i < 100; i++) {
      spheres.current.push(new Mesh(geometry, material));
      scene.add(spheres.current[i]);

      spheres.current[i].position.x =
        accel_data[Math.floor(i * (accel_data.length / 100))].x * 5;
      spheres.current[i].position.y =
        accel_data[Math.floor(i * (accel_data.length / 100))].y * 5;
      spheres.current[i].position.z =
        accel_data[Math.floor(i * (accel_data.length / 100))].z * 5;
      spheres.current[i].visible = false;
    }
    setPercentageOfVisibleSpheres(0, INITIAL_TIME_PROGRESS);

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

  /***************GRAPH CONTROLS ******************/
  const panGesture = Gesture.Pan()
    .onChange((e) => {
      boom.current.rotation.y += e.changeX / -100;
      boom.current.rotation.x += e.changeY / -100;
    })
    .maxPointers(1);

  const pinchGesture = Gesture.Pinch().onChange((e) => {
    if (camera.current) camera.current.position.z *= 1 / e.scaleChange;
  });

  const gestureGraphControls = Gesture.Race(pinchGesture, panGesture);

  /****************TIME CONTROLS ******************/
  const timeControlsPan = Gesture.Pan().onChange((e) => {
    let newTimeProgress = e.x / (screenSize.width - screenSize.width / 5);
    if (newTimeProgress < 0) newTimeProgress = 0;
    if (newTimeProgress > 1) newTimeProgress = 1;
    setPercentageOfVisibleSpheres(timeProgressRef.current, newTimeProgress);
    timeProgressRef.current = newTimeProgress;
  });

  const timeControlsTouch = Gesture.Tap().onEnd((e) => {
    let newTimeProgress = e.x / (screenSize.width - screenSize.width / 5);
    if (newTimeProgress < 0) newTimeProgress = 0;
    if (newTimeProgress > 1) newTimeProgress = 1;
    setPercentageOfVisibleSpheres(timeProgressRef.current, newTimeProgress);
    timeProgressRef.current = newTimeProgress;
    setTimeProgress(newTimeProgress);
  });

  const gestureTimeControls = Gesture.Exclusive(
    timeControlsTouch,
    timeControlsPan
  );

  /**************************************************/

  return (
    <Card style={{ height: 395, margin: 10 }} mode="elevated" elevation={2}>
      <Badge
        style={{ position: "absolute", width: 40, height: 40, left: 5, top: 5 }}
      >
        {Math.round(timeProgress * 10 * 10) / 10}
      </Badge>
      <GestureDetector gesture={gestureTimeControls}>
        <Card
          style={{
            height: 40,
            marginTop: 5,
            marginHorizontal: 50,
            justifyContent: "center",
          }}
          mode="elevated"
          elevation={3}
        >
          <ProgressBar
            style={{ marginHorizontal: 5, height: 10 }}
            progress={timeProgress}
            color={theme.colors.primary}
          />
        </Card>
      </GestureDetector>
      <FAB
        icon={animationActive ? "pause" : "play"}
        style={{ position: "absolute", right: 5, top: 5, width: 40 }}
        size="small"
        onPress={() => {
          setAnimationActive(!animationActive);
        }}
      />
      <GestureDetector gesture={gestureGraphControls}>
        <GLView
          onContextCreate={onContextCreate}
          style={{ width: "100%", height: 350 }}
        />
      </GestureDetector>
    </Card>
  );
};

export default GraphCard;
