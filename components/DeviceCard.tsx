import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { BleError, Characteristic, Service } from "react-native-ble-plx";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  CHARACTERISTIC_ID,
  CHARACTERISTIC_UUID_X_ACCEL,
  CHARACTERISTIC_UUID_Y_ACCEL,
  CHARACTERISTIC_UUID_Z_ACCEL,
  SERVICE_ID,
  SERVICE_UUID_IMU,
} from "../BLEManager";
import { setBluetoothModalShown } from "../reducers/bluetoothModalShownReducer";
import { RootState } from "../store";
import { Buffer } from "buffer";

export interface Accelerometer_Data {
  x?: number;
  y?: number;
  // z?: number;
}

const DeviceCard = () => {
  const dispatch = useDispatch();
  const bluetoothModalShown = useSelector(
    (state: RootState) => state.bluetoothModalShown
  );
  const bluetoothConnection = useSelector(
    (state: RootState) => state.bluetoothConnection
  );
  const [characteristics, setCharacteristics] = useState<string[]>([]);
  const characteristic_values = useRef<Accelerometer_Data[]>([{}]);

  useEffect(() => {
    if (bluetoothConnection.connected) {
      bluetoothConnection.device!.monitorCharacteristicForService(
        SERVICE_UUID_IMU,
        CHARACTERISTIC_UUID_X_ACCEL,
        (error, device) => {
          if (error) {
            Alert.alert(error.message, JSON.stringify(error));
            return;
          }
          if (
            characteristic_values.current[
              characteristic_values.current.length - 1
            ].x &&
            characteristic_values.current[
              characteristic_values.current.length - 1
            ].y /*&&
            characteristic_values.current[
              characteristic_values.current.length - 1
            ].z*/
          ) {
            characteristic_values.current.push({
              x: Buffer.from(device!.value!, "base64").readFloatBE(),
            });
          } else {
            characteristic_values.current[
              characteristic_values.current.length - 1
            ].x = Buffer.from(device!.value!, "base64").readFloatBE();
          }

          if (characteristic_values.current.length === 101) {
            characteristic_values.current.shift();
          }
        }
      );
      // .catch((error: BleError) => {
      //
      // });

      bluetoothConnection.device!.monitorCharacteristicForService(
        SERVICE_UUID_IMU,
        CHARACTERISTIC_UUID_Y_ACCEL,
        (error, device) => {
          if (error) {
            Alert.alert(error.message, JSON.stringify(error));
            return;
          }
          if (
            characteristic_values.current[
              characteristic_values.current.length - 1
            ].x &&
            characteristic_values.current[
              characteristic_values.current.length - 1
            ].y /*&&
            characteristic_values.current[
              characteristic_values.current.length - 1
            ].z*/
          ) {
            characteristic_values.current.push({
              y: Buffer.from(device!.value!, "base64").readFloatBE(),
            });
          } else {
            characteristic_values.current[
              characteristic_values.current.length - 1
            ].y = Buffer.from(device!.value!, "base64").readFloatBE();
          }

          if (characteristic_values.current.length === 101) {
            characteristic_values.current.shift();
          }
        }
      );

      // bluetoothConnection.device!.monitorCharacteristicForService(
      //   SERVICE_UUID_IMU,
      //   CHARACTERISTIC_UUID_Z_ACCEL,
      //   (error, device) => {
      //     if (error) {
      //       Alert.alert(error.message, JSON.stringify(error));
      //       return;
      //     }
      //     if (
      //       characteristic_values.current[
      //         characteristic_values.current.length - 1
      //       ].x &&
      //       characteristic_values.current[
      //         characteristic_values.current.length - 1
      //       ].y &&
      //       characteristic_values.current[
      //         characteristic_values.current.length - 1
      //       ].z
      //     ) {
      //       characteristic_values.current.push({
      //         z: Buffer.from(device!.value!, "base64").readFloatBE(),
      //       });
      //     } else {
      //       characteristic_values.current[
      //         characteristic_values.current.length - 1
      //       ].z = Buffer.from(device!.value!, "base64").readFloatBE();
      //     }

      //     if (characteristic_values.current.length === 101) {
      //       characteristic_values.current.shift();
      //     }
      //   }
      // );
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
        <Text>{JSON.stringify(characteristic_values)}</Text>
      )}
    </Card>
  );
};

export default DeviceCard;
