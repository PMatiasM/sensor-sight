import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useConnection } from "../../contexts/Connection";
import { ChartData } from "../../types/ChartData";

export default function LineChart() {
  const { readings } = useConnection();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  useEffect(() => {
    setChartData(
      readings.map((reading, index) => ({
        id: `${index}`,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        data: reading,
      }))
    );
  }, [readings]);
  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
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
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableCrosshair={true}
      useMesh={true}
    />
  );
}
