import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import { ConfigProvider, Divider, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { FOLLOW_USER_SAGA } from '../../redux/actionSaga/UserActionSaga';
import { commonColor } from '../../util/cssVariable/cssVariable';

const RenderPeopleItem = ({ item }: any) => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [follow, setFollow] = useState(false);

  const dispatch = useDispatch();

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <div>
        <div className="peopleItem flex justify-between items-center mt-5 p-2">
          <div
            className="peopleImage p-3"
            style={{
              width: '10%',
            }}
          >
            <img
              src={item.userImage || './images/DefaultAvatar/default_avatar.png'}
              alt=""
              style={{
                borderRadius: '50%',
              }}
            />
          </div>
          <div
            className="peopleInfo"
            style={{
              width: '75%',
            }}
          >
            <Space className="top mb-2">
              <span
                className="name"
                style={{
                  color: themeColorSet.colorText1,
                  fontSize: '1.2rem',
                  fontWeight: '600',
                }}
              >
                {item.username}
              </span>
              <span
                className="icon"
                style={{
                  color: themeColorSet.colorText3,
                }}
              >
                {item.verified ? (
                  <CheckCircleOutlined
                    style={{
                      color: commonColor.colorBlue1,
                      fontSize: '1rem',
                    }}
                  />
                ) : (
                  ''
                )}
              </span>
              <span
                className="alias"
                style={{
                  color: themeColorSet.colorText3,
                }}
              >
                {item._id}
              </span>
            </Space>
            <div
              className="bottom"
              style={{
                color: themeColorSet.colorText3,
                fontSize: '0.9rem',
              }}
            >
              {item.description?.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
            </div>
          </div>
          <div
            className="followBtn text-center"
            style={{
              width: '10%',
            }}
          >
            <button
              className="btnFollow px-4 py-2"
              onClick={() => {
                setFollow(!follow);
                dispatch(FOLLOW_USER_SAGA(item._id));
              }}
            >
              {!follow ? 'Follow' : 'Following'}
            </button>
          </div>
        </div>
        <Divider
          style={{
            height: '2px',
            backgroundColor: themeColorSet.colorBg2,
          }}
        />
      </div>
    </ConfigProvider>
  );
};

export default RenderPeopleItem;
