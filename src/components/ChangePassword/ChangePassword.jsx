import { useRef, useState } from "react";
import "./ChangePassword.scss";

const ChangePassword = () => {
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      // Logic xử lý đổi mật khẩu
      console.log("Mật khẩu cũ:", oldPasswordRef.current.value);
      console.log("Mật khẩu mới:", newPasswordRef.current.value);

      // Giả lập đổi mật khẩu thành công
      setSuccessMessage("Đổi mật khẩu thành công!");

      // Xóa nội dung các input
      oldPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
  };

  return (
    <>
      <div className="header-home-page">Đổi mật khẩu</div>
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
    </>
  );
};

export default ChangePassword;
