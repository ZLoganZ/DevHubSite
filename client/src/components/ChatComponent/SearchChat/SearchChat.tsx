import React from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../../util/functions/ThemeFunction";
import { Avatar, Badge, ConfigProvider, Input, Space } from "antd";
import StyleTotal from "./cssSearchChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCheckDouble,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { commonColor } from "../../../util/cssVariable/cssVariable";
import { SearchOutlined } from "@ant-design/icons";

const SearchChat = () => {
  const activeArr = [
    {
      id: 1,
      name: "Carter Donin",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfB5xqZHjdPe17hnX2kY7kIY3vftnCavOT8g&usqp=CAU",
      active: true,
    },
    {
      id: 2,
      name: "Sriparno Roy",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE0An4uOQgA1lEWMWTTpQBOlIhSuYT4RYLpw&usqp=CAU",
      active: false,
    },
    {
      id: 3,
      name: "Sarah Smith",
      avatar: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      active: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxxOeOXHNrUgfxDbpJZJCxcDOjTlrBRlH7wA&usqp=CAU",
      active: false,
    },
  ];

  const userChatArray = [
    {
      id: 1,
      name: "Carter Donin",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-NFn1a5QD_qi-HzSeySBUfx5AALewRHYw-g&usqp=CAU",
      active: true,
      lastMessage: "I really like this design!",
      time: "2:30 PM",
      getMessage: true,
      unread: 4,
      userRead: true,
    },
    {
      id: 2,
      name: "Rong",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      active: true,
      lastMessage: "Hello, how are you?",
      time: "9:50 AM",
      getMessage: true,
      unread: 1,
      userRead: true,
    },
    {
      id: 3,
      name: "Sriparno Roy",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMti6Y58F9U28BKZAOQMWDh9auJ5gfJahe5uKYMjr0kSNaXP4MZYkvDomyRUVKOfiPT5g&usqp=CAU",
      active: true,
      lastMessage: "Good night!",
      time: "3:15 PM",
      getMessage: false,
      unread: 2,
      userRead: true,
    },
    {
      id: 4,
      name: "Lena Lee",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijUsFF_9lkZWtXXSK5npYSueYZjA13sfjnQ&usqp=CAU",
      active: true,
      lastMessage: "Oke, see you tomorrow!",
      time: "5:37 PM",
      getMessage: true,
      unread: 0,
      userRead: true,
    },
    {
      id: 5,
      name: "John Doe",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE0An4uOQgA1lEWMWTTpQBOlIhSuYT4RYLpw&usqp=CAU",
      active: true,
      lastMessage: "What is your name?, I'm John Doe",
      time: "2:34 AM",
      getMessage: false,
      unread: 2,
      userRead: false,
    },
    {
      id: 6,
      name: "Mia Thompson",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      active: true,
      lastMessage: "Hello, Can you give me the report for the meeting?",
      time: "11:47 AM",
      getMessage: true,
      unread: 0,
      userRead: true,
    },
    {
      id: 7,
      name: "David Lee",
      avatar: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      active: true,
      lastMessage: "Get the report from the meeting",
      time: "3:50 PM",
      getMessage: false,
      unread: 2,
      userRead: false,
    },
    {
      id: 8,
      name: "Samantha Chen",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE0An4uOQgA1lEWMWTTpQBOlIhSuYT4RYLpw&usqp=CAU",
      active: true,
      lastMessage: "I want to go to the cinema with you",
      time: "3:57 AM",
      getMessage: true,
      unread: 3,
      userRead: true,
    },
  ];

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="searchChat h-screen">
          <Space
            className="myInfo flex items-center py-4 px-3"
            style={{
              borderBottom: "1px solid",
              borderColor: themeColorSet.colorBg4,
              height: "12%",
            }}
          >
            <div className="avatar relative">
              <Avatar
                size={50}
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <span
                className="dot"
                style={{
                  width: "7px",
                  height: "7px",
                  backgroundColor: commonColor.colorGreen1,
                  display: "inline-block",
                  borderRadius: "50%",
                  position: "absolute",
                  right: "0px",
                  bottom: "0px",
                }}
              ></span>
            </div>
            <div className="name_career">
              <div
                className="name mb-1"
                style={{
                  color: themeColorSet.colorText1,
                  fontWeight: 600,
                }}
              >
                Carter Donin
              </div>
              <div
                className="career"
                style={{
                  color: themeColorSet.colorText3,
                }}
              >
                UX/UI Designer
              </div>
            </div>
          </Space>
          <div
            className="searchInput px-3 py-4 w-full flex justify-between items-center"
            style={{
              borderBottom: "1px solid",
              borderColor: themeColorSet.colorBg4,
              height: "11%",
            }}
          >
            <div className="input flex items-center w-full">
              <div
                className="iconSearch mr-2"
                style={{ 
                    color: themeColorSet.colorText3,
                 }}
              >
                <SearchOutlined className="text-2xl" />
              </div>
              <ConfigProvider
                theme={{
                  token: {
                    lineWidth: 0,
                    controlHeight: 40,
                    // borderRadius: 0,
                    colorBgBase: "transparent",
                  },
                }}
              >
                <Input
                  placeholder="Search"
                  className="mr-4"
                  style={{
                    width: "90%",
                  }}
                />
              </ConfigProvider>
            </div>
            <div className="iconPlus">
              <FontAwesomeIcon className="text-xl" icon={faPlus} />
            </div>
          </div>
          <div
            className="userActive px-3 py-4 w-full"
            style={{
              borderBottom: "1px solid",
              borderColor: themeColorSet.colorBg4,
              height: "20%",
            }}
          >
            <div
              className="title"
              style={{
                fontWeight: 600,
              }}
            >
              Active
            </div>
            <div className="listUser flex mt-3">
              {activeArr.map((item, index) => {
                return (
                  <div
                    className="user flex flex-col justify-center items-center mr-4"
                    key={index}
                  >
                    <div className="avatar relative">
                      <Avatar size={40} src={item.avatar} />
                      {item.active && (
                        <span
                          className="dot"
                          style={{
                            width: "7px",
                            height: "7px",
                            backgroundColor: commonColor.colorGreen1,
                            display: "inline-block",
                            borderRadius: "50%",
                            position: "absolute",
                            right: "0px",
                            bottom: "0px",
                          }}
                        ></span>
                      )}
                    </div>
                    <div
                      className="name text-center mt-2"
                      style={{
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.name.length > 10
                        ? item.name.slice(0, 10) + "..."
                        : item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="userChat"
            style={{
              height: "57%",
              overflow: "auto",
            }}
          >
            {userChatArray.map((item, index) => {
              return (
                <div
                  className="userItem flex justify-between items-center py-4 px-3"
                  key={index}
                >
                  <div
                    className="avatar_info flex items-center"
                    style={{
                      width: "70%",
                    }}
                  >
                    <div className="avatar relative">
                      <Avatar size={40} src={item.avatar} />
                      {item.active && (
                        <span
                          className="dot"
                          style={{
                            width: "7px",
                            height: "7px",
                            backgroundColor: commonColor.colorGreen1,
                            display: "inline-block",
                            borderRadius: "50%",
                            position: "absolute",
                            right: "0px",
                            bottom: "0px",
                          }}
                        ></span>
                      )}
                    </div>
                    <div className="info ml-4">
                      <div
                        className="name mb-1"
                        style={{
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        className="lastMessage"
                        style={{
                          color: themeColorSet.colorText3,
                          fontSize: "0.9rem",
                        }}
                      >
                        {!item.getMessage ? (
                          item.lastMessage.length > 20 ? (
                            <>
                              <span
                                style={{
                                  color: themeColorSet.colorText1, 
                                }}
                              >
                                You:{" "}
                              </span>
                              <span>
                                {item.lastMessage.slice(0, 20) + "..."}
                              </span>
                            </>
                          ) : (
                            <>
                              <span
                                style={{
                                  color: themeColorSet.colorText1,
                                }}
                              >
                                You:{" "}
                              </span>
                              <span>{item.lastMessage}</span>
                            </>
                          )
                        ) : item.lastMessage.length > 20 ? (
                          <span>{item.lastMessage.slice(0, 20) + "..."}</span>
                        ) : (
                          <span>{item.lastMessage}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="time_read"
                    style={{
                      width: "22%",
                    }}
                  >
                    <div
                      className="time text-right"
                      style={{
                        color: themeColorSet.colorText3,
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.time}
                    </div>
                    <div className="read text-right">
                      {item.getMessage && item.unread > 0 ? (
                        <span
                          className="numberUnread"
                          style={{
                            color: themeColorSet.colorText1,
                            fontSize: "0.7rem",
                            width: "17px",
                            height: "17px",
                            lineHeight: "17px",
                            backgroundColor: commonColor.colorBlue1,
                            display: "inline-block",
                            textAlign: "center",
                            borderRadius: "50%",
                          }}
                        >
                          {item.unread}
                        </span>
                      ) : item.getMessage && item.unread === 0 ? (
                        ""
                      ) : !item.getMessage && !item.userRead ? (
                        <FontAwesomeIcon
                          className="text-xl"
                          icon={faCheck}
                          style={{
                            color: commonColor.colorGreen1,
                            fontSize: "0.8rem",
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-xl"
                          icon={faCheckDouble}
                          style={{
                            color: commonColor.colorGreen1,
                            fontSize: "0.8rem",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="listUser"></div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default SearchChat;
