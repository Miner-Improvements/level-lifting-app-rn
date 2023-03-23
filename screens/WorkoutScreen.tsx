import { useState } from "react";
import { View, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import WebView from "react-native-webview";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import GraphCard from "../components/GraphCard";
import StatsCard from "../components/StatsCard";
import WorkoutCard from "../components/WorkoutCard";
import { setEditMode } from "../reducers/editModeReducer";
import { updateWorkout } from "../reducers/workoutsReducer";
import { RootState } from "../store";

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
  const editMode = useSelector((state: RootState) => state.editMode);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(route.params.workout.name);
  const theme = useSelector((state: RootState) => state.theme);

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
        {editMode ? (
          <TextInput
            style={{
              color: theme.theme.colors.primary,
              fontFamily: theme.theme.fonts.displayLarge.fontFamily,
              fontSize: theme.theme.fonts.displayLarge.fontSize,
              fontWeight: theme.theme.fonts.displayLarge.fontWeight,
              letterSpacing: theme.theme.fonts.displayLarge.letterSpacing,
              lineHeight: theme.theme.fonts.displayLarge.lineHeight,
            }}
            onSubmitEditing={() => {
              dispatch(updateWorkout({ ...route.params.workout, name: title }));
              dispatch(setEditMode(false));
            }}
            onChangeText={setTitle}
            value={title}
          />
        ) : (
          <Text
            onLongPress={() => dispatch(setEditMode(!editMode))}
            variant="displayLarge"
          >
            {title}
          </Text>
        )}
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
