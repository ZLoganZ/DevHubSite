import { CommentOutlined } from "@ant-design/icons";
import { faBriefcase, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, ConfigProvider, Radio, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssGetStarted";

const GetStarted = () => {
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
        <div className="flex justify-center w-full h-full getStarted ">
          <div className="content w-1/2 pt-10 h-full relative">
            <div>
              <span
                className="mr-3"
                style={{ color: themeColorSet.colorText2 }}
              >
                Step 02:
              </span>
              <span style={{ color: themeColorSet.colorText3 }}>
                Get started
              </span>
            </div>
            <div className="slide w-full flex justify-between mt-2 ">
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorGreen1,
                  display: "inline-block",
                }}
              ></span>
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorBlue1,
                  display: "inline-block",
                }}
              ></span>
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorGreen1,
                  display: "inline-block",
                }}
              ></span>
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorGreen1,
                  display: "inline-block",
                }}
              ></span>
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorGreen1,
                  display: "inline-block",
                }}
              ></span>
            </div>
            <div
              className="text mt-4"
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
              }}
            >
              How would you like to get started?
            </div>
            <div className="option mt-5">
              <Radio.Group className="w-full">
                <div
                  className="optionItem h-32 flex items-center pl-5 mb-3"
                  style={{
                    backgroundColor: themeColorSet.colorBg2,
                  }}
                >
                  <Space className="content" size={15}>
                    <span className="redioButton">
                      <ConfigProvider
                        theme={{
                          token: {
                            // đổi màu viền của radio button
                            colorBorder: themeColorSet.colorBg3,
                          },
                        }}
                      >
                        <Radio value={1} />
                      </ConfigProvider>
                    </span>
                    <span className="icon">
                      <Avatar
                        className="messageButton"
                        shape="circle"
                        style={{ backgroundColor: themeColorSet.colorBg1 }}
                        icon={
                          <FontAwesomeIcon
                            icon={faPeopleGroup}
                            color={commonColor.colorBlue1}
                          />
                        }
                        size={45}
                      />
                    </span>
                    <span className="contentText">
                      <div className="top">
                        Connect with developers and the community
                      </div>
                      <div className="bottom">I'm looking for work</div>
                    </span>
                  </Space>
                </div>
                <div
                  className="optionItem h-32 flex items-center pl-5 mb-3"
                  style={{
                    backgroundColor: themeColorSet.colorBg2,
                  }}
                >
                  <Space className="content" size={15}>
                    <span className="redioButton">
                      <ConfigProvider
                        theme={{
                          token: {
                            // đổi màu viền của radio button
                            colorBorder: themeColorSet.colorBg3,
                          },
                        }}
                      >
                        <Radio value={2} />
                      </ConfigProvider>
                    </span>
                    <span className="icon">
                      <Avatar
                        className="messageButton"
                        style={{ backgroundColor: themeColorSet.colorBg1 }}
                        shape="circle"
                        icon={
                          <FontAwesomeIcon
                            icon={faBriefcase}
                            color={commonColor.colorGreen1}
                          />
                        }
                        size={45}
                      />
                    </span>
                    <span className="contentText">
                      <div className="top">
                        Connect with developers and the community
                      </div>
                      <div className="bottom">I'm looking for work</div>
                    </span>
                  </Space>
                </div>
              </Radio.Group>
            </div>
            <NavLink to="/select-interest">
              <button className="btnNext absolute px-4 py-2">Next</button>
            </NavLink>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default GetStarted;
