import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartRecord = ({ data = [] }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Line
      style={{ width: "100%" }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "File Data",
          },
        },
      }}
      data={{
        labels: data?.map((item, index) => item[0]),
        datasets: [
          {
            label: "X",
            data: data?.map((item, index) => item[1]),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          //   {
          //     label: "Y",
          //     data: data?.map((item, index) => item[2]),
          //     borderColor: "blue",
          //     backgroundColor: "blue",
          //   },
          //   {
          //     label: "Z",
          //     data:data?.map((item, index) => item[3]),
          //     borderColor: "green",
          //     backgroundColor: "green",
          //   },
        ],
      }}
    />
  );
};

export default ChartRecord;
