import dayjs from "dayjs";
import React from "react";
import CountUp from "react-countup";
import { GiMedicines } from "react-icons/gi";
import { MdLocalHospital } from "react-icons/md";
import { RiStethoscopeLine, RiVirusFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Card, CardContent, Grid, Typography } from "@material-ui/core";

import { selectDaily } from "./covid19WorldSlice";

const LabelGrid = styled(Grid)`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const StyledSpan = styled.span`
  border-bottom: double 5px rgba(180, 180, 180, 0.6);
`;
const StyledCard = styled(Card)`
  margin: 2% 2%;
  &[data-index="0"] {
    border-left: 8px solid rgba(51, 51, 255, 0.6);
  }
  &[data-index="1"] {
    border-left: 8px solid rgba(0, 128, 0, 0.6);
  }
  &[data-index="2"] {
    border-left: 8px solid rgba(255, 130, 0, 0.6);
  }
  &[data-index="3"] {
    border-left: 8px solid rgba(255, 51, 112, 0.6);
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
const RedSpan = styled.span`
  color: rgba(255, 0, 0, 0.9);
  font-size: 12px;
`;

const Cards: React.FC = () => {
  const daily = useSelector(selectDaily);
  return (
    <Grid container spacing={1}>
      {/* 更新日 */}
      <LabelGrid item xs={12}>
        <Typography variant="body2">
          <StyledSpan>
            {/* Day.js
              https://day.js.org/docs/en/display/format */}
            {`更新日: ${dayjs(daily[daily.length - 1].Date).format(
              "YYYY/MM/DD"
            )}`}
            &emsp;
          </StyledSpan>
        </Typography>
      </LabelGrid>

      {/* 感染者数card */}
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard data-index={0}>
          <StyledCardContent>
            <Typography color="textSecondary">
              <StyledIcon as={MdLocalHospital} />
              感染者数
            </Typography>
            <CardValue variant="h6">
              <CountUp
                start={0}
                // daily配列の末尾の要素に最新日のデータが格納されている。
                // 末尾のindexを指定することで、最新のデータを取得。
                end={daily[daily.length - 1].Confirmed}
                // startからendまでのcount upを1.5sかけて実行する。
                duration={0.8}
                // 3桁ごとに","区切り。
                separator=","
              />
            </CardValue>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      {/* 回復者数card */}
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard data-index={1}>
          <StyledCardContent>
            <Typography color="textSecondary">
              <StyledIcon as={GiMedicines} />
              回復者数
            </Typography>
            <CardValue variant="h6">
              <CountUp
                start={0}
                end={daily[daily.length - 1].Recovered}
                duration={0.8}
                separator=","
              />
            </CardValue>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      {/* 陽性者数card */}
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard data-index={2}>
          <StyledCardContent>
            <Typography color="textSecondary">
              <StyledIcon as={RiStethoscopeLine} />
              陽性者数&emsp;<RedSpan>(各日時点)</RedSpan>
            </Typography>
            <CardValue variant="h6">
              <CountUp
                start={0}
                end={daily[daily.length - 1].Active}
                duration={0.8}
                separator=","
              />
            </CardValue>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      {/* 死亡者数card */}
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard data-index={3}>
          <StyledCardContent>
            <Typography color="textSecondary">
              <StyledIcon as={RiVirusFill} />
              死亡者数
            </Typography>
            <CardValue variant="h6">
              <CountUp
                start={0}
                end={daily[daily.length - 1].Deaths}
                duration={0.8}
                separator=","
              />
            </CardValue>
          </StyledCardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default Cards;
