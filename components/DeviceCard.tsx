import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { BleError, Characteristic, Service } from "react-native-ble-plx";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setBluetoothModalShown } from "../reducers/bluetoothModalShownReducer";
import { RootState } from "../store";
import { Buffer } from "buffer";
import { setBluetoothConnection } from "../reducers/bluetoothConnectionReducer";
import GraphCard from "./GraphCard";
import useWorkout from "../hooks/useWorkout";
import { addWorkout } from "../reducers/workoutsReducer";

const DeviceCard = () => {
  const dispatch = useDispatch();
  const [startWorkout, stopWorkout, workoutOngoing] = useWorkout();
  const bluetoothConnection = useSelector(
    (state: RootState) => state.bluetoothConnection
  );
  const stopAndSaveWorkout = async () => {
    const accelerometerData = await stopWorkout();
    if (accelerometerData.length > 0) {
      dispatch(
        addWorkout({
          name: "workout 1",
          date: new Date().toISOString(),
          reps: 20,
          sets: 3,
          maxAcceleration: 33,
          maxForce: 12,
          balanceRating: "A",
          avgSetDuration: 56,
          accelerometerData: accelerometerData,
        })
      );
    }
  };

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
      {!bluetoothConnection.connected && (
        <Button
          style={{ margin: 10 }}
          mode="contained"
          onPress={() => dispatch(setBluetoothModalShown(true))}
        >
          Connect
        </Button>
      )}
      {bluetoothConnection.connected && !workoutOngoing && (
        <Button
          style={{ margin: 10 }}
          mode="contained"
          onPress={() => {
            startWorkout();
          }}
        >
          Start Workout
        </Button>
      )}
      {bluetoothConnection.connected && workoutOngoing && (
        <Button
          style={{ margin: 10 }}
          mode="contained"
          onPress={() => {
            stopAndSaveWorkout();
          }}
        >
          Stop Workout
        </Button>
      )}
    </Card>
  );
};

export default DeviceCard;
