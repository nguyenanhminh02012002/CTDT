import { UserOutlined } from "@ant-design/icons";
import { FaChevronCircleRight } from "react-icons/fa";
import { Menu, Dropdown, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import "./Header.scss";
import { toast } from "react-toastify";
import { useState } from "react";

const Header = ({ title }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showLogoutModal = () => {
    setIsModalVisible(true); // Hiển thị modal khi người dùng nhấn Đăng xuất
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Đóng modal nếu người dùng chọn hủy
  };

  const handleLogout = () => {
    // Xóa toàn bộ token khỏi localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Thông báo người dùng và chuyển hướng về trang login
    toast.success("Bạn đã đăng xuất thành công");

    setTimeout(() => {
      window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
    }, 1000);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/change-password">Đổi mật khẩu</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={showLogoutModal}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="header">
        <div className="title-function">
          Hệ thống Quản lý Chương trình đào tạo
        </div>
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <div className="icon-user">
            <Button type="text" icon={<UserOutlined />} />
          </div>
        </Dropdown>
      </div>
      <div className="subtitle">
        <FaChevronCircleRight className="icon-subtitle" />
        <p className="title">{title}</p>
      </div>

      {/* Modal xác nhận đăng xuất */}
      <Modal
        title="Xác nhận đăng xuất"
        visible={isModalVisible}
        onOk={handleLogout} // Thực hiện đăng xuất nếu nhấn OK
        onCancel={handleCancel} // Đóng modal nếu nhấn Cancel
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
      </Modal>
    </>
  );
};

export default Header;
