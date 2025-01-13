import { useEffect, useState } from "react";
import { Input, Select, Table, Button, Spin, Modal, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoAdd } from "react-icons/io5";
import Header from "../Header/Header";
import "./ManageCourse.scss";
import { getSJ, getSJNew, addSJ } from "../../services/apiServices";

const ManageCourse = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({
    subjectId: "",
    subjectName: "",
    credits: 0,
    theoreticalHours: 0,
    practicalHours: 0,
    prerequisiteCourses: [], // Mảng chứa môn đăng ký
    equivalentCourses: [], // Mảng chứa môn tương đương
    coefficient: 0,
    departmentId: null,
  });

  const fetchData = async (filter) => {
    setLoading(true);
    try {
      const res = filter === "new" ? await getSJNew() : await getSJ();
      if (res?.value?.length > 0) {
        const formattedCourses = res.value.map((course, index) => ({
          key: index + 1,
          code: course.subjectId,
          name: course.subjectName,
          credit: course.credits,
          ltHours: course.theoreticalHours,
          thHours: course.practicalHours,
          prerequisite: course.prerequisiteCourses
            ? course.prerequisiteCourses.map((p) => p.subjectName).join(", ")
            : "None",
          equivalent: course.equivalentCourses
            ? course.equivalentCourses.map((e) => e.subjectName).join(", ")
            : "None",
          coefficient: course.coefficient,
          department: course.department?.name || "Không xác định",
          isNew: new Date(course.createdAt) > new Date("2024-01-01"),
        }));
        setCourses(formattedCourses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(selectedFilter);
  }, [selectedFilter]);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleSelectChange = (value) => {
    setSelectedFilter(value);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      (course.code && course.code.toLowerCase().includes(searchText)) ||
      (course.name && course.name.toLowerCase().includes(searchText)) ||
      (course.department &&
        course.department.toLowerCase().includes(searchText));

    return matchesSearch;
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã học phần",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên học phần",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số TC",
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: "Số giờ (LT)",
      dataIndex: "ltHours",
      key: "ltHours",
    },
    {
      title: "Số giờ (TH)",
      dataIndex: "thHours",
      key: "thHours",
    },
    {
      title: "Học phần tiên quyết",
      dataIndex: "prerequisite",
      key: "prerequisite",
    },
    {
      title: "Học phần tương đương",
      dataIndex: "equivalent",
      key: "equivalent",
    },
    {
      title: "Hệ số",
      dataIndex: "coefficient",
      key: "coefficient",
    },
    {
      title: "Khoa/Bộ môn",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Hoạt động",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link" icon={<SearchOutlined />} />
          <Button type="link" icon={<IoAdd />} />
        </div>
      ),
    },
  ];

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleSave = async () => {
    newCourse.departmentId = Number(newCourse.departmentId);

    const {
      subjectId,
      subjectName,
      credits,
      theoreticalHours,
      practicalHours,
      prerequisiteCourses,
      equivalentCourses,
      coefficient,
      departmentId,
    } = newCourse;

    try {
      const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

      const response = await fetch("https://qlctt.kain.id.vn/subject/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
        body: JSON.stringify({
          subjectId,
          subjectName,
          credits,
          theoreticalHours,
          practicalHours,
          prerequisiteCourses,
          equivalentCourses,
          coefficient,
          departmentId,
        }),
      });

      const data = await response.json(); // Lấy dữ liệu từ phản hồi

      if (data?.id) {
        const newCourseAdded = {
          key: courses.length + 1, // Assuming courses' keys are sequential
          code: subjectId,
          name: subjectName,
          credit: credits,
          ltHours: theoreticalHours,
          thHours: practicalHours,
          prerequisite: prerequisiteCourses.join(", "),
          equivalent: equivalentCourses.join(", "),
          coefficient,
          department: departmentId, // Assume department is passed as ID or name
        };

        setCourses((prevCourses) => [...prevCourses, newCourseAdded]);
        setIsModalVisible(false);

        // Thông báo thành công
        message.success("Thêm học phần thành công!");

        // Reset form sau khi lưu
        setNewCourse({
          subjectId: "",
          subjectName: "",
          credits: 0,
          theoreticalHours: 0,
          practicalHours: 0,
          prerequisiteCourses: [],
          equivalentCourses: [],
          coefficient: 0,
          departmentId: null,
        });
      } else {
        message.error("Thêm học phần thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm học phần:", error);
      message.error("Thêm học phần thất bại!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name, value) => {
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPrerequisiteChange = (value) => {
    setNewCourse((prev) => ({ ...prev, prerequisiteCourses: value }));
  };

  const handleSelectEquivalentChange = (value) => {
    setNewCourse((prev) => ({ ...prev, equivalentCourses: value }));
  };

  return (
    <>
      <Header title={"QUẢN LÝ HỌC PHẦN"} />
      <div className="container-page-manage-course">
        <div className="header-contain">
          <div className="title-header">Quản lý Học phần</div>
          <div className="right-action">
            <div className="search-username">
              <Input
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
                placeholder="Tìm kiếm học phần"
                size={"large"}
                style={{ border: "rgb(145, 7, 7) solid 1px" }}
              />
            </div>
            <button className="btn" onClick={showModal}>
              <IoAdd /> <span>Thêm mới</span>
            </button>
          </div>
        </div>
        <div className="content">
          <div className="time-change-course">
            Thời gian chỉnh sửa Học phần:{" "}
            <p className="time-red">
              {"23/12/2024"} - {"15/01/2025"}
            </p>
          </div>
          <div className="selected">
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              onChange={handleSelectChange}
            >
              <Select.Option value="all">Tất cả các học phần</Select.Option>
              <Select.Option value="new">Học phần mới</Select.Option>
            </Select>
          </div>
          <div className="table-info">
            {loading ? (
              <Spin tip="Đang tải dữ liệu..." />
            ) : (
              <Table
                columns={columns}
                dataSource={filteredCourses}
                pagination={{ pageSize: 5 }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal thêm học phần mới */}
      <Modal
        title="Thêm mới học phần"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Lưu"
        cancelText="Hủy"
      >
        <div className="form-add-course">
          <label>Mã học phần</label>
          <Input
            name="subjectId"
            value={newCourse.subjectId}
            onChange={handleInputChange}
            placeholder="Mã học phần"
            style={{ marginBottom: "10px" }}
          />
          <label>Tên học phần</label>
          <Input
            name="subjectName"
            value={newCourse.subjectName}
            onChange={handleInputChange}
            placeholder="Tên học phần"
            style={{ marginBottom: "10px" }}
          />
          <label>Số tín chỉ</label>
          <Input
            type="number"
            name="credits"
            value={newCourse.credits}
            onChange={(e) => handleNumberChange("credits", +e.target.value)}
            placeholder="Số tín chỉ"
            style={{ marginBottom: "10px" }}
          />
          <label>Số giờ lý thuyết</label>
          <Input
            type="number"
            name="theoreticalHours"
            value={newCourse.theoreticalHours}
            onChange={(e) =>
              handleNumberChange("theoreticalHours", +e.target.value)
            }
            placeholder="Số giờ lý thuyết"
            style={{ marginBottom: "10px" }}
          />
          <label>Số giờ thực hành</label>
          <Input
            type="number"
            name="practicalHours"
            value={newCourse.practicalHours}
            onChange={(e) =>
              handleNumberChange("practicalHours", +e.target.value)
            }
            placeholder="Số giờ thực hành"
            style={{ marginBottom: "10px" }}
          />
          <label>Học phần tiên quyết</label>
          <Select
            mode="multiple"
            value={newCourse.prerequisiteCourses}
            onChange={handleSelectPrerequisiteChange}
            placeholder="Chọn học phần tiên quyết"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            {courses.map((course) => (
              <Select.Option key={course.code} value={course.name}>
                {course.name}
              </Select.Option>
            ))}
          </Select>

          <label>Học phần tương đương</label>
          <Select
            mode="multiple"
            value={newCourse.equivalentCourses}
            onChange={handleSelectEquivalentChange}
            placeholder="Chọn học phần tương đương"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            {courses.map((course) => (
              <Select.Option key={course.code} value={course.name}>
                {course.name}
              </Select.Option>
            ))}
          </Select>

          <label>Hệ số</label>
          <Input
            type="number"
            name="coefficient"
            value={newCourse.coefficient}
            onChange={(e) => handleNumberChange("coefficient", +e.target.value)}
            placeholder="Hệ số"
            style={{ marginBottom: "10px" }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ManageCourse;
