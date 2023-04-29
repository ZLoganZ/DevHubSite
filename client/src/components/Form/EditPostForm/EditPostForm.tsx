import {
  Avatar,
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  Popover,
  Upload,
} from "antd";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTheme } from "../../../util/functions/ThemeFunction";
import StyleTotal from "./cssEditPostForm";
import ImageCompress from "quill-image-compress";
import dataEmoji from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { TOKEN } from "../../../util/constants/SettingSystem";
import { UPDATE_POST_SAGA } from "../../../redux/actionSaga/PostActionSaga";
import { UploadOutlined } from "@ant-design/icons";
import { callBackSubmitDrawer } from "../../../redux/Slice/DrawerHOCSlice";
Quill.register("modules/imageCompress", ImageCompress);

var toolbarOptions = [
  ["bold", "italic", "underline", "clean"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "image"],
];

interface PostProps {
  id: any;
  title: any;
  content: any;
}

const EditPostForm = (PostProps: any) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // Formik
  const formik = useFormik({
    initialValues: {
      title: PostProps.title,
      content: PostProps.content,
      linkImage: null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (quill.root.innerHTML === "<p><br></p>") {
        error();
      } else {
        dispatch(
          UPDATE_POST_SAGA({
            id: PostProps.id,
            postUpdate: values,
          })
        );
      }
    },
  });

  // Quill Editor
  let [quill, setQuill]: any = useState(null);

  useEffect(() => {
    // Tạo quill
    quill = new Quill("#editorDrawer", {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
      scrollingContainer: "#scrolling-container",
    });
    quill.on("text-change", function () {
      handleQuillChange();
    });

    // Dispatch callback submit lên cho DrawerHOC
    dispatch(callBackSubmitDrawer(formik.handleSubmit));
  }, []);

  useEffect(() => {
    // Hiển thị nội dung trong quill
    quill.root.innerHTML = PostProps.content;
    setQuill(quill);
    // Hiển thị lại title khi PostProps.title thay đổi
    formik.setFieldValue("title", PostProps.title);
  }, [PostProps, quill]);

  const handleQuillChange = () => {
    const text = quill.root.innerHTML;
    formik.setFieldValue("content", text);
  };

  // Hàm hiển thị mesage
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Please enter the content",
    });
  };

  const [file, setFile]: any = useState([]);
  const handleUpload = (info: any) => {
    setFile(info.fileList[0].originFileObj);
    formik.setFieldValue("linkImage", info.fileList[0].originFileObj);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          ...themeColor,
          controlHeight: 40,
          borderRadius: 0,
          lineWidth: 0,
        },
      }}
    >
      {contextHolder}
      <StyleTotal theme={themeColorSet} className="rounded-lg mb-4">
        <div className="newPost px-4 py-3">
          <div className="newPostBody">
            <div className="AddTitle mt-4 z-10">
              <Input
                name="title"
                placeholder="Add a Title"
                allowClear
                value={formik.values.title}
                style={{ borderColor: themeColorSet.colorText3 }}
                maxLength={150}
                onChange={formik.handleChange}
              ></Input>
            </div>
            <div className="AddContent mt-4">
              <div id="editorDrawer" />
            </div>
          </div>
          <div className="newPostFooter mt-3 flex justify-between items-center">
            <div className="newPostFooter__left">
              <Popover
                placement="top"
                trigger="click"
                title={"Members"}
                content={
                  <Picker
                    data={dataEmoji}
                    onEmojiSelect={(emoji: any) => {
                      quill.focus();
                      quill.insertText(
                        quill.getSelection().index,
                        emoji.native
                      );
                    }}
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
              <span className="code">
                <FontAwesomeIcon className="item" size="lg" icon={faCode} />
              </span>
              <span>
                <Upload listType="picture" onChange={handleUpload}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </span>
            </div>
            {/* <div className="newPostFooter__right">
            </div> */}
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default EditPostForm;
