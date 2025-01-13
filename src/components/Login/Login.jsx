import logo from "../../assets/logo.jfif";
import { Button, Input } from "antd";
import { KeyOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom"; // Dùng useNavigate để điều hướng
import { toast } from "react-toastify";
// import axios from "axios"; // Sử dụng axios thông thường
import "./Login.scss";
import { useState } from "react";
import { login } from "../../services/apiServices";

const LoginPage = () => {
  const navigate = useNavigate(); // Hook để điều hướng sau khi login thành công
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gửi request login đến API
      const response = await login(username, password);
      // axios.post("https://qlctt.kain.id.vn/auth/login", {
      //   email: username,
      //   password: password,
      // });
      console.log("response", response);

      // Lưu token vào localStorage (hoặc cookie, tùy vào yêu cầu bảo mật)
      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);

        // Hiển thị thông báo đăng nhập thành công
        toast.success("Đăng nhập thành công!");

        // Điều hướng đến trang home
        navigate("/");
      }
    } catch (error) {
      // Xử lý lỗi khi đăng nhập thất bại
      console.error("Login error:", error);
      toast.error("Đăng nhập không thành công. Vui lòng thử lại!");
    }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-page__form-group">
          <Input.Password
            size="large"
            placeholder="Mật khẩu"
            prefix={<LockOutlined />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-page__forgot">
          <KeyOutlined className="icon-red" />
          <span className="forgot-link">
            <Link to={"/forgot-password"}>Quên mật khẩu?</Link>
          </span>
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
