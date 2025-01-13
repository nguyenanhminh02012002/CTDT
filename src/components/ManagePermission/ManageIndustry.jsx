import { Table, Input, Button, Tooltip, Modal, notification } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { IoAdd } from "react-icons/io5";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./ManageIndustry.scss";
import { getMajor, addMajor, updateMajor } from "../../services/apiServices";

const ManageIndustry = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [newMajorId, setNewMajorId] = useState("");
  const [newMajorName, setNewMajorName] = useState("");
  const pageSize = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getMajor();
      if (res?.value) {
        const formattedData = res.value.map((item, index) => ({
          key: index + 1,
          id: item.id,
          code: item.majorId,
          name: item.majorName,
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu ngành học:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (record) => {
    setNewMajorId(record.code);
    setNewMajorName(record.name);
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingId(record.id);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xóa ngành học",
      content: "Bạn có chắc chắn muốn xóa ngành học này?",
      onOk: async () => {
        try {
          const token = localStorage.getItem("access_token");
          const res = await fetch(
            `https://qlctt.kain.id.vn/major/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          // const data = await res.json();
          if (res && res.status) {
            openNotification("success", "Xóa ngành học thành công!");
            fetchData(); // Tải lại dữ liệu
          } else {
            openNotification("error", "Xóa ngành học thất bại!");
          }
        } catch (error) {
          console.error("Lỗi khi xoá ngành học:", error);
          openNotification("error", "Đã xảy ra lỗi, vui lòng thử lại!");
        }
      },
    });
  };

  const handleAddMajor = async () => {
    if (!newMajorId || !newMajorName) {
      return openNotification("warning", "Vui lòng nhập đầy đủ thông tin!");
    }

    try {
      const res = await addMajor(newMajorId, newMajorName);
      if (res?.majorId) {
        openNotification("success", "Thêm ngành học thành công!");
        await fetchData(); // Tải lại dữ liệu
        handleModalClose(); // Đóng modal sau khi thành công
      } else {
        openNotification("error", "Thêm ngành học thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm ngành học:", error);
      openNotification("error", "Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  const handleUpdateMajor = async () => {
    if (!newMajorId || !newMajorName) {
      return openNotification("warning", "Vui lòng nhập đầy đủ thông tin!");
    }

    try {
      const res = await updateMajor(editingId, newMajorId, newMajorName);
      if (res?.majorId) {
        openNotification("success", "Cập nhật ngành học thành công!");
        await fetchData(); // Tải lại dữ liệu
        handleModalClose(); // Đóng modal sau khi thành công
      } else {
        openNotification("error", "Cập nhật ngành học thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật ngành học:", error);
      openNotification("error", "Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewMajorId("");
    setNewMajorName("");
    setIsEditing(false);
    setEditingId(null);
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      placement: "topRight",
    });
  };

  const filteredData = data.filter(
    (item) =>
      item.code.toLowerCase().includes(searchText.toLowerCase()) ||
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "MÃ NGÀNH HỌC", dataIndex: "code", key: "code" },
    { title: "TÊN NGÀNH HỌC", dataIndex: "name", key: "name" },
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
          <Tooltip title="Xoá">
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
      <Header title={"QUẢN LÝ NGÀNH HỌC"} />
      <div className="container-specialize">
        <div className="btn-add">
          <div className="title-specialized">Quản lý Ngành học</div>
          <div className="right-action">
            <div className="search-username">
              <Input
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                placeholder="Tìm kiếm ngành học"
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
          />
        </div>
      </div>

      <Modal
        title={isEditing ? "Chỉnh Sửa Ngành Học" : "Thêm Mới Ngành Học"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <div>
          <Input
            placeholder="Mã ngành học"
            value={newMajorId}
            onChange={(e) => setNewMajorId(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Tên ngành học"
            value={newMajorName}
            onChange={(e) => setNewMajorName(e.target.value)}
          />
          <div style={{ marginTop: 20 }}>
            <Button
              type="primary"
              onClick={isEditing ? handleUpdateMajor : handleAddMajor}
            >
              {isEditing ? "Lưu" : "Thêm"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageIndustry;
