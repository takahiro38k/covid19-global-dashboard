import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { FormControl, NativeSelect } from "@material-ui/core";

import { fetchAsyncGetDaily } from "./covid19WorldSlice";

const StyledFormControl = styled(FormControl)`
  min-width: 200px;
  background-color: #ffffca;
`;
const StyledNativeSelect = styled(NativeSelect)`
  padding-left: 10px;
  text-align: center;
`;

const SwitchCountry: React.FC = () => {
  const dispatch = useDispatch();

  // 下記apiの"Slug" propertyから複数の国をピックアップ。
  // 他国を追加することも可能。
  // https://api.covid19api.com/countries
  const countries = [
    { value: "japan", name: "日本" },
    { value: "us", name: "アメリカ" },
    { value: "canada", name: "カナダ" }, // 複数日のデータにバグあり
    { value: "brazil", name: "ブラジル" },
    { value: "argentina", name: "アルゼンチン" },
    { value: "united-kingdom", name: "イギリス" }, // 複数日のデータにバグあり
    { value: "portugal", name: "ポルトガル" },
    { value: "spain", name: "スペイン" },
    { value: "france", name: "フランス" },
    { value: "germany", name: "ドイツ" },
    { value: "italy", name: "イタリア" },
    { value: "switzerland", name: "スイス" },
    { value: "denmark", name: "デンマーク" },
    { value: "norway", name: "ノルウェー" },
    { value: "sweden", name: "スウェーデン" }, // 回復者数のデータが存在しない
    { value: "finland", name: "フィンランド" },
    { value: "egypt", name: "エジプト" },
    { value: "south-africa", name: "南アフリカ" },
    { value: "india", name: "インド" },
    { value: "china", name: "中国" }, // 2020-09-10のデータにバグあり
    { value: "taiwan", name: "台湾" },
    { value: "korea-south", name: "韓国" },
    { value: "russia", name: "ロシア" },
    { value: "thailand", name: "タイ" },
    { value: "indonesia", name: "インドネシア" },
    { value: "philippines", name: "フィリピン" },
    { value: "australia", name: "オーストラリア" },
    { value: "new zealand", name: "ニュージーランド" },
  ];

  return (
    <StyledFormControl>
      <StyledNativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(fetchAsyncGetDaily(e.target.value))
        }
      >
        {/* countriesからmap()で国名を抽出し、<option>に埋め込んで選択肢を作成。 */}
        {countries.map((country) => (
          <option key={country.name} value={country.value}>
            {country.name}
          </option>
        ))}
      </StyledNativeSelect>
    </StyledFormControl>
  );
};

export default SwitchCountry;
