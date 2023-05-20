import { ConfigProvider } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StyleTotal from './cssModalHOC';
import { getTheme } from '../../util/functions/ThemeFunction';
import { Button, Modal, Space } from 'antd';
import { closeModal } from '../../redux/Slice/ModalHOCSlice';
import { commonColor } from '../../util/cssVariable/cssVariable';

const ModalHOC = () => {
  const dispatch = useDispatch();
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // Hàm xử lý Modal
  const { visible, ComponentContentModal, footer, title, handleSubmit } = useSelector(
    (state: any) => state.modalHOCReducer,
  );

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div>
          <Modal
            centered
            title={title}
            width={720}
            onCancel={onClose}
            open={visible}
            footer={
              footer === true ? (
                <>
                  <button
                    className="btnCancel px-4 py-2 mr-2"
                    style={{
                      border: '1px solid',
                      borderColor: themeColorSet.colorText2,
                    }}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btnAccept px-4 py-2"
                    style={{
                      backgroundColor: commonColor.colorBlue2,
                      color: themeColorSet.colorText1,
                    }}
                    onClick={() => {
                      handleSubmit();
                      onClose();
                    }}
                  >
                    Update
                  </button>
                </>
              ) : (
                footer
              )
            }
            onOk={handleSubmit}
          >
            {ComponentContentModal}
          </Modal>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default ModalHOC;
