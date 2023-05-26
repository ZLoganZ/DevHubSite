import React, { useEffect, useMemo, useState } from 'react';
import StyleTotal from './cssProfile';
import { getTheme } from '../../util/functions/ThemeFunction';
import { Avatar, Col, ConfigProvider, Empty, Image, Row, Space, Tabs, Tag, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faFileLines, faComments, faLocationDot, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { commonColor } from '../../util/cssVariable/cssVariable';
import { icon } from '@fortawesome/fontawesome-svg-core';
import TabPane from 'antd/es/tabs/TabPane';
import Post from '../../components/Post/Post';
import { GET_ALL_POST_BY_USERID_SAGA } from '../../redux/actionSaga/PostActionSaga';
import PostShare from '../../components/Post/PostShare';
import { LoadingProfileComponent } from '../../components/GlobalSetting/LoadingProfileComponent/LoadingProfileComponent';
import descArray from '../../util/constants/Description';
import { setIsInProfile } from '../../redux/Slice/PostSlice';
import { FOLLOW_USER_SAGA } from '../../redux/actionSaga/UserActionSaga';
import { messageService } from '../../services/MessageService';

interface Props {
  userID: any;
}

const Profile = (Props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(setIsInProfile(false));
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
    if (!isNotAlreadyChanged) return;

    setIsNotAlreadyChanged(ownerInfoRef.current === ownerInfo);

    if (!isNotAlreadyChanged) {
      ownerInfoRef.current = ownerInfo;
    }
  }, [userInfoSlice, ownerInfoSlice, isNotAlreadyChanged, ownerInfoRef, postArraySlice]);

  // const { isLoading, isError, postArray, userInfo, ownerInfo, isFetching } = usePostsData(userID);

  // isShared
  const [isFollowing, setIsFollowing] = useState(true);
  useEffect(() => {
    setIsFollowing(ownerInfo.isFollowing);
  }, [ownerInfo]);

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noreferrer');
  };

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
                    backgroundImage: `url("${ownerInfo?.coverImage || `/images/ProfilePage/cover.jpg`}")`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="avatar rounded-full overflow-hidden object-cover flex">
                  <Image
                    src={ownerInfo?.userImage ? ownerInfo?.userImage : './images/DefaultAvatar/default_avatar.png'}
                    alt="avt"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </Col>
              <Col offset={3} span={18}>
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
                      <div
                        className="follow px-4 py-2 rounded-full"
                        onClick={() => {
                          setIsFollowing(!isFollowing);
                          dispatch(FOLLOW_USER_SAGA(ownerInfo.id));
                        }}
                      >
                        <span>{isFollowing ? 'Following' : 'Follow'}</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="id_address_join">
                  <span className="id item mr-2">@{ownerInfo.alias ? ownerInfo.alias : 'user'}</span>
                  <span className="address item mr-2">
                    <FontAwesomeIcon className="icon mr-2" icon={faLocationDot} />
                    {ownerInfo.location ? ownerInfo.location : 'Global'}
                  </span>
                  <span className="join">
                    <FontAwesomeIcon className="icon mr-2" icon={faBriefcase} />
                    Joined {ownerInfo.dayJoined}
                  </span>
                </div>
                <Col span={18} className="mt-5">
                  <div className="tags flex flex-wrap">
                    {descArray.map((item, index) => {
                      if (ownerInfo?.tags?.indexOf(item.title) !== -1) {
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
                            <span style={{ color: themeColorSet.colorText1 }}>{item.title}</span>
                          </Tag>
                        );
                      }
                      return null;
                    })}
                  </div>
                </Col>
                <div className="follow mt-5">
                  <span className="follower item mr-2">
                    <span className="mr-1">{ownerInfo.followers.length}</span>{' '}
                    {ownerInfo.followers.length > 1 ? 'Followers' : 'Follower'}
                  </span>
                  <span className="following item mr-2">
                    <span className="mr-1">{ownerInfo.following.length}</span>{' '}
                    {ownerInfo.following.length > 1 ? 'Followings' : 'Following'}
                  </span>
                  <span className="post mr-2">
                    <span className="mr-1">{ownerInfo.posts.length}</span>{' '}
                    {ownerInfo.posts.length > 1 ? 'Posts' : 'Post'}
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
                    {ownerInfo?.contacts?.map((item: any, index: any) => {
                      switch (item.key) {
                        case '0':
                          return (
                            <Avatar
                              style={{ color: themeColorSet.colorText1 }}
                              onClick={() => {
                                openInNewTab(item.link);
                              }}
                              className="item"
                              icon={<FontAwesomeIcon icon={icon(faFacebookF)} />}
                            />
                          );
                        case '1':
                          return (
                            <Avatar
                              style={{ color: themeColorSet.colorText1 }}
                              onClick={() => {
                                openInNewTab(item.link);
                              }}
                              className="item"
                              icon={<FontAwesomeIcon icon={icon(faGithub)} />}
                            />
                          );
                        case '2':
                          return (
                            <Avatar
                              style={{ color: themeColorSet.colorText1 }}
                              onClick={() => {
                                openInNewTab(item.link);
                              }}
                              className="item"
                              icon={<FontAwesomeIcon icon={icon(faTwitter)} />}
                            />
                          );
                        case '3':
                          return (
                            <Avatar
                              style={{ color: themeColorSet.colorText1 }}
                              onClick={() => {
                                openInNewTab(item.link);
                              }}
                              className="item"
                              icon={<FontAwesomeIcon icon={icon(faInstagram)} />}
                            />
                          );
                        case '4':
                          return (
                            <Avatar
                              style={{ color: themeColorSet.colorText1 }}
                              onClick={() => {
                                openInNewTab(item.link);
                              }}
                              className="item"
                              icon={<FontAwesomeIcon icon={icon(faLinkedin)} />}
                            />
                          );
                        default:
                          return null;
                      }
                    })}
                  </Space>
                </div>
                <div className="mainContain mt-5">
                  <Tabs
                    defaultActiveKey="2.2"
                    // onChange={onChange}
                  >
                    <TabPane tab="Introduce" key="1.1" className="mt-10">
                      Introduce
                    </TabPane>
                    <TabPane tab="Post" key="2.2" className="mt-10">
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
                              <PostShare key={item._id} post={item} userInfo={ownerInfo} owner={item.owner} />
                            )}
                            {!item.PostShared && <Post key={item._id} post={item} userInfo={ownerInfo} />}
                          </div>
                        );
                      })}
                    </TabPane>
                    <TabPane tab="Show" key="3.3" className="mt-10">
                      Show
                    </TabPane>
                    <TabPane tab="Seri" key="4.4" className="mt-10">
                      Seri
                    </TabPane>
                    <TabPane tab="Guest book" key="5.5" className="mt-10">
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
