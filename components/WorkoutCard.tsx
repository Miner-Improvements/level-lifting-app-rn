import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Appbar, Card, IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavigationProps } from "../App";
import { setEditMode } from "../reducers/editModeReducer";
import {
  setWorkoutSelected,
  unselectAll,
  WorkoutData,
} from "../reducers/workoutsReducer";
import { RootState } from "../store";

interface WorkoutCardProps {
  navigation: NavigationProps;
  workout: WorkoutData;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const theme = useSelector((state: RootState) => state.theme);
  const editMode = useSelector((state: RootState) => state.editMode);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  return (
    <Card
      mode="elevated"
      elevation={5}
      style={{
        marginVertical: 2,
        marginHorizontal: 10,
      }}
      onLongPress={() => {
        if (editMode) {
          dispatch(unselectAll());
        }
        dispatch(setEditMode(!editMode));
      }}
      onPress={() => {
        if (editMode) {
          dispatch(
            setWorkoutSelected({
              id: props.workout.id!,
              selected: !props.workout.selected!,
            })
          );
        } else {
          props.navigation.navigate("Workout", {
            workout: props.workout,
          });
        }
      }}
      delayLongPress={500}
    >
      <Card.Title
        title={props.workout.name}
        left={
          editMode
            ? () => (
                <IconButton
                  icon={
                    props.workout.selected ? "check-circle" : "circle-outline"
                  }
                  iconColor={theme.theme.colors.primary}
                />
              )
            : undefined
        }
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
