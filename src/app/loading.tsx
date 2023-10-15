import { Spin } from "antd";

const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default Loading;
