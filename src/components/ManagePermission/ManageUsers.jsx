import "./ManageUsers.scss";
import {
  AppstoreAddOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Table, Select, Button, Popover, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionAddUser } from "../../store";
import Header from "../Header/Header";
import { getUsers } from "../../services/apiServices";
import "./ManageUsers.scss";

const ManageUsers = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [isDot, setIsDot] = useState(false);
  const [userGroupFilter, setUserGroupFilter] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState(null);
  const pageSize = 5;
  const dispatch = useDispatch();
  const isSuccessData = useSelector((state) => state.addUser.isSuccessData);
  const [api, contextHolder] = notification.useNotification();

  // Gọi API để lấy dữ liệu người dùng
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers();
        if (res && res.value) {
          const transformedData = res.value.map((user, index) => ({
            key: user.id,
            code: user.userId,
            username: `${user.firstName} ${user.lastName}`,
            usergroup: user.role?.roleName || "N/A",
            department: user.department || "N/A",
            email: user.email,
          }));
          setData(transformedData);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data
    .filter((item) => {
      const searchValue = searchText.toLowerCase();
      return (
        item.username.toLowerCase().includes(searchValue) ||
        item.code.toLowerCase().includes(searchValue) ||
        item.usergroup.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue)
      );
    })
    .filter((item) => {
      return (
        (userGroupFilter ? item.usergroup === userGroupFilter : true) &&
        (departmentFilter ? item.department === departmentFilter : true)
      );
    });

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "Mã", dataIndex: "code", key: "code" },
    { title: "Tên người dùng", dataIndex: "username", key: "username" },
    { title: "Nhóm người dùng", dataIndex: "usergroup", key: "usergroup" },
    { title: "Khoa", dataIndex: "department", key: "department" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = () => {
    setIsFilter(!isFilter);
    setIsDot(true);
  };

  const handleReset = () => {
    setUserGroupFilter(null);
    setDepartmentFilter(null);
    setIsFilter(false);
    setIsDot(false);
  };

  const filterContent = (
    <div className="filter-dropdown">
      <div className="filter-title">Bộ lọc</div>
      <div className="filter-item">
        <div>Nhóm người dùng:</div>
        <Select
          style={{ width: 200 }}
          value={userGroupFilter}
          onChange={setUserGroupFilter}
        >
          <Select.Option value="Admin">Admin</Select.Option>
          <Select.Option value="Lecturer">Lecturer</Select.Option>
        </Select>
      </div>
      <div className="filter-item">
        <div>Khoa:</div>
        <Select
          style={{ width: 200 }}
          value={departmentFilter}
          onChange={setDepartmentFilter}
        >
          <Select.Option value="Toán - Tin">Toán - Tin</Select.Option>
          <Select.Option value="Hóa học">Hóa học</Select.Option>
        </Select>
      </div>
      <div className="filter-actions">
        <Button onClick={handleReset}>Hủy</Button>
        <Button className="btn-filter" onClick={handleFilter}>
          Lọc
        </Button>
      </div>
    </div>
  );

  const openNotification = () => {
    if (isSuccessData) {
      api.success({
        message: "Thành công",
        description: "Thêm mới Người dùng thành công",
        placement: "topLeft",
      });
    }
  };

  useEffect(() => {
    openNotification();
  }, [isSuccessData]);

  const handleAddUser = () => {
    dispatch(actionAddUser.isShowModal());
    if (isSuccessData) dispatch(actionAddUser.isSuccessData());
  };

  return (
    <>
      <Header title={"QUẢN LÝ NGƯỜI DÙNG"} />
      <div className="manage-users">
        {contextHolder}

        <div className="btn-add">
          <div className="search-username">
            <Input
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Tên người dùng"
              size={"large"}
            />
          </div>
          <div className="actions">
            <Popover
              content={filterContent}
              trigger="click"
              open={isFilter}
              placement="bottomRight"
            >
              <button
                className={`filter-button ${
                  userGroupFilter || departmentFilter ? "active" : ""
                }`}
                onClick={() => setIsFilter(!isFilter)}
              >
                <FilterOutlined />
                {isDot && <div className="dot-red"></div>}
              </button>
            </Popover>
            <button className="btn" onClick={handleAddUser}>
              <AppstoreAddOutlined /> <span>Thêm mới</span>
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
            locale={{ emptyText: "Không có dữ liệu" }}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
