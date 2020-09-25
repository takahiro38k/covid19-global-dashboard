import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { FormControl, Grid, Hidden, NativeSelect } from "@material-ui/core";

import {
    changePrefecture0, changePrefecture1, changePrefecture2, selectActivePrefectureNums,
    selectPrefectures
} from "./covid19JapanSlice";

const SwitchGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
// カスタムデータ属性(custom data type)を使用して条件分岐。
const StyledFormControl = styled(FormControl)`
  min-width: 165px;
  &[data-index="0"] {
    background: rgba(135, 206, 235, 0.4);
  }
  &[data-index="1"] {
    background: rgba(173, 255, 47, 0.4);
  }
  &[data-index="2"] {
    background: rgba(240, 128, 128, 0.4);
  }
`;
const StyledNativeSelect = styled(NativeSelect)`
  padding-left: 10px;
`;

const SwitchPrefecture: React.FC = () => {
  const dispatch = useDispatch();
  const prefectures = useSelector(selectPrefectures);
  const activePrefectureNums = useSelector(selectActivePrefectureNums);

  const actionCreators = [
    changePrefecture0,
    changePrefecture1,
    changePrefecture2,
  ];

  // list選択式のformを3つ作成。
  const switchElements = activePrefectureNums.map(
    (activePrefectureNum, index) => {
      // indexに適用したactionCreatorを代入。
      const actionCreator = actionCreators[index];
      // Breakpoints
      // https://material-ui.com/customization/breakpoints/#breakpoints
      return (
        <SwitchGrid item xs={12} sm={4} md={3} key={index}>
          <StyledFormControl data-index={index}>
            <StyledNativeSelect
              value={activePrefectureNum}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                dispatch(actionCreator(e.target.value))
              }
            >
              {/* 都道府県のlistを作成 */}
              {/* listのvalueは、都道府県別のデータを取得しやすいよう、indexとする。
                  未選択は-1、"全国"は100とする。 */}
              <option aria-label="None" value={-1} />
              <option value={100}>全国</option>
              {prefectures?.map((prefecture, index) => (
                <option key={index} value={index}>
                  {prefecture}
                </option>
              ))}
            </StyledNativeSelect>
          </StyledFormControl>
        </SwitchGrid>
      );
    }
  );

  return (
    <>
      <Hidden smDown>
        {/* Auto-layout
          md={n}とせず、mdとすることで、自動的に調整する。
          https://material-ui.com/components/grid/#auto-layout */}
        <Grid item md></Grid>
      </Hidden>
      {switchElements}
      <Hidden smDown>
        <Grid item md></Grid>
      </Hidden>
    </>
  );
};

export default SwitchPrefecture;
