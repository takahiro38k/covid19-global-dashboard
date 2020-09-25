import dayjs from "dayjs";
import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

import { selectDaily } from "./covid19WorldSlice";

const Chart: React.FC = () => {
  const daily = useSelector(selectDaily);
  // daily配列の各要素の日付(Date)を分割代入し、日付だけの配列を作成。
  const dates = daily.map(({ Date }) => Date);

  const lineChart = daily[0] && (
    <Line
      data={{
        // 日付を読みやすいフォーマットに変更。
        // labels: dates.map((date) => new Date(date).toDateString()),
        // Day.jsを採用
        // https://day.js.org/docs/en/display/format
        labels: dates.map((date) => dayjs(date).format("YY-M-D")),

        datasets: [
          {
            data: daily.map((data) => data.Confirmed),
            label: "感染者数",
            borderColor: "rgba(51, 51, 255, 0.6)",
            fill: false,
            lineTension: 0.1,
            borderWidth: 4,
            pointRadius: 0, // 0にすることでpointを非表示。defaultは3。
            pointHitRadius: 10, // pointの近くをhoverした時、データを表示しやすくする。
          },
          {
            data: daily.map((data) => data.Recovered),
            label: "回復者数",
            borderColor: "rgba(0, 128, 0, 0.6)",
            fill: false,
            lineTension: 0.1,
            borderWidth: 4,
            pointRadius: 0, // 0にすることでpointを非表示。defaultは3。
            pointHitRadius: 10, // pointの近くをhoverした時、データを表示しやすくする。
          },
          {
            data: daily.map((data) => data.Active),
            label: "陽性者数",
            borderColor: "rgba(255, 130, 0, 0.6)",
            fill: false,
            lineTension: 0.1,
            borderWidth: 4,
            pointRadius: 0, // 0にすることでpointを非表示。defaultは3。
            pointHitRadius: 10, // pointの近くをhoverした時、データを表示しやすくする。
          },
          {
            data: daily.map((data) => data.Deaths),
            label: "死亡者数",
            borderColor: "rgba(255, 51, 112, 0.6)",
            fill: false,
            lineTension: 0.1,
            borderWidth: 4,
            pointRadius: 0, // 0にすることでpointを非表示。defaultは3。
            pointHitRadius: 10, // pointの近くをhoverした時、データを表示しやすくする。
          },
        ],
      }}
    />
  );

  return <div>{lineChart}</div>;
};

export default Chart;
