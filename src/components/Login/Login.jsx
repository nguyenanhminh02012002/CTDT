import logo from "../../assets/logo.jfif";
import { Button, Input } from "antd";
import { KeyOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.scss";

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in...");
  };

  return (
    <div className="login-page">
      <div className="login-page__logo">
        <img src={logo} alt="logo" />
      </div>
      <form className="login-page__form" onSubmit={handleLogin}>
        <div className="login-page__form-group">
          <Input
            size="large"
            placeholder="Tên đăng nhập"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="login-page__form-group">
          <Input.Password
            size="large"
            placeholder="Mật khẩu"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="login-page__forgot">
          <KeyOutlined className="icon-red" />
          <span className="forgot-link">Quên mật khẩu?</span>
        </div>
        <div className="login-page__actions">
          <Button type="primary" size="large" htmlType="submit">
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
