import { Card, Text } from "react-native-paper";

const GraphCard = () => {
  return (
    <Card style={{ height: 350, margin: 10 }} mode="elevated" elevation={2}>
      <Text
        style={{
          transform: [
            { rotate: "45deg" },
            { translateX: 190 },
            { translateY: 120 },
          ],
        }}
        variant="headlineLarge"
      >
        Your Graph Here!
      </Text>
    </Card>
  );
};

export default GraphCard;
