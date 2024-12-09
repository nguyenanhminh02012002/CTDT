import "./App.scss";

import { Layout } from "antd";
import HeaderPage from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { Outlet } from "react-router";
import ModalLogout from "./components/Modal/ModalLogout";
import ModalAddPermission from "./components/Modal/ModalAddPermission";

const { Sider, Content } = Layout;

const siderStyle = {
  backgroundColor: "#fff",
};

function App() {
  return (
    <>
      <Layout>
        <HeaderPage />
        <Layout>
          <Sider width="25%" style={siderStyle}>
            <SideBar />
          </Sider>
          <Content>
            <Outlet />
            <ModalLogout />
          </Content>
        </Layout>
      </Layout>
      <ModalAddPermission />
    </>
  );
}

export default App;
