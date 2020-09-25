import React, { useEffect } from "react";
import { GiJapan } from "react-icons/gi";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Container, Grid, Hidden, Link, Typography } from "@material-ui/core";

import CardsJapan from "./CardsJapan";
import ChartJapan from "./ChartJapan";
import { fetchAsyncGetPrefectures, fetchAsyncGetTotal } from "./covid19JapanSlice";
import SwitchPrefecture from "./SwitchPrefecture";

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
const ContainerGrid = styled(Grid)`
  margin-top: 20px;
  /* カスタム属性でmarginを調整 */
  &[data-index="m0"] {
    margin-top: 0px;
  }
  &[data-index="m30"] {
    margin-top: 30px;
  }
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
const ChartGrid = styled(Grid)`
  margin-top: 20px;
  /* Breakpoint(sm)に合わせて調整 */
  @media screen and (min-width: 600px) {
    margin-top: 30px;
  }
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledIcon = styled.div`
  position: relative;
  top: 3px;
  right: 6px;
`;

const DashBoardJapan: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncGetPrefectures());
    dispatch(fetchAsyncGetTotal());
  }, [dispatch]);

  return (
    <Root>
      <Container>
        <TitleDiv>
          <TitleTypography id="in-japan">
            <StyledIcon as={GiJapan} />
            In Japan
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
              全国、または都道府県ごとの<RedSpan>累計</RedSpan>
              を、同時に3つ表示できます。
            </Typography>
            <ul>
              <li>
                データの参照元は
                {/* Links - Security
                https://material-ui.com/components/links/#links */}
                <Link
                  href="https://github.com/ryo-ma/covid19-japan-web-api/blob/master/README.ja.md"
                  target="_blank"
                  rel="noopener"
                >
                  &thinsp;こちら&thinsp;
                </Link>
                です。
              </li>
              <li>
                参照元が異なるため、
                <RedSpan>
                  「Globally」における日本のデータとわずかな差異があります
                </RedSpan>
                。クルーズ船、検疫職員、チャータ便などを含むかどうかによって、差異が発生している模様です。
              </li>
            </ul>
          </SentenceGrid>

          {/* md以上の表示でchartサイズを調整 */}
          <Hidden smDown>
            <Grid item md={2}></Grid>
          </Hidden>
        </ContainerGrid>

        {/* 都道府県select */}
        <ContainerGrid container data-index="m30" spacing={3}>
          <SwitchPrefecture />
        </ContainerGrid>

        {/* chart */}
        <ContainerGrid container data-index="m0">
          {/* md以上の表示でchartサイズを調整 */}
          <Hidden smDown>
            <Grid item md={2}></Grid>
          </Hidden>

          <ChartGrid item xs={12} md={8}>
            <ChartJapan />
          </ChartGrid>

          {/* md以上の表示でchartサイズを調整 */}
          <Hidden smDown>
            <Grid item md={2}></Grid>
          </Hidden>
        </ContainerGrid>

        <Grid container spacing={2}>
          <CardsJapan />
        </Grid>
      </Container>
    </Root>
  );
};

export default DashBoardJapan;
