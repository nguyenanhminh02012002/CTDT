import "./ModalAddPermission.scss";
import { useState } from "react";
import { Modal, Input, Checkbox, Button } from "antd";
import { actionIsShowAddPermission } from "../../store";
import { useSelector, useDispatch } from "react-redux";

const ModalAddPermission = () => {
  const isShow = useSelector(
    (state) => state.addPermission.isShowAddPermission
  );
  const dispatch = useDispatch();

  const categories = [
    "Quản lý Khoa",
    "Quản lý Bộ môn",
    "Quản lý Ngành học",
    "Quản lý Năm học/Khoá",
    "Quản lý Học phần",
    "Danh mục Khối kiến thức",
    "Danh mục Chương trình Đào tạo",
    "Quản lý Chương trình Đào tạo",
    "Quản lý Đơn vị",
    "Quản lý Người dùng",
    "Quản lý Tài khoản Người dùng",
    "Quản lý Nhóm quyền",
  ];

  const actions = ["Xem", "Thêm", "Sửa", "Xoá", "Báo cáo"];

  const [permissionsData, setPermissionsData] = useState({});
  const [formData, setFormData] = useState({
    code: "",
    permission: "",
    description: "",
  });

  const handleCloseModal = () => {
    dispatch(actionIsShowAddPermission.isShowModal());
  };

  const handleSave = () => {
    const permissions = {};

    categories.forEach((category) => {
      const selectedActions = actions.filter(
        (action) => permissionsData[category]?.[action] // Kiểm tra checkbox đã chọn
      );
      if (selectedActions.length > 0) {
        permissions[category] = selectedActions;
      }
    });

    const result = {
      code: formData.code,
      permission: formData.permission,
      description: formData.description,
      permissions: permissions,
    };

    console.log("Saved Data: ", result);
    handleCloseModal();
    dispatch(actionIsShowAddPermission.successData());
  };

  const handleCheckboxChange = (category, action, checked) => {
    setPermissionsData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [action]: checked,
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Modal */}
      <Modal
        title={<div className="modal-title">Thêm mới Nhóm quyền</div>}
        open={isShow}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Thoát
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
        width="50%"
        className="custom-modal"
      >
        <div className="inline-form">
          <div className="form-item">
            <label>
              Mã nhóm quyền: <span style={{ color: "red" }}>*</span>
            </label>
            <div>
              <Input
                name="code"
                value={formData.code}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-item">
            <label>
              Tên nhóm quyền: <span style={{ color: "red" }}>*</span>
            </label>
            <div>
              <Input
                name="permission"
                value={formData.permission}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-item">
          <label>Mô tả</label>
          <Input.TextArea
            rows={2}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Permissions Table */}
        <div className="table-permissions">
          <div className="table-header">
            <div className="cell header-title">Danh mục</div>
            {actions.map((action) => (
              <div className="cell header-title" key={action}>
                {action}
              </div>
            ))}
          </div>
          {categories.map((category) => (
            <div className="table-row" key={category}>
              <div className="cell category">{category}</div>
              {actions.map((action) => (
                <div className="cell" key={`${category}-${action}`}>
                  <div>
                    <Checkbox
                      checked={permissionsData[category]?.[action] || false}
                      onChange={(e) =>
                        handleCheckboxChange(category, action, e.target.checked)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ModalAddPermission;
