import { ConfigProvider } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssDrawerHOC';
import { Button, Drawer, Space } from 'antd';
import { closeDrawer } from '../../redux/Slice/DrawerHOCSlice';
import { commonColor } from '../../util/cssVariable/cssVariable';

const DrawerHOC = () => {
  const dispatch = useDispatch();
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // Hàm xử lý Drawer
  const { visible, ComponentContentDrawer, callBackSubmit, title, loading } = useSelector(
    (state: any) => state.drawerHOCReducer,
  );

  const onClose = () => {
    dispatch(closeDrawer({}));
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div>
          <Drawer
            title={title}
            width={720}
            onClose={onClose}
            open={visible}
            footer={
              <div style={{ textAlign: 'right' }}>
                <Space>
                  <Button
                    className="btnCancelDrawer"
                    style={{
                      borderColor: themeColorSet.colorText1,
                      color: themeColorSet.colorText1,
                    }}
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                  style={{backgroundColor: commonColor.colorBlue2, color: commonColor.colorWhile1}}
                  className="btnSubmitDrawer"
                    onClick={() => {
                      callBackSubmit();
                    }}
                    loading={loading}
                  >
                    Submit
                  </Button>
                </Space>
              </div>
            }
          >
            {ComponentContentDrawer}
          </Drawer>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default DrawerHOC;
