import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Space, Spin, theme } from "antd";
import ConfigProvider from "antd/es/config-provider";
import StyleTotal from "./cssLoadingComponent";

const LoadingComponent = () => {
  const { isLoading } = useSelector((state: any) => state.loadingReducer);

  if (!isLoading) return null;

  return (
    <StyleTotal>
      <Space className="w-screen h-screen justify-center" direction="vertical">
        <Spin size="large">
          <div className="content" />
        </Spin>
      </Space>
    </StyleTotal>
  );
};

export default LoadingComponent;
