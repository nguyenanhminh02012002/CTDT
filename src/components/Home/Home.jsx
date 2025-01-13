import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Home.scss";
import { getUserCurrent } from "../../services/apiServices";
import { FaUser } from "react-icons/fa";

const HomePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserCurrent();
        if (res?.id) {
          setUserInfo(res);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header title={"THÔNG TIN"} />
      <div className="container-info-user">
        {userInfo ? (
          <>
            <div className="info-left">
              <div className="icon-user">
                <FaUser className="icon-user" />
              </div>
              <h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
            </div>
            <div className="info-right">
              <div className="content-line">
                <p className="content-left">Mã sinh viên</p>
                <p className="content-right">{userInfo.userId || "N/A"}</p>
              </div>

              <div className="content-line">
                <p className="content-left">Họ tên</p>
                <p className="content-right">
                  {`${userInfo.firstName} ${userInfo.lastName}` || "N/A"}
                </p>
              </div>

              <div className="content-line">
                <p className="content-left">Giới tính</p>
                <p className="content-right">{userInfo.gender || "N/A"}</p>
              </div>

              <div className="content-line">
                <p className="content-left">Lớp sinh viên</p>
                <p className="content-right">{userInfo.class || "N/A"}</p>
              </div>

              <div className="content-line">
                <p className="content-left">Email</p>
                <p className="content-right">{userInfo.email || "N/A"}</p>
              </div>

              <div className="content-line">
                <p className="content-left">Ngành học cũ</p>
                <p className="content-right">{userInfo.pastMajor || "N/A"}</p>
              </div>

              <div className="content-line">
                <p className="content-left">Ngành học hiện tại</p>
                <p className="content-right">
                  {userInfo.currentMajor || "N/A"}
                </p>
              </div>

              <div className="content-line">
                <p className="content-left">Ngành học 2</p>
                <p className="content-right">{userInfo.secondMajor || "N/A"}</p>
              </div>

              <div className="content-line">
                <p className="content-left">Khoá</p>
                <p className="content-right">{userInfo.schoolYear || "N/A"}</p>
              </div>

              <div className="content-line">
                <p className="content-left">Chức vụ</p>
                <p className="content-right">{userInfo.position || "N/A"}</p>
              </div>

              <div className="content-line">
                <p className="content-left">Vai trò</p>
                <p className="content-right">
                  {userInfo.role?.roleName || "N/A"}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>Đang tải dữ liệu người dùng...</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
