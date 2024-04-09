import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useExperiment } from "../../contexts/Experiment";
import { ChartData } from "../../types/ChartData";

export default function LineChart() {
  const { experiment, readings } = useExperiment();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  useEffect(() => {
    const a = [];
    for (
      let index = 0;
      index < experiment!.variables.length && index < readings.length;
      index++
    ) {
      const variable = experiment!.variables[index];
      const reading = readings[index];
      a.push({ id: `${variable.name}`, data: reading });
    }
    setChartData(a);
  }, [readings]);
  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{
        format: "%Y-%m-%dT%H:%M:%S.%L%Z",
        type: "time",
        min: "auto",
        max: "auto",
      }}
      xFormat="time:%H:%M:%S.%L"
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%S.%L",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      colors={{ scheme: "category10" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
