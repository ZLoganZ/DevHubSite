import { useState } from 'react';
import { useFormik } from 'formik';
import StyleTotal from './cssLoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';
import { ConfigProvider, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SAGA, LOGIN_WITH_GOOGLE_SAGA } from '../../../redux/actionSaga/AuthActionSaga';
import { useGoogleLogin } from '@react-oauth/google';
import { GetGitHubUrl } from '../../../util/functions/GetGithubUrl';
import { TOKEN, TOKEN_GITHUB } from '../../../util/constants/SettingSystem';
import { darkThemeSet } from '../../../util/cssVariable';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector((state: any) => state.authReducer);

  const location = useLocation();

  const handleSignInWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(
        LOGIN_WITH_GOOGLE_SAGA({
          token: tokenResponse.access_token,
        }),
      );
    },
  });

  const openPopup = () => {
    const width = 500; // Width of the pop-up window
    const height = 800; // Height of the pop-up window
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(GetGitHubUrl(), 'GithubAuth', `width=${width},height=${height},left=${left},top=${top}`);

    const handleMessage = (event: any) => {
      if (
        event.origin ===
        (process.env.NODE_ENV === 'development'
          ? import.meta.env.VITE_SERVER_ENDPOINT
          : import.meta.env.VITE_SERVER_ENDPOINT_PRODUCT)
      ) {
        // Check the origin of the message for security
        // Handle the received data from the server
        const userData = event.data;
        if (userData) {
          localStorage.setItem(TOKEN, userData.accessToken);
          localStorage.setItem(TOKEN_GITHUB, userData.accessTokenGitHub);

          // go to home page or redirect to previous page
          const state = location.state as { from: Location };
          const from = state?.from?.pathname || '/';

          window.location.replace(from);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    const pollOAuthStatus = setInterval(() => {
      if (popup?.closed) {
        clearInterval(pollOAuthStatus);
        window.removeEventListener('message', handleMessage);
      }
    }, 500);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      setEmail(values.email);
      setPassword(values.password);

      dispatch(
        LOGIN_SAGA({
          userLogin: values,
        }),
      );
    },
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextBase: darkThemeSet.colorText2,
          colorBgBase: darkThemeSet.colorBg2,
          lineWidth: 0,
          controlHeight: 40,
          borderRadius: 0,
        },
      }}
    >
      <StyleTotal>
        <div className="loginForm">
          <div className="welcomeBack mb-12">
            <div className="icon_logo">
              <FontAwesomeIcon className="icon" icon={faSnowflake} />
            </div>
            <h2 className="title">Welcome back!</h2>
          </div>

          <Form className="w-full" style={{ width: '70%' }} onFinish={formik.handleSubmit}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  validator(_, value) {
                    if (error?.toLowerCase()?.includes('email') && value === email) {
                      return Promise.reject(new Error(error));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Email" allowClear prefix={<MailOutlined />} onChange={formik.handleChange}></Input>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator(_, value) {
                    if (error?.toLowerCase()?.includes('password') && value === password) {
                      return Promise.reject(new Error(error));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password placeholder="Password" onChange={formik.handleChange}></Input.Password>
            </Form.Item>
            <button type="submit" className="btn btn-primary w-full h-9 mb-4 mt-3 font-bold">
              Login
            </button>
            <NavLink to="/forgot">
              <span className="forgot flex justify-center align-middle">Forgot your password?</span>
            </NavLink>
          </Form>
          <div className="anotherLogin mt-10">
            <div className="title relative">
              <span className="absolute" style={{ color: darkThemeSet.colorText2 }}>
                Or
              </span>
              <hr />
            </div>
            <div className="loginTool mt-10 w-full">
              <div className="google h-10" onClick={() => handleSignInWithGoogle()}>
                <span className="icon mr-2">
                  <img src="./images/google.svg" alt="google" />
                </span>
                <span>Continue with Gmail</span>
              </div>
              <div className="github mt-4 h-10" onClick={() => openPopup()}>
                <span className="icon mr-2">
                  <img src="./images/github.svg" alt="github" />
                </span>
                <span>Continue with Github</span>
              </div>
            </div>
          </div>

          <div className="noAccount text-center mt-8">
            <span>Don't you have an account yet? </span>
            <span className="signUp ml-1">
              <NavLink to="/register">Sign up</NavLink>
            </span>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default LoginForm;
