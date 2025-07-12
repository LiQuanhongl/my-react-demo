import React, { Component } from "react";
import { Spin } from "antd";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 当子组件树中发生错误时，更新状态
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你可以在这里记录错误信息、执行清理操作等等
    console.error("抓到错误了:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 渲染降级后的UI
      return (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin style={{ transform: "scale(2.5)" }}></Spin>
        </div>
      );
    }

    // 正常渲染子组件
    return this.props.children;
  }
}

export default ErrorBoundary;
