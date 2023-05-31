import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import DrawerHOC from './HOC/Drawer/DrawerHOC';
import ModalHOC from './HOC/Modal/ModalHOC';
import Chat from './pages/Chat/Chat';
import GetStarted from './pages/GetStarted/GetStarted';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SelectCommunity from './pages/SelectCommunity/SelectCommunity';
import SelectFollow from './pages/SelectFollow/SelectFollow';
import SelectInterest from './pages/SelectInterest/SelectInterest';
import { setDispatch, setLocation, setNavigate, setUseSelector } from './redux/Slice/FunctionSlice';
import MainTemplate from './templates/MenuTemplate/MainTemplate';
import ProfileWrapper from './components/Wrapper/ProfileWrapper';
import PostWrapper from './components/Wrapper/PostWrapper';
import PostShareWrapper from './components/Wrapper/PostShareWrapper';
import NewFeed from './pages/NewsFeed/Newsfeed';
import React from 'react';
import ActiveStatus from './components/ActionComponent/ActiveStatus/ActiveStatus';
import NotFound404 from './pages/NotFound404/NotFound404';
import CommunityWrapper from './pages/Community/CommunityWrapper';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { VerifyCode } from './pages/ForgotPassword/VerifyCode';
import { ResetPassword } from './pages/ForgotPassword/ResetPassword';
import AlreadyAuth from './components/ActionComponent/Authentication/AlreadyAuth';
import Auth from './components/ActionComponent/Authentication/Auth';

const App = () => {
  //Set một số tham số cần thiết trên toàn cục
  const dispatch = useDispatch();
  dispatch(setDispatch(dispatch));

  let navigate = useNavigate();
  dispatch(setNavigate(navigate));

  const location = useLocation();
  dispatch(setLocation(location));

  dispatch(setUseSelector(useSelector));

  return (
    <>
      <ModalHOC />
      <DrawerHOC />
      <ActiveStatus />
      <Routes>
        <Route element={<AlreadyAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Route>
        <Route element={<Auth />}>
          <Route index element={<MainTemplate Component={NewFeed} />} />
          <Route path="/message/:conversationID?" element={<Chat />} />
          <Route path="/select-interest" element={<SelectInterest />} />
          <Route path="/select-follow" element={<SelectFollow />} />
          <Route path="/select-community" element={<SelectCommunity />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/user/:userID" element={<MainTemplate Component={ProfileWrapper} />} />
          <Route path="/me" element={<MainTemplate Component={ProfileWrapper} />} />
          <Route path="/post/:postID" element={<MainTemplate Component={PostWrapper} />} />
          <Route path="/postshare/:postID" element={<MainTemplate Component={PostShareWrapper} />} />
          <Route path="/community/:communityID" element={<MainTemplate Component={CommunityWrapper} />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
