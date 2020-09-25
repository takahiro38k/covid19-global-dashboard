import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { StylesProvider, ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";

import BackToTop from "./features/BackToTop";
import Beginning from "./features/Beginning";
import DashBoardJapan from "./features/covid19Japan/DashBoardJapan";
import DashBoard from "./features/covid19World/DashBoard";
import Header from "./features/Header";
import theme from "./theme";

function App() {
  return (
    <Router>
      {/* src/theme.tsで指定したテーマをMaterial-UIおよびStyled-components全体に適用。 */}
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          {/* injectFirst
          Material-UIのstyleを最初に適用する。
          それによって、styled-componentsのstyleを必ず適用する。 */}
          <StylesProvider injectFirst>
            <Switch>
              <Route path="/" exact>
                <Header />
                <Beginning />
                <DashBoardJapan />
                <DashBoard />
                <BackToTop />
              </Route>
            </Switch>
          </StylesProvider>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </Router>
  );
}

export default App;
