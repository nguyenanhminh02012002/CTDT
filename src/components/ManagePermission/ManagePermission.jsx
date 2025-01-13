import "./ManagePermission.scss";
import { useState } from "react";
import { Table, Modal, Button, Input, Checkbox, message } from "antd";
import { IoAdd } from "react-icons/io5";
import Header from "../Header/Header";

const ManagePermission = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    permission: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  const expandedRowRender = (record) => {
    if (record.children) {
      return (
        <Table
          columns={columns.slice(1)} // Giữ lại cột "User" và "Khoa" cho bảng con
          dataSource={record.children}
          pagination={false}
          showHeader={false}
          rowKey="key"
          expandedRowRender={(childRecord) => (
            <div style={{ paddingLeft: "20px" }}>
              <span>{childRecord.permission}</span>
              <Checkbox
                checked={childRecord.userPermission}
                onChange={(e) =>
                  handleCheckboxChange(e, childRecord.key, "userPermission")
                }
                style={{ marginLeft: "10px" }}
              />
              <Checkbox
                checked={childRecord.khoaPermission}
                onChange={(e) =>
                  handleCheckboxChange(e, childRecord.key, "khoaPermission")
                }
                style={{ marginLeft: "10px" }}
              />
            </div>
          )}
        />
      );
    }
    return null;
  };

  // Dữ liệu chính bao gồm cả quyền chính và quyền con
  const data = [
    {
      key: "1",
      permission: "Trang cá nhân",
      userPermission: false,
      khoaPermission: false,
      children: [
        {
          key: "1-1",
          permission: "Xem thông tin cá nhân",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "1-2",
          permission: "Đăng nhập",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "1-3",
          permission: "Đăng xuất",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "1-4",
          permission: "Thay đổi mật khẩu",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "1-5",
          permission: "Quên mật khẩu",
          userPermission: false,
          khoaPermission: false,
        },
      ],
    },
    {
      key: "2",
      permission: "Tra cứu thông tin",
      userPermission: false,
      khoaPermission: false,
      children: [
        {
          key: "2-1",
          permission: "Xem chương trình đào tạo",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-2",
          permission: "Tạo mới chương trình đào tạo",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-3",
          permission: "Import chương trình đào tạo",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-4",
          permission: "Duplicate chương trình đào tạo",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-5",
          permission: "Xem học phần tương đương",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-6",
          permission: "Tra cứu học phần tương đương",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-7",
          permission: "Tải chương trình đào tạo mẫu",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-8",
          permission: "Chỉnh sửa bản nháp CTDT (Yêu cầu duyệt)",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-9",
          permission: "Xoá bản nháp CTDT (Yêu cầu duyệt)",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-10",
          permission: "Gửi yêu cầu duyệt",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-11",
          permission: "Xem yêu cầu duyệt",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-12",
          permission: "Duyệt",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "2-13",
          permission: "Xem lịch sử duyệt",
          userPermission: false,
          khoaPermission: false,
        },
      ],
    },
    {
      key: "3",
      permission: "Quản lý",
      userPermission: false,
      khoaPermission: false,
      children: [
        {
          key: "3-1",
          permission: "Xem lớp chuyên ngành",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-2",
          permission: "Tra cứu lớp chuyên ngành",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-3",
          permission: "Thêm mới lớp chuyên ngành",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-4",
          permission: "Chỉnh sửa lớp chuyên ngành",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-5",
          permission: "Xem khoá",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-6",
          permission: "Tra cứu khoá",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-7",
          permission: "Thêm mới khoá",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-8",
          permission: "Chỉnh sửa khoá",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-9",
          permission: "Xem nhóm người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-10",
          permission: "Tra cứu nhóm người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-11",
          permission: "Thêm mới nhóm người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-12",
          permission: "Chỉnh sửa nhóm người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-13",
          permission: "Xoá nhóm người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-14",
          permission: "Xem bộ môn",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-15",
          permission: "Tra cứu bộ môn",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-16",
          permission: "Thêm mới bộ môn",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-17",
          permission: "Chỉnh sửa bộ môn",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-18",
          permission: "Xem ngành học",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-19",
          permission: "Tra cứu ngành học",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-20",
          permission: "Thêm mới ngành học",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-21",
          permission: "Xem người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-22",
          permission: "Tra cứu người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-23",
          permission: "Lọc người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-24",
          permission: "Thêm mới người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-25",
          permission: "Chỉnh sửa người dùng",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-26",
          permission: "Xem học phần",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-27",
          permission: "Tra cứu học phần",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-28",
          permission: "Import học phần từ excel",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-29",
          permission: "Phần quyền",
          userPermission: false,
          khoaPermission: false,
        },
        {
          key: "3-30",
          permission: "Quản lý thời gian",
          userPermission: false,
          khoaPermission: false,
        },
      ],
    },
  ];

  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = data.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (!formData.code || !formData.permission) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    console.log("New group added:", formData);
    setIsModalVisible(false);
    message.success("Nhóm người dùng đã được thêm.");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, key, permissionType) => {
    const checked = e.target.checked;
    const updatedData = data.map((item) => {
      if (item.key === key) {
        // Nếu là "Trang cá nhân", áp dụng cho tất cả quyền con
        if (item.permission === "Trang cá nhân") {
          item.children = item.children.map((child) => ({
            ...child,
            [permissionType]: checked, // Đánh dấu tất cả quyền con
          }));
        }
        return { ...item, [permissionType]: checked };
      }
      if (item.children) {
        item.children = item.children.map((child) => {
          if (child.key === key) {
            return { ...child, [permissionType]: checked };
          }
          return child;
        });
      }
      return item;
    });
    console.log("Updated data:", updatedData);
  };

  const toggleExpandedRow = (recordKey) => {
    setExpandedRows((prev) => {
      const newExpandedRows = { ...prev };
      if (newExpandedRows[recordKey]) {
        delete newExpandedRows[recordKey]; // Nếu đã mở, thu lại
      } else {
        newExpandedRows[recordKey] = true; // Nếu đóng, mở ra
      }
      return newExpandedRows;
    });
  };

  const columns = [
    {
      title: "Tên quyền",
      dataIndex: "permission",
      key: "permission",
      render: (text, record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggleExpandedRow(record.key)}
        >
          {record.permission}
        </div>
      ),
    },
    {
      title: "User",
      key: "userPermission",
      render: (text, record) => {
        return (
          <Checkbox
            checked={record.userPermission}
            onChange={(e) =>
              handleCheckboxChange(e, record.key, "userPermission")
            }
          />
        );
      },
    },
    {
      title: "Khoa",
      key: "khoaPermission",
      render: (text, record) => {
        return (
          <Checkbox
            checked={record.khoaPermission}
            onChange={(e) =>
              handleCheckboxChange(e, record.key, "khoaPermission")
            }
          />
        );
      },
    },
  ];

  const onExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  return (
    <>
      <Header title={"QUẢN LÝ PHÂN QUYỀN"} />
      <div className="container-page-permission">
        <div className="header-permission">
          <h3 className="title-permission">Quản lý phân quyền</h3>
          <div className="btn-right">
            <button className="btn-add-group-user" onClick={showModal}>
              <IoAdd /> <span>Thêm mới</span>
            </button>
            <button className="btn-save-permission">Lưu thay đổi</button>
          </div>
        </div>
        <div className="table-content">
          <Table
            columns={columns}
            dataSource={currentPageData}
            pagination={{
              current: currentPage,
              pageSize,
              onChange: handlePageChange,
            }}
            expandable={{
              expandedRowRender,
              onExpand,
              expandedRowKeys: Object.keys(expandedRows),
            }}
          />
        </div>
      </div>

      {/* Modal for adding a new user group */}
      <Modal
        title="Thêm Nhóm Người Dùng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Lưu
          </Button>,
        ]}
      >
        <div>
          <Input
            placeholder="Mã nhóm người dùng"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Input
            placeholder="Nhóm người dùng"
            name="permission"
            value={formData.permission}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Input
            placeholder="Mô tả"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default ManagePermission;
