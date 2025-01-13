import { Select, Table } from "antd";
import Header from "../Header/Header";
import "./ProgramTraining.scss";
import { useEffect, useState } from "react";
import { getKeys, getMajor } from "../../services/apiServices"; // Giả sử đây là hàm lấy dữ liệu khóa học và ngành học

const { Option } = Select;

const ProgramTraining = () => {
  const [data, setData] = useState([]); // Dữ liệu khóa học
  const [majorData, setMajorData] = useState([]); // Dữ liệu ngành học
  const [selectedCourse, setSelectedCourse] = useState(null); // Khóa học đã chọn
  const [selectedMajor, setSelectedMajor] = useState(null); // Ngành học đã chọn
  const [tableData, setTableData] = useState({}); // Dữ liệu cho bảng
  const [loading, setLoading] = useState(false); // Để kiểm soát trạng thái loading

  // Fetch dữ liệu khóa học
  const fetchData = async () => {
    try {
      const res = await getKeys();
      if (res?.value) {
        const formattedData = res.value.map((item) => ({
          key: item.id,
          schoolYearId: item.schoolYearId, // schoolYearId là kiểu string
          name: item.schoolYearName, // schoolYearName sẽ hiển thị trong Select
          startYear: new Date(item.startYear).getFullYear(),
          endYear: new Date(item.endYear).getFullYear(),
        }));
        setData(formattedData); // Lưu dữ liệu vào state
        if (formattedData.length > 0) {
          setSelectedCourse(formattedData[0].schoolYearId); // Mặc định chọn khóa đầu tiên
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khóa:", error);
    }
  };

  // Fetch dữ liệu ngành học
  const fetchMajorData = async () => {
    try {
      const res = await getMajor();
      if (res?.value) {
        const formattedData = res.value.map((item, index) => ({
          key: index + 1,
          id: item.id, // Thêm id để phục vụ cho việc chỉnh sửa
          code: item.majorId,
          name: item.majorName, // majorName hiển thị trong Select
        }));
        setMajorData(formattedData); // Lưu dữ liệu ngành học vào state
        if (formattedData.length > 0) {
          setSelectedMajor(formattedData[0].majorId); // Mặc định chọn ngành học đầu tiên
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu ngành học:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Lấy dữ liệu khóa học
    fetchMajorData(); // Lấy dữ liệu ngành học
  }, []);

  // Cột của bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
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
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Số giờ (LT + TH)",
      dataIndex: "hours",
      key: "hours",
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
      dataIndex: "factor",
      key: "factor",
    },
    {
      title: "Khoa/Bộ môn",
      dataIndex: "department",
      key: "department",
    },
  ];

  return (
    <>
      <Header title={"CHƯƠNG TRÌNH ĐÀO TẠO"} />
      <div className="container-page-program-course">
        <div className="selected">
          {/* Select khóa */}
          <div className="selected-course">
            <div className="title">Khoá</div>
            <div className="selected">
              <Select
                value={selectedCourse} // Giá trị khóa học hiện tại
                onChange={(value) => setSelectedCourse(value)} // Cập nhật khóa học khi chọn
                style={{ width: 200 }}
              >
                {data.map((item) => (
                  <Option key={item.schoolYearId} value={item.schoolYearId}>
                    {item.name} ({item.startYear} - {item.endYear})
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {/* Select chương trình đào tạo */}
          <div className="selected-major">
            <div className="title">Chương trình đào tạo</div>
            <div className="selected">
              <Select
                value={selectedMajor} // Giá trị ngành học hiện tại
                onChange={(value) => setSelectedMajor(value)} // Cập nhật ngành học khi chọn
                style={{ width: 200 }}
              >
                {majorData.map((item) => (
                  <Option key={item.majorId} value={item.majorId}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Bảng hiển thị dữ liệu */}
        <div className="table">
          <h3 className="title-table">Chương trình đào tạo Ngành</h3>
          <div className="content-table">
            {loading ? (
              <div>Loading...</div> // Hiển thị khi đang tải
            ) : (
              <Table
                columns={columns}
                dataSource={tableData[selectedCourse] || []}
                pagination={{ pageSize: 5 }}
                rowKey="key"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramTraining;
