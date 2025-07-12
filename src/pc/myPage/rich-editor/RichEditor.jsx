import { useCallback, useEffect, useState } from "react";
import * as API from "../../../api/rich-editor";
import { Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../../utils/device";

const RichEditor = () => {
  const { isMobile, isTablet, isDesktop, deviceType } = useResponsive();

  const [editors, setEditors] = useState([]);
  const navigate = useNavigate();
  const clickCard = (id) => navigate(`/editor-detail/${id}`);

  const fetchData = useCallback(async () => {
    try {
      const response = await API.getRichEditorListAPI();
      response.data && setEditors(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div style={{ fontSize: 16, wordWrap: "break-word" }}>
        当前设备：
        {JSON.stringify({ isMobile, isTablet, isDesktop, deviceType })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {editors.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            variant="borderless"
            style={{
              width: "45%",
              backgroundColor: "#ddd",
              margin: 25,
              overflow: "hidden",
            }}
            onClick={() => clickCard(item.id)}
          >
            {item.content}
          </Card>
        ))}
      </div>
    </>
  );
};

export default RichEditor;
