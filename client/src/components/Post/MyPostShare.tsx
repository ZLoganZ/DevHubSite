import {
  faComment,
  faCopy,
  faEllipsis,
  faHeart,
  faPenToSquare,
  faShareNodes,
  faTrash,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, ConfigProvider, Dropdown, Space, Modal, notification } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssPost';
import { commonColor } from '../../util/cssVariable/cssVariable';

import { SHARE_POST_SAGA, LIKE_POSTSHARE_SAGA } from '../../redux/actionSaga/PostActionSaga';
import { openDrawer } from '../../redux/Slice/DrawerHOCSlice';
import EditPostForm from '../Form/EditPostForm/EditPostForm';
import OpenMyPostDetailModal from '../ActionComponent/OpenPostDetail/OpenMyPostDetailModal';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface PostShareProps {
  post: any;
  userInfo: any;
  owner: any;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const MyPostShare = (PostProps: PostShareProps) => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // ------------------------ Like ------------------------

  // Like Number
  const [likeNumber, setLikeNumber] = useState(PostProps.post.likes.length);
  useEffect(() => {
    setLikeNumber(PostProps.post.likes.length);
  }, [PostProps.post.likes.length]);

  // Like color
  const [likeColor, setLikeColor] = useState('white');
  useEffect(() => {
    PostProps.post.isLiked ? setLikeColor('red') : setLikeColor('white');
  }, [PostProps.post.isLiked]);

  // isLiked
  const [isLiked, setIsLiked] = useState(true);
  useEffect(() => {
    setIsLiked(PostProps.post.isLiked);
  }, [PostProps.post.isLiked]);

  const createdAt = new Date(PostProps.post.createdAt);
  //format date to get full date
  const date = createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const postCreatedAt = new Date(PostProps.post.postCreatedAt);
  //format date to get full date
  const postDate = postCreatedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(
      SHARE_POST_SAGA({
        id: PostProps.post.postID,
      }),
    );
    setIsModalOpen(false);
    openNotificationWithIcon('success');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // post setting
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="item flex items-center px-4 py-2">
          <FontAwesomeIcon className="icon" icon={faCopy} />
          <span className="ml-2">Copy Link Post</span>
        </div>
      ),
      onClick: () => {
        navigator.clipboard.writeText(`http://localhost:3000/postshare/${PostProps.post._id}`);
      },
    },
    {
      key: '2',
      label: (
        <div key="2" className="item flex items-center px-4 py-2">
          <FontAwesomeIcon className="icon" icon={faTrash} />
          <span className="ml-2">Delete Post</span>
        </div>
      ),
      onClick: () => {
        showModal();
      },
    },
  ];

  // Notification delete post
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Delete Successfully',
      placement: 'bottomRight',
    });
  };

  // Open PostDetailModal
  const [isOpenPostDetail, setIsOpenPostDetail] = useState(false);

  const { visible } = useSelector((state: any) => state.modalHOCReducer);

  useEffect(() => {
    if (!visible && isOpenPostDetail) {
      setIsOpenPostDetail(!isOpenPostDetail);
    }
  }, [visible]);

  const [expanded, setExpanded] = useState(false);

  const displayContent = expanded ? PostProps.post.content : PostProps.post.content.slice(0, 150) + '...';

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      {contextHolder}
      <Modal
        title={
          <>
            <FontAwesomeIcon
              className="icon mr-2"
              icon={faTriangleExclamation}
              style={{ color: commonColor.colorWarning1 }}
            />
            <span>Are you sure delete this post?</span>
          </>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            backgroundColor: commonColor.colorBlue1,
          },
        }}
        cancelButtonProps={{
          style: {
            color: themeColorSet.colorText1,
            backgroundColor: themeColorSet.colorBg3,
          },
        }}
      >
        <p>You will not be able to recover files after deletion!</p>
      </Modal>
      {isOpenPostDetail ? (
        <OpenMyPostDetailModal
          postShare={true}
          post={PostProps.post}
          userInfo={PostProps.userInfo}
          owner={PostProps.post.user}
        />
      ) : null}
      <StyleTotal theme={themeColorSet} className={'rounded-lg mb-4'}>
        <div className="post px-4 py-3">
          <div className="postHeader flex justify-between items-center">
            <div className="postHeader__left">
              <div className="name_avatar flex">
                <Avatar size={50} src={PostProps.userInfo?.userImage} />
                <div className="name ml-2">
                  <div className="name__top font-bold">
                    <NavLink to={`/${PostProps.userInfo.id}`} style={{ color: themeColorSet.colorText1 }}>
                      {PostProps.userInfo.username}
                    </NavLink>
                  </div>
                  <div className="time" style={{ color: themeColorSet.colorText3 }}>
                    <span>{'Data Analyst'} • </span>
                    <span>{date}</span>
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
                    <div className="name__top font-bold">
                      <NavLink to={`/${PostProps.owner.id}`} style={{ color: themeColorSet.colorText1 }}>
                        {PostProps.owner.username}
                      </NavLink>
                    </div>
                    <div className="time" style={{ color: themeColorSet.colorText3 }}>
                      <span>{'Data Analyst'} • </span>
                      <span>{postDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="postBody mt-5">
              <div className="title font-bold">{PostProps.post.title}</div>
              <div className="content mt-3">
                {/* <div
                  className="content__text"
                  dangerouslySetInnerHTML={{
                    __html: PostProps.post.content,
                  }}
                ></div> */}
                <div className="content__text">
                  <ReactQuill
                    value={displayContent}
                    readOnly={true}
                    modules={{ toolbar: false }}
                    // formats={Quill.import("formats")}
                  />
                  <a onClick={toggleExpanded}>{expanded ? 'Read less' : 'Read more'}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="postFooter flex justify-between items-center">
            <div className="like_share flex justify-between w-1/5">
              <Space className="like" direction="vertical" align="center">
                <span>{likeNumber} Like</span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: 'transparent' }}
                  icon={<FontAwesomeIcon icon={faHeart} color={likeColor} />}
                  onClick={(e: any) => {
                    if (isLiked) {
                      setLikeNumber(likeNumber - 1);
                      setLikeColor('white');
                      setIsLiked(false);
                    } else {
                      setLikeNumber(likeNumber + 1);
                      setLikeColor('red');
                      setIsLiked(true);
                    }
                    dispatch(
                      LIKE_POSTSHARE_SAGA({
                        id: PostProps.post._id,
                      }),
                    );
                  }}
                />
              </Space>
            </div>
            <div className="comment_view flex justify-between w-1/3">
              <Space className="like" direction="vertical" align="center">
                <span>{PostProps.post.comments.length} Comment</span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: 'transparent' }}
                  icon={<FontAwesomeIcon icon={faComment} />}
                  onClick={() => {
                    setIsOpenPostDetail(true);
                  }}
                />
              </Space>
              <Space className="like" direction="vertical" align="center">
                <span>70 View</span>
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

export default MyPostShare;
