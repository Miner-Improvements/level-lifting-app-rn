import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { BleError, Characteristic } from "react-native-ble-plx";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { CHARACTERISTIC_ID, SERVICE_ID } from "../BLEManager";
import { setBluetoothModalShown } from "../reducers/bluetoothModalShownReducer";
import { RootState } from "../store";
import { Buffer } from "buffer";

const DeviceCard = () => {
  const dispatch = useDispatch();
  const bluetoothModalShown = useSelector(
    (state: RootState) => state.bluetoothModalShown
  );
  const bluetoothConnection = useSelector(
    (state: RootState) => state.bluetoothConnection
  );
  const [characteristics, setCharacteristics] = useState<string[]>([]);

  useEffect(() => {
    if (bluetoothConnection.connected) {
      bluetoothConnection.device!.monitorCharacteristicForService(
        SERVICE_ID,
        CHARACTERISTIC_ID,
        (error, device) => {
          if (error) {
            Alert.alert(error.message, JSON.stringify(error));
            return;
          }
          setCharacteristics(
            characteristics.concat(characteristics, [
              Buffer.from(device!.value!, "base64").toString(),
            ])
          );
        }
      );
      // .catch((error: BleError) => {
      //
      // });
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
