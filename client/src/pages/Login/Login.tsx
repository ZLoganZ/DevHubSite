import React from "react";
import LoginForm from "../../components/Form/Login/LoginForm";
import StyleTotal from "./cssLogin";

const Login = () => {
  return (
    <StyleTotal>
      <div className="login">
        <LoginForm />
      </div>
    </StyleTotal>
  );
};

export default Login;
