import { DiffFilled, PlusOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  faBookmark,
  faBriefcase,
  faGlobe,
  faHouse,
  faMaximize,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, ConfigProvider, Divider, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssMenu';

const MenuMain = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const userInfo = useSelector((state: any) => state.userReducer.userInfo);
  const [key, setKey] = useState('1');

  // Hover menu
  const [collapsed, setCollapsed] = useState(true);
  const handleMouseEnter = () => {
    setCollapsed(false);
  };
  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  const handleSelected = (e: any) => {
    setKey(e.key);
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
          // collapsedWidth={80}
          className="sider"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 76,
            bottom: 0,
            zIndex: 2000,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[key]}
            className="h-full"
            items={[
              {
                key: '1',
                icon: <FontAwesomeIcon className="icon" icon={faHouse} />,
                label: 'Home',
                title: '',
              },
              {
                key: '2',
                icon: userInfo?.userImage ? (
                  <Avatar className="icon" src={userInfo?.userImage} shape="circle" size={20} />
                ) : (
                  <Avatar className="icon" icon={<UserOutlined />} shape="circle" size={20} />
                ),
                label: userInfo.username,
                title: '',
              },
              {
                key: '3',
                icon: <FontAwesomeIcon className="icon" icon={faMaximize} />,
                label: 'Explore',
                title: '',
              },
              {
                key: '4',
                icon: <FontAwesomeIcon className="icon" icon={faGlobe} />,
                label: 'Collaborations',
                title: '',
              },
              {
                key: '5',
                icon: <FontAwesomeIcon className="icon" icon={faBriefcase} />,
                label: 'Works',
                title: '',
              },
              {
                key: '6',
                icon: <FontAwesomeIcon className="icon" icon={faBookmark} />,
                label: 'Bookmarks',
                title: '',
              },
              {
                key: '7',
                icon: <FontAwesomeIcon className="icon" icon={faPeopleGroup} />,
                label: 'All Communities',
                title: '',
              },
              {
                type: 'divider',
                style: {
                  backgroundColor: themeColorSet.colorBg3,
                  height: '2px',
                },
              },
              {
                key: '8',
                icon: <Avatar src="/images/MainTemplate/Sider/javascript.png" shape="square" size={20} />,
                label: 'Javascript',
                title: '',
              },
              {
                key: '9',
                icon: <Avatar src="/images/MainTemplate/Sider/graphQL.png" shape="square" size={20} />,
                label: 'GraphQL',
                title: '',
              },
              {
                key: '10',
                icon: <Avatar src="/images/MainTemplate/Sider/git.png" shape="square" size={20} />,
                label: 'Git',
                title: '',
              },
              {
                key: '11',
                icon: <Avatar src="/images/MainTemplate/Sider/github.png" shape="square" size={20} />,
                label: 'Github',
                title: '',
              },

              {
                key: '12',
                icon: <Avatar src="/images/MainTemplate/Sider/python.png" shape="square" size={20} />,
                label: 'Python',
                title: '',
              },
              {
                key: '13',
                icon: <Avatar src="/images/MainTemplate/Sider/reactjs.png" shape="square" size={20} />,
                label: 'React',
                title: '',
              },
              {
                key: '14',
                icon: <Avatar src="/images/MainTemplate/Sider/python.png" shape="square" size={20} />,
                label: 'Python',
                title: '',
              },
              {
                key: '15',
                icon: <Avatar src="/images/MainTemplate/Sider/reactjs.png" shape="square" size={20} />,
                label: 'React',
                title: '',
              },
              {
                key: '16',
                icon: <Avatar src="/images/MainTemplate/Sider/python.png" shape="square" size={20} />,
                label: 'Python',
                title: '',
              },
              {
                key: '17',
                icon: <Avatar src="/images/MainTemplate/Sider/reactjs.png" shape="square" size={20} />,
                label: 'React',
                title: '',
              },
              {
                key: '18',
                icon: <Avatar src="/images/MainTemplate/Sider/reactjs.png" shape="square" size={20} />,
                label: 'React',
                title: '',
              },
            ]}
          />
        </Sider>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default MenuMain;
