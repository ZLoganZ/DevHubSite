import { Avatar, ConfigProvider, Input, Popover, Button } from 'antd';
import React, { useMemo, useLayoutEffect, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/Slice/ModalHOCSlice';
import { getTheme } from '../../../util/functions/ThemeFunction';
import PostDetailModal from '../../Form/PostDetail/PostDetail';
import StyleTotal from './cssOpenPostDetailModal';
import dataEmoji from '@emoji-mart/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Picker from '@emoji-mart/react';
import {
  SAVE_COMMENT_POSTSHARE_SAGA,
  SAVE_COMMENT_SAGA,
  SAVE_REPLY_SAGA,
  SAVE_REPLY_POSTSHARE_SAGA,
  GET_POSTSHARE_BY_ID_SAGA,
  GET_POST_BY_ID_SAGA,
} from '../../../redux/actionSaga/PostActionSaga';

interface PostProps {
  post: any;
  userInfo: any;
  postShare?: any;
  owner?: any;
}

const OpenPostDetailModal = (PostProps: PostProps) => {
  const dispatch = useDispatch();
  const searchRef = useRef<any>(null);

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const [commentContent, setCommentContent] = useState('');
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (PostProps.postShare) {
      dispatch(GET_POSTSHARE_BY_ID_SAGA({ id: PostProps.post._id }));
    } else {
      dispatch(GET_POST_BY_ID_SAGA({ id: PostProps.post._id }));
    }
  }, [PostProps.post._id, PostProps.postShare]);

  const [data, setData] = useState<any>({ isReply: false, idComment: null });

  const handleData = (data: any) => {
    setData(data);
  };

  const handleSubmitComment = () => {
    if (PostProps.postShare) {
      if (data.isReply) {
        dispatch(
          SAVE_REPLY_POSTSHARE_SAGA({
            id: PostProps.post?._id,
            reply: {
              contentComment: commentContent,
              idComment: data.idComment,
            },
          }),
        );
        setData({ isReply: false, idComment: null });
      } else {
        dispatch(
          SAVE_COMMENT_POSTSHARE_SAGA({
            comment: {
              contentComment: commentContent,
            },
            id: PostProps.post?._id,
          }),
        );
      }
    } else {
      if (data.isReply) {
        dispatch(
          SAVE_REPLY_SAGA({
            id: PostProps.post?._id,
            reply: {
              contentComment: commentContent,
              idComment: data.idComment,
            },
          }),
        );
        setData({ isReply: false, idComment: null });
      } else {
        dispatch(
          SAVE_COMMENT_SAGA({
            comment: {
              contentComment: commentContent,
            },
            id: PostProps.post?._id,
          }),
        );
      }
    }
    setTimeout(() => {
      setCommentContent('');
    }, 1000);
  };

  const checkEmpty = () => {
    if (commentContent === '') {
      return true;
    } else {
      return false;
    }
  };

  const memoizedComponent = useMemo(
    () => (
      <PostDetailModal
        onData={handleData}
        post={PostProps.post}
        userInfo={PostProps.userInfo}
        data={data}
        postShare={PostProps.postShare}
        owner={PostProps.owner}
      />
    ),
    [PostProps.post, PostProps.userInfo, data],
  );

  const memoizedInputComment = useMemo(
    () => (
      <div className="commentInput text-right flex items-center">
        <Avatar className="mr-2" size={40} src={userInfo?.userImage} />
        <div className="input w-full">
          <Input
            value={commentContent}
            placeholder="Add a Comment"
            // allowClear
            onKeyUp={(e) => {
              // get cursor position
              const cursorPosition = e.currentTarget.selectionStart;
              setCursor(cursorPosition || 0);
            }}
            onClick={(e) => {
              const cursor = e.currentTarget.selectionStart;
              setCursor(cursor || 0);
            }}
            onChange={(e) => {
              setCommentContent(e.currentTarget.value);
              const cursor = e.currentTarget.selectionStart;
              setCursor(cursor || 0);
            }}
            style={{
              borderColor: themeColorSet.colorText3,
            }}
            maxLength={150}
            onPressEnter={handleSubmitComment}
            addonAfter={
              <Popover
                placement="right"
                trigger="click"
                title={'Emoji'}
                content={
                  <Picker
                    data={dataEmoji}
                    onEmojiSelect={(emoji: any) => {
                      setCommentContent(commentContent.slice(0, cursor) + emoji.native + commentContent.slice(cursor));
                    }}
                  />
                }
              >
                <span
                  className="emoji cursor-pointer hover:text-blue-700"
                  style={{
                    transition: 'all 0.3s',
                  }}
                >
                  <FontAwesomeIcon className="item mr-3 ml-3" size="lg" icon={faFaceSmile} />
                </span>
              </Popover>
            }
          ></Input>
          <span
            className="sendComment cursor-pointer hover:text-blue-700"
            {...(checkEmpty()
              ? {
                  style: {
                    color: 'gray',
                    //hover disabled
                    cursor: 'not-allowed',
                  },
                }
              : { transition: 'all 0.3s' })}
            onClick={handleSubmitComment}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
        </div>
      </div>
    ),
    [commentContent, cursor],
  );

  useLayoutEffect(() => {
    dispatch(
      openModal({
        title: 'The post of ' + PostProps.userInfo?.username,
        component: memoizedComponent,
        footer: (
          <ConfigProvider>
            <StyleTotal theme={themeColorSet}>{memoizedInputComment}</StyleTotal>
          </ConfigProvider>
        ),
      }),
    );
  }, [memoizedComponent, memoizedInputComment]);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div></div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default OpenPostDetailModal;
