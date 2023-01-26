import { View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setBluetoothModalShown } from "../reducers/bluetoothModalShownReducer";
import { RootState } from "../store";

const DeviceCard = () => {
  const dispatch = useDispatch();
  const bluetoothModalShown = useSelector(
    (state: RootState) => state.bluetoothModalShown
  );

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
      <Button
        style={{ margin: 10 }}
        mode="contained"
        onPress={() => dispatch(setBluetoothModalShown(true))}
      >
        Connect
      </Button>
    </Card>
  );
};

export default DeviceCard;
