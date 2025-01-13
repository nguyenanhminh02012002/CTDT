import "./ModalAddUser.scss";
import { Modal, Input, Select, Divider, Form, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionAddUser } from "../../store";
import { addUser } from "../../services/apiServices";

const ModalAddUser = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.addUser.isShowAddUser);

  // Xử lý khi nhấn nút Lưu
  const handleSave = async () => {
    try {
      // Validate form
      const values = await form.validateFields();

      // Convert các trường cần thiết thành số nếu cần
      const formattedValues = {
        ...values,
        schoolYearId: Number(values.schoolYearId), // Chuyển schoolYearId thành số
        classId: Number(values.classId), // Chuyển classId thành số
        pastMajorId: Number(values.pastMajorId), // Chuyển pastMajorId thành số
        currentMajorId: Number(values.currentMajorId), // Chuyển currentMajorId thành số
        secondMajorId: Number(values.secondMajorId), // Chuyển secondMajorId thành số
        departmentId: Number(values.departmentId), // Chuyển departmentId thành số
        roleId: Number(values.roleId), // Chuyển roleId thành số
      };

      // Gọi API để thêm người dùng mới với dữ liệu đã được chuyển đổi
      const response = await addUser(
        formattedValues.email,
        formattedValues.userId,
        formattedValues.password,
        formattedValues.firstName,
        formattedValues.lastName,
        formattedValues.gender,
        formattedValues.position,
        formattedValues.schoolYearId,
        formattedValues.classId,
        formattedValues.pastMajorId,
        formattedValues.currentMajorId,
        formattedValues.secondMajorId,
        formattedValues.departmentId,
        formattedValues.roleId
      );

      // Kiểm tra nếu API trả về lỗi
      if (response.error || response.statusCode === 404) {
        console.error("Lỗi khi lưu dữ liệu:", response.message);
        // Hiển thị thông báo lỗi cho người dùng
        alert(`Lỗi: ${response.message}`);
      } else {
        // Nếu thành công, đóng modal và thông báo thành công
        console.log("Dữ liệu đã được lưu thành công:", response);
        onClose(); // Đóng modal sau khi lưu thành công
        // Cập nhật trạng thái thành công cho Redux
        dispatch(actionAddUser.isSuccessData());
      }
    } catch (errorInfo) {
      console.error("Lỗi khi lưu dữ liệu:", errorInfo);
      alert("Đã xảy ra lỗi trong quá trình lưu dữ liệu.");
    }

    // Đóng modal và thông báo thành công
    dispatch(actionAddUser.isShowModal());
  };

  const onClose = () => {
    dispatch(actionAddUser.isShowModal());
  };

  return (
    <Modal
      title={
        <div style={{ fontWeight: "bold", textAlign: "center" }}>Thêm mới</div>
      }
      open={isShow}
      footer={null}
      onCancel={onClose}
      width={600}
      className="modal-container"
    >
      <Divider className="divider" />

      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mã đăng nhập"
              name="userId"
              rules={[
                { required: true, message: "Vui lòng nhập mã đăng nhập" },
              ]}
            >
              <Input placeholder="Nhập mã đăng nhập" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên người dùng"
              name="firstName"
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng" },
              ]}
            >
              <Input placeholder="Nhập tên người dùng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Họ người dùng"
              name="lastName"
              rules={[
                { required: true, message: "Vui lòng nhập họ người dùng" },
              ]}
            >
              <Input placeholder="Nhập họ người dùng" />
            </Form.Item>
          </Col>
        </Row>

        {/* Thêm trường mật khẩu */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Giới tính" name="gender">
              <Select placeholder="Chọn giới tính">
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Nữ">Nữ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Chức vụ"
              name="position"
              rules={[{ required: true, message: "Vui lòng nhập chức vụ" }]}
            >
              <Input placeholder="Nhập chức vụ" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Năm học" name="schoolYearId">
              <Input placeholder="Nhập năm học" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Lớp" name="classId">
              <Input placeholder="Nhập lớp" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Chuyên ngành cũ" name="pastMajorId">
              <Input placeholder="Nhập chuyên ngành cũ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Chuyên ngành hiện tại" name="currentMajorId">
              <Input placeholder="Nhập chuyên ngành hiện tại" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Chuyên ngành phụ" name="secondMajorId">
              <Input placeholder="Nhập chuyên ngành phụ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Khoa" name="departmentId">
              <Select placeholder="Chọn khoa">
                <Select.Option value="1">Toán - Tin</Select.Option>
                <Select.Option value="2">Hóa học</Select.Option>
                <Select.Option value="3">Vật lý</Select.Option>
                <Select.Option value="4">Sinh học</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nhóm quyền"
              name="roleId"
              rules={[{ required: true, message: "Vui lòng chọn nhóm quyền" }]}
            >
              <Select placeholder="Chọn nhóm quyền">
                <Select.Option value="1">Admin</Select.Option>
                <Select.Option value="2">User</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div className="action-buttons">
        <button onClick={onClose}>Hủy</button>
        <button type="primary" onClick={handleSave}>
          Lưu
        </button>
      </div>
    </Modal>
  );
};

export default ModalAddUser;
