import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import WebView from "react-native-webview";
import GraphCard from "../components/GraphCard";
import StatsCard from "../components/StatsCard";
import WorkoutCard from "../components/WorkoutCard";

const WorkoutString = ({ route }: any) => {
  const workoutDate = new Date(route.params.workout.date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          aspectRatio: 3 / 2,
        }}
      >
        <Text variant="displayLarge">{route.params.workout.name}</Text>
        <Text variant="headlineMedium">{`${
          months[workoutDate.getMonth()]
        } ${workoutDate.getDate()}, ${workoutDate.getFullYear()}`}</Text>
      </View>
      <StatsCard workout={route.params.workout} />
      <GraphCard />
    </GestureHandlerRootView>
  );
};

export default WorkoutString;
