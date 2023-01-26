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

  const handlePress = () => {
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
      })
    );
  };

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        ListHeaderComponent={<DeviceCard />}
        data={workouts}
        renderItem={({ item }) =>
          WorkoutCard({ navigation: navigation, workout: item })
        }
      />
      <BluetoothModal />
    </View>
  );
};

export default HomeScreen;
