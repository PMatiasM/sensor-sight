import { ChartData } from "../../types/ChartData";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  TimeSeriesScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ContextMenuController } from "../../types/ContextMenuController";
import "chartjs-adapter-moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({
  data,
  chartContextMenu,
}: {
  data: ChartData[];
  chartContextMenu: ContextMenuController;
}) {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
  return (
    <Line
      data={{
        datasets: data.map((item) => ({
          label: item.id,
          data: item.data,
          fill: false,
          backgroundColor: item.color,
          borderColor: item.color,
        })),
      }}
      options={{
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              maxTicksLimit: 10,
            },
            grid: {
              color: surfaceBorder,
            },
            type: "timeseries",
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      }}
      onContextMenu={(event) => chartContextMenu.open(event)}
    />
  );
}
