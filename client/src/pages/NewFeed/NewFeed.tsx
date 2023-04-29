import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHECK_LOGIN_SAGA } from '../../redux/actionSaga/AuthActionSaga';
import { getTheme } from '../../util/functions/ThemeFunction';
import { Button, Col, ConfigProvider, Dropdown, MenuProps, Row, Space } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp, faSun, faComment, faFileLines, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { DownOutlined, RiseOutlined } from '@ant-design/icons';
import { GET_ALL_POST_SAGA } from '../../redux/actionSaga/PostActionSaga';
import PostShare from '../../components/Post/PostShare';
import StyleTotal from './cssNewFeed';
import NewPost from '../../components/NewPost/NewPost';
import Post from '../../components/Post/Post';

const items = [
  {
    label: 'To Day',
    key: '1',
  },
  {
    label: 'This Week',
    key: '2',
  },
  {
    label: 'This Month',
    key: '3',
  },
  {
    label: 'This Year',
    key: '4',
  },
  {
    label: 'All Time',
    key: '5',
  },
];

const popular_time = [
  {
    label: 'To Day',
    key: '1',
  },
  {
    label: 'Week',
    key: '2',
  },
  {
    label: 'Month',
    key: '3',
  },
];

const popular = [
  {
    image:
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
    name: 'Nguyễn Văn A',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    view: 100,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfB5xqZHjdPe17hnX2kY7kIY3vftnCavOT8g&usqp=CAU',
    name: 'Mary Johnson',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    view: 240,
  },

  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE0An4uOQgA1lEWMWTTpQBOlIhSuYT4RYLpw&usqp=CAU',
    name: 'John Smith',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    view: 400,
  },

  {
    image: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    name: 'Emma Wilson',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    view: 150,
  },

  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxxOeOXHNrUgfxDbpJZJCxcDOjTlrBRlH7wA&usqp=CAU',
    name: 'David Lee',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    view: 300,
  },

  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-NFn1a5QD_qi-HzSeySBUfx5AALewRHYw-g&usqp=CAU',
    name: 'Sarah Kim',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    view: 120,
  },

  {
    image:
      'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    name: 'Michael Brown',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    view: 250,
  },

  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMti6Y58F9U28BKZAOQMWDh9auJ5gfJahe5uKYMjr0kSNaXP4MZYkvDomyRUVKOfiPT5g&usqp=CAU',
    name: 'Karen Jackson',
    description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    view: 180,
  },
];

const community = [
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU',
    name: 'Water Cooler chats',
    description: 'Hang out and chat with your fellow developers in this general community',
    member: 3760,
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    name: 'Water Cooler chats',
    description: 'Hang out and chat with your fellow developers in this general community',
    member: 1376,
  },
  {
    image:
      'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    name: 'Water Cooler chats',
    description: 'Hang out and chat with your fellow developers in this general community',
    member: 13154,
  },
  {
    image:
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
    name: 'Water Cooler chats',
    description: 'Hang out and chat with your fellow developers in this general community',
    member: 3757,
  },
  {
    image:
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
    name: 'Water Cooler chats',
    description: 'Hang out and chat with your fellow developers in this general community',
    member: 7573,
  },
  {
    image:
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
    name: 'Water Cooler chats',
    description: 'Hang out and chat with your fellow developers in this general community',
    member: 9343,
  },
];

const NewFeed = () => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [select, setSelect] = useState(null);

  useEffect(() => {
    dispatch(GET_ALL_POST_SAGA());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const postArray = useSelector((state: any) => state.postReducer.postArr);
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const handleClickButton = (value: any) => {
    setSelect(value);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('To Day');

  const [popularOpen, setPopularOpen] = useState(false);
  const [popularvalue, setPopularvalue] = useState('To Day');

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const a = items?.find((item) => item?.key === e.key);
    setValue(a?.label || value);
    setOpen(false);
  };

  const handlePopularClick: MenuProps['onClick'] = (e) => {
    const a = popular_time?.find((item) => item?.key === e.key);
    setPopularvalue(a?.label || popularvalue);
    setPopularOpen(false);
  };

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };
  const handleOpenPopularChange = (flag: boolean) => {
    setPopularOpen(flag);
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <Row>
          <Col offset={4} span={16}>
            <div className="new-feed flex justify-between mt-10">
              <div className="new-feed-left w-8/12">
                <div className="">
                  <NewPost userInfo={userInfo} />
                </div>

                <div className="show">
                  <div
                    className="selec-show w-full rounded-lg mb-4"
                    style={{ backgroundColor: themeColorSet.colorBg2 }}
                  >
                    <Button className="btn-show" size="large" onClick={handleClickButton.bind(null, null)}>
                      <FontAwesomeIcon icon={faStar} style={{ paddingRight: 8 }} />
                      For you
                    </Button>

                    <Button className="btn-show" size="large" onClick={handleClickButton.bind(null, 1)}>
                      <FontAwesomeIcon icon={faThumbsUp} style={{ paddingRight: 8 }} />
                      Best
                    </Button>

                    {select === 1 ? (
                      <Dropdown
                        className={select ? 'btn-show' : ' btn-show hidden'}
                        menu={{
                          items,
                          onClick: handleMenuClick,
                        }}
                        onOpenChange={handleOpenChange}
                        open={open}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Button className="btn-show" size="large">
                            {value}
                            <DownOutlined />
                          </Button>
                        </a>
                      </Dropdown>
                    ) : null}

                    <Button className="btn-show" size="large" onClick={handleClickButton.bind(null, null)}>
                      <FontAwesomeIcon icon={faSun} style={{ paddingRight: 8 }} />
                      New
                    </Button>

                    <Button className="btn-show" size="large" onClick={handleClickButton.bind(null, 2)}>
                      <FontAwesomeIcon icon={faComment} style={{ paddingRight: 8 }} />
                      Comment
                    </Button>

                    {select === 2 ? (
                      <Dropdown
                        className={select ? 'btn-show' : ' btn-show hidden'}
                        menu={{
                          items,
                          onClick: handleMenuClick,
                        }}
                        onOpenChange={handleOpenChange}
                        open={open}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Button className="btn-show" size="large">
                            {value}
                            <DownOutlined />
                          </Button>
                        </a>
                      </Dropdown>
                    ) : null}

                    <Button className="btn-show" size="large" onClick={handleClickButton.bind(null, null)}>
                      <div className="flex justify-center">
                        <RiseOutlined style={{ marginRight: 8 }} />
                        Hot
                      </div>
                    </Button>
                  </div>
                  {postArray.map((item: any, index: number) => {
                    return (
                      <div>
                        {!item.hasOwnProperty('PostShared') && <Post key={item._id} post={item} userInfo={item.user} />}
                        {item.hasOwnProperty('PostShared') && (
                          <PostShare key={item._id} post={item} userInfo={item.user} owner={item.owner} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="new-feed-right w-4/12 pl-3">
                <div
                  className="popular-post flex justify-between items-center"
                  style={{
                    backgroundColor: themeColorSet.colorBg2,
                    borderStartStartRadius: 10,
                    borderStartEndRadius: 10,
                    padding: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: themeColorSet.colorText1,
                    }}
                  >
                    Popular Post
                  </span>

                  <Dropdown
                    menu={{
                      items: popular_time,
                      onClick: handlePopularClick,
                    }}
                    trigger={['click']}
                    onOpenChange={handleOpenPopularChange}
                    open={popularOpen}
                  >
                    <div onClick={(e) => e.preventDefault()}>
                      <Space
                        style={{
                          maxWidth: 100,
                          width: 100,
                          fontWeight: 600,
                          fontSize: 16,
                          color: themeColorSet.colorText1,
                          cursor: 'pointer',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.9rem',
                            color: themeColorSet.colorText2,
                          }}
                        >
                          {popularvalue}
                        </span>
                        <DownOutlined style={{ fontSize: '0.7rem' }} />
                      </Space>
                    </div>
                  </Dropdown>
                </div>
                <div
                  className="popular-post-body"
                  style={{
                    backgroundColor: themeColorSet.colorBg2,
                    borderEndEndRadius: 10,
                    padding: 10,
                  }}
                >
                  {popular.map((item, index) => {
                    if (index > 2) {
                      return '';
                    } else {
                      return (
                        <>
                          <div
                            className="popular-post-item flex items-center pt-3 pb-3"
                            style={{
                              borderBottom: '1px solid',
                              borderColor: themeColorSet.colorBg4,
                            }}
                          >
                            <img
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                marginLeft: 10,
                              }}
                              className="popular-post-item-image"
                              src={`${item.image}`}
                              alt=""
                            />
                            <div className="content ml-4  ">
                              <div
                                className="name"
                                style={{
                                  color: themeColorSet.colorText1,
                                  fontWeight: 600,
                                }}
                              >
                                <span>{item.name}</span>
                              </div>
                              <div
                                className="popular-post-item-desc mt-1"
                                style={{
                                  color: themeColorSet.colorText2,
                                  fontSize: '0.9rem',
                                }}
                              >
                                {item.description.length > 55
                                  ? item.description.slice(0, 55) + '...'
                                  : item.description}
                              </div>
                              <div className="popular-post-item-view mt-1">
                                <FontAwesomeIcon
                                  icon={faFileLines}
                                  style={{
                                    color: themeColorSet.colorText3,
                                    fontSize: '0.9rem',
                                  }}
                                />
                                <span
                                  style={{
                                    marginLeft: 5,
                                    color: themeColorSet.colorText3,
                                  }}
                                >
                                  {item.view} Views
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
                <div
                  className="top-community mt-3"
                  style={{
                    backgroundColor: themeColorSet.colorBg2,
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: themeColorSet.colorText1,
                    }}
                  >
                    Top Communities
                  </span>

                  <div className="top-community-body mt-4">
                    {community.map((item, index) => {
                      if (index > 2) {
                        return '';
                      } else {
                        return (
                          <>
                            <div
                              className="top-community-item flex pt-3 pb-3"
                              style={{
                                borderBottom: '1px solid',
                                borderColor: themeColorSet.colorBg4,
                              }}
                            >
                              <img
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 50,
                                }}
                                className="top-community-item-image"
                                src={`${item.image}`}
                                alt=""
                              />
                              <div className="content ml-3  ">
                                <div
                                  className="name"
                                  style={{
                                    color: themeColorSet.colorText1,
                                    fontWeight: 600,
                                  }}
                                >
                                  <span>{item.name}</span>
                                </div>
                                <div
                                  className="popular-post-item-desc mt-1"
                                  style={{
                                    color: themeColorSet.colorText2,
                                    fontSize: '0.9rem',
                                  }}
                                >
                                  {item.description.length > 28
                                    ? item.description.slice(0, 28) + '...'
                                    : item.description}
                                </div>
                                <div className="top-community-item-member mt-1">
                                  <FontAwesomeIcon
                                    icon={faUserFriends}
                                    style={{
                                      color: themeColorSet.colorText3,
                                      fontSize: '0.7rem',
                                    }}
                                  />
                                  <span
                                    style={{
                                      marginLeft: 5,
                                      color: themeColorSet.colorText3,
                                    }}
                                  >
                                    {item.member} Members
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default NewFeed;
