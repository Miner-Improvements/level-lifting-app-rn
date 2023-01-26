import { useState } from "react";
import { ActivityIndicator, Card, Modal, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setBluetoothModalShown } from "../reducers/bluetoothModalShownReducer";
import { RootState } from "../store";

const BluetoothModal = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.bluetoothModalShown);
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
            <ActivityIndicator animating={true} />
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

export default BluetoothModal;
