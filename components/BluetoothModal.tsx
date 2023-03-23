import { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { Device } from "react-native-ble-plx";
import {
  ActivityIndicator,
  Card,
  List,
  Menu,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { manager, SERVICE_ID } from "../BLEManager";
import { setBluetoothConnection } from "../reducers/bluetoothConnectionReducer";
import { setBluetoothModalShown } from "../reducers/bluetoothModalShownReducer";
import { RootState } from "../store";

const BluetoothModal = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.bluetoothModalShown);
  const bluetoothConnection = useSelector(
    (state: RootState) => state.bluetoothConnection
  );
  const [deviceList, setDeviceList] = useState<Device[]>([]);

  useEffect(() => {
    if (visible) {
      manager.state().then((value) => {
        if (value === "PoweredOn") {
          manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
              Alert.alert(error.message);
              return;
            }

            if (
              device &&
              device.name &&
              !deviceList.map((device) => device.name).includes(device.name) &&
              device.serviceUUIDs &&
              device.serviceUUIDs.includes(SERVICE_ID)
            ) {
              setDeviceList([...deviceList, device]);
            }
          });
        }
      });
    }
  }, [visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => dispatch(setBluetoothModalShown(false))}
      >
        <Card style={{ margin: 10 }} mode="contained">
          <Card.Title title="Searching For Devices" />
          <Card.Content
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <FlatList
              style={{ width: "100%" }}
              data={deviceList}
              renderItem={({ item }) => (
                <Menu.Item
                  leadingIcon="watch-export-variant"
                  onPress={() => {
                    item
                      .connect()
                      .then((device) => {
                        return device.discoverAllServicesAndCharacteristics();
                      })
                      .then((device) => {
                        dispatch(
                          setBluetoothConnection({
                            device: device,
                            connected: true,
                          })
                        );
                        dispatch(setBluetoothModalShown(false));
                      })
                      .catch((error) => Alert.alert(error));
                  }}
                  title={item.name}
                />
              )}
            />
            <ActivityIndicator animating={true} />
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

export default BluetoothModal;
