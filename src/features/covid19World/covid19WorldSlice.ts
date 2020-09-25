import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
// jsonを型注釈に利用。jsonの中身はapiのデータを貼り付けしたもの。
import dataDaily from "./dataDaily.json";

/**
 * 参照元
 * https://covid19api.com/
 * https://documenter.getpostman.com/view/10808728/SzS8rjbc
 *
 * ==============================
 * 各国の累計 - 日別
 * https://api.covid19api.com/total/country/[国名]
 *   例 https://api.covid19api.com/total/country/japan
 *
 * 国名: Country
 * 感染者数: Confirmed // a + b + c
 * a. 回復者数: Recovered
 * b. 陽性者数: Active
 * c. 死亡者数: Deaths
 * 日付: Date
 */

// エンドポイント
const apiUrl = "https://api.covid19api.com/total/country";

type DataDaily = typeof dataDaily;

type CovidState = {
  daily: DataDaily;
  country: string;
};

const initialState: CovidState = {
  daily: dataDaily,
  country: "japan",
};

// createAsyncThunk()
//   1st param => action名
//   2nd param => 非同期処理
// https://redux-toolkit.js.org/api/createAsyncThunk
// ==============================
// 国別の累計(日ごと)を取得
export const fetchAsyncGetDaily = createAsyncThunk(
  "covid19World/getDaily",
  async (country: string) => {
    const { data } = await axios.get<DataDaily>(`${apiUrl}/${country}`);
    // return { data: data, country: country };
    // ***shorthand***
    return { data, country };
  }
);

// createSlice
// https://redux-toolkit.js.org/api/createSlice
const covidSlice = createSlice({
  name: "covid",
  initialState: initialState,
  reducers: {},
  // extraReducers
  // https://redux-toolkit.js.org/api/createSlice#the-builder-callback-api-for-extrareducers
  // 上記createAsyncThunkで定義した非同期処理の後続処理をreducerに組み込む。
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        // action.payload => 非同期処理のreturn
        daily: action.payload.data,
        country: action.payload.country,
      };
    });
  },
});

// useSelectorから参照できるよう、export。
// state名(covid19World)は、/app/store.tsのreducer: {}で指定した名前。
export const selectDaily = (state: RootState) => state.covid19World.daily;
export const selectCountry = (state: RootState) => state.covid19World.country;

export default covidSlice.reducer;
