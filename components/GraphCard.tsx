import { Data } from "plotly.js";
import { Card, Text } from "react-native-paper";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

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
        x: Array(20).fill(i),
        y: index,
        z: arr,
        type: "scatter3d",
        mode: "lines",
      };
    });

  return (
    <Card style={{ height: 350, margin: 10 }} mode="elevated" elevation={2}>
      <Plot
        data={traces}
        layout={{
          width: 900,
          height: 800,
          title: `Simple 3D Scatter`,
        }}
      />
    </Card>
  );
};

export default GraphCard;
