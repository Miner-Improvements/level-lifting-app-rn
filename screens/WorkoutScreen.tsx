import { View } from "react-native";
import { Text } from "react-native-paper";
import GraphCard from "../components/GraphCard";
import StatsCard from "../components/StatsCard";

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
    <View>
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
    </View>
  );
};

export default WorkoutString;
