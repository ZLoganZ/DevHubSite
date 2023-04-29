import React from "react";
import { useFormik } from "formik";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Form } from "antd";
import ConfigProvider from "antd/es/config-provider";
import Input from "antd/es/input";

import StyleTotal from "./cssRegister";
import { useDispatch } from "react-redux";
import { REGIS_USER_SAGA } from "../../redux/actionSaga/UserActionSaga";

const Register = () => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm: "",
    },
    onSubmit: (values) => {
      dispatch(
        REGIS_USER_SAGA({
          userRegister: values
        })
      );
    },

  });

  return (
    <StyleTotal className="w-screen h-screen">
      <div className="register relative">
        <div className="cover absolute top-0 left-0">
          <div className="content">
            <div className="lineTop mt-5">
              <span className="anyWhere">
                <span className="circle mr-3"></span>
                <span>SocialNework app</span>
              </span>
              <span className="home">Home</span>
              <span className="john">Join</span>
            </div>
            <div className="account mt-12 px-14">
              <div className="startFree">START FOR FREE</div>
              <div className="createAccount">Create new account</div>
              <div className="member mt-3">
                <span className="memberEd">Already a member?</span>
                <span className="login ml-1">Login</span>
              </div>
              <ConfigProvider
                theme={{
                  token: {
                    colorTextBase: "#d4d4d4",
                    colorBgBase: "#333345",
                    lineWidth: 0,
                    controlHeight: 40,
                  },
                }}
              >
                <Form
                  className="mt-5 formAccount"
                  onFinish={formik.handleSubmit}
                >
                  <Form.Item>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginRight: "16px",
                      }}
                      name="firstname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your firstname!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="First name"
                        allowClear
                        prefix={<UserOutlined />}
                        onChange={formik.handleChange}
                      ></Input>
                    </Form.Item>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                      }}
                      name="lastname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your lastname!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Last name"
                        allowClear
                        prefix={<UserOutlined />}
                        onChange={formik.handleChange}
                      ></Input>
                    </Form.Item>
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your E-mail!"
                       
                      },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      },
                    ]}
                  >
                    <Input
                      placeholder="Email"
                      allowClear
                      prefix={<MailOutlined />}
                      onChange={formik.handleChange}
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password 
                    placeholder="Password"
                    onChange={formik.handleChange}
                    ></Input.Password>
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password 
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    ></Input.Password>
                  </Form.Item>
                  <button className="buttonCreate mt-3" type="submit">
                    Create account
                  </button>
                </Form>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </StyleTotal>
  );
};

export default Register;
