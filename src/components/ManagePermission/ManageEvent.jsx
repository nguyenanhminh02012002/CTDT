import { DatePicker, Select, Table, Button } from "antd";
import Header from "../Header/Header";
import "./ManageEvent.scss";
import { useEffect, useState } from "react";
import { getEvent, addEvent, getKeys } from "../../services/apiServices";

const ManageEvent = () => {
  const [events, setEvents] = useState([]); // Bắt đầu với mảng rỗng
  const [error, setError] = useState(""); // Thêm state lỗi
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [courses, setCourses] = useState([]); // State mới để lưu danh sách các khóa học
  const [successMessage, setSuccessMessage] = useState(""); // Thêm state để lưu thông báo thành công

  const fetchData = async () => {
    try {
      const res = await getKeys(); // Gọi API lấy khóa học
      if (res?.value) {
        const formattedData = res.value.map((item) => ({
          key: item.id,
          name: item.schoolYearName, // Lấy tên khóa học
        }));
        setCourses(formattedData); // Cập nhật danh sách khóa học
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khóa:", error);
      setError("Lỗi khi tải danh sách khóa học.");
    }
  };

  useEffect(() => {
    fetchData(); // Gọi API khi component mount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEvent();
        if (res.statusCode === 401) {
          setError("Unauthorized access. Please log in again.");
        } else {
          const formattedEvents = res.value.map((event) => ({
            key: event.id,
            eventName: event.eventType,
            startDate: event.startTime,
            endDate: event.endTime,
            status: event.eventStatus ? "Active" : "Inactive",
            course: event.schoolYear,
            eventType: event.eventType,
          }));
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sự kiện:", error);
        setError("Lỗi khi tải danh sách sự kiện.");
      }
    };
    fetchData();
  }, []); // Chỉ gọi API 1 lần khi component mount

  const eventTypes = [
    "UpdateProgramDraft",
    "UpdateProgramRequest",
    "ApproveRequest",
    "UpdateSubject",
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text) => <>{text}</>,
    },
    {
      title: "Sự kiện",
      dataIndex: "eventName",
      render: (text) => <>{text}</>,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      render: (text) => <>{new Date(text).toLocaleString()}</>, // Định dạng thời gian đầy đủ
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      render: (text) => <>{new Date(text).toLocaleString()}</>, // Định dạng thời gian đầy đủ
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => {
        let statusClass = "";
        if (text === "Active") {
          statusClass = "status-active";
        } else if (text === "Inactive") {
          statusClass = "status-completed";
        } else {
          statusClass = "status-upcoming"; // Chưa diễn ra
        }

        return <span className={statusClass}>{text}</span>;
      },
    },
    {
      title: "Khóa học",
      dataIndex: "course", // Thêm cột khóa học
      render: (schoolYearId) => {
        const course = courses.find((course) => course.key === schoolYearId); // Tìm khóa học theo ID
        return <>{course ? course.name : "N/A"}</>; // Hiển thị tên khóa học
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          disabled={record.status === "Inactive"}
          onClick={() => handleDisable(record.key)}
        >
          Disable
        </Button>
      ),
    },
  ];

  const handleDisable = async (key) => {
    try {
      const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

      if (!token) {
        setError("Chưa đăng nhập hoặc token không hợp lệ.");
        return;
      }

      // Gọi API PATCH để tắt sự kiện
      const response = await fetch(
        `https://qlctt.kain.id.vn/event/disable/${key}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Sử dụng token từ localStorage
          },
        }
      );

      if (response.status === 200) {
        const updatedEvents = events.map((event) =>
          event.key === key ? { ...event, status: "Inactive" } : event
        );
        setEvents(updatedEvents); // Cập nhật lại trạng thái sự kiện
        setSuccessMessage("Sự kiện đã được tắt thành công."); // Thông báo thành công
        setError(""); // Xóa thông báo lỗi
      } else {
        setError("Đã xảy ra lỗi khi tắt sự kiện.");
      }
    } catch (error) {
      setError("Đã xảy ra lỗi.");
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!selectedEventType || !startDate || !endDate || !selectedCourse) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const schoolYearId = courses.find(
        (course) => course.name === selectedCourse
      )?.key; // Lấy ID của khóa học từ tên khóa học

      const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

      if (!token) {
        setError("Chưa đăng nhập hoặc token không hợp lệ.");
        return;
      }

      const response = await fetch("https://qlctt.kain.id.vn/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sử dụng token từ localStorage
        },
        body: JSON.stringify({
          eventType: selectedEventType,
          startTime: startDate.toISOString(), // Chuyển đổi ngày sang định dạng ISO string
          endTime: endDate.toISOString(),
          schoolYearId: Number(schoolYearId),
        }),
      });

      const res = await response.json();

      if (response.status === 201) {
        setEvents([
          ...events,
          {
            key: res.id,
            eventName: res.eventType,
            startDate: res.startTime,
            endDate: res.endTime,
            status: res.eventStatus ? "Active" : "Inactive",
            course: res.schoolYear,
            eventType: res.eventType,
          },
        ]);
        setSuccessMessage("Sự kiện đã được thêm thành công.");
        setError(""); // Clear error
      } else {
        setError("Đã xảy ra lỗi khi thêm sự kiện.");
      }
    } catch (error) {
      setError("Đã xảy ra lỗi.");
      console.error(error);
    }
  };

  return (
    <>
      <Header title={"QUẢN LÝ SỰ KIỆN"} />
      <div className="container-page-manage-event">
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Hiển thị thông báo lỗi */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}{" "}
        {/* Hiển thị thông báo thành công */}
        <div className="header-event">
          <h3 className="title-event">Quản lý thời gian</h3>
          <div className="content-header">
            <div className="selected">
              <Select
                className="selected-course"
                placeholder="Chọn khóa học"
                value={selectedCourse}
                onChange={setSelectedCourse}
                options={courses.map((course) => ({
                  label: course.name,
                  value: course.name,
                }))}
              />
              <Select
                className="selected-event"
                placeholder="Chọn sự kiện"
                value={selectedEventType}
                onChange={setSelectedEventType}
                options={eventTypes.map((eventType) => ({
                  label: eventType,
                  value: eventType,
                }))}
              />
              <DatePicker
                className="date-start"
                placeholder="Ngày bắt đầu"
                onChange={(date) => setStartDate(date)}
              />
              <DatePicker
                className="date-end"
                placeholder="Ngày kết thúc"
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <button className="btn-save" onClick={handleSave}>
              SAVE
            </button>
          </div>
        </div>
        <div className="content-page">
          <Table columns={columns} dataSource={events} />
        </div>
      </div>
    </>
  );
};

export default ManageEvent;
