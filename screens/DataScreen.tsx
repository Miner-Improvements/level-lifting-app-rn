import { ScrollView } from "react-native-gesture-handler";
import { Accelerometer_Data, WorkoutData } from "../reducers/workoutsReducer";
import { List, Text } from "react-native-paper";

const DataScreen = ({ route }: any) => {
  const workoutData = route.params.workout
    .accelerometerData as Accelerometer_Data[];
  const filteredWorkoutData = workoutData.filter(
    (dataPoint: Accelerometer_Data, index) => index % 10 === 0
  );
  return (
    <ScrollView>
      {filteredWorkoutData.map((dataPoint: Accelerometer_Data) => (
        <Text>
          ----------------------------------------------------------{"\n"}
          {JSON.stringify(dataPoint)
            .replace(/,/g, "\n")
            .replace("{", "")
            .replace("}", "")}
        </Text>
      ))}
      <Text>
        ----------------------------------------------------------{"\n"}
      </Text>
    </ScrollView>
  );
};

export default DataScreen;
