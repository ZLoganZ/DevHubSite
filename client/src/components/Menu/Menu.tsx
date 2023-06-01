import {
  faBookmark,
  faBriefcase,
  faGlobe,
  faHouse,
  faMaximize,
  faPeopleGroup,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, ConfigProvider, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssMenu';
import { useLocation, useNavigate } from 'react-router-dom';

const MenuMain = () => {
  let navigate = useNavigate();
  const location = useLocation();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const userInfo = useSelector((state: any) => state.userReducer.userInfo);
  const [key, setKey] = useState('');

  // Hover menu
  const [collapsed, setCollapsed] = useState(true);
  const handleMouseEnter = () => {
    setCollapsed(false);
  };
  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setKey('1');
    } else if (path === '/me' || path === `/user/${userInfo?.id}`) {
      setKey('2');
    } else if (path === '/explore') {
      setKey('3');
    } else if (path === '/collaboration') {
      setKey('4');
    } else if (path === '/work') {
      setKey('5');
    } else if (path === '/bookmark') {
      setKey('6');
    } else if (path === '/community') {
      setKey('7');
    } else {
      setKey('');
    }
  }, [location, userInfo]);

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
            zIndex: 1000,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[key]}
            selectedKeys={[key]}
            className="h-full"
            items={[
              {
                key: '1',
                icon: <FontAwesomeIcon className="icon" icon={faHouse} />,
                label: 'Home',
                title: '',
                onClick: () => {
                  navigate('/');
                },
              },
              {
                key: '2',
                icon: userInfo?.userImage ? (
                  <Avatar className="icon" src={userInfo?.userImage} shape="circle" size={20} />
                ) : (
                  <FontAwesomeIcon className="icon" icon={faUser} />
                ),
                label: userInfo?.username,
                title: '',
                onClick: () => {
                  navigate(`/user/${userInfo?.id}`);
                },
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
