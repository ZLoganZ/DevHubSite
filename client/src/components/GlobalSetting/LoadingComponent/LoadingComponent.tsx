import React from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import StyleTotal from './cssLoadingComponent';
import { getTheme } from '../../../util/functions/ThemeFunction';

const LoadingComponent = () => {
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
      <StyleTotal>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default LoadingComponent;
