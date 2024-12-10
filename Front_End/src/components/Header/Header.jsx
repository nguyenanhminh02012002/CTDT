import { UserOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.jfif";
import "./Header.scss";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { actionLogout } from "../../store";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="logo-header">
        <img src={logo} alt="logo" />
      </div>
      <div className="title-function">
        Phần mềm Quản lý Chương trình Đào tạo
      </div>
      <div className="info-user">
        <div className="icon-user">
          <UserOutlined />
        </div>
        <div className="user-header">
          <div className="hello">Xin chào</div>
          <div className="name-user">PDT005- Trần Thu Thuý</div>
          <div className="function-user">
            <button className="change-password">
              <Link to={"/change-password"}>Đổi mật khẩu</Link>
            </button>
            <button
              className="logout-page"
              onClick={() => dispatch(actionLogout.logout())}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
