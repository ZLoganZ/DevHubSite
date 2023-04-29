import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import StyleTotal from './cssProfile';
import { getTheme } from '../../util/functions/ThemeFunction';
import {
  Avatar,
  Col,
  ConfigProvider,
  Empty,
  Input,
  Row,
  Skeleton,
  Space,
  Switch,
  Tabs,
  Tag,
  theme,
  Tooltip,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/Slice/ThemeSlice';
import { DARK_THEME, LIGHT_THEME } from '../../util/constants/SettingSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faFileLines, faComments, faLocationDot, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
import { commonColor } from '../../util/cssVariable/cssVariable';
import { icon } from '@fortawesome/fontawesome-svg-core';
import TabPane from 'antd/es/tabs/TabPane';
import Post from '../../components/Post/Post';
import { GET_ALL_POST_BY_USERID_SAGA } from '../../redux/actionSaga/PostActionSaga';
import PostShare from '../../components/Post/PostShare';
import { LoadingProfileComponent } from '../../components/GlobalSetting/LoadingComponent/LoadingProfileComponent';
import descArray from '../../util/constants/Description';

interface Props {
  userID: any;
}

const Profile = (Props: Props) => {
  const dispatch = useDispatch();

  const { userID } = Props;

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  useEffect(() => {
    dispatch(
      GET_ALL_POST_BY_USERID_SAGA({
        userId: userID,
      }),
    );
  }, [dispatch, userID]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const postArraySlice = useSelector((state: any) => state.postReducer.postArr);
  const userInfoSlice = useSelector((state: any) => state.userReducer.userInfo);
  const ownerInfoSlice = useSelector((state: any) => state.postReducer.ownerInfo);

  const postArray = useMemo(() => postArraySlice, [postArraySlice]);
  const userInfo = useMemo(() => userInfoSlice, [userInfoSlice]);
  const ownerInfo = useMemo(() => ownerInfoSlice, [ownerInfoSlice]);

  const [isNotAlreadyChanged, setIsNotAlreadyChanged] = React.useState(true);

  const ownerInfoRef = React.useRef(ownerInfo);

  useEffect(() => {
    setIsNotAlreadyChanged(ownerInfoRef.current === ownerInfo);
  }, [userInfo, ownerInfo, isNotAlreadyChanged, ownerInfoRef]);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        {!postArray || !userInfo || !ownerInfo || isNotAlreadyChanged ? (
          <LoadingProfileComponent />
        ) : (
          <>
            <Row>
              <Col span={24} className="avatar_cover relative">
                <div
                  className="cover w-full h-80 rounded-br-lg rounded-bl-lg"
                  style={{
                    backgroundImage: `url("./images/TimeLinePage/cover2.jpg")`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="avatar rounded-full overflow-hidden">
                  <img
                    src={ownerInfo?.userImage ? ownerInfo?.userImage : './images/DefaultAvatar/default_avatar.png'}
                    alt="avt"
                  />
                </div>
              </Col>
              <Col offset={4} span={16}>
                <Row className="py-5">
                  <Col offset={6} span={12}>
                    <div className="text-2xl font-bold" style={{ color: themeColorSet.colorText1 }}>
                      {ownerInfo.username}
                    </div>
                    <div className="position mt-2">
                      <FontAwesomeIcon className="icon" icon={faSnowflake} />
                      <span style={{ color: themeColorSet.colorText3 }} className="ml-2">
                        User Interface Architect & Senior Manager UX
                      </span>
                    </div>
                    <div className="viewResume mt-2">
                      <FontAwesomeIcon className="icon" icon={faFileLines} />
                      <NavLink to="/resume" className="ml-2">
                        View Resume
                      </NavLink>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="chat_Follow flex justify-around items-center w-full h-full">
                      <div className="chat px-2 py-2 text-base rounded-full">
                        <FontAwesomeIcon className="icon" icon={faComments} />
                      </div>
                      <div className="follow px-4 py-2">
                        <span>Follow</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="id_address_join">
                  <span className="id item mr-2">@tianrongliew</span>
                  <span className="address item mr-2">
                    <FontAwesomeIcon className="icon mr-2" icon={faLocationDot} />
                    Global
                  </span>
                  <span className="join">
                    <FontAwesomeIcon className="icon mr-2" icon={faBriefcase} />
                    Joined Jun 2020
                  </span>
                </div>
                <Col span={18} className="mt-5">
                  <div className="description flex flex-wrap">
                    {descArray.map((item, index) => {
                      if (ownerInfo?.descriptions?.indexOf(item.title) !== -1) {
                        return (
                          <Tag
                            className="item mx-2 my-2 px-4 py-1"
                            key={index}
                            color={themeColorSet.colorBg2}
                            style={{
                              border: 'none',
                            }}
                          >
                            {item.svg} &nbsp;
                            {item.title}
                          </Tag>
                        );
                      }
                      return null;
                    })}
                  </div>
                </Col>
                <div className="follow mt-5">
                  <span className="follower item mr-2">
                    <span className="mr-1">{2710}</span> Follower
                  </span>
                  <span className="following item mr-2">
                    <span className="mr-1">{78}</span> Following
                  </span>
                  <span className="post mr-2">
                    <span className="mr-1">{56}</span> Post
                  </span>
                </div>
                <div className="experience mt-5">
                  <div className="item mt-2">
                    <FontAwesomeIcon
                      className="icon mr-2"
                      icon={faBriefcase}
                      style={{ color: commonColor.colorBlue1 }}
                    />
                    <span className="company mr-2">Rabiloo</span>
                    <span className="position mr-2">Java Developer |</span>
                    <span className="date">2019.10 ~ 2022.10</span>
                  </div>
                  <div className="item mt-2">
                    <FontAwesomeIcon
                      className="icon mr-2"
                      icon={faBriefcase}
                      style={{ color: commonColor.colorBlue1 }}
                    />
                    <span className="company mr-2">Pan United</span>
                    <span className="position mr-2">Software Engineer |</span>
                    <span className="date">~ 2022.10</span>
                  </div>
                </div>
                <div className="contact mt-5">
                  <Space>
                    <Avatar className="item" icon={<FontAwesomeIcon icon={icon(faFacebookF)} />} />
                    <Avatar className="item" icon={<FontAwesomeIcon icon={icon(faGithub)} />} />
                    <Avatar className="item" icon={<FontAwesomeIcon icon={icon(faTwitter)} />} />
                    <Avatar className="item" icon={<FontAwesomeIcon icon={icon(faInstagram)} />} />
                    <Avatar className="item" icon={<FontAwesomeIcon icon={icon(faLinkedin)} />} />
                  </Space>
                </div>
                <div className="mainContain mt-5">
                  <Tabs
                    defaultActiveKey="2"
                    // onChange={onChange}
                  >
                    <TabPane tab="Introduce" key="1" className="mt-10">
                      Introduce
                    </TabPane>
                    <TabPane tab="Post" key="2" className="mt-10">
                      {postArray.length === 0 && (
                        <div className="w-8/12">
                          <Empty
                            className="mt-10 mb-20"
                            image={Empty.PRESENTED_IMAGE_DEFAULT}
                            description={<span>No post</span>}
                          />
                        </div>
                      )}
                      {postArray.map((item: any, index: number) => {
                        return (
                          <div className="w-8/12">
                            {item.PostShared && (
                              <PostShare key={item._id} post={item} userInfo={ownerInfo} owner={item.user} />
                            )}
                            {!item.PostShared && <Post key={item._id} post={item} userInfo={ownerInfo} />}
                          </div>
                        );
                      })}
                    </TabPane>
                    <TabPane tab="Show" key="3" className="mt-10">
                      Show
                    </TabPane>
                    <TabPane tab="Seri" key="4" className="mt-10">
                      Seri
                    </TabPane>
                    <TabPane tab="Guest book" key="5" className="mt-10">
                      Guest book
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </>
        )}
      </StyleTotal>
    </ConfigProvider>
  );
};

export default Profile;
