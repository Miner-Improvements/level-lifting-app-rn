import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Appbar, Button, Dialog, Menu, Portal, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setEditMode } from "../reducers/editModeReducer";
import { setTheme } from "../reducers/themeReducer";
import {
  addWorkout,
  deleteSelected,
  setWorkouts,
} from "../reducers/workoutsReducer";
import { RootState } from "../store";

const CustomNavigationBar = ({ navigation, back }: NativeStackHeaderProps) => {
  const [visible, setVisible] = useState(false); //delete confirmation
  const theme = useSelector((state: RootState) => state.theme);
  const editMode = useSelector((state: RootState) => state.editMode);
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setWorkouts([]));
  };

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Action
        icon={require("../assets/Logo-highres-noname.png")}
        size={30}
      />
      <Appbar.Content title="Level Lifting" titleStyle={{ fontFamily: "" }} />
      {editMode && (
        <Appbar.Action
          icon="close"
          onPress={() => dispatch(setEditMode(!editMode))}
        />
      )}
      {
        <Appbar.Action
          icon="plus"
          onPress={() =>
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
            )
          }
        />
      }
      {editMode && (
        <Appbar.Action icon="delete" onPress={() => setVisible(true)} />
      )}
      <Appbar.Action
        icon={
          theme.themeType === "light"
            ? "white-balance-sunny"
            : "moon-waning-crescent"
        }
        onPress={() =>
          dispatch(setTheme(theme.themeType === "light" ? "dark" : "light"))
        }
      />
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Delete Workouts</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you sure?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                dispatch(deleteSelected());
                setVisible(false);
              }}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
