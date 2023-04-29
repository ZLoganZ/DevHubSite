import CommentDetail from "../../Comment/CommentDetail";
import Post from "../../Post/Post";
import { useState, useEffect } from "react";
import PostShare from "../../Post/PostShare";

interface PostProps {
  post: any;
  userInfo: any;
  data: any;
  onData: (data: any) => void;
  postShare?: any;
  owner?: any;
}

const PostDetail = (Props: PostProps) => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    Props.data.idComment
  );

  useEffect(() => {
    setSelectedCommentId(Props.data.idComment);
  }, [Props.data]);

  const handleSelectComment = (commentId: string | null) => {
    setSelectedCommentId(commentId);
  };

  return (
    <div>
      {Props.postShare ? (
        <PostShare
          post={Props.post}
          userInfo={Props.userInfo}
          owner={Props.owner}
        />
      ) : (
        <Post post={Props.post} userInfo={Props.userInfo} />
      )}
      {Props.post.comments?.map((item: any, index: number) => {
        return (
          <div>
            {item ? (
              <CommentDetail
                onData={Props.onData}
                key={index}
                comment={item}
                userInfo={Props.userInfo}
                selectedCommentId={selectedCommentId}
                onSelectComment={handleSelectComment}
              >
                {item.listReply?.map((item: any, index: number) => {
                  return (
                    <CommentDetail
                      onData={Props.onData}
                      key={index}
                      comment={item}
                      userInfo={Props.userInfo}
                      selectedCommentId={selectedCommentId}
                      onSelectComment={handleSelectComment}
                      isReply={true}
                    />
                  );
                })}
              </CommentDetail>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default PostDetail;
