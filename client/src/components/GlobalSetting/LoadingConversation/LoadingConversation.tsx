import { Skeleton, Space } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../../../util/functions/ThemeFunction';

const LoadingConversation = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  return (
    <div className="px-4">
      <Skeleton className="mt-8" active />
      <Skeleton className="mt-8" active />
      <Skeleton className="mt-8" active />
      <Skeleton className="mt-8" active />
      <div
        className="shared"
        style={{
          width: '23%',
          height: '100vh',
          marginLeft: '77%',
          position: 'fixed',
          backgroundColor: themeColorSet.colorBg1,
        }}
      >
        <div
          className="extension px-3 flex items-center"
          style={{
            height: '12%',
            borderBottom: '1px solid',
            borderColor: themeColorSet.colorBg4,
          }}
        >
          <div className="flex justify-center items-center w-full">
            <div
              className="setting text-center"
              style={{
                width: '25%',
              }}
            >
              <Skeleton.Button active size="large" shape="circle" />
            </div>
            <div
              className="notification text-center"
              style={{
                width: '25%',
              }}
            >
              <Skeleton.Button active size="large" shape="circle" />
            </div>
            <div
              className="warning text-center"
              style={{
                width: '25%',
              }}
            >
              <Skeleton.Button active size="large" shape="circle" />
            </div>
            <div
              className="logout text-center"
              style={{
                width: '25%',
              }}
            >
              <Skeleton.Button active size="large" shape="circle" />
            </div>
          </div>
        </div>
        <div className="fileShare px-3 py-4">
          <div className="sharedMedia">
            <Space className="content" size={20}>
              <Skeleton.Image active />
              <Skeleton.Image active />
              <Skeleton.Image active />
            </Space>
          </div>
          <div className="sharedFile mt-5">
            <div className="flex justify-between items-center mb-3"></div>
            <div className="content">
              <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
              <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
              <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
              <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
              <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
              <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingConversation;
