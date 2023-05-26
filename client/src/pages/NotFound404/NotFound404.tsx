import React from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import { ConfigProvider } from 'antd';
import StyleTotal from './cssNotFound404';
import { NavLink } from 'react-router-dom';

const NotFound404 = ({ login }: any) => {
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
        <div className="notFound404">
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>404</h1>
                <h2>Page not found</h2>
              </div>
              <NavLink to="/">Homepage</NavLink>
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default NotFound404;
