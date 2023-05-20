import { ConfigProvider, Input, Popover, Skeleton, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faMicrophone, faPaperclip, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import dataEmoji from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { CommentOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { NavLink, useParams } from 'react-router-dom';
import ConversationList from '../../components/ChatComponent/ConversationList/ConversationList';
import EmptyChat from '../../components/ChatComponent/EmptyChat/EmptyChat';
import MessageChat from '../../components/ChatComponent/MessageChat/MessageChat';
import { useConversationsData, useCurrentConversationData, useFollowersData } from '../../util/functions/DataProvider';
import { GET_USER_ID } from '../../redux/actionSaga/AuthActionSaga';
import { messageService } from '../../services/MessageService';
import UploadComponent from '../../components/UploadComponent/UploadComponent';
import SharedMedia from '../../components/ChatComponent/SharedMedia/SharedMedia';
import { set } from 'lodash';

const Chat = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const dispatch = useDispatch();

  const { conversationID } = useParams();

  const { userID } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(GET_USER_ID());
  }, []);

  const [message, setMessage] = useState('');
  const [cursor, setCursor] = useState(0);

  const handleSubmit = async (data: any) => {
    if (!conversationID) return;
    if (!data) return;
    setMessage('');
    await messageService.sendMessage({
      conversationID,
      body: data,
    });
  };

  const { conversations, isLoadingConversations } = useConversationsData();

  const { followers, isLoadingFollowers } = useFollowersData(userID);

  const { isLoadingConversation } = useCurrentConversationData(conversationID ? conversationID : undefined);

  const handleUpload = async (error: any, result: any, widget: any) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }

    await messageService.sendMessage({
      conversationID,
      image: result?.info?.secure_url,
    });
  };

  const [isDisplayShare, setIsDisplayShare] = useState(false);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        {isLoadingConversations || isLoadingFollowers ? (
          <div className="chat flex">
            <div
              className="slider flex flex-col justify-between items-center h-screen py-3"
              style={{
                width: '5%',
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
                position: 'fixed',
                backgroundColor: themeColorSet.colorBg1,
              }}
            >
              <div className="logo">
                <Skeleton.Button active size="large" shape="circle" />
              </div>
              <div className="option">
                <Space size={30} direction="vertical">
                  <Skeleton.Button active size="large" shape="circle" />
                  <Skeleton.Button active size="large" shape="circle" />
                  <Skeleton.Button active size="large" shape="circle" />
                </Space>
              </div>
              <div className="mode">
                <Skeleton.Button active size="large" shape="circle" />
              </div>
            </div>
            <div
              className="insteadComponent"
              style={{
                marginLeft: '5%',
                width: '23%',
                height: '100vh',
                position: 'fixed',
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <div
                className="searchChat h-screen"
                style={{
                  backgroundColor: themeColorSet.colorBg1,
                }}
              >
                <div
                  className="flex items-center w-full px-3 py-4"
                  style={{
                    borderBottom: '1px solid',
                    borderColor: themeColorSet.colorBg4,
                    height: '12%',
                  }}
                >
                  <Skeleton avatar paragraph={{ rows: 0 }} active />
                </div>
                <div
                  className="searchInput px-3 py-4 w-full flex justify-between items-center"
                  style={{
                    borderBottom: '1px solid',
                    borderColor: themeColorSet.colorBg4,
                    height: '11%',
                  }}
                >
                  <Skeleton.Button active size="large" block />
                </div>
                <div
                  className="userActive px-3 py-4 w-full"
                  style={{
                    borderBottom: '1px solid',
                    borderColor: themeColorSet.colorBg4,
                    height: '20%',
                  }}
                >
                  <div className="listUser grid grid-cols-5 mt-5 ">
                    <Skeleton.Button active size="large" shape="circle" />
                    <Skeleton.Button active size="large" shape="circle" />
                    <Skeleton.Button active size="large" shape="circle" />
                    <Skeleton.Button active size="large" shape="circle" />
                    <Skeleton.Button active size="large" shape="circle" />
                  </div>
                </div>
                <div className="listUser px-3 py-4">
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                </div>
              </div>
            </div>
            <div
              className="chatBox flex flex-col items-center px-4 py-6"
              style={{
                width: '92%',
                marginLeft: '28%',
                height: '100vh',
                position: 'fixed',
                backgroundColor: themeColorSet.colorBg1,
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <div
                style={{
                  height: 500,
                  width: '100%',
                }}
              >
                <Skeleton className="mt-8" active />
                <Skeleton className="mt-8" active />
                <Skeleton className="mt-8" active />
                <Skeleton className="mt-8" active />
              </div>
            </div>
          </div>
        ) : (
          <div className="chat flex">
            <div
              className="slider flex flex-col justify-between items-center h-screen py-3"
              style={{
                width: '5%',
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
                position: 'fixed',
                backgroundColor: themeColorSet.colorBg1,
              }}
            >
              <div className="logo">
                <NavLink to="/" className="icon_logo">
                  <FontAwesomeIcon className="icon" icon={faSnowflake} />
                </NavLink>
              </div>
              <div className="option">
                <Space size={30} direction="vertical">
                  <div className="message optionItem">
                    <CommentOutlined className="text-2xl" />
                  </div>
                  <div className="Search optionItem">
                    <SearchOutlined className="text-2xl" />
                  </div>
                  <div className="Setting optionItem">
                    <SettingOutlined className="text-2xl" />
                  </div>
                </Space>
              </div>
              <div className="mode">
                <FontAwesomeIcon className="icon" icon={faSun} />
              </div>
            </div>
            <div
              className="insteadComponent"
              style={{
                marginLeft: '5%',
                width: '23%',
                height: '100vh',
                position: 'fixed',
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <ConversationList
                key={conversations[0]?.lastMessageAt}
                users={followers}
                initialItems={conversations}
                selected={conversationID}
              />
            </div>
            <div
              className="chatBox"
              style={{
                width: isDisplayShare ? '49%' : '72%',
                marginLeft: '28%',
                height: '100vh',
                position: 'fixed',
                backgroundColor: themeColorSet.colorBg1,
                borderRight: isDisplayShare ? '1px solid' : 'none',
                borderColor: themeColorSet.colorBg4,
              }}
            >
              {!conversationID ? (
                <EmptyChat key={Math.random()} />
              ) : isLoadingConversation ? (
                <>
                  <Skeleton className="mt-8" active />
                  <Skeleton className="mt-8" active />
                  <Skeleton className="mt-8" active />
                  <Skeleton className="mt-8" active />
                  <div
                    className="shared"
                    style={{
                      width: '23%',
                      height: '100vh',
                      marginLeft: '77%',
                      position: 'fixed',
                      backgroundColor: themeColorSet.colorBg1,
                    }}
                  >
                    <div
                      className="extension px-3 flex items-center"
                      style={{
                        height: '12%',
                        borderBottom: '1px solid',
                        borderColor: themeColorSet.colorBg4,
                      }}
                    >
                      <div className="flex justify-center items-center w-full">
                        <div
                          className="setting text-center"
                          style={{
                            width: '25%',
                          }}
                        >
                          <Skeleton.Button active size="large" shape="circle" />
                        </div>
                        <div
                          className="notification text-center"
                          style={{
                            width: '25%',
                          }}
                        >
                          <Skeleton.Button active size="large" shape="circle" />
                        </div>
                        <div
                          className="warning text-center"
                          style={{
                            width: '25%',
                          }}
                        >
                          <Skeleton.Button active size="large" shape="circle" />
                        </div>
                        <div
                          className="logout text-center"
                          style={{
                            width: '25%',
                          }}
                        >
                          <Skeleton.Button active size="large" shape="circle" />
                        </div>
                      </div>
                    </div>
                    <div className="fileShare px-3 py-4">
                      <div className="sharedMedia">
                        <Space className="content" size={20}>
                          <Skeleton.Image active />
                          <Skeleton.Image active />
                          <Skeleton.Image active />
                        </Space>
                      </div>
                      <div className="sharedFile mt-5">
                        <div className="flex justify-between items-center mb-3"></div>
                        <div className="content">
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ height: '92%' }}>
                    <MessageChat
                      // key={conversations[0]?.lastMessageAt}
                      key={conversationID}
                      conversationId={conversationID}
                      setIsDisplayShare={setIsDisplayShare}
                      isDisplayShare={isDisplayShare}
                    />
                  </div>
                  <div
                    className="footer flex justify-between items-center"
                    style={{
                      height: '8%',
                    }}
                  >
                    <div
                      className="iconEmoji"
                      style={{
                        width: '5%',
                      }}
                    >
                      <Popover
                        placement="top"
                        trigger="click"
                        title={'Emoji'}
                        content={
                          <Picker
                            data={dataEmoji}
                            onEmojiSelect={(emoji: any) => {
                              setMessage(message.slice(0, cursor) + emoji.native + message.slice(cursor));
                            }}
                          />
                        }
                      >
                        <span className="emoji">
                          <FontAwesomeIcon className="item mr-3 ml-3" size="lg" icon={faFaceSmile} />
                        </span>
                      </Popover>
                    </div>
                    <div
                      className="input"
                      style={{
                        width: '78%',
                      }}
                    >
                      <ConfigProvider
                        theme={{
                          token: {
                            controlHeight: 32,
                            lineWidth: 0,
                          },
                        }}
                      >
                        <Input
                          allowClear
                          placeholder="Write a message"
                          value={message}
                          onKeyUp={(e) => {
                            // get cursor position
                            const cursorPosition = e.currentTarget.selectionStart;
                            setCursor(cursorPosition || 0);
                          }}
                          onClick={(e) => {
                            // get cursor position
                            const cursorPosition = e.currentTarget.selectionStart;
                            setCursor(cursorPosition || 0);
                          }}
                          onChange={(e) => {
                            setMessage(e.currentTarget.value);
                            // get cursor position
                            const cursorPosition = e.currentTarget.selectionStart;
                            setCursor(cursorPosition || 0);
                          }}
                          onPressEnter={(e) => {
                            handleSubmit(e.currentTarget.value);
                          }}
                        />
                      </ConfigProvider>
                    </div>
                    <Space
                      className="extension text-center"
                      style={{
                        width: '12%',
                      }}
                    >
                      <UploadComponent onUpload={handleUpload}>
                        <div className="upload">
                          <FontAwesomeIcon className="item mr-3 ml-3" size="lg" icon={faPaperclip} />
                        </div>
                      </UploadComponent>
                      <div className="micro">
                        <FontAwesomeIcon className="item mr-3 ml-3" size="lg" icon={faMicrophone} />
                      </div>
                    </Space>
                  </div>
                </>
              )}
            </div>
            {isDisplayShare ? <SharedMedia key={conversationID} conversationId={conversationID} /> : <></>}
          </div>
        )}
      </StyleTotal>
    </ConfigProvider>
  );
};

export default Chat;
