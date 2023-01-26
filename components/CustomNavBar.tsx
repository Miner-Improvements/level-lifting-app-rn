import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import AppbarAction from "react-native-paper/lib/typescript/components/Appbar/AppbarAction";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../reducers/themeReducer";
import { addWorkout, setWorkouts } from "../reducers/workoutsReducer";
import { RootState } from "../store";

const CustomNavigationBar = ({ navigation, back }: NativeStackHeaderProps) => {
  const [visible, setVisible] = useState(false);
  const theme = useSelector((state: RootState) => state.theme);
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
      <Appbar.Action icon="delete" onPress={() => dispatch(setWorkouts([]))} />
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
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
