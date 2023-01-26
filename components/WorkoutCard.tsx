import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card, IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { NavigationProps } from "../App";
import { WorkoutData } from "../reducers/workoutsReducer";
import { RootState } from "../store";

interface WorkoutCardProps {
  navigation: NavigationProps;
  workout: WorkoutData;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <Card
      mode="elevated"
      elevation={5}
      style={{
        marginVertical: 2,
        marginHorizontal: 10,
      }}
      onLongPress={() => null}
      onPress={() =>
        props.navigation.navigate("Workout", {
          workout: props.workout,
        })
      }
      delayLongPress={500}
    >
      <Card.Title
        title={props.workout.name}
        right={(props) => (
          <IconButton
            icon={{ source: "chevron-right", direction: "ltr" }}
            iconColor={theme.theme.colors.primary}
          />
        )}
      />
    </Card>
  );
};

export default WorkoutCard;
