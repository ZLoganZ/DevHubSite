import { Avatar, ConfigProvider, Input, Popover, Button, Row, Col } from 'antd';
import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../../util/functions/ThemeFunction';
import PostDetail from '../../Form/PostDetail/PostDetail';
import StyleTotal from './cssOpenPostDetail';
import dataEmoji from '@emoji-mart/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Picker from '@emoji-mart/react';
import {
  SAVE_COMMENT_POSTSHARE_SAGA,
  SAVE_COMMENT_SAGA,
  SAVE_REPLY_SAGA,
  SAVE_REPLY_POSTSHARE_SAGA,
  GET_POST_BY_ID_SAGA,
} from '../../../redux/actionSaga/PostActionSaga';
import { useParams } from 'react-router-dom';
import MyPostDetail from '../../Form/PostDetail/MyPostDetail';

interface Props {
  post: any;
  userInfo: any;
}

const OpenMyPostDetail = (Props: Props) => {
  const dispatch = useDispatch();

  const { postID } = useParams();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [commentContent, setCommentContent] = useState('');

  const [data, setData] = useState<any>({ isReply: false, idComment: null });

  const handleData = (data: any) => {
    setData(data);
  };

  const handleComment = (content: any) => {
    setCommentContent(content);
  };

  const handleSubmitComment = () => {
    if (Props.post?.postShare) {
      if (data.isReply) {
        dispatch(
          SAVE_REPLY_POSTSHARE_SAGA({
            id: Props.post?._id,
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
            id: Props.post?._id,
          }),
        );
      }
    } else {
      if (data.isReply) {
        dispatch(
          SAVE_REPLY_SAGA({
            id: Props.post?._id,
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
            id: Props.post?._id,
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
      <MyPostDetail
        onData={handleData}
        post={Props.post}
        userInfo={Props.post?.user}
        data={data}
        postShare={Props.post?.PostShared}
        owner={Props.post?.owner}
      />
    ),
    [Props.post, data],
  );

  const memoizedInputComment = useMemo(
    () => (
      <div className=" commentInput text-right flex items-center px-4 pb-5 mt-4">
        <Avatar className="mr-2" size={40} src={Props.userInfo?.userImage} />
        <div className="input w-full">
          <Input
            value={commentContent}
            placeholder="Add a Comment"
            // allowClear
            onChange={(e) => {
              handleComment(e.target.value);
            }}
            style={{
              borderColor: themeColorSet.colorText3,
            }}
            maxLength={150}
            addonAfter={
              <Popover
                placement="right"
                trigger="click"
                title={'Emoji'}
                content={
                  <Picker
                    data={dataEmoji}
                    onEmojiSelect={(emoji: any) => {
                      handleComment(commentContent + emoji.native);
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
    [commentContent],
  );

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <Row className="py-4">
          <Col offset={3} span={18}>
            <div
              style={{
                backgroundColor: themeColorSet.colorBg2,
              }}
              className="rounded-lg"
            >
              {memoizedComponent}
              {memoizedInputComment}
            </div>
          </Col>
        </Row>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default OpenMyPostDetail;
