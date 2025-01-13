import { Input, Table } from "antd";
import Header from "../Header/Header";
import "./SimilarCourse.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getSJ } from "../../services/apiServices";

const SimilarCourse = () => {
  // Dữ liệu mẫu cho bảng học phần
  const initialData = [
    {
      key: "1",
      code: "CS101",
      name: "Nhập môn CNTT",
      credit: 3,
      ltHours: 30,
      thHours: 15,
      prerequisite: "None",
      equivalent: "CS201",
      coefficient: 1.5,
      department: "CNTT",
    },
    {
      key: "2",
      code: "CS102",
      name: "Lập trình C++",
      credit: 4,
      ltHours: 40,
      thHours: 20,
      prerequisite: "CS101",
      equivalent: "CS202",
      coefficient: 2,
      department: "CNTT",
    },
    {
      key: "3",
      code: "SE101",
      name: "Nhập môn KTPM",
      credit: 3,
      ltHours: 30,
      thHours: 15,
      prerequisite: "None",
      equivalent: "SE201",
      coefficient: 1.5,
      department: "Phần mềm",
    },
    {
      key: "4",
      code: "IT101",
      name: "Nhập môn mạng",
      credit: 3,
      ltHours: 30,
      thHours: 15,
      prerequisite: "None",
      equivalent: "IT201",
      coefficient: 1.5,
      department: "Mạng",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);
  const [apiData, setApiData] = useState([]);
  const [equivalentData, setEquivalentData] = useState([]); // State mới để lưu dữ liệu học phần tương đương

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSJ();
      if (res && res.value) {
        const transformedData = res.value.map((item) => ({
          key: item.id.toString(),
          code: item.subjectId,
          name: item.subjectName,
          credit: item.credits,
          ltHours: item.theoreticalHours,
          thHours: item.practicalHours,
          prerequisite: item.prerequisiteCourses
            ? item.prerequisiteCourses
                .map((course) => course.subjectName)
                .join(", ")
            : "None",
          equivalent: item.equivalentCourses
            ? item.equivalentCourses
                .map((course) => course.subjectId)
                .join(", ")
            : "None",
          coefficient: item.coefficient,
          department: item.department ? item.department.name : "Unknown",
        }));
        setApiData(transformedData); // Cập nhật dữ liệu học phần
        setFilteredData(transformedData); // Cập nhật dữ liệu học phần tìm kiếm
      }
    };

    fetchData();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    // Lọc dữ liệu học phần theo tên, mã học phần hoặc khoa/bộ môn
    const filtered = apiData.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.code.toLowerCase().includes(value) ||
        item.department.toLowerCase().includes(value)
    );
    setFilteredData(filtered);

    // Lọc dữ liệu học phần tương đương theo mã học phần
    const equivalentFiltered = filtered
      .map((item) => {
        return initialData.find(
          (equivalentItem) => equivalentItem.code === item.equivalent
        );
      })
      .filter(Boolean); // Lọc bỏ các giá trị không hợp lệ
    setEquivalentData(equivalentFiltered); // Cập nhật dữ liệu học phần tương đương
  };

  // Cột cho bảng học phần
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
  ];

  // Cột cho bảng học phần tương đương
  const equivalentColumns = [
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
      title: "Hệ số",
      dataIndex: "coefficient",
      key: "coefficient",
    },
    {
      title: "Khoa/Bộ môn",
      dataIndex: "department",
      key: "department",
    },
  ];

  return (
    <>
      <Header title={"HỌC PHẦN TƯƠNG ỨNG"} />
      <div className="container-page-similar-course">
        {/* Phần tìm kiếm */}
        <div className="search-contain">
          <div className="title-selected">Học phần</div>
          <div className="search">
            <Input
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              placeholder="Tên học phần, mã học phần"
              size={"large"}
              style={{ border: "rgb(145, 7, 7) solid 1px" }}
            />
          </div>
        </div>

        {/* Phần hiển thị bảng học phần */}
        <div className="similar-contain">
          <div className="title-similar">Học phần</div>
          <div className="table-similar">
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>

        {/* Phần hiển thị bảng học phần tương đương */}
        <div className="similar-sample-contain">
          <div className="title-similar-sample">Học phần tương đương</div>
          <div className="table-similar-sample">
            <Table
              columns={equivalentColumns}
              dataSource={equivalentData}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarCourse;
