import { Data } from "plotly.js";
import { Card, Text } from "react-native-paper";
import Plotly from "react-native-plotly";

function randomValues(num: number, mul: number) {
  const arr = [];
  const index = [];
  for (let i = 0; i < num; i++) {
    arr.push(Math.random() * mul);
    index.push(i);
  }
  return { index, arr };
}

const GraphCard = () => {
  const traces: Data[] = Array(3)
    .fill(0)
    .map((_, i) => {
      const { index, arr } = randomValues(20, 3);
      return {
        x: randomValues(20, 3).arr,
        y: randomValues(20, 3).arr,
        z: arr,
        type: "scatter3d",
        mode: "markers",
      };
    });

  return (
    <Plotly
      data={traces}
      layout={{
        title: `Simple 3D Scatter`,
      }}
    />
  );
};

export default GraphCard;
