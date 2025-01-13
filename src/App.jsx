import "./App.scss";

import { Layout } from "antd";
import SideBar from "./components/SideBar/SideBar";
import { Outlet } from "react-router";
import ModalLogout from "./components/Modal/ModalLogout";
import ModalAddPermission from "./components/Modal/ModalAddPermission";
import ModalAddUnit from "./components/Modal/ModalAddClass";
import ModalAddUser from "./components/Modal/ModalAddUser";

const { Sider, Content } = Layout;

const siderStyle = {
  backgroundColor: "#fff",
};

function App() {
  return (
    <div className="layout-container">
      <Layout>
        <Sider className="layout-sider" width="20%" style={siderStyle}>
          <SideBar />
        </Sider>
        <Layout className="layout-main-content">
          <Content className="layout-content">
            <Outlet />
          </Content>
          <ModalLogout />
        </Layout>
      </Layout>
      <ModalAddPermission />
      <ModalAddUnit />
      <ModalAddUser />
    </div>
  );
}

export default App;
