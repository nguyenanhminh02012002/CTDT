import { Input, Table, Tooltip, Button, Modal, Form } from "antd";
import Header from "../Header/Header";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { IoAdd } from "react-icons/io5";
import { useEffect, useState } from "react";
import "./ManageGroupUsers.scss";
import { getGroupUsers } from "../../services/apiServices";

const ManageGroupUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal Edit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Modal Add
  const [form] = Form.useForm();
  const [data, setData] = useState([]); // Hold the fetched group data
  const pageSize = 5;
  const [editingRecord, setEditingRecord] = useState(null); // Track the record being edited

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGroupUsers();
      if (res && res.value) {
        setData(res.value); // Populate data from API
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (record) => {
    setEditingRecord(record); // Set the record to be edited
    form.setFieldsValue({
      roleId: record.roleId,
      roleName: record.roleName,
      description: record.description,
    });
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: `Bạn có chắc chắn muốn xoá nhóm "${record.roleName}"?`,
      okText: "Xoá",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const token = localStorage.getItem("access_token");
          const response = await fetch(
            `https://qlctt.kain.id.vn/role/delete/${record.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const res = await response.json();
          if (res && res.status) {
            // Remove the deleted record from state
            setData((prevData) =>
              prevData.filter((item) => item.id !== record.id)
            );
            Modal.success({
              title: "Xoá thành công",
              content: `Nhóm "${record.roleName}" đã được xoá.`,
            });
          } else {
            // Modal.error({
            //   title: "Xoá thất bại",
            //   content: "Vui lòng thử lại sau.",
            // });
          }
        } catch (error) {
          console.error("Lỗi khi xoá nhóm người dùng:", error);
          Modal.error({
            title: "Lỗi",
            content: "Đã xảy ra lỗi trong quá trình xoá.",
          });
        }
      },
    });
  };

  const handleAddNew = () => {
    form.validateFields().then(async (values) => {
      const { roleId, roleName, description } = values;
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("https://qlctt.kain.id.vn/role/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roleId,
            roleName,
            description,
          }),
        });

        const res = await response.json();
        if (res && res.id) {
          // Add new item based on the response from the API
          const newItem = {
            key: res.id,
            roleId: res.roleId,
            roleName: res.roleName,
            description: res.description,
          };
          setData((prevData) => [...prevData, newItem]);
          setIsAddModalOpen(false); // Close the modal
          form.resetFields(); // Reset form fields
        } else {
          Modal.error({
            title: "Thêm nhóm thất bại",
            content: "Vui lòng thử lại sau.",
          });
        }
      } catch (error) {
        console.error("Lỗi khi thêm mới nhóm người dùng:", error);
        Modal.error({
          title: "Lỗi",
          content: "Đã xảy ra lỗi trong quá trình thêm mới.",
        });
      }
    });
  };

  const handleEditSave = async () => {
    form.validateFields().then(async (values) => {
      const { roleId, roleName, description } = values;
      const recordToUpdate = {
        roleId,
        roleName,
        description,
      };

      try {
        const token = localStorage.getItem("access_token");
        const id = editingRecord.id; // Get the ID from the selected record
        const response = await fetch(
          `https://qlctt.kain.id.vn/role/update/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(recordToUpdate),
          }
        );

        const res = await response.json();
        if (res && res.id) {
          const updatedItem = {
            key: res.id,
            roleId: res.roleId,
            roleName: res.roleName,
            description: res.description,
          };

          // Update the data with the edited record
          setData((prevData) =>
            prevData.map((item) => (item.id === res.id ? updatedItem : item))
          );
          setIsEditModalOpen(false); // Close the modal
          form.resetFields(); // Reset form fields
        } else {
          Modal.error({
            title: "Cập nhật nhóm thất bại",
            content: "Vui lòng thử lại sau.",
          });
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật nhóm người dùng:", error);
        Modal.error({
          title: "Lỗi",
          content: "Đã xảy ra lỗi trong quá trình cập nhật.",
        });
      }
    });
  };

  const filteredData = data.filter(
    (item) =>
      item.roleId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.roleName.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "MÃ NHÓM NGƯỜI DÙNG", dataIndex: "roleId", key: "roleId" },
    { title: "NHÓM NGƯỜI DÙNG", dataIndex: "roleName", key: "roleName" },
    { title: "MÔ TẢ", dataIndex: "description", key: "description" },
    {
      title: "HOẠT ĐỘNG",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xoá">
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header title={"QUẢN LÝ NHÓM NGƯỜI DÙNG"} />
      <div className="container-specialize">
        <div className="btn-add">
          <div className="title-specialized">Quản lý Nhóm người dùng</div>
          <div className="right-action">
            <div className="search-username">
              <Input
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                placeholder="Tìm kiếm nhóm người dùng"
                size={"large"}
                style={{ border: "rgb(145, 7, 7) solid 1px" }}
              />
            </div>
            <button className="btn" onClick={() => setIsAddModalOpen(true)}>
              <IoAdd /> <span>Thêm mới</span>
            </button>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={currentPageData}
            pagination={{
              position: ["bottomCenter"],
              pageSize: pageSize,
              current: currentPage,
              onChange: handlePageChange,
              total: filteredData.length,
            }}
          />
        </div>
      </div>

      {/* Modal Chỉnh sửa */}
      <Modal
        title="Chỉnh Sửa Nhóm Người Dùng"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleEditSave}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mã Nhóm Người Dùng"
            name="roleId"
            rules={[{ required: true, message: "Vui lòng nhập mã nhóm" }]}
          >
            <Input disabled placeholder="Nhập mã nhóm người dùng" />
          </Form.Item>
          <Form.Item
            label="Tên Nhóm Người Dùng"
            name="roleName"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm" }]}
          >
            <Input placeholder="Nhập tên nhóm người dùng" />
          </Form.Item>
          <Form.Item label="Mô Tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Thêm mới */}
      <Modal
        title="Thêm Mới Nhóm Người Dùng"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={handleAddNew}
        okText="Thêm mới"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mã Nhóm Người Dùng"
            name="roleId"
            rules={[{ required: true, message: "Vui lòng nhập mã nhóm" }]}
          >
            <Input placeholder="Nhập mã nhóm người dùng" />
          </Form.Item>
          <Form.Item
            label="Tên Nhóm Người Dùng"
            name="roleName"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm" }]}
          >
            <Input placeholder="Nhập tên nhóm người dùng" />
          </Form.Item>
          <Form.Item label="Mô Tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageGroupUsers;
