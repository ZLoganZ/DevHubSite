import { faComment, faUpRightFromSquare, faEllipsis, faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, ConfigProvider, Dropdown, Image, Popover, Space } from 'antd';
import type { MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssPost';

import { INCREASE_VIEW_SHARE_SAGA, LIKE_POSTSHARE_SAGA } from '../../redux/actionSaga/PostActionSaga';
import OpenPostDetailModal from '../ActionComponent/OpenPostDetail/OpenPostDetailModal';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';
import useIntersectionObserver from '../../util/functions/useIntersectionObserver';
import { GET_USER_ID } from '../../redux/actionSaga/AuthActionSaga';
import PopupInfoUser from '../PopupInfoUser/PopupInfoUser';
import { format, isThisWeek, isThisYear, isToday } from 'date-fns';

interface PostShareProps {
  post: any;
  userInfo: any;
  owner: any;
}

const PostShare = (PostProps: PostShareProps) => {
  const link = PostProps.post.link;
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // ------------------------ Like ------------------------

  // Like Number
  const [likeNumber, setLikeNumber] = useState(PostProps.post?.likes?.length);
  useEffect(() => {
    setLikeNumber(PostProps.post?.likes?.length);
  }, [PostProps.post?.likes?.length]);

  // Like color
  const [likeColor, setLikeColor] = useState(themeColorSet.colorText1);
  useEffect(() => {
    PostProps.post?.isLiked ? setLikeColor('red') : setLikeColor(themeColorSet.colorText1);
  }, [PostProps.post?.isLiked, change]);

  // isLiked
  const [isLiked, setIsLiked] = useState(true);
  useEffect(() => {
    setIsLiked(PostProps.post?.isLiked);
  }, [PostProps.post?.isLiked]);

  const formatDateTime = (date: any) => {
    if (isToday(date)) {
      return format(date, 'p'); // Display only time for today
    } else if (isThisWeek(date, { weekStartsOn: 1 })) {
      return format(date, 'iiii, p'); // Display full day of the week and time for this week
    } else if (isThisYear(date)) {
      return format(date, 'eeee, MMMM d • p'); // Display full day of the week, date, and time for this year
    } else {
      return format(date, 'eeee, MMMM d, yyyy • p'); // Display full day of the week, date, year, and time for other cases
    }
  };

  const createdAt = new Date(PostProps.post?.createdAt);
  //format date to get full date
  const date = formatDateTime(createdAt);
  const postCreatedAt = new Date(PostProps.post?.postCreatedAt);
  //format date to get full date
  const postDate = formatDateTime(postCreatedAt);

  // post setting
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="item flex items-center px-4 py-2">
          <FontAwesomeIcon className="icon" icon={faUpRightFromSquare} />
          <span className="ml-2">Open post in new tab</span>
        </div>
      ),
      onClick: () => {
        window.open(`/postshare/${PostProps.post?._id}`, '_blank')?.focus();
      },
    },
  ];

  // Open PostDetailModal
  const [isOpenPostDetail, setIsOpenPostDetail] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const displayContent =
    expanded || PostProps.post?.content?.length <= 250
      ? PostProps.post?.content
      : PostProps.post?.content?.slice(0, 200) + '...';

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // ------------------------ View ------------------------
  const postShareRef = React.useRef(null);

  const onIntersect = () => {
    dispatch(
      INCREASE_VIEW_SHARE_SAGA({
        id: PostProps.post?._id,
      }),
    );
  };

  useIntersectionObserver(postShareRef, onIntersect);

  // Get my userID
  useEffect(() => {
    dispatch(GET_USER_ID());
  }, []);

  const { userID } = useSelector((state: any) => state.authReducer);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <OpenPostDetailModal
        key={PostProps.post?._id}
        postShare={true}
        post={PostProps.post}
        userInfo={PostProps.userInfo}
        owner={PostProps.owner}
        visible={isOpenPostDetail}
        setVisible={setIsOpenPostDetail}
      />
      <StyleTotal theme={themeColorSet} className={'rounded-lg mb-4'}>
        <div ref={postShareRef} className="post px-4 py-3">
          <div className="postHeader flex justify-between items-center">
            <div className="postHeader__left">
              <div className="name_avatar flex">
                <Avatar size={50} src={PostProps.userInfo?.userImage} />
                <div className="name ml-2">
                  <Popover
                    overlayInnerStyle={{
                      border: `1px solid ${themeColorSet.colorBg3}`,
                    }}
                    mouseEnterDelay={0.7}
                    content={<PopupInfoUser userInfo={PostProps.userInfo} isMe={userID} />}
                  >
                    <div className="name__top font-bold">
                      <NavLink to={`/user/${PostProps.userInfo?.id}`} style={{ color: themeColorSet.colorText1 }}>
                        {PostProps.userInfo?.username}
                      </NavLink>
                    </div>
                  </Popover>
                  <div className="time" style={{ color: themeColorSet.colorText3 }}>
                    <NavLink to={`/postshare/${PostProps.post?._id}`} style={{ color: themeColorSet.colorText3 }}>
                      {/* <span>{'Data Analyst'} • </span> */}
                      <span>{date}</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="postHeader__right">
              <div className="icon">
                <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                  <FontAwesomeIcon size="lg" icon={faEllipsis} />
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="space-align-block">
            <div className="postHeader flex justify-between items-center">
              <div className="postHeader__left">
                <div className="name_avatar flex">
                  <Avatar size={50} src={PostProps.owner?.userImage} />
                  <div className="name ml-2">
                    <Popover
                      overlayInnerStyle={{
                        border: `1px solid ${themeColorSet.colorBg3}`,
                      }}
                      mouseEnterDelay={0.7}
                      content={<PopupInfoUser userInfo={PostProps.owner} isMe={userID} />}
                    >
                      <div className="name__top font-bold">
                        <NavLink to={`/user/${PostProps.owner?.id}`} style={{ color: themeColorSet.colorText1 }}>
                          {PostProps.owner?.username}
                        </NavLink>
                      </div>
                    </Popover>
                    <div className="time" style={{ color: themeColorSet.colorText3 }}>
                      <NavLink to={`/post/${PostProps.post?.postID}`} style={{ color: themeColorSet.colorText3 }}>
                        {/* <span>{'Data Analyst'} • </span> */}
                        <span>{postDate}</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="postBody mt-5">
              <div className="title font-bold">{PostProps.post?.title}</div>
              <div className="content mt-3">
                {/* <div
                  className="content__text"
                  dangerouslySetInnerHTML={{
                    __html: PostProps.post?.content,
                  }}
                ></div> */}
                <div className="content__text">
                  <ReactQuill
                    value={displayContent}
                    readOnly={true}
                    theme={'bubble'}
                    // formats={Quill.import("formats")}
                  />
                  {PostProps.post?.content?.length > 250 && (
                    <a onClick={toggleExpanded}>{expanded ? 'Read less' : 'Read more'}</a>
                  )}
                </div>
                {PostProps.post.url ? (
                  <div className="contentImage mt-3">
                    <Image src={PostProps.post.url} alt="" style={{ width: '100%' }} />
                  </div>
                ) : link ? (
                  <a
                    href={link.linkAddress}
                    target="_blank"
                    style={{
                      color: themeColorSet.colorText2,
                    }}
                  >
                    <div
                      className="contentLink flex mt-5 px-3 py-3 cursor-pointer"
                      style={{ backgroundColor: themeColorSet.colorBg4 }}
                    >
                      <div className="left w-4/5 p-2">
                        <div className="mb-2" style={{ fontWeight: 600, color: themeColorSet.colorText1 }}>
                          {link.title?.length > 100 ? link.title.slice(0, 100) + '...' : link.title}
                        </div>
                        <div>
                          {link.description?.length > 100 ? link.description.slice(0, 100) + '...' : link.description}
                        </div>
                      </div>
                      <img src={link.image} alt="" className="w-1/5" />
                    </div>
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="postFooter flex justify-between items-center">
            <div className="like_share flex justify-between w-1/5">
              <Space className="like" direction="vertical" align="center">
                <span>
                  {likeNumber}
                  {likeNumber > 1 ? ' Likes' : ' Like'}
                </span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: 'transparent' }}
                  icon={<FontAwesomeIcon icon={faHeart} color={likeColor} />}
                  onClick={(e: any) => {
                    if (isLiked) {
                      setLikeNumber(likeNumber - 1);
                      setLikeColor(themeColorSet.colorText1);
                      setIsLiked(false);
                    } else {
                      setLikeNumber(likeNumber + 1);
                      setLikeColor('red');
                      setIsLiked(true);
                    }
                    dispatch(
                      LIKE_POSTSHARE_SAGA({
                        id: PostProps.post?._id,
                      }),
                    );
                  }}
                />
              </Space>
            </div>
            <div className="comment_view flex justify-between w-1/3">
              <Space className="like" direction="vertical" align="center">
                <span>
                  {PostProps.post?.comments?.length}
                  {PostProps.post?.comments?.length > 1 ? ' Comments' : ' Comment'}
                </span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: 'transparent' }}
                  icon={<FontAwesomeIcon icon={faComment} color={themeColorSet.colorText1} />}
                  onClick={() => {
                    setIsOpenPostDetail(true);
                  }}
                />
              </Space>
              <Space className="like" direction="vertical" align="center">
                <span>
                  {PostProps.post.views} {PostProps.post.views > 1 ? 'Views' : 'View'}
                </span>
                <Space>
                  <Avatar
                    className="item"
                    style={{ backgroundColor: 'transparent' }}
                    icon={<FontAwesomeIcon icon={faShareNodes} />}
                  />
                </Space>
              </Space>
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default PostShare;
