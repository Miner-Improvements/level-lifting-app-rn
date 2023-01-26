import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import AppbarAction from "react-native-paper/lib/typescript/components/Appbar/AppbarAction";
import { useDispatch } from "react-redux";
import { addWorkout, setWorkouts } from "../reducers/workoutsReducer";

const CustomNavigationBar = ({ navigation, back }: NativeStackHeaderProps) => {
  const [visible, setVisible] = useState(false);

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
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
