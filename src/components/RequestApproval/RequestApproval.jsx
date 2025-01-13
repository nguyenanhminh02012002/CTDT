import "./RequestApproval.scss";
import HeaderPage from "../Header/Header";
import { useState } from "react";
import { Menu, Table, Button, Tag, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const RequestApproval = () => {
  const items = [
    {
      label: "DRAFT",
      key: "draft",
    },
    {
      label: "YÊU CẦU DUYỆT",
      key: "approval-request",
    },
    {
      label: "LỊCH SỬ DUYỆT",
      key: "approval-history",
    },
  ];

  const [current, setCurrent] = useState("draft");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const draftColumns = [
    {
      title: "Tên CTDT",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khóa",
      dataIndex: "term",
      key: "term",
    },
    {
      title: "Người tạo",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: () => <Tag color="blue">Yêu cầu duyệt</Tag>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => console.log("Edit", record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => console.log("Delete", record)}
          />
        </Space>
      ),
    },
  ];

  const approvalColumns = [
    {
      title: "Tên CTDT",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khóa",
      dataIndex: "term",
      key: "term",
    },
    {
      title: "Người tạo",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hoạt động",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => console.log("Edit", record)}
        />
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => console.log("Duyệt", record)}>
            Duyệt
          </Button>
          <Button danger onClick={() => console.log("Từ chối", record)}>
            Từ chối
          </Button>
        </Space>
      ),
    },
  ];

  const historyColumns = [
    {
      title: "Tên CTDT",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khóa",
      dataIndex: "term",
      key: "term",
    },
    {
      title: "Người tạo",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Người duyệt",
      dataIndex: "approver",
      key: "approver",
    },
    {
      title: "Thời gian duyệt",
      dataIndex: "approvedAt",
      key: "approvedAt",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <Tag color={record.status === "approved" ? "green" : "red"}>
          {record.status === "approved" ? "Đã duyệt" : "Từ chối"}
        </Tag>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Chương trình A",
      term: "2025",
      creator: "Nguyễn Văn A",
      createdAt: "2025-01-01",
    },
    {
      key: "2",
      name: "Chương trình B",
      term: "2026",
      creator: "Trần Thị B",
      createdAt: "2025-02-01",
    },
  ];

  const historyData = [
    {
      key: "1",
      name: "Chương trình C",
      term: "2023",
      creator: "Nguyễn Văn C",
      createdAt: "2024-10-01",
      approver: "Lê Văn D",
      approvedAt: "2024-12-01",
      status: "approved",
    },
    {
      key: "2",
      name: "Chương trình D",
      term: "2024",
      creator: "Trần Thị D",
      createdAt: "2024-11-01",
      approver: "Lê Văn E",
      approvedAt: "2024-12-15",
      status: "rejected",
    },
  ];

  return (
    <>
      <HeaderPage title={"YÊU CẦU DUYỆT"} />
      <div className="content-page-approval">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          // style={null}
        />
        <div className="header-table">Chương trình đào tạo</div>
        {current === "draft" && (
          <div className="draft-table">
            <Table columns={draftColumns} dataSource={data} />
          </div>
        )}
        {current === "approval-request" && (
          <div className="approval-request-table">
            <Table columns={approvalColumns} dataSource={data} />
          </div>
        )}
        {current === "approval-history" && (
          <div className="approval-history-table">
            <Table columns={historyColumns} dataSource={historyData} />
          </div>
        )}
      </div>
    </>
  );
};

export default RequestApproval;
