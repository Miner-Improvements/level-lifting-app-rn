import { useState, useEffect, useRef } from "react";
import { Alert } from "react-native";
import { Characteristic, Device, Subscription } from "react-native-ble-plx";
import { useDispatch, useSelector } from "react-redux";
import {
  SERVICE_UUID_IMU,
  CHARACTERISTIC_UUID_ACCEL,
  CHARACTERISTIC_UUID_TX,
  SERVICE_ID,
  CHARACTERISTIC_UUID_RX,
} from "../BLEManager";
import { setBluetoothConnection } from "../reducers/bluetoothConnectionReducer";
import { Accelerometer_Data } from "../reducers/workoutsReducer";
import { RootState } from "../store";
import { Buffer } from "buffer";

const getVelocities = (data: Accelerometer_Data[], time: number) => {
  if (data.length == 0) return [0, 0, 0];
  else {
    const last_vals = data[data.length - 1];
    return [
      last_vals.x_vel + last_vals.x_acc * (time - last_vals.time),
      last_vals.y_vel + last_vals.y_acc * (time - last_vals.time),
      last_vals.z_vel + last_vals.z_acc * (time - last_vals.time),
    ];
  }
};

const getPositions = (data: Accelerometer_Data[], time: number) => {
  if (data.length == 0) return [0, 0, 0];
  else {
    const last_vals = data[data.length - 1];
    return [
      last_vals.x +
        last_vals.x_vel * (time - last_vals.time) +
        last_vals.x_acc * Math.pow(time - last_vals.time, 2),
      last_vals.y +
        last_vals.y_vel * (time - last_vals.time) +
        last_vals.y_acc * Math.pow(time - last_vals.time, 2),
      last_vals.z +
        last_vals.z_vel * (time - last_vals.time) +
        last_vals.z_acc * Math.pow(time - last_vals.time, 2),
    ];
  }
};

export const WORKOUT_DATA_LENGTH = 30000;

//description: this hook is used to start and stop a workout and to get the data from the workout
//parameters: none
//@return: startWorkout: function to start a workout
//        stopWorkout: function to stop a workout
//        workout_data: array of Accelerometer_Data objects
const useWorkout: () => [
  () => Promise<boolean>,
  () => Promise<Accelerometer_Data[]>,
  boolean
] = () => {
  const [workoutOngoing, setWorkoutOngoing] = useState(false);
  const [workoutDataSubsciption, setWorkoutDataSubscription] =
    useState<Subscription>();
  const bluetoothConnection = useSelector(
    (state: RootState) => state.bluetoothConnection
  );
  const workout_data = useRef<Accelerometer_Data[]>([]);
  const dispatch = useDispatch();

  const startWorkout = async () => {
    if (bluetoothConnection.connected && bluetoothConnection.device) {
      try {
        await bluetoothConnection.device.writeCharacteristicWithoutResponseForService(
          SERVICE_ID,
          CHARACTERISTIC_UUID_RX,
          Buffer.from("start_workout").toString("base64")
        );
      } catch (err: any) {
        Alert.alert("Write Error", err.message);
      }

      let characteristic_rx: Characteristic;
      for (let i = 0; i < 5; i++) {
        try {
          characteristic_rx =
            await bluetoothConnection.device.readCharacteristicForService(
              SERVICE_ID,
              CHARACTERISTIC_UUID_TX
            );
          if (characteristic_rx.value != null) {
            if (
              Buffer.from(characteristic_rx.value, "base64").toString() ===
              "starting_workout"
            ) {
              workout_data.current = [];
              setWorkoutOngoing(true);
              return true;
            }
          }
        } catch (err: any) {
          Alert.alert("Read Error", err.message);
        }
      }
    }
    return false;
  };

  const stopWorkout = async () => {
    if (bluetoothConnection.connected && bluetoothConnection.device) {
      await bluetoothConnection.device.writeCharacteristicWithoutResponseForService(
        SERVICE_ID,
        CHARACTERISTIC_UUID_RX,
        Buffer.from("stop_workout").toString("base64")
      );
      let characteristic_rx: Characteristic;
      for (let i = 0; i < 5; i++) {
        characteristic_rx =
          await bluetoothConnection.device.readCharacteristicForService(
            SERVICE_ID,
            CHARACTERISTIC_UUID_TX
          );
        if (characteristic_rx.value != null) {
          if (
            Buffer.from(characteristic_rx.value, "base64").toString() ===
            "stopping_workout"
          ) {
            setWorkoutOngoing(false);
            return workout_data.current;
          }
        }
      }
    }
    return [];
  };

  useEffect(() => {
    if (
      bluetoothConnection.connected &&
      bluetoothConnection.device &&
      workoutOngoing
    ) {
      setWorkoutDataSubscription(
        bluetoothConnection.device.monitorCharacteristicForService(
          SERVICE_UUID_IMU,
          CHARACTERISTIC_UUID_ACCEL,
          async (error, device) => {
            //errorCode 2 is for subscription cancelled, which we expect when we stop the workout
            if (error) {
              if (error.errorCode != 2)
                Alert.alert("ERROR", JSON.stringify(error));
              return;
            }
            let x_acc, y_acc, z_acc;
            if (workout_data.current.length == 0) {
              x_acc = Buffer.from(device!.value!, "base64").readFloatLE();
              y_acc = Buffer.from(device!.value!, "base64").readFloatLE(4);
              z_acc =
                Buffer.from(device!.value!, "base64").readFloatLE(8) - 9.8;
            } else {
              x_acc =
                Buffer.from(device!.value!, "base64").readFloatLE() -
                workout_data.current[0].x_acc;
              y_acc =
                Buffer.from(device!.value!, "base64").readFloatLE(4) -
                workout_data.current[0].y_acc; //cancel gravity
              z_acc =
                Buffer.from(device!.value!, "base64").readFloatLE(8) -
                9.8 -
                workout_data.current[0].z_acc;
            }
            const time =
              Buffer.from(device!.value!, "base64").readUInt32LE(12) / 40000000;
            const vels = getVelocities(workout_data.current, time);
            const posis = getPositions(workout_data.current, time);
            workout_data.current.push({
              x_acc: x_acc,
              y_acc: y_acc,
              z_acc: z_acc,
              x_vel: vels[0],
              y_vel: vels[1],
              z_vel: vels[2],
              x: posis[0],
              y: posis[1],
              z: posis[2],
              time: time,
            });

            if (workout_data.current.length === WORKOUT_DATA_LENGTH + 1) {
              workout_data.current.shift();
            }
          }
        )
      );
      // .catch((error: BleError) => {
      //
      // });
    } else {
      if (!bluetoothConnection.connected || !bluetoothConnection.device) {
        dispatch(
          setBluetoothConnection({
            device: null,
            connected: false,
          })
        );
        setWorkoutOngoing(false);
      }
      if (!workoutOngoing) {
        workoutDataSubsciption?.remove();
        setWorkoutDataSubscription(undefined);
      }
    }

    return workoutDataSubsciption?.remove();
  }, [
    bluetoothConnection.connected,
    bluetoothConnection.device,
    workoutOngoing,
  ]);

  return [startWorkout, stopWorkout, workoutOngoing];
};

export default useWorkout;
