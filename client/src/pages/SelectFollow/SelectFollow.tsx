import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfigProvider, Space } from "antd";
import { Divider } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssSelectFollow";

const SelectFollow = () => {
  const peopleArray = [
    {
      id: 1,
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Rong",
      alias: "@tianrongliew",
      description: "Traines Coder. Untrained Invertos. CEO @ShowwcaseHQ",
      tick: true,
    },
    {
      id: 2,
      image: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      name: "Sriparno Roy",
      alias: "@sriparno01465",
      description: "WorsPress | PHP | Youtuber",
      tick: false,
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijUsFF_9lkZWtXXSK5npYSueYZjA13sfjnQ&usqp=CAU",
      name: "Lena Lee",
      alias: "@lenalee123",
      description: "Full-stack developer. Coffee enthusiast. Codepen addict.",
      tick: false,
    },
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMti6Y58F9U28BKZAOQMWDh9auJ5gfJahe5uKYMjr0kSNaXP4MZYkvDomyRUVKOfiPT5g&usqp=CAU",
      name: "Sarah Smith",
      alias: "@sarahcodes",
      description: "Frontend developer. Lover of dogs and all things tech.",
      tick: true,
    },
    {
      id: 5,
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "John Doe",
      alias: "@johndoe87",
      description: "Software engineer. Amateur chef. Occasional gamer.",
      tick: false,
    },
    {
      id: 6,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      name: "Mia Thompson",
      alias: "@miathomp",
      description:
        "UX designer. Passionate about creating beautiful and intuitive interfaces.",
      tick: true,
    },
    {
      id: 7,
      image: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      name: "David Lee",
      alias: "@davidlee123",
      description: "Backend developer. Proud owner of two cats.",
      tick: false,
    },
    {
      id: 8,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE0An4uOQgA1lEWMWTTpQBOlIhSuYT4RYLpw&usqp=CAU",
      name: "Samantha Chen",
      alias: "@samanthachen",
      description: "Product manager. Loves hiking and exploring new places.",
      tick: true,
    },
    {
      id: 9,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-NFn1a5QD_qi-HzSeySBUfx5AALewRHYw-g&usqp=CAU",
      name: "Michael Brown",
      alias: "@michaelb",
      description:
        "Data scientist. Enjoys reading and playing basketball in his free time.",
      tick: false,
    },
    {
      id: 10,
      image: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      name: "Jennifer Kim",
      alias: "@jennyk",
      description: "Frontend developer. Foodie and travel enthusiast.",
      tick: true,
    },
    {
      id: 11,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMti6Y58F9U28BKZAOQMWDh9auJ5gfJahe5uKYMjr0kSNaXP4MZYkvDomyRUVKOfiPT5g&usqp=CAU",
      name: "Alex Rodriguez",
      alias: "@arod",
      description:
        "Software engineer. Passionate about music and playing the guitar.",
      tick: false,
    },
    {
      id: 12,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-NFn1a5QD_qi-HzSeySBUfx5AALewRHYw-g&usqp=CAU",
      name: "Emily Davis",
      alias: "@emilydavis",
      description:
        "UX designer. Coffee addict and lover of all things creative.",
      tick: true,
    },
    {
      id: 13,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijUsFF_9lkZWtXXSK5npYSueYZjA13sfjnQ&usqp=CAU",
      name: "Robert Johnson",
      alias: "@robertj",
      description:
        "Full-stack developer. Enjoys playing video games and watching movies.",
      tick: false,
    },
    {
      id: 14,
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Jessica Lee",
      alias: "@jessicalee",
      description:
        "Product manager. Loves photography and exploring new cultures.",
      tick: true,
    },
    {
      id: 15,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      name: "Brian Kim",
      alias: "@briankim",
      description:
        "Software engineer. Enjoys playing soccer and trying out new restaurants.",
      tick: false,
    },
    {
      id: 16,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxxOeOXHNrUgfxDbpJZJCxcDOjTlrBRlH7wA&usqp=CAU",
      name: "Lena Lee",
      alias: "@lenalee123",
      description: "Full-stack developer. Coffee enthusiast. Codepen addict.",
      tick: false,
    },
    {
      id: 17,
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Sarah Smith",
      alias: "@sarahcodes",
      description: "Frontend developer. Lover of dogs and all things tech.",
      tick: true,
    },
    {
      id: 18,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfB5xqZHjdPe17hnX2kY7kIY3vftnCavOT8g&usqp=CAU",
      name: "John Doe",
      alias: "@johndoe87",
      description: "Software engineer. Amateur chef. Occasional gamer.",
      tick: false,
    },
    {
      id: 19,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE0An4uOQgA1lEWMWTTpQBOlIhSuYT4RYLpw&usqp=CAU",
      name: "Mia Thompson",
      alias: "@miathomp",
      description:
        "UX designer. Passionate about creating beautiful and intuitive interfaces.",
      tick: true,
    },
    {
      id: 20,
      image: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      name: "David Lee",
      alias: "@davidlee123",
      description: "Backend developer. Proud owner of two cats.",
      tick: false,
    },
    {
      id: 21,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxxOeOXHNrUgfxDbpJZJCxcDOjTlrBRlH7wA&usqp=CAU",
      name: "Samantha Chen",
      alias: "@samanthachen",
      description: "Product manager. Loves hiking and exploring new places.",
      tick: true,
    },
    {
      id: 22,
      image: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      name: "Michael Brown",
      alias: "@michaelb",
      description:
        "Data scientist. Enjoys reading and playing basketball in his free time.",
      tick: false,
    },
    {
      id: 23,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMti6Y58F9U28BKZAOQMWDh9auJ5gfJahe5uKYMjr0kSNaXP4MZYkvDomyRUVKOfiPT5g&usqp=CAU",
      name: "Jennifer Kim",
      alias: "@jennyk",
      description: "Frontend developer. Foodie and travel enthusiast.",
      tick: true,
    },
    {
      id: 24,
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Alex Rodriguez",
      alias: "@arod",
      description:
        "Software engineer. Passionate about music and playing the guitar.",
      tick: false,
    },
    {
      id: 25,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfB5xqZHjdPe17hnX2kY7kIY3vftnCavOT8g&usqp=CAU",
      name: "Emily Davis",
      alias: "@emilydavis",
      description:
        "UX designer. Coffee addict and lover of all things creative.",
      tick: true,
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
        <div className="flex justify-center w-full h-full selectInterest">
          <div className="content w-1/2 pt-10 h-full relative">
            <div>
              <span
                className="mr-3"
                style={{ color: themeColorSet.colorText2 }}
              >
                Step 05:
              </span>
              <span style={{ color: themeColorSet.colorText3 }}>
                Follow people
              </span>
            </div>
            <div className="slide w-full flex justify-between mt-2">
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
            </div>
            <div
              className="textMax mt-4"
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
              }}
            >
              Here are some people with similar interests
            </div>
            <div className="people mt-10">
              {peopleArray.map((item, index) => {
                return (
                  <div>
                    <div
                      className="peopleItem flex justify-between items-center mt-5 p-2"
                      key={index}
                    >
                      <div
                        className="peopleImage p-3"
                        style={{
                          width: "10%",
                        }}
                      >
                        <img
                          src={item.image}
                          alt=""
                          style={{
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div
                        className="peopleInfo"
                        style={{
                          width: "75%",
                        }}
                      >
                        <Space className="top mb-2">
                          <span
                            className="name"
                            style={{
                              color: themeColorSet.colorText1,
                              fontSize: "1.2rem",
                              fontWeight: "600",
                            }}
                          >
                            {item.name}
                          </span>
                          <span
                            className="icon"
                            style={{
                              color: themeColorSet.colorText3,
                            }}
                          >
                            {item.tick ? (
                              <CheckCircleOutlined
                                style={{
                                  color: commonColor.colorBlue1,
                                  fontSize: "1rem",
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </span>
                          <span
                            className="alias"
                            style={{
                              color: themeColorSet.colorText3,
                            }}
                          >
                            {item.alias}
                          </span>
                        </Space>
                        <div
                          className="bottom"
                          style={{
                            color: themeColorSet.colorText3,
                            fontSize: "0.9rem",
                          }}
                        >
                          {item.description.length > 100
                            ? item.description.slice(0, 100) + "..."
                            : item.description}
                        </div>
                      </div>
                      <div
                        className="followBtn text-center"
                        style={{
                          width: "10%",
                        }}
                      >
                        <button className="btnFollow px-4 py-2">Follow</button>
                      </div>
                    </div>
                    <Divider
                      style={{
                        height: "2px",
                        backgroundColor: themeColorSet.colorBg2,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="button mt-16 mr-2 mb-10 text-right">
              <NavLink to="/timeline">
                <button className="btnDone px-4 py-2">Done</button>
              </NavLink>
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default SelectFollow;
