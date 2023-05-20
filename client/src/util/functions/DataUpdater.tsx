import { useQuery, useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { setAllPost, setIsInProfile, setOwnerInfo, setPostArr } from '../../redux/Slice/PostSlice';
import { postService } from '../../services/PostService';
import { setUser } from '../../redux/Slice/UserSlice';
import { useQueryClient } from '@tanstack/react-query';

const updateAllPosts = () => {};

const createPost = () => {
  const queryClient = useQueryClient();

  const { isInProfile } = useSelector((state: any) => state.postReducer);

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    async (newPost: any) => {
      const { data } = await postService.createPost(newPost);
      return data;
    },
    {
      onSuccess(data) {
        if (isInProfile) {
          queryClient.setQueryData(['allPosts'], (oldData: any) => {
            return {
              ...oldData,
              content: {
                ...oldData.content,
                allPostArr: [...oldData.content.allPostArr, data],
              },
            };
          });
        } else {
          queryClient.invalidateQueries(['posts']);
        }
      },
    },
  );
  return { mutate, isLoading, isError, isSuccess };
};

export { updateAllPosts, createPost };
