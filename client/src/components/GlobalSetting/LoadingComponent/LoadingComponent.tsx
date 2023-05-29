import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Space, Spin, theme } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import StyleTotal from './cssLoadingComponent';
import { getTheme } from '../../../util/functions/ThemeFunction';

const LoadingComponent = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();
  const { isLoading } = useSelector((state: any) => state.loadingReducer);
  if (!isLoading) return null;

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal>
        <Space className="w-screen h-screen justify-center" direction="vertical">
          <Spin size="large">
            <div className="content" />
          </Spin>
        </Space>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default LoadingComponent;
