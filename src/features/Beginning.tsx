import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import styled from "styled-components";

import { Container, Grid, Hidden, Link, Typography } from "@material-ui/core";

import socialDistancingSvg from "../img/undraw_social_distancing_2g0u.svg";

const Root = styled.div`
  /* 最大幅で表示 */
  flex-grow: 1;
  margin-bottom: 40px;
`;
const SentenceGrid = styled(Grid)`
  /* Breakpoint(sm)に合わせて調整 */
  @media screen and (min-width: 600px) {
    padding: 0px 15px;
  }
`;
const ContainerGrid = styled(Grid)`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const StyledIcon = styled.div`
  margin-left: 12px;
  margin-right: 12px;
  position: relative;
  top: 2px;
  /* right: 6px; */
`;
// svgファイルをレスポンシブ表示。
const ImgDiv = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  /* styled-compomentsの子要素は&で指定。 */
  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Beginning: React.FC = () => {
  return (
    <Root>
      <Container>
        <ContainerGrid container>
          {/* Breakpoints
            https://material-ui.com/customization/breakpoints/#breakpoints */}
          {/* md以上の表示でchartサイズを調整 */}
          <Hidden smDown>
            <Grid item md={2}></Grid>
          </Hidden>

          <SentenceGrid item xs={12} md={8}>
            <Typography>
              新型コロナウイルス感染症（COVID-19）の累計人数を、グラフで表示します。
            </Typography>
            <ul>
              <li>
                日本国内
                <StyledIcon as={FaLongArrowAltRight} />
                <Link href="#in-japan">In Japan</Link>
              </li>
              <li>
                世界
                <StyledIcon as={FaLongArrowAltRight} />
                <Link href="#globally">Globally</Link>
              </li>
            </ul>
          </SentenceGrid>

          {/* md以上の表示でchartサイズを調整 */}
          <Hidden smDown>
            <Grid item md></Grid>
          </Hidden>
        </ContainerGrid>
      </Container>

      <Container>
        <Grid container>
          <Hidden xsDown>
            {/* breakpointごとの数字を指定しない場合、他のGridに合わせて自動調整される。 */}
            <Grid item sm md></Grid>
          </Hidden>

          <Grid item xs={12} sm={10} md={7}>
            <ImgDiv>
              {/* imgはimportしてから指定する。 */}
              <img src={socialDistancingSvg} alt="social distancing" />
            </ImgDiv>
          </Grid>

          <Hidden xsDown>
            <Grid item sm md></Grid>
          </Hidden>
        </Grid>
      </Container>
    </Root>
  );
};

export default Beginning;
