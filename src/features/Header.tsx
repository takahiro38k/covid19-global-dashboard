import React from "react";
import { RiVirusFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { AppBar, Toolbar, Typography } from "@material-ui/core";

const StyledToolbar = styled(Toolbar)`
  padding: 5px;
  display: flex;
  justify-content: center;
`;
const Title = styled(Typography)`
  /* src/index.cssでimportしたgoogle fontを適用 */
  font-family: "Anton", sans-serif;
  font-size: 25px;
  padding: 0px;
  /* widthに合わせてタイトルサイズを調整 */
  @media screen and (min-width: 400px) {
    font-size: 30px;
  }
  cursor: pointer;
  @media screen and (min-width: 600px) {
    font-size: 40px;
  }
  cursor: pointer;
`;
const StyledRiVirusFill = styled(RiVirusFill)`
  position: relative;
  top: 2px;
  left: 1px;
`;

const Header: React.FC = () => {
  const history = useHistory();

  // secondaryのcolorは src/theme.ts で変更。
  return (
    <AppBar id="app-bar" position="static" color="secondary">
      <StyledToolbar>
        <Title onClick={() => history.push("/")}>
          <StyledRiVirusFill /> COVID-19 Live Dashboard
        </Title>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
