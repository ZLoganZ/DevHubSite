import React from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../../util/functions/ThemeFunction";
import { ConfigProvider } from "antd";
import StyleTotal from "./cssMesageChat";

const MesageChat = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  return (
    <ConfigProvider
      theme={{
        token: themeColor, 
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div></div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default MesageChat;
