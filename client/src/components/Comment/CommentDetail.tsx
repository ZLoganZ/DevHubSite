import { useEffect, useState } from 'react';
import { Comment, Icon } from '@ant-design/compatible';
import { Avatar, ConfigProvider, Tooltip } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from '../Post/cssPost';

interface CommentProps {
  comment: any;
  userInfo: any;
  children?: any;
  onData: (data: any) => void;
  selectedCommentId?: string | null;
  onSelectComment: (commentId: string | null) => void;
  isReply?: boolean;
}

const CommentDetail = (Props: CommentProps) => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [likes, setLike] = useState(0);
  const [dislikes, setDislike] = useState(0);
  const [action, setAction] = useState('');

  const like = () => {
    if (action === 'liked') {
      setLike(0);
      setAction('');
    } else {
      setLike(1);
      setDislike(0);
      setAction('liked');
    }
  };

  const dislike = () => {
    if (action === 'disliked') {
      setDislike(0);
      setAction('');
    } else {
      setDislike(1);
      setLike(0);
      setAction('disliked');
    }
  };

  const setReply = () => {
    const selectedCommentId = Props.selectedCommentId === Props.comment._id ? null : Props.comment._id;
    Props.onData({
      isReply: selectedCommentId ? true : false,
      idComment: selectedCommentId,
    });
    Props.onSelectComment(selectedCommentId);
  };

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        <Icon
          type="like"
          theme={action === 'liked' ? 'filled' : 'outlined'}
          onClick={like}
          style={{
            fontSize: '0.9rem',
          }}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
    </span>,
    <span key=' key="comment-basic-dislike"'>
      <Tooltip title="Dislike">
        <Icon
          type="dislike"
          theme={action === 'disliked' ? 'filled' : 'outlined'}
          onClick={dislike}
          style={{
            fontSize: '0.9rem',
          }}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
    </span>,
    {
      ...(Props.isReply ? (
        <></>
      ) : (
        <span
          id="reply"
          key="comment-basic-reply-to"
          onClick={setReply}
          {...(Props.selectedCommentId === Props.comment._id
            ? {
                style: {
                  color: '#1890ff',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                },
              }
            : {
                style: {
                  color: '#D4D4D4A6',
                  fontWeight: 'normal',
                  fontSize: '0.9rem',
                },
              })}
        >
          {Props.selectedCommentId === Props.comment._id ? 'Cancel' : 'Reply'}
        </span>
      )),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="">
          <Comment
            author={
              <div
                style={{
                  fontWeight: 600,
                  color: themeColorSet.colorText1,
                  fontSize: '0.85rem',
                }}
              >
                {Props.comment.user.username}
              </div>
            }
            actions={actions}
            avatar={
              Props.comment.user?.userImage ? (
                <Avatar src={Props.comment.user?.userImage} alt={Props.comment.user.username} />
              ) : (
                <Avatar style={{ backgroundColor: '#87d068' }} icon="user" alt={Props.comment.user.username} />
              )
            }
            content={<div className="">{Props.comment.content}</div>}
          >
            {Props.children}
          </Comment>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default CommentDetail;
