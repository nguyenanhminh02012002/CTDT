import "./ForgotPassword.scss";
import logo from "../../assets/logo.jfif";
import { Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [codeLogin, setCodeLogin] = useState("");
  const navigate = useNavigate();

  const handleForgot = (e) => {
    e.preventDefault();
    console.log("Logging in...", codeLogin);
    navigate("/");
  };

  return (
    <div className="forgot_page">
      <div className="forgot_page__logo">
        <img src={logo} alt="logo" />
      </div>
      <form className="forgot_page__form" onSubmit={handleForgot}>
        <div>Mã đăng nhập là mã nhân viên của bạn tại trường.</div>

        <div className="forgot_page__form_group">
          <Input.Password
            size="large"
            value={codeLogin}
            onChange={(e) => setCodeLogin(e.target.value)}
            placeholder="Mã đăng nhập"
            prefix={<UserOutlined />}
          />
        </div>

        <div className="forgot_page__actions">
          <Button type="primary" size="large" htmlType="submit">
            Cấp lại mật khẩu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
