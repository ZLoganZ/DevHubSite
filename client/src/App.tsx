import React, { Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import DrawerHOC from './HOC/Drawer';
import ModalHOC from './HOC/Modal';
import Chat from './pages/Chat';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectCommunity from './pages/SelectCommunity';
import SelectFollow from './pages/SelectFollow';
import SelectInterest from './pages/SelectInterest';
import { setDispatch, setLocation, setNavigate, setUseSelector } from './redux/Slice/FunctionSlice';
import MainTemplate from './templates/MainTemplate';
import { PostShareWrapper, PostWrapper, CommunityWrapper, ProfileWrapper } from './components/Wrapper';
import NewFeed from './pages/NewsFeed';
import ActiveStatus from './components/ActionComponent/ActiveStatus';
import NotFound404 from './pages/NotFound404';
import { ForgotPassword, ResetPassword, VerifyCode } from './pages/ForgotPassword';
import { AlreadyAuth, Auth } from './components/ActionComponent/Authentication';

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
