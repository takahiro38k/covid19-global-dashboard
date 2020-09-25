import React from "react";
import styled from "styled-components";

import Fab from "@material-ui/core/Fab";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// Back to top
// https://material-ui.com/components/app-bar/#back-to-top

const StyledPositionDiv = styled.div`
  position: fixed;
  bottom: 12px;
  right: 12px;
`;

export default function BackToTop() {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    // target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100, // ボタン表示の開始位置
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#app-bar");

    if (anchor) {
      // behaviorで推移のアニメーションを指定する。
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <StyledPositionDiv onClick={handleClick} role="presentation">
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </StyledPositionDiv>
    </Zoom>
  );
}
