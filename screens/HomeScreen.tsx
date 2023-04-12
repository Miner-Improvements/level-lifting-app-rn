import { useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProps } from "../App";
import BluetoothModal from "../components/BluetoothModal";
import DeviceCard from "../components/DeviceCard";
import WorkoutCard from "../components/WorkoutCard";
import { addWorkout } from "../reducers/workoutsReducer";
import { RootState } from "../store";

const HomeScreen = ({ navigation }: { navigation: NavigationProps }) => {
  const dispatch = useDispatch();
  const workouts = useSelector((state: RootState) => state.workouts);

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        ListHeaderComponent={<DeviceCard />}
        contentContainerStyle={{ paddingBottom: "10%" }}
        data={workouts}
        style={{ height: "100%" }}
        renderItem={({ item }) => (
          <WorkoutCard navigation={navigation} workout={item} />
        )}
      />
      <BluetoothModal />
    </View>
  );
};

export default HomeScreen;
