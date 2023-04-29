import { ConfigProvider } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssSelectInterest";

const SelectInterest = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const techArray = [
    { id: 1, name: "Java" },
    { id: 2, name: "Back End" },
    { id: 3, name: "Data Analytics" },
    { id: 4, name: "Front End" },
    { id: 5, name: "Full Stack" },
    { id: 6, name: "DevOps" },
    { id: 7, name: "Project Management" },
    { id: 8, name: "Design" },
    { id: 9, name: "Data Engineer" },
    { id: 10, name: "Problem Solver" },
    { id: 11, name: "App Design" },
    { id: 12, name: "BlockChain" },
    { id: 13, name: "Open Source" },
    { id: 14, name: "Security" },
    { id: 15, name: "PHP" },
    { id: 16, name: "Operating System" },
    { id: 17, name: "Mobile App Development" },
    { id: 18, name: "DAS" },
    { id: 19, name: "Machine Learning" },
    { id: 20, name: "Git" },
  ];

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
                Step 03:
              </span>
              <span style={{ color: themeColorSet.colorText3 }}>
                Select interest
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
            </div>
            <div
              className="textMax mt-4"
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
              }}
            >
              Select your interest
            </div>
            <div
              className="textMin mt-5"
              style={{
                fontSize: "1rem",
                color: themeColorSet.colorText3,
              }}
            >
              Choose at least 5 interest to get started
            </div>
            <div className="interest mt-7">
              <div className="flex flex-wrap">
                {techArray.map((item) => (
                  <div
                    className="interestItem px-4 py-2 mr-2 mb-3"
                    onClick={(e) => {
                      if (e.currentTarget.classList.contains("active")) {
                        e.currentTarget.classList.remove("active");
                        return;
                      } else {
                        e.currentTarget.classList.add("active");
                        return;
                      }
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
            <NavLink to="/select-community">
              <button className="btnNext absolute px-4 py-2">Next</button>
            </NavLink>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default SelectInterest;
