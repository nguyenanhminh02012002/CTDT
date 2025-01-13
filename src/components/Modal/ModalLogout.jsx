import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout } from "../../store/index";
import { useNavigate } from "react-router";
import "./ModalLogout.scss";

const ModalLogout = () => {
  const isLogout = useSelector((state) => state.logout.isLogout);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(actionLogout.login());
    navigate("/");
  };

  return (
    <Modal
      className="modal-logout"
      title="Bạn có chắc muốn đăng xuất?"
      open={isLogout}
      onCancel={() => dispatch(actionLogout.login())}
      footer={[
        <button
          className="cancel-modal"
          key="cancel"
          onClick={() => dispatch(actionLogout.login())}
        >
          Huỷ
        </button>,
        <button className="logout" key="logout" onClick={handleLogout}>
          Đăng xuất
        </button>,
      ]}
    ></Modal>
  );
};

export default ModalLogout;
