import { Avatar, Button, ConfigProvider, Divider, Form, Input, message, Popover, Upload } from 'antd';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssNewPost';
import ImageCompress from 'quill-image-compress';
import dataEmoji from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import { TOKEN } from '../../util/constants/SettingSystem';
import { CREATE_POST_SAGA } from '../../redux/actionSaga/PostActionSaga';
import { UploadOutlined } from '@ant-design/icons';
Quill.register('modules/imageCompress', ImageCompress);

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'clean'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'image'],
];

interface Props {
  userInfo: any;
}

const NewPost = (Props: Props) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // Quill Editor
  let [quill, setQuill]: any = useState(null);

  useEffect(() => {
    quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow',
    });
    quill.on('text-change', function () {
      handleQuillChange();
    });
    setQuill(quill);
  }, []);

  const handleQuillChange = () => {
    const text = quill.root.innerHTML;
    formik.setFieldValue('content', text);
  };

  // Hàm hiển thị mesage
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Please enter the content',
    });
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      linkImage: null,
    },
    onSubmit: (values) => {
      if (quill.root.innerHTML === '<p><br></p>') {
        error();
      } else {
        dispatch(
          CREATE_POST_SAGA({
            postCreate: values,
          }),
        );
        quill.root.innerHTML = '<p><br></p>';
      }
    },
  });

  const [file, setFile]: any = useState([]);
  const handleUpload = (info: any) => {
    setFile(info.fileList[0].originFileObj);
    formik.setFieldValue('linkImage', info.fileList[0].originFileObj);
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
          <div className="newPostHeader text-center text-2xl font-bold" style={{ color: themeColorSet.colorText1 }}>
            Create Post
          </div>
          <div className="newPostBody">
            <div className="name_avatar flex items-center">
              <Avatar
                size={50}
                src={
                  Props.userInfo?.userImage ? Props.userInfo?.userImage : './images/DefaultAvatar/default_avatar.png'
                }
              />
              <div className="name font-bold ml-2">
                <NavLink to={`/${Props.userInfo.id}`}>{Props.userInfo.username}</NavLink>
              </div>
            </div>
            <div className="AddTitle mt-4 z-10">
              <Form.Item name="title">
                <Input
                  placeholder="Add a Title"
                  allowClear
                  style={{ borderColor: themeColorSet.colorText3 }}
                  maxLength={150}
                  onChange={formik.handleChange}
                ></Input>
              </Form.Item>
            </div>
            <div className="AddContent mt-4">
              <div id="editor" />
            </div>
          </div>
          <div className="newPostFooter mt-3 flex justify-between items-center">
            <div className="newPostFooter__left">
              <Popover
                placement="top"
                trigger="click"
                title={'Emoji'}
                content={
                  <Picker
                    data={dataEmoji}
                    onEmojiSelect={(emoji: any) => {
                      quill.focus();
                      quill.insertText(quill.getSelection().index, emoji.native);
                    }}
                  />
                }
              >
                <span className="emoji">
                  <FontAwesomeIcon className="item mr-3 ml-3" size="lg" icon={faFaceSmile} />
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
            <div className="newPostFooter__right">
              <button
                type="submit"
                className="createButton w-full font-bold px-4 py-2"
                style={{ color: themeColorSet.colorText1 }}
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default NewPost;
