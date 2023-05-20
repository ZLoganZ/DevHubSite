import { Button, ConfigProvider } from 'antd';
import React, { useState, useLayoutEffect } from 'react';
import { messageService } from '../../../services/MessageService';
import { useDispatch, useSelector } from 'react-redux';
import GroupChatModal from '../../ChatComponent/GroupChatModal/GroupChatModal';
import { closeModal, openModal } from '../../../redux/Slice/ModalHOCSlice';
import StyleTotal from './cssOpenPostDetailModal';
import { getTheme } from '../../../util/functions/ThemeFunction';
import { set } from 'lodash';

interface Props {
  users: [];
}

const OpenGroupModal = (Props: Props) => {
  const dispatch = useDispatch();
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [isLoading, setIsLoading] = useState(false);

  let [membersGroup, SetMembersGroup] = useState<any>();
  let [name, setGroupName] = useState<any>();

  const handleSetName = (newName: any) => {
    setGroupName(() => {
      name = newName;
    });
  };

  const handleSetGroupMember = (newMembers: any) => {
    SetMembersGroup(() => {
      membersGroup = newMembers;
    });
  };

  const onSubmit = () => {
    if (!name || !membersGroup || membersGroup.length < 2) {
      return;
    }

    setIsLoading(true);

    messageService
      .createConversation({ users: membersGroup, name, isGroup: true })
      .then(() => {
        setIsLoading(false);
        dispatch(closeModal());
      })
      .catch(() => console.log('error'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useLayoutEffect(() => {
    dispatch(
      openModal({
        title: 'Create a new group chat',
        component: <GroupChatModal setName={handleSetName} setValue={handleSetGroupMember} users={Props.users} />,
        footer: (
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              disabled={isLoading}
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              Cancel
            </Button>
            <Button loading={isLoading} type="primary" onClick={onSubmit}>
              Create
            </Button>
          </div>
        ),
      }),
    );
  }, [isLoading, name, membersGroup]);

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

export default OpenGroupModal;
