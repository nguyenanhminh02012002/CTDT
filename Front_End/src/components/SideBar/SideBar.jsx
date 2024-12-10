import { Link } from "react-router";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <div className="container-sidebar">
      <div className="manager-category">
        <div className="title">Quản lý Danh mục</div>
        <div className="manager">
          <div className="manager-children">Quản lý Khoa</div>
          <div className="manager-children">Quản lý Bộ môn</div>
          <div className="manager-children">Quản lý Ngành học</div>
          <div className="manager-children">Quản lý Năm học/Khoá</div>
          <div className="manager-children">Quản lý Học phần</div>
          <div className="manager-children">Danh mục Khối kiến thức</div>
          <div className="manager-children">Danh mục Chương trình Đào tạo</div>
        </div>
      </div>
      <div className="manager-training-program">
        <div className="title">Quản lý Chương trình Đào tạo</div>
        <div className="manager">
          <div className="manager-children">Quản lý Chương trình Đào tạo</div>
        </div>
      </div>
      <div className="administration">
        <div className="title">Quản trị</div>
        <div className="manager">
          <div className="manager-children">
            <Link>Quản lý Đơn vị</Link>
          </div>
          <div className="manager-children">
            <Link>Quản lý Người dùng</Link>
          </div>
          <div className="manager-children">
            <Link>Quản lý Tài khoản Người dùng</Link>
          </div>
          <div className="manager-children">
            <Link to={"/manage-permission"}>Quản lý Nhóm quyền</Link>
          </div>
        </div>
      </div>
      <div className="report">
        <div className="title">Báo cáo Thống kê</div>
        <div className="manager">
          <div className="manager-children">Báo cáo</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
