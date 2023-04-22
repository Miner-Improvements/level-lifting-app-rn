import { View } from "react-native";
import { Card, Divider, IconButton } from "react-native-paper";
import { WorkoutData } from "../reducers/workoutsReducer";
import { useNavigation } from "@react-navigation/native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const StatsCard = ({ workout }: { workout: WorkoutData }) => {
  const nav = useNavigation<any>();

  const buttonTap = Gesture.Tap().onBegin((e) => {
    nav.navigate("Data", {
      workout: workout,
    });
    console.log("Pressed");
  });

  return (
    <Card
      mode="elevated"
      elevation={2}
      style={{ marginVertical: 2, marginHorizontal: 10 }}
      onPress={() => {
        nav.navigate("Data", {
          workout: workout,
        });
        console.log("Pressed");
      }}
    >
      <IconButton
        icon="information-outline"
        style={{ position: "absolute", top: 2.5, right: 2.5 }}
        size={20}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Title
          style={{
            flex: 1,
          }}
          titleStyle={{ textAlign: "center" }}
          subtitleStyle={{ textAlign: "center" }}
          title={`${workout.reps}`}
          titleVariant="headlineSmall"
          subtitle="Reps"
        />
        <Card.Title
          style={{
            flex: 1,
          }}
          titleStyle={{ textAlign: "center" }}
          subtitleStyle={{ textAlign: "center" }}
          title={`${workout.sets}`}
          titleVariant="headlineSmall"
          subtitle="Sets"
        />
      </View>

      <Divider horizontalInset bold />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Title
          style={{
            flex: 1,
          }}
          titleStyle={{ textAlign: "center" }}
          subtitleStyle={{ textAlign: "center" }}
          title={`${workout.maxAcceleration}`}
          titleVariant="headlineSmall"
          subtitle="Max Acceleration"
        />
        <Card.Title
          style={{
            flex: 1,
          }}
          titleStyle={{ textAlign: "center" }}
          subtitleStyle={{ textAlign: "center" }}
          title={`${workout.maxForce}`}
          titleVariant="headlineSmall"
          subtitle="Max Force"
        />
      </View>
      <Divider horizontalInset bold />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Title
          style={{
            flex: 1,
          }}
          titleStyle={{ textAlign: "center" }}
          subtitleStyle={{ textAlign: "center" }}
          title={`${workout.balanceRating}`}
          titleVariant="headlineSmall"
          subtitle="Balance Rating"
        />
        <Card.Title
          style={{
            flex: 1,
          }}
          titleStyle={{ textAlign: "center" }}
          subtitleStyle={{ textAlign: "center" }}
          title={`${workout.avgSetDuration}`}
          titleVariant="headlineSmall"
          subtitle="Set Duration (Avg)"
        />
      </View>
    </Card>
  );
};

export default StatsCard;
