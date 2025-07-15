import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import RichEditor from "./pc/myPage/rich-editor/RichEditor.jsx";
import RichEditorDetail from "./pc/myPage/rich-editor/RichEditorDetail.jsx";
import { useResponsive } from "./utils/device.js";
import Myh5page from "./h5/myH5.jsx";
import VConsole from 'vconsole';

const { Header } = Layout;

import React from "react";
import Myh5map from "./h5/Myh5map.jsx";
import MyVlistDemo from "./h5/vlist/MyVlistDemo.jsx";

const ResponsiveComponent = ({ pc, h5 }) => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return <>{h5}</>;
  }

  return <>{pc}</>;
};

window.vConsole = new VConsole();

const App = () => {
  // const location = useLocation();
  // const { isMobile, isTablet } = useResponsive();
  // const isH5 = isMobile || isTablet;
  return (
    <div className="App">
      {/* <Layout>
        <Header className="app-header">
          {location.pathname === "/" ? "首页" : location.pathname}
        </Header>
      </Layout> */}
      <Routes>
        <Route path="/" element={<MyVlistDemo />} />
        <Route path="editor-list" element={<RichEditor />} />
        <Route path="editor-detail">
          <Route
            path=":detailId"
            // element={isH5 ? <div>简陋的h5</div> : <RichEditorDetail />}
            element={
              <ResponsiveComponent
                h5={<Myh5page />}
                pc={<RichEditorDetail />}
              />
            }
          />
        </Route>
        <Route path="map" element={<Myh5map />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
