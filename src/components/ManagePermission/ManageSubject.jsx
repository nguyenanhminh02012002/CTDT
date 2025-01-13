import { Table, Input, Button, Tooltip, Modal, message } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { IoAdd } from "react-icons/io5";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./ManageSubject.scss";
import {
  getSubject,
  addSubject,
  updateSubject,
} from "../../services/apiServices";

const ManageSubject = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(""); // Added editId for handling subject id in edit
  const [editCode, setEditCode] = useState("");
  const [editName, setEditName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // To store id of the subject to delete
  const pageSize = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getSubject();
      if (res && res.value) {
        const formattedData = res.value.map((item, index) => ({
          key: index + 1,
          id: item.id, // Using 'id' for the unique subject identifier
          code: item.departmentId, // Mapping 'departmentId' as 'code'
          name: item.departmentName, // Mapping 'departmentName' as 'name'
        }));
        setSubjectData(formattedData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
      message.error("Không thể lấy dữ liệu bộ môn.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewCode("");
    setNewName("");
  };

  const handleAddSubject = async () => {
    if (!newCode.trim() || !newName.trim()) {
      message.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      const res = await addSubject(newCode, newName);
      if (res && res.id) {
        message.success("Thêm mới bộ môn thành công!");
        handleModalClose();
        fetchData(); // Cập nhật lại danh sách sau khi thêm mới
      } else {
        message.error("Đã xảy ra lỗi khi thêm mới bộ môn.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm bộ môn:", error);
      message.error("Không thể thêm mới bộ môn.");
    }
  };

  const handleEdit = (record) => {
    setEditId(record.id); // Set the editId when editing a record
    setEditCode(record.code); // Set the 'code' (departmentId) for editing
    setEditName(record.name); // Set the 'name' (departmentName) for editing
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditId(""); // Reset the editId on modal close
    setEditCode("");
    setEditName("");
  };

  const handleUpdateSubject = async () => {
    if (!editCode.trim() || !editName.trim()) {
      message.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      const res = await updateSubject(editId, editCode, editName); // Pass the id when updating
      if (res && res.id) {
        message.success("Cập nhật bộ môn thành công!");
        setIsModalOpen(false);
        fetchData(); // Tải lại danh sách sau khi cập nhật
        handleEditModalClose();
      } else {
        message.error("Đã xảy ra lỗi khi cập nhật bộ môn.");
      }
    } catch (error) {
      message.error("Không thể cập nhật bộ môn.");
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://qlctt.kain.id.vn/department/delete/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add your token here if needed
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("response", response);

      if (response.ok) {
        message.success("Xóa bộ môn thành công!");
        fetchData(); // Reload data after deletion
        setIsDeleteModalOpen(false); // Close the modal
      } else {
        message.error("Xóa bộ môn không thành công.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa bộ môn:", error);
      message.error("Không thể xóa bộ môn.");
    }
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null); // Reset deleteId
  };

  const filteredData = subjectData.filter(
    (item) =>
      item.code?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "MÃ BỘ MÔN", dataIndex: "code", key: "code" },
    { title: "TÊN BỘ MÔN", dataIndex: "name", key: "name" },
    {
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
          <Tooltip title="Xóa">
            <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header title={"QUẢN LÝ BỘ MÔN"} />
      <div className="container-specialize">
        <div className="btn-add">
          <div className="title-specialized">Quản lý Bộ môn</div>
          <div className="right-action">
            <div className="search-username">
              <Input
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                placeholder="Tìm kiếm bộ môn"
                size={"large"}
                style={{ border: "rgb(145, 7, 7) solid 1px" }}
              />
            </div>
            <button className="btn" onClick={() => setIsModalOpen(true)}>
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
            loading={loading}
          />
        </div>
      </div>

      {/* Modal for adding a new subject */}
      <Modal
        title="Thêm Mới Bộ Môn"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <div>
          <Input
            placeholder="Mã bộ môn"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Tên bộ môn"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div style={{ marginTop: 20 }}>
            <Button type="primary" onClick={handleAddSubject}>
              Thêm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal for editing an existing subject */}
      <Modal
        title="Chỉnh Sửa Bộ Môn"
        open={isEditModalOpen}
        onCancel={handleEditModalClose}
        footer={null}
      >
        <div>
          <Input
            placeholder="Mã bộ môn"
            value={editCode}
            onChange={(e) => setEditCode(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Tên bộ môn"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div style={{ marginTop: 20 }}>
            <Button type="primary" onClick={handleUpdateSubject}>
              Cập nhật
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal
        title="Xác Nhận Xóa"
        visible={isDeleteModalOpen}
        onOk={confirmDelete}
        onCancel={handleDeleteModalClose}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa bộ môn này không?</p>
      </Modal>
    </>
  );
};

export default ManageSubject;
