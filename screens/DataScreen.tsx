import { ScrollView } from "react-native-gesture-handler";
import { Accelerometer_Data, WorkoutData } from "../reducers/workoutsReducer";
import { Button, List, Text } from "react-native-paper";
import { useState } from "react";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const DataScreen = ({ route }: any) => {
  const workoutData = route.params.workout
    .accelerometerData as Accelerometer_Data[];
  const filteredWorkoutData = workoutData.filter(
    (dataPoint: Accelerometer_Data, index) => index % 10 === 0
  );
  const [viewedData, setViewedData] = useState(filteredWorkoutData);

  return (
    <ScrollView>
      {viewedData.map((dataPoint: Accelerometer_Data, index) => (
        <Text key={Date.now() * index}>
          ----------------------------------------------------------{"\n"}
          {JSON.stringify(dataPoint)
            .replace(/,/g, "\n")
            .replace("{", "")
            .replace("}", "")}
        </Text>
      ))}
      <Text>----------------------------------------------------------</Text>
      <Button onPress={() => setViewedData(workoutData)}>See All</Button>
    </ScrollView>
  );
};

export default DataScreen;
