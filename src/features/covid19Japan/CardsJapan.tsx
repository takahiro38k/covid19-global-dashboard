import React from "react";
import CountUp from "react-countup";
import { GiMedicines } from "react-icons/gi";
import { MdLocalHospital } from "react-icons/md";
import { RiVirusFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Card, CardContent, Grid, Typography } from "@material-ui/core";

import {
  selectActivePrefectureNums,
  selectPrefecturesData,
  selectTotalData,
} from "./covid19JapanSlice";

const LabelGrid = styled(Grid)`
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-items: flex-end;
`;
const StyledSpan = styled.span`
  &[data-index="0"] {
    border-bottom: double 5px rgba(135, 206, 235, 0.5);
  }
  &[data-index="1"] {
    border-bottom: double 5px rgba(173, 255, 47, 0.5);
  }
  &[data-index="2"] {
    border-bottom: double 5px rgba(240, 128, 128, 0.5);
  }
`;
const LabelTypography = styled(Typography)`
  font-size: 17px;
  margin-left: 15px;
  flex-grow: 1;
`;
const StyledCard = styled(Card)`
  /* border-radius: 0% !important; // defaultの丸みを削除 */
  margin: 2% 2%;
  &[data-index="0"] {
    border-left: 8px solid rgba(135, 206, 235, 0.5);
  }
  &[data-index="1"] {
    border-left: 8px solid rgba(173, 255, 47, 0.5);
  }
  &[data-index="2"] {
    border-left: 8px solid rgba(240, 128, 128, 0.5);
  }
`;
const StyledCardContent = styled(CardContent)`
  padding-top: 12px !important;
  padding-bottom: 12px !important;
`;
// iconの共通style。
// <StyledIcon as={コンポーネント} />として使用。
const StyledIcon = styled.div`
  position: relative;
  top: 2px;
  right: 3px;
`;
const CardValue = styled(Typography)`
  text-align: right;
`;

const CardsJapan: React.FC = () => {
  const activePrefectureNums = useSelector(selectActivePrefectureNums);
  const prefecturesData = useSelector(selectPrefecturesData);
  const totalData = useSelector(selectTotalData);

  // 都道府県名
  const prefectureName = (num: number) => {
    if (num === -1) return "-"; // 未選択
    if (num === 100) return "全国"; // 全国
    return prefecturesData?.[num].name_ja || ""; // 各都道府県
  };

  // 更新日
  const updatedDate = (num: number) => {
    if (num === -1) return "-"; // 未選択
    if (num === 100)
      return totalData?.date
        ? `${totalData?.date
            .toString()
            .slice(0, 4)}/${totalData?.date
            .toString()
            .slice(4, 6)}/${totalData?.date.toString().slice(6)}`
        : "-"; // 全国
    const date = prefecturesData?.[num].last_updated.cases_date;
    return date
      ? `${date.toString().slice(0, 4)}/${date
          .toString()
          .slice(4, 6)}/${date.toString().slice(6)}`
      : "-"; // 各都道府県
  };

  // 感染者数
  const positiveData = (num: number) => {
    if (num === -1) return 0; // 未選択
    if (num === 100) return totalData?.positive || 0; // 全国
    return prefecturesData?.[num].cases || 0; // 各都道府県
  };
  // 回復者数
  const dischargeData = (num: number) => {
    if (num === -1) return 0;
    if (num === 100) return totalData?.discharge || 0;
    return prefecturesData?.[num].discharge || 0;
  };
  // 死亡者数
  const deathData = (num: number) => {
    if (num === -1) return 0;
    if (num === 100) return totalData?.death || 0;
    return prefecturesData?.[num].deaths || 0;
  };

  const cardElements = activePrefectureNums.map(
    (activePrefectureNum, index) => {
      return (
        <Grid container spacing={1} key={index}>
          {/* 都道府県名と更新日 */}
          <LabelGrid item xs={12}>
            <LabelTypography>
              {/* カスタム属性のdata-indexによって、styledで条件分岐し、border-bottomに色付け */}
              <StyledSpan data-index={index}>
                {prefectureName(activePrefectureNum)}
              </StyledSpan>
            </LabelTypography>
            <Typography variant="body2">
              <StyledSpan data-index={index}>
                {`更新日: ${updatedDate(activePrefectureNum)}`}&emsp;
              </StyledSpan>
            </Typography>
          </LabelGrid>

          {/* 感染者数card */}
          <Grid item xs={12} sm={4}>
            {/* カスタム属性のdata-indexによって、styledで条件分岐し、カードに色付け */}
            <StyledCard data-index={index}>
              <StyledCardContent>
                <Typography color="textSecondary">
                  <StyledIcon as={MdLocalHospital} />
                  感染者数
                </Typography>
                <CardValue variant="h6">
                  <CountUp
                    start={0}
                    end={positiveData(activePrefectureNum)}
                    // start表示からend表示に変わるまでの時間指定(秒)
                    duration={0.8}
                    // 3桁ごとに","を挿入
                    separator=","
                  />
                </CardValue>
              </StyledCardContent>
            </StyledCard>
          </Grid>

          {/* 回復者数card */}
          <Grid item xs={12} sm={4}>
            <StyledCard data-index={index}>
              <StyledCardContent>
                <Typography color="textSecondary">
                  <StyledIcon as={GiMedicines} />
                  回復者数
                </Typography>
                <CardValue variant="h6">
                  <CountUp
                    start={0}
                    end={dischargeData(activePrefectureNum)}
                    // start表示からend表示に変わるまでの時間指定(秒)
                    duration={0.8}
                    // 3桁ごとに","を挿入
                    separator=","
                  />
                </CardValue>
              </StyledCardContent>
            </StyledCard>
          </Grid>

          {/* 死亡者数card */}
          <Grid item xs={12} sm={4}>
            <StyledCard data-index={index}>
              <StyledCardContent>
                <Typography color="textSecondary">
                  <StyledIcon as={RiVirusFill} />
                  死亡者数
                </Typography>
                <CardValue variant="h6">
                  <CountUp
                    start={0}
                    end={deathData(activePrefectureNum)}
                    // start表示からend表示に変わるまでの時間指定(秒)
                    duration={0.8}
                    // 3桁ごとに","を挿入
                    separator=","
                  />
                </CardValue>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        </Grid>
      );
    }
  );

  return <>{cardElements}</>;
};

export default CardsJapan;
