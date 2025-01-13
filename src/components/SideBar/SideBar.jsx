import { FaUser } from "react-icons/fa";
import { PiListBulletsFill } from "react-icons/pi";
import { MdOutlineBalance, MdOutlineCellWifi } from "react-icons/md";
import { BsFillPatchCheckFill, BsListColumns } from "react-icons/bs";
import { MdOutlineClass } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { PiTreeView } from "react-icons/pi";
import { FiBook } from "react-icons/fi";
import { TbUserExclamation } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { RiCalendar2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserCurrent } from "../../services/apiServices";
import "./SideBar.scss";
import logo from "../../assets/logo.jfif";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="container-sidebar">
      <div className="logo-page">
        <img src={logo} alt="Logo" />
      </div>

      <div className="info-user">
        <FaUser className="icon-user" />
        <div className="info">
          {userInfo ? (
            <>
              <h3 className="name">{`${userInfo.firstName} ${userInfo.lastName}`}</h3>
              <p className="msv">{userInfo.userId}</p>
              <p className="role">{userInfo.role.roleName}</p>
            </>
          ) : (
            <p>Đang tải thông tin...</p>
          )}
        </div>
      </div>
      <hr />

      <div className="manager-training-program">
        <div className="title">TRANG CÁ NHÂN</div>
        <div className="manager">
          <div
            className={`manager-children ${
              location.pathname === "/" ? "active" : ""
            }`}
            onClick={() => navigate("/")}
          >
            <FaUser className="icon" />
            <p>Thông tin cá nhân</p>
          </div>
        </div>
      </div>

      <div className="manager-training-program">
        <div className="title">TRA CỨU THÔNG TIN</div>
        <div className="manager">
          {userInfo?.role?.informationLookupRule?.viewProgram && (
            <div
              className={`manager-children ${
                location.pathname === "/training-program" ? "active" : ""
              }`}
              onClick={() => navigate("/training-program")}
            >
              <PiListBulletsFill className="icon" />
              <p>Chương trình đào tạo</p>
            </div>
          )}
          {userInfo?.role?.informationLookupRule?.viewEquivalentSubject && (
            <div
              className={`manager-children ${
                location.pathname === "/course-info" ? "active" : ""
              }`}
              onClick={() => navigate("/course-info")}
            >
              <MdOutlineBalance className="icon" />
              <p>Học phần tương ứng</p>
            </div>
          )}
          {userInfo?.role?.informationLookupRule?.sendApprovalRequest && (
            <div
              className={`manager-children ${
                location.pathname === "/request-approval" ? "active" : ""
              }`}
              onClick={() => navigate("/request-approval")}
            >
              <BsFillPatchCheckFill className="icon" />
              <p>Yêu cầu duyệt</p>
            </div>
          )}
        </div>
      </div>

      <div className="administration">
        <div className="title">QUẢN TRỊ</div>
        <div className="manager">
          {userInfo?.role?.administrationRule?.viewClass && (
            <div
              className={`manager-children ${
                location.pathname === "/manage-specialize" ? "active" : ""
              }`}
              onClick={() => navigate("/manage-specialize")}
            >
              <MdOutlineClass />
              <p>Quản lý Lớp chuyên ngành</p>
            </div>
          )}
          {userInfo?.role?.administrationRule?.viewSchoolYear && (
            <div
              className={`manager-children ${
                location.pathname === "/manage-key" ? "active" : ""
              }`}
              onClick={() => navigate("/manage-key")}
            >
              <RiCalendar2Line />
              <p>Quản lý Khoá</p>
            </div>
          )}
          {userInfo?.role?.administrationRule?.viewUserGroup && (
            <div
              className={`manager-children ${
                location.pathname === "/manage-group-users" ? "active" : ""
              }`}
              onClick={() => navigate("/manage-group-users")}
            >
              <TiGroupOutline />
              <p>Quản lý Nhóm người dùng</p>
            </div>
          )}
          {userInfo?.role?.administrationRule?.viewDepartment && (
            <div
              className={`manager-children ${
                location.pathname === "/manage-subject" ? "active" : ""
              }`}
              onClick={() => navigate("/manage-subject")}
            >
              <PiTreeView />
              <p>Quản lý Bộ môn</p>
            </div>
          )}
          {userInfo?.role?.administrationRule?.viewMajor && (
            <div
              className={`manager-children ${
                location.pathname === "/manage-industry" ? "active" : ""
              }`}
              onClick={() => navigate("/manage-industry")}
            >
              <FiBook />
              <p>Quản lý Ngành học</p>
            </div>
          )}
          {userInfo?.role?.administrationRule?.viewUser && (
            <div
              className={`manager-children ${
                location.pathname === "/manage-users" ? "active" : ""
              }`}
              onClick={() => navigate("/manage-users")}
            >
              <TbUserExclamation />
              <p>Quản lý Người dùng</p>
            </div>
          )}
          {userInfo?.role?.administrationRule?.viewSubject && (
            <div
              className={`manager-children ${
                location.pathname === "/manage-course" ? "active" : ""
              }`}
              onClick={() => navigate("/manage-course")}
            >
              <BsListColumns />
              <p>Quản lý Học phần</p>
            </div>
          )}
          {userInfo?.role?.administrationRule?.assignPermission && (
            <div
              className={`manager-children ${
                location.pathname === "/manage-permission" ? "active" : ""
              }`}
              onClick={() => navigate("/manage-permission")}
            >
              <MdOutlineCellWifi />
              <p>Quản lý Phân quyền</p>
            </div>
          )}
          {userInfo?.role?.administrationRule?.manageEvent && (
            <div
              className={`manager-children ${
                location.pathname === "/manage-event" ? "active" : ""
              }`}
              onClick={() => navigate("/manage-event")}
            >
              <IoCalendarOutline />
              <p>Quản lý Sự kiện</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
