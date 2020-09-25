import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

import {
  selectActivePrefectureNums,
  selectPrefecturesData,
  selectTotalData,
} from "./covid19JapanSlice";

const ChartJapan: React.FC = () => {
  const activePrefectureNums = useSelector(selectActivePrefectureNums);
  const prefecturesData = useSelector(selectPrefecturesData);
  const totalData = useSelector(selectTotalData);

  return (
    <Bar
      data={{
        labels: ["感染者数", "回復者数", "死亡者数"],
        datasets: [
          // bar chart 1
          {
            label:
              activePrefectureNums[0] === -1
                ? "1"
                : activePrefectureNums[0] === 100
                ? "1 全国"
                : `1 ${prefecturesData?.[activePrefectureNums[0]].name_ja}`,
            backgroundColor: [
              "rgba(135, 206, 235, 0.5)",
              "rgba(135, 206, 235, 0.5)",
              "rgba(135, 206, 235, 0.5)",
            ],
            // -1 => 未選択, 100 => 全国, 0-46 => 各都道府県
            data: [
              activePrefectureNums[0] === -1
                ? 0 // 未選択
                : activePrefectureNums[0] === 100
                ? totalData?.positive // 全国
                : prefecturesData?.[activePrefectureNums[0]].cases, // 各都道府県
              activePrefectureNums[0] === -1
                ? 0
                : activePrefectureNums[0] === 100
                ? totalData?.discharge
                : prefecturesData?.[activePrefectureNums[0]].discharge,
              activePrefectureNums[0] === -1
                ? 0
                : activePrefectureNums[0] === 100
                ? totalData?.death
                : prefecturesData?.[activePrefectureNums[0]].deaths,
            ],
          },
          // bar chart 2
          {
            label:
              activePrefectureNums[1] === -1
                ? "2"
                : activePrefectureNums[1] === 100
                ? "2 全国"
                : `2 ${prefecturesData?.[activePrefectureNums[1]].name_ja}`,
            backgroundColor: [
              "rgba(173, 255, 47, 0.5)",
              "rgba(173, 255, 47, 0.5)",
              "rgba(173, 255, 47, 0.5)",
            ],
            data: [
              activePrefectureNums[1] === -1
                ? 0
                : activePrefectureNums[1] === 100
                ? totalData?.positive
                : prefecturesData?.[activePrefectureNums[1]].cases,
              activePrefectureNums[1] === -1
                ? 0
                : activePrefectureNums[1] === 100
                ? totalData?.discharge
                : prefecturesData?.[activePrefectureNums[1]].discharge,
              activePrefectureNums[1] === -1
                ? 0
                : activePrefectureNums[1] === 100
                ? totalData?.death
                : prefecturesData?.[activePrefectureNums[1]].deaths,
            ],
          },
          // bar chart 3
          {
            label:
              activePrefectureNums[2] === -1
                ? "3"
                : activePrefectureNums[2] === 100
                ? "3 全国"
                : `3 ${prefecturesData?.[activePrefectureNums[2]].name_ja}`,
            backgroundColor: [
              "rgba(240, 128, 128, 0.5)",
              "rgba(240, 128, 128, 0.5)",
              "rgba(240, 128, 128, 0.5)",
            ],
            data: [
              activePrefectureNums[2] === -1
                ? 0
                : activePrefectureNums[2] === 100
                ? totalData?.positive
                : prefecturesData?.[activePrefectureNums[2]].cases,
              activePrefectureNums[2] === -1
                ? 0
                : activePrefectureNums[2] === 100
                ? totalData?.discharge
                : prefecturesData?.[activePrefectureNums[2]].discharge,
              activePrefectureNums[2] === -1
                ? 0
                : activePrefectureNums[2] === 100
                ? totalData?.death
                : prefecturesData?.[activePrefectureNums[2]].deaths,
            ],
          },
        ],
      }}
      options={{
        // 凡例を非表示
        legend: { display: false },
        // chart上部にtitleを表示
        // title: { display: true, text: `タイトル` },
        scales: {
          yAxes: [
            {
              ticks: {
                // メモリの始点を0にする。
                beginAtZero: true,
                // min: 0,
                // max: 100,
              },
            },
          ],
        },
      }}
    />
  );
};

export default ChartJapan;
