import { Avatar, ConfigProvider, Input, Popover, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEllipsis,
  faFaceSmile,
  faMicrophone,
  faPaperclip,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import dataEmoji from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import {
  BellOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import SearchChat from "../../components/ChatComponent/SearchChat/SearchChat";
import { commonColor } from "../../util/cssVariable/cssVariable";

const Chat = () => {
  const messageArr = [
    {
      id: 1,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Hello Bao, I am Kien",
    },
    {
      id: 2,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Hello Kien, How are you?",
    },
    {
      id: 3,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",

      text: "I'm doing well, thanks for asking. How about you?",
    },
    {
      id: 4,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "I'm good too, thanks. What brings you here today?",
    },
    {
      id: 5,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "I wanted to discuss the software report that we have been working on.",
    },
    {
      id: 6,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Ah, yes. I remember. What would you like to know?",
    },
    {
      id: 7,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "I was wondering if you could give me an update on the progress of the report?I was wondering if you could give me an update on the progress of the report?",
    },
    {
      id: 8,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Sure, we are making good progress. We should have the first draft ready by the end of the week.",
    },
    {
      id: 9,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "That's great news. Do you need any help with anything?",
    },
    {
      id: 10,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Actually, yes. I could use some help with data analysis. Would you be interested in helping out?",
    },
    {
      id: 11,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Sure, I'd be happy to help. Just let me know what you need.",
    },
    {
      id: 12,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Thanks, I'll send over the data later today. Is that okay with you?",
    },
    {
      id: 13,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "That's fine. I'll take a look as soon as I receive it.",
    },
    {
      id: 14,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Great. Thanks for your help, Kien.",
    },
    {
      id: 15,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "No problem, Bao. We're a team, and I'm happy to help out.",
    },
    {
      id: 16,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "I appreciate that. We'll make sure to get this report done on time.",
    },
    {
      id: 17,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Definitely. I'm looking forward to seeing the final product.",
    },
    {
      id: 18,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Me too. I'll talk to you later.",
    },
    {
      id: 19,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Me too. I think it will be a great addition to our portfolio.",
    },
    {
      id: 20,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Agreed. Let's keep up the good work and get it done.",
    },
    {
      id: 21,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "By the way, have you had a chance to look at the feedback from the beta testers?",
    },
    {
      id: 22,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Not yet. I've been busy with other projects. What did they say?",
    },
    {
      id: 23,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Overall, they are happy with the software, but there are a few bugs that need to be fixed.",
    },
    {
      id: 24,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Okay. I can take a look at those bugs and see what we can do to fix them.",
    },
    {
      id: 25,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "That would be great. We want to make sure the software is as bug-free as possible before release.",
    },
    {
      id: 26,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Definitely. I'll get started on that right away.",
    },
    {
      id: 27,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Thanks, Kien. I appreciate your help.",
    },
    {
      id: 28,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "No problem, Bao. That's what I'm here for.",
    },
    {
      id: 29,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Let's touch base again next week and see where we're at with the report and the software bugs.",
    },
  ];

  const sharedMediaArr = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/58/bd/4f/58bd4fc9ebfccc1f2de419529bbf1a12.jpg",
    },
    {
      id: 2,
      image: "https://mcdn.wallpapersafari.com/medium/16/69/rcj6Cz.jpg",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1614640384477-93219e3554a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: 5,
      image:
        "https://c8.alamy.com/comp/E730KJ/beautiful-maple-with-nice-background-for-adv-or-others-purpose-use-E730KJ.jpg",
    },
  ];

  const sharedFileArr = [
    {
      id: 1,
      name: "UARM.sketch",
      dateUpload: "04.20.21",
      size: "200MB",
      image: "/images/ChatPage/sketch.png",
    },
    {
      id: 2,
      name: "pathlock.sketch",
      dateUpload: "04.20.21",
      size: "100MB",
      image: "/images/ChatPage/sketch.png",
    },
    {
      id: 3,
      name: "pathlock_brandbook.pdf",
      dateUpload: "04.20.21",
      size: "20MB",
      image: "/images/ChatPage/pdf.png",
    },
  ];

  const sharedLinkArr = [
    {
      id: 1,
      name: "Banking UI kit. Dark Mode",
      link: "https://dribbble.com/shots/15473759-Banking-UI-kit-Dark-Mode",
      image:
        "https://cdn.dribbble.com/userupload/3266083/file/original-a5c1d162dc560491d47db23d39651f9c.png?compress=1&resize=1200x900",
    },
    {
      id: 2,
      name: "Credit Cards Experiment",
      link: "https://dribbble.com/shots/15473759-Banking-UI-kit-Dark-Mode",
      image:
        "https://cdn.dribbble.com/userupload/3187759/file/original-f4b18dbdf082fbde9dcd6fa11d36c68c.png?compress=1&resize=640x480&vertical=center",
    },
    {
      id: 3,
      name: "The Batman - DC FanDome Teaser",
      link: "https://youtube.com/watch?v=8W6x6Yi5x6c",
      image:
        "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/1_31.jpg",
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
        <div className="chat flex">
          <div
            className="slider flex flex-col justify-between items-center h-screen py-3"
            style={{
              width: "5%",
              borderRight: "1px solid",
              borderColor: themeColorSet.colorBg4,
              position: "fixed",
              backgroundColor: themeColorSet.colorBg1,
            }}
          >
            <div className="logo">
              <NavLink to="/timeline" className="icon_logo">
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
              marginLeft: "5%",
              width: "23%",
              height: "100vh",
              position: "fixed",
              borderRight: "1px solid",
              borderColor: themeColorSet.colorBg4,
            }}
          >
            <SearchChat />
          </div>
          <div
            className="chatBox"
            style={{
              width: "49%",
              marginLeft: "28%",
              height: "100vh",
              position: "fixed",
              backgroundColor: themeColorSet.colorBg1,
              borderRight: "1px solid",
              borderColor: themeColorSet.colorBg4,
            }}
          >
            <div
              className="header flex justify-between items-center py-4 px-3"
              style={{
                height: "12%",
                borderBottom: "1px solid",
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <Space className="myInfo flex items-center py-4 px-3">
                <div className="avatar relative">
                  <Avatar
                    size={50}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU"
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
                    Product Manager
                  </div>
                </div>
              </Space>
              <Space className="extension">
                <div
                  className="searchContent mr-2"
                  style={{ color: themeColorSet.colorText3 }}
                >
                  <SearchOutlined className="text-2xl" />
                </div>
                <div className="moreOption">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faEllipsis}
                    size="xl"
                  />
                </div>
              </Space>
            </div>
            <div
              className="body px-3"
              style={{
                height: "80%",
                overflow: "auto",
              }}
            >
              <div className="chatContent">
                {messageArr.map((item: any, index: any) => {
                  return !item.me ? (
                    <div
                      className="message flex items-center my-8 w-2/3"
                      key={index}
                    >
                      <div className="avatar mr-3">
                        <Avatar
                          size={40}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU"
                        />
                      </div>
                      <div className="text">{item.text}</div>
                    </div>
                  ) : (
                    <div className="message my-8 pl-60 flex justify-end">
                      <div
                        className="text px-4 py-2"
                        style={{
                          backgroundColor: commonColor.colorBlue3,
                          borderRadius: "30px",
                        }}
                      >
                        {item.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="footer flex justify-between items-center"
              style={{
                height: "8%",
              }}
            >
              <div
                className="iconEmoji"
                style={{
                  width: "5%",
                }}
              >
                <Popover
                  placement="top"
                  trigger="click"
                  title={"Emoji"}
                  content={
                    <Picker
                      data={dataEmoji}
                      onEmojiSelect={(emoji: any) => {}}
                    />
                  }
                >
                  <span className="emoji">
                    <FontAwesomeIcon
                      className="item mr-3 ml-3"
                      size="lg"
                      icon={faFaceSmile}
                    />
                  </span>
                </Popover>
              </div>
              <div
                className="input"
                style={{
                  width: "78%",
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
                  <Input placeholder="Write a message" />
                </ConfigProvider>
              </div>
              <Space
                className="extension text-center"
                style={{
                  width: "12%",
                }}
              >
                <div className="upload">
                  <FontAwesomeIcon
                    className="item mr-3 ml-3"
                    size="lg"
                    icon={faPaperclip}
                  />
                </div>
                <div className="micro">
                  <FontAwesomeIcon
                    className="item mr-3 ml-3"
                    size="lg"
                    icon={faMicrophone}
                  />
                </div>
              </Space>
            </div>
          </div>
          <div
            className="shared"
            style={{
              width: "23%",
              height: "100vh",
              marginLeft: "77%",
              position: "fixed",
              backgroundColor: themeColorSet.colorBg1,
            }}
          >
            <div
              className="extension px-3 flex items-center"
              style={{
                height: "12%",
                borderBottom: "1px solid",
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <div className="flex justify-center items-center w-full">
                <div
                  className="setting text-center"
                  style={{
                    width: "25%",
                  }}
                >
                  <SettingOutlined
                    className="extensionItem"
                    style={{
                      fontSize: "1.5rem",
                    }}
                  />
                </div>
                <div
                  className="notification text-center"
                  style={{
                    width: "25%",
                  }}
                >
                  <BellOutlined
                    className="extensionItem"
                    style={{
                      fontSize: "1.5rem",
                    }}
                  />
                </div>
                <div
                  className="warning text-center"
                  style={{
                    width: "25%",
                  }}
                >
                  <ExclamationCircleOutlined
                    className="extensionItem"
                    style={{
                      fontSize: "1.5rem",
                    }}
                  />
                </div>
                <div
                  className="logout text-center"
                  style={{
                    width: "25%",
                  }}
                >
                  <LogoutOutlined
                    className="extensionItem"
                    style={{
                      fontSize: "1.5rem",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="fileShare px-3 py-4">
              <div className="sharedMedia">
                <div className="flex justify-between items-center mb-2">
                  <div className="titleContent font-bold">Shared Media</div>
                  <div
                    className="seeAll"
                    style={{
                      color: themeColorSet.colorText3,
                      fontSize: "0.8rem",
                      textDecoration: "underline",
                    }}
                  >
                    See All
                  </div>
                </div>
                <div className="content flex justify-between items-center">
                  {sharedMediaArr.map((item: any, index: any) => {
                    return (
                      <div
                        className="imageContent p-2"
                        key={index}
                        style={{
                          width: "20%",
                        }}
                      >
                        <img
                          className="w-full h-full"
                          src={item.image}
                          alt=""
                          style={{
                            height: "4rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="sharedFile mt-5">
                <div className="flex justify-between items-center mb-3">
                  <div className="titleContent font-bold">Shared Files</div>
                  <div
                    className="seeAll"
                    style={{
                      color: themeColorSet.colorText3,
                      fontSize: "0.8rem",
                      textDecoration: "underline",
                    }}
                  >
                    See All
                  </div>
                </div>
                <div className="content">
                  {sharedFileArr.map((item: any, index: any) => {
                    return (
                      <div className="fileContent flex justify-between items-center mb-2 cursor-pointer">
                        <div className="left flex justify-between items-center">
                          <div
                            className="image px-3 py-3 mr-2"
                            style={{
                              border: "1px solid",
                              borderColor: themeColorSet.colorBg4,
                              borderRadius: "10px",
                            }}
                          >
                            <img
                              src={item.image}
                              alt="file"
                              style={{
                                width: "1.8rem",
                                height: "1.8rem",
                              }}
                            />
                          </div>
                          <Space className="info" direction="vertical">
                            <div
                              className="name"
                              style={{
                                color: themeColorSet.colorText1,
                                fontWeight: "600",
                              }}
                            >
                              {item.name}
                            </div>
                            <Space
                              style={{
                                color: themeColorSet.colorText3,
                              }}
                            >
                              <div className="date">{item.dateUpload}</div>
                              <div className="dot">•</div>
                              <div className="size">{item.size}</div>
                            </Space>
                          </Space>
                        </div>
                        <div className="right">
                          <FontAwesomeIcon icon={faDownload} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="sharedLink mt-5">
                <div className="flex justify-between items-center mb-2">
                  <div className="titleContent font-bold">Shared Links</div>
                  <div
                    className="seeAll"
                    style={{
                      color: themeColorSet.colorText3,
                      fontSize: "0.8rem",
                      textDecoration: "underline",
                    }}
                  >
                    See All
                  </div>
                </div>
                <div className="content">
                  {sharedLinkArr.map((item: any, index: any) => {
                    return (
                      <div className="fileContent flex items-center mb-2 cursor-pointer">
                        <div
                          className="image mr-2"
                          style={{
                            width: "3.5rem",
                          }}
                        >
                          <img
                            src={item.image}
                            alt="link"
                            style={{
                              height: "3.5rem",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <Space className="link" direction="vertical">
                          <div
                            className="name"
                            style={{
                              color: themeColorSet.colorText1,
                              fontWeight: "600",
                            }}
                          >
                            {item.name}
                          </div>
                          <div
                            className="linkContent"
                            style={{
                              color: themeColorSet.colorText3,
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.link?.length > 35
                              ? item.link?.slice(0, 35) + "..."
                              : item.link}
                          </div>
                        </Space>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default Chat;
