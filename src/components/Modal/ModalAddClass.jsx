import { useState } from "react";
import { Modal, Input, Button, notification } from "antd";
import "./ModalAddUnit.scss";
import { actionAddUnit } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { addClass } from "../../services/apiServices";

const ModalAddUnit = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.addUnit.isShowAddUnit);
  const [groupCode, setGroupCode] = useState("");
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    if (!groupCode || !groupName) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await addClass(groupCode, groupName);

      if (res) {
        notification.success({
          message: "Thêm mới thành công",
          description: `Lớp chuyên ngành ${groupName} đã được thêm.`,
        });

        // Gọi hàm onSuccess để cập nhật dữ liệu trên trang chính
        if (onSuccess) onSuccess();

        // Đóng modal
        dispatch(actionAddUnit.isShowModal());

        // Xóa dữ liệu trong form
        setGroupCode("");
        setGroupName("");
      } else {
        throw new Error(res.message || "Thêm mới không thành công.");
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description:
          error.message || "Có lỗi xảy ra khi thêm lớp chuyên ngành.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(actionAddUnit.isShowModal());
  };

  return (
    <Modal
      title={<div className="modal-title">Thêm mới</div>}
      open={isShow}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      className="modal-add-unit"
      confirmLoading={loading}
    >
      <div className="modal-content">
        <div className="modal-input-group">
          <label>
            Mã lớp chuyên ngành <span className="required">*</span>
          </label>
          <Input
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="modal-input-group">
          <label>
            Tên lớp chuyên ngành <span className="required">*</span>
          </label>
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="modal-footer">
          <Button
            onClick={handleCancel}
            className="cancel-button"
            disabled={loading}
          >
            Huỷ
          </Button>
          <Button type="primary" onClick={handleOk} loading={loading}>
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddUnit;
