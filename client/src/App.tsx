import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Route, Routes } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DrawerHOC from "./HOC/Drawer/DrawerHOC";
import ModalHOC from "./HOC/Modal/ModalHOC";
import Chat from "./pages/Chat/Chat";
import GetStarted from "./pages/GetStarted/GetStarted";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SelectCommunity from "./pages/SelectCommunity/SelectCommunity";
import SelectFollow from "./pages/SelectFollow/SelectFollow";
import SelectInterest from "./pages/SelectInterest/SelectInterest";
import {
  setDispatch,
  setNavigate,
  setUseSelector,
} from "./redux/Slice/FunctionSlice";
import MainTemplate from "./templates/MenuTemplate/MainTemplate";
import ProfileWrapper from "./components/Wrapper/ProfileWrapper";
import PostWrapper from "./components/Wrapper/PostWrapper";
import PostShareWrapper from "./components/Wrapper/PostShareWrapper";
import NewFeed from "./pages/NewFeed/NewFeed";
import Community from "./pages/Community/Community";
import React from "react";

const App = () => {
  //Set một số tham số cần thiết trên toàn cục
  const dispatch = useDispatch();
  dispatch(setDispatch(dispatch));

  let navigate = useNavigate();
  dispatch(setNavigate(navigate));

  dispatch(setUseSelector(useSelector));

  return (
    <>
      <LoadingComponent />
      <DrawerHOC />
      <ModalHOC />
      <Routes>
        <Route path="/" element={<MainTemplate Component={NewFeed} />} />
        <Route path="/message" element={<Chat />} />
        <Route path="/select-interest" element={<SelectInterest />} />
        <Route path="/select-follow" element={<SelectFollow />} />
        <Route path="/select-community" element={<SelectCommunity />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/:userID"
          element={<MainTemplate Component={ProfileWrapper} />}
        />
        <Route
          path="/post/:postID"
          element={<MainTemplate Component={PostWrapper} />}
        />
        <Route
          path="/postshare/:postID"
          element={<MainTemplate Component={PostShareWrapper} />}
        />
        <Route
          path="/community"
          element={<MainTemplate Component={Community} />}
        />
      </Routes>
    </>
  );
};

export default App;
