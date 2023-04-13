import { useState } from "react";
import { Image } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

const WorkoutLiveModal = ({
  visible,
  setVisible,
  stopWorkout,
}: {
  visible: boolean;
  setVisible: (x: boolean) => void;
  stopWorkout: () => void;
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal visible={visible}>
        <Surface
          style={{
            height: "90%",
            width: "90%",
            margin: "5%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: theme.colors.primaryContainer,
          }}
          elevation={3}
          onTouchEnd={() => {
            stopWorkout();
            setVisible(false);
          }}
        >
          <Image
            style={{ width: 50, resizeMode: "contain" }}
            source={require("../assets/logo-anim.gif")}
          />
          <Text variant="displayMedium" style={{ textAlign: "center" }}>
            Touch to End Workout
          </Text>
        </Surface>
      </Modal>
    </Portal>
  );
};

export default WorkoutLiveModal;
