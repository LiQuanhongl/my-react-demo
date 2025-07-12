import ReactQuill from "react-quill-new";
import "./h5.css";
import { Button } from "antd-mobile";
import "react-quill-new/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from "../api/rich-editor";
import { replaceIP } from "../utils/tools";

const Myh5page = () => {
  const [value, setValue] = useState("");
  const params = useParams();
  const fetchData = useCallback(async () => {
    try {
      const response = await API.getRichEditorByIdAPI(params.detailId);
      if (response.data) {
        setValue(replaceIP(response.data.content));
      }
    } catch (e) {
      console.log(e);
    }
  }, [params.detailId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <div className="myh5-container">
        <Button
          className="h5-btn"
          color="primary"
          fill="solid"
          onClick={(e) => {
            console.log(e);
          }}
        >
          测试用的
        </Button>
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        readOnly={true}
        modules={{ toolbar: false }}
        style={{
          width: "100%",
          height: "50%",
          margin: "auto",
          marginTop: "0%",
        }}
        className="h5editor"
      />
    </>
  );
};
export default Myh5page;
