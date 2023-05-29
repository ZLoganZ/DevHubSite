import CommentDetail from '../../Comment/CommentDetail';
import Post from '../../Post/Post';
import { useState, useEffect } from 'react';
import PostShare from '../../Post/PostShare';
import StyleTotal from './cssPostDetail';
import { useSelector } from 'react-redux';
import { getTheme } from '../../../util/functions/ThemeFunction';

interface PostProps {
  post: any;
  userInfo: any;
  data: any;
  onData: (data: any) => void;
  postShare?: any;
  owner?: any;
}

const PostDetail = (Props: PostProps) => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(Props.data.idComment);

  useEffect(() => {
    setSelectedCommentId(Props.data.idComment);
  }, [Props.data]);

  const handleSelectComment = (commentId: string | null) => {
    setSelectedCommentId(commentId);
  };

  return (
    <StyleTotal theme={themeColorSet}>
      <div className="postDetail">
        {Props.postShare ? (
          <PostShare key={Props.post?._id} post={Props.post} userInfo={Props.userInfo} owner={Props.owner} />
        ) : (
          <Post key={Props.post?._id} post={Props.post} userInfo={Props.userInfo} />
        )}
        <div
          className="commentTotal px-3 ml-4"
          style={{
            maxHeight: '30rem',
            overflow: 'auto',
          }}
        >
          {Props.post?.comments?.map((item: any) => {
            return (
              <div key={item?._id}>
                {item ? (
                  <CommentDetail
                    key={item?._id}
                    onData={Props.onData}
                    comment={item}
                    userInfo={Props.userInfo}
                    selectedCommentId={selectedCommentId}
                    onSelectComment={handleSelectComment}
                    postID={Props.post._id}
                  >
                    {item.listReply?.map((item: any) => {
                      return (
                        <CommentDetail
                          key={item?._id}
                          onData={Props.onData}
                          comment={item}
                          userInfo={Props.userInfo}
                          selectedCommentId={selectedCommentId}
                          onSelectComment={handleSelectComment}
                          isReply={true}
                          postID={Props.post._id}
                        />
                      );
                    })}
                  </CommentDetail>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </StyleTotal>
  );
};

export default PostDetail;
