import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { BleError, Characteristic, Service } from "react-native-ble-plx";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  CHARACTERISTIC_ID,
  CHARACTERISTIC_UUID_TIME,
  CHARACTERISTIC_UUID_X_ACCEL,
  CHARACTERISTIC_UUID_Y_ACCEL,
  CHARACTERISTIC_UUID_Z_ACCEL,
  SERVICE_ID,
  SERVICE_UUID_IMU,
  TIME_DIVIDER,
} from "../BLEManager";
import { setBluetoothModalShown } from "../reducers/bluetoothModalShownReducer";
import { RootState } from "../store";
import { Buffer } from "buffer";
import { setBluetoothConnection } from "../reducers/bluetoothConnectionReducer";

export interface Accelerometer_Data {
  x_acc: number;
  y_acc: number;
  z_acc: number;
  x_vel: number;
  y_vel: number;
  z_vel: number;
  x: number;
  y: number;
  z: number;
  time: number;
}

const DeviceCard = () => {
  const dispatch = useDispatch();
  const bluetoothModalShown = useSelector(
    (state: RootState) => state.bluetoothModalShown
  );
  const bluetoothConnection = useSelector(
    (state: RootState) => state.bluetoothConnection
  );
  const [characteristics, setCharacteristics] = useState<Accelerometer_Data[]>(
    []
  );
  const characteristic_values = useRef<Accelerometer_Data[]>([]);

  const getVelocities = () => {
    if (characteristic_values.current.length == 0) return [0, 0, 0];
    else {
      const last_vals =
        characteristic_values.current[characteristic_values.current.length - 1];
      //Number(time - last_vals.time)
      return [
        last_vals.x_vel + last_vals.x_acc * 0.01,
        last_vals.y_vel + last_vals.y_acc * 0.01,
        last_vals.z_vel + last_vals.z_acc * 0.01,
      ];
    }
  };

  const getPositions = () => {
    if (characteristic_values.current.length == 0) return [0, 0, 0];
    else {
      const last_vals =
        characteristic_values.current[characteristic_values.current.length - 1];
      return [
        last_vals.x +
          last_vals.x_vel * 0.01 +
          last_vals.x_acc * Math.pow(0.01, 2),
        last_vals.y +
          last_vals.y_vel * 0.01 +
          last_vals.y_acc * Math.pow(0.01, 2),
        last_vals.z +
          last_vals.z_vel * 0.01 +
          last_vals.z_acc * Math.pow(0.01, 2),
      ];
    }
  };

  // useEffect(() => {
  //   if (bluetoothConnection.connected) {
  //     bluetoothConnection.device!.readCharacteristicForService(
  //       SERVICE_UUID_IMU,
  //       CHARACTERISTIC_UUID_X_ACCEL,
  //       (error, device) => {
  //         if (error) {
  //           Alert.alert(error.message, JSON.stringify(error));
  //           return;
  //         }
  //         if (
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].x &&
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].y &&
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].z
  //         ) {
  //           characteristic_values.current.push({
  //             x: Buffer.from(device!.value!, "base64").readFloatBE(),
  //           });
  //         } else {
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].x = Buffer.from(device!.value!, "base64").readFloatBE();
  //         }

  //         if (characteristic_values.current.length === 101) {
  //           characteristic_values.current.shift();
  //         }
  //       }
  //     );
  //     // .catch((error: BleError) => {
  //     //
  //     // });

  //     bluetoothConnection.device!.monitorCharacteristicForService(
  //       SERVICE_UUID_IMU,
  //       CHARACTERISTIC_UUID_Y_ACCEL,
  //       (error, device) => {
  //         if (error) {
  //           Alert.alert(error.message, JSON.stringify(error));
  //           return;
  //         }
  //         if (
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].x &&
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].y &&
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].z
  //         ) {
  //           characteristic_values.current.push({
  //             y: Buffer.from(device!.value!, "base64").readFloatBE(),
  //           });
  //         } else {
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].y = Buffer.from(device!.value!, "base64").readFloatBE();
  //         }

  //         if (characteristic_values.current.length === 101) {
  //           characteristic_values.current.shift();
  //         }
  //       }
  //     );

  //     bluetoothConnection.device!.monitorCharacteristicForService(
  //       SERVICE_UUID_IMU,
  //       CHARACTERISTIC_UUID_Z_ACCEL,
  //       (error, device) => {
  //         if (error) {
  //           Alert.alert(error.message, JSON.stringify(error));
  //           return;
  //         }
  //         if (
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].x &&
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].y &&
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].z
  //         ) {
  //           characteristic_values.current.push({
  //             z: Buffer.from(device!.value!, "base64").readFloatBE(),
  //           });
  //         } else {
  //           characteristic_values.current[
  //             characteristic_values.current.length - 1
  //           ].z = Buffer.from(device!.value!, "base64").readFloatBE();
  //         }

  //         if (characteristic_values.current.length === 101) {
  //           characteristic_values.current.shift();
  //         }
  //       }
  //     );
  //   }
  // }, [bluetoothConnection.connected]);

  useEffect(() => {
    if (bluetoothConnection.connected && bluetoothConnection.device) {
      setInterval(async () => {
        const x_acc = Buffer.from(
          (
            await bluetoothConnection.device!.readCharacteristicForService(
              SERVICE_UUID_IMU,
              CHARACTERISTIC_UUID_X_ACCEL
            )
          ).value!,
          "base64"
        ).readFloatLE();
        const y_acc = Buffer.from(
          (
            await bluetoothConnection.device!.readCharacteristicForService(
              SERVICE_UUID_IMU,
              CHARACTERISTIC_UUID_Y_ACCEL
            )
          ).value!,
          "base64"
        ).readFloatLE(); //cancel gravity
        const z_acc =
          Buffer.from(
            (
              await bluetoothConnection.device!.readCharacteristicForService(
                SERVICE_UUID_IMU,
                CHARACTERISTIC_UUID_Z_ACCEL
              )
            ).value!,
            "base64"
          ).readFloatLE() - 9.8;
        Alert.alert("Z_ACCEL", z_acc.toString());
        // const time = Buffer.from(
        //   (
        //     await bluetoothConnection.device!.readCharacteristicForService(
        //       SERVICE_UUID_IMU,
        //       CHARACTERISTIC_UUID_TIME
        //     )
        //   ).value!,
        //   "base64"
        // ).readBigUInt64LE();
        // Alert.alert(time.toString());
        const vels = getVelocities();
        const posis = getPositions();
        characteristic_values.current.push({
          x_acc: x_acc,
          y_acc: y_acc,
          z_acc: z_acc,
          x_vel: vels[0],
          y_vel: vels[1],
          z_vel: vels[2],
          x: posis[0],
          y: posis[1],
          z: posis[2],
          time: 0,
        });

        if (characteristic_values.current.length === 101) {
          characteristic_values.current.shift();
        }
        setCharacteristics(characteristic_values.current);
      }, 10000);

      // .catch((error: BleError) => {
      //
      // });
    } else {
      dispatch(
        setBluetoothConnection({
          device: null,
          connected: false,
        })
      );
    }
  }, [bluetoothConnection.connected]);

  return (
    <Card mode="elevated" elevation={1} style={{ margin: 10 }}>
      <Card.Title title="Your Devices:" titleVariant="headlineSmall" />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <IconButton icon="watch-variant" size={100} />
          <IconButton
            icon={`battery-${10}-bluetooth`}
            style={{ marginLeft: "-20%" }}
            iconColor="red"
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <IconButton icon="watch-variant" size={100} />
          <IconButton
            icon={`battery-${40}-bluetooth`}
            style={{ marginLeft: "-20%" }}
          />
        </View>
      </View>
      {!bluetoothConnection.connected ? (
        <Button
          style={{ margin: 10 }}
          mode="contained"
          onPress={() => dispatch(setBluetoothModalShown(true))}
        >
          Connect
        </Button>
      ) : (
        <Text>{JSON.stringify(characteristics)}</Text>
      )}
    </Card>
  );
};

export default DeviceCard;
