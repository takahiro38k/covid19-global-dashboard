import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
// 型定義用
import dataPrefecturesJson from "./dataPrefectures.json";
import dataTotalJson from "./dataTotal.json";

/**
 * 参照元
 * https://github.com/ryo-ma/covid19-japan-web-api
 *
 * ==============================
 * 都道府県別の累計
 * https://covid19-japan-web-api.now.sh/api/v1/prefectures
 *
 * 都道府県名: name_ja
 * 感染者数: cases
 * 回復者数: discharge
 * 死亡者数: deaths
 * 更新日: last_updated.cases_date
 *
 * ==============================
 * 全国の累計
 * https://covid19-japan-web-api.now.sh/api/v1/total
 *
 * 感染者数: positive
 * 回復者数: discharge
 * 死亡者数: death
 * 更新日: date
 */

const apiUrl = "https://covid19-japan-web-api.now.sh/api/v1";

type ApiDataPrefectures = typeof dataPrefecturesJson;
// 都道府県のapi(https://covid19-japan-web-api.now.sh/api//v1/prefectures)は配列なので、
// 配列要素の要素を一つだけdataPrefectures.jsonにcopyし、そこから型を取得。
type ApiDataTotal = typeof dataTotalJson;

type CovidState = {
  prefecturesData: ApiDataPrefectures | undefined;
  prefectures: string[] | undefined;
  totalData: ApiDataTotal | undefined;
  activePrefectureNums: [number, number, number];
};

const initialState: CovidState = {
  prefecturesData: undefined, // 都道府県別の累計
  prefectures: undefined, // prefecturesDataから抽出する都道府県名
  totalData: undefined, // 全国の累計
  // 未選択 => -1, 全国 => 100, 各都道府県 => prefecturesのindex
  activePrefectureNums: [100, 12, -1], // activeな都道府県
};

// createAsyncThunk()
//   1st param => action名
//   2nd param => 非同期処理
// https://redux-toolkit.js.org/api/createAsyncThunk
// ==============================
// 都道府県別の累計を取得
export const fetchAsyncGetPrefectures = createAsyncThunk(
  "covid19Japan/getPrefectures",
  async () => {
    // axios.get()はpromiseオブジェクトを返す。dataプロパティのみを分割代入。
    const { data } = await axios.get<ApiDataPrefectures>(
      `${apiUrl}/prefectures`
    );
    return data;
  }
);

// 全国の累計を取得
export const fetchAsyncGetTotal = createAsyncThunk(
  "covid19Japan/getTotal",
  async () => {
    const { data } = await axios.get<ApiDataTotal>(`${apiUrl}/total`);
    return data;
  }
);

// createSlice
// https://redux-toolkit.js.org/api/createSlice
export const covid19JapanSlice = createSlice({
  name: "covid19Japan",
  initialState,
  // reducers
  // https://redux-toolkit.js.org/api/createSlice#reducers
  // Direct State Mutation
  // https://redux-toolkit.js.org/api/createReducer#direct-state-mutation
  // iiiii CHECK iiiii
  // 内部的にcreateReducerに渡されて処理されるので、immerによる可変的な状態変更が可能。
  // 注意すべき点
  // https://immerjs.github.io/immer/docs/pitfalls
  reducers: {
    changePrefecture0: (state, action) => {
      // return {...state, activePrefectureNums[0]: Number(action.payload)}
      // ↑可変的な状態変更が可能なので、下記のように書くことができる。
      state.activePrefectureNums[0] = Number(action.payload);
    },
    changePrefecture1: (state, action) => {
      state.activePrefectureNums[1] = Number(action.payload);
    },
    changePrefecture2: (state, action) => {
      state.activePrefectureNums[2] = Number(action.payload);
    },
  },
  // extraReducers
  // https://redux-toolkit.js.org/api/createSlice#the-builder-callback-api-for-extrareducers
  // 上記createAsyncThunkで定義した非同期処理の後続処理をreducerに組み込む。
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPrefectures.fulfilled, (state, action) => {
      // action.payload => 非同期処理のreturn
      const prefectures = action.payload.map((prefecture) => {
        return prefecture.name_ja;
      });
      return {
        ...state,
        prefecturesData: action.payload,
        prefectures,
      };
    });
    builder.addCase(fetchAsyncGetTotal.fulfilled, (state, action) => {
      return {
        ...state,
        totalData: action.payload,
      };
    });
  },
});

// reducersをexport。
export const {
  changePrefecture0,
  changePrefecture1,
  changePrefecture2,
} = covid19JapanSlice.actions;

// useSelectorから参照できるよう、export。
// state名(covid19Japan)は、/app/store.tsのreducer: {}で指定した名前。
export const selectPrefecturesData = (state: RootState) =>
  state.covid19Japan.prefecturesData;
export const selectPrefectures = (state: RootState) =>
  state.covid19Japan.prefectures;
export const selectTotalData = (state: RootState) =>
  state.covid19Japan.totalData;
export const selectActivePrefectureNums = (state: RootState) =>
  state.covid19Japan.activePrefectureNums;

// /app/store.tsに渡すため、export。
export default covid19JapanSlice.reducer;
