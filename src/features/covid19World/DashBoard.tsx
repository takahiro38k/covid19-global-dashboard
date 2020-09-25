import React, { useEffect } from "react";
import { FaGlobeAsia } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Container, Grid, Hidden, Link, Typography } from "@material-ui/core";

import Cards from "./Cards";
import Chart from "./Chart";
import { fetchAsyncGetDaily } from "./covid19WorldSlice";
import SwitchCountry from "./SwitchCountry";

const Root = styled.div`
  /* 最大幅で表示 */
  flex-grow: 1;
  margin-bottom: 60px;
`;
const TitleDiv = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;
const TitleTypography = styled(Typography)`
  font-size: 27px;
  font-weight: bold;
`;
const SentenceGrid = styled(Grid)`
  /* Breakpoint(sm)に合わせて調整 */
  @media screen and (min-width: 600px) {
    padding: 0px 15px;
  }
`;
const RedSpan = styled.span`
  color: red;
`;
const ContainerGrid = styled(Grid)`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  /* カスタム属性でmarginを調整 */
  &[data-index="m0"] {
    margin-top: 0px;
  }
  &[data-index="m30"] {
    margin-top: 30px;
  }
`;
const ChartGrid = styled(Grid)`
  margin-top: 20px;
  /* Breakpoint(sm)に合わせて調整 */
  @media screen and (min-width: 600px) {
    margin-top: 25px;
  }
`;
const StyledIcon = styled.div`
  position: relative;
  top: 3px;
  right: 6px;
`;

const DashBoard: React.FC = () => {
  const dispatch = useDispatch();

  // 起動時にapiの値を取得。初期値は日本とする。
  useEffect(() => {
    dispatch(fetchAsyncGetDaily("japan"));
  }, [dispatch]);

  return (
    <Root>
      <Container>
        <TitleDiv>
          <TitleTypography id="globally">
            <StyledIcon as={FaGlobeAsia} />
            Globally
          </TitleTypography>
        </TitleDiv>

        <ContainerGrid container>
          {/* Breakpoints
            https://material-ui.com/customization/breakpoints/#breakpoints */}
          {/* md以上の表示でchartサイズを調整 */}
          <Hidden smDown>
            <Grid item md={2}></Grid>
          </Hidden>

          <SentenceGrid item xs={12} md={8}>
            <Typography>
              国ごとの<RedSpan>累計</RedSpan>を、<RedSpan>時系列</RedSpan>
              で表示できます。<RedSpan>陽性者</RedSpan>のみ累計ではなく
              <RedSpan>各日時点の人数</RedSpan>です。
            </Typography>
            <ul>
              <li>
                データの参照元は
                {/* Links - Security
                https://material-ui.com/components/links/#links */}
                <Link
                  href="https://covid19api.com/"
                  target="_blank"
                  rel="noopener"
                >
                  &thinsp;こちら&thinsp;
                </Link>
                です。日本時間の12:00〜15:00頃に<RedSpan>メンテナンス</RedSpan>が実施される日があり、その場合は<RedSpan>データを取得できない可能性</RedSpan>があります。
              </li>
              <li>
                参照元が異なるため、
                <RedSpan>
                  「In Japan」における日本のデータとわずかな差異があります
                </RedSpan>
                。クルーズ船、検疫職員、チャータ便などを含むかどうかによって、差異が発生している模様です。
              </li>
              <li>
                2020年9月現在、いくつかの国のデータで、
                <RedSpan>誤りや不備とおぼしき箇所が存在します</RedSpan>
                。正確な数字を確認する場合は、複数のサイトをご参照ください。
              </li>
            </ul>
          </SentenceGrid>

          {/* md以上の表示でchartサイズを調整 */}
          <Hidden smDown>
            <Grid item md={2}></Grid>
          </Hidden>
        </ContainerGrid>

        {/* 国名select */}
        <ContainerGrid container data-index="m30">
          <SwitchCountry />
        </ContainerGrid>

        {/* chart */}
        <ContainerGrid container data-index="m0">
          {/* md以上の表示でchartサイズを調整 */}
          <Hidden only={["xs", "sm"]}>
            <Grid item md={2}></Grid>
          </Hidden>
          <ChartGrid item xs={12} md={8}>
            <Chart />
          </ChartGrid>
          {/* md以上の表示でchartサイズを調整 */}
          <Hidden only={["xs", "sm"]}>
            <Grid item md={2}></Grid>
          </Hidden>
        </ContainerGrid>

        <ContainerGrid container data-index="m10">
          <Cards />
        </ContainerGrid>
      </Container>
    </Root>
  );
};

export default DashBoard;
