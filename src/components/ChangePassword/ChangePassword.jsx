import { useRef, useState } from "react";
import "./ChangePassword.scss";
import Header from "../Header/Header";
import { changePassword } from "../../services/apiServices";
import { Modal } from "antd";

const ChangePassword = () => {
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  const validateForm = () => {
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Vui lòng điền đầy đủ các trường.");
      return false;
    }
    if (newPassword.length < 6) {
      setErrorMessage("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Xác nhận mật khẩu không khớp.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (validateForm()) {
      // Show the confirmation modal
      setIsModalVisible(true);
    }
  };

  const handleConfirmChangePassword = async () => {
    setIsModalVisible(false); // Hide modal after confirmation
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

    if (!token) {
      setErrorMessage("Vui lòng đăng nhập lại để tiếp tục.");
      return;
    }

    try {
      const response = await fetch(
        "https://qlctt.kain.id.vn/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.access_token && data.refresh_token) {
          // Store the new tokens in localStorage
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);

          // Show success message
          setSuccessMessage("Đổi mật khẩu thành công!");

          // Clear form fields
          oldPasswordRef.current.value = "";
          newPasswordRef.current.value = "";
          confirmPasswordRef.current.value = "";
        } else {
          setErrorMessage("Đã xảy ra lỗi khi đổi mật khẩu.");
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Lỗi khi đổi mật khẩu.");
      }
    } catch (error) {
      setErrorMessage("Lỗi khi kết nối đến máy chủ.");
      console.error(error);
    }
  };

  const handleCancelChangePassword = () => {
    setIsModalVisible(false); // Hide modal if canceled
  };

  return (
    <>
      <Header title={"ĐỔI MẬT KHẨU"} />
      <form className="form-change-password" onSubmit={handleSubmit}>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="old-password">
          <label>Mật khẩu cũ: </label>
          <input ref={oldPasswordRef} type="password" />
        </div>
        <div className="new-password">
          <label>Mật khẩu mới: </label>
          <input ref={newPasswordRef} type="password" />
        </div>
        <div className="confirm-password">
          <label>Xác nhận mật khẩu mới: </label>
          <input ref={confirmPasswordRef} type="password" />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="button-change-password">
          <button type="submit">Đổi mật khẩu</button>
        </div>
      </form>

      {/* Modal for confirmation */}
      <Modal
        title="Xác nhận đổi mật khẩu"
        visible={isModalVisible}
        onOk={handleConfirmChangePassword}
        onCancel={handleCancelChangePassword}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn thay đổi mật khẩu không?</p>
      </Modal>
    </>
  );
};

export default ChangePassword;
