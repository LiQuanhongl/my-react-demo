import React, { useRef, useState } from "react";

import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useCallback, useEffect } from "react";
import * as API from "../../api/rich-editor";
import { Button } from "antd";
// import { ImageExtend } from "quill-image-extend-module";
// Quill.register("modules/imageResize", ImageExtend);
import ImageResize from "quill-image-resize";
// import { container } from "quill-image-extend-module";
// import ImageResize from "quill-image-resize-module";

// import "quill-image-resize-module/image-resize.min.js";
import { replaceIP } from "../../utils/tools";

const BaseImageFormat = Quill.import("formats/image");
const ImageFormatAttributesList = ["alt", "height", "width", "style"];

class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ImageFormat, true);

Quill.register("modules/ImageResize", ImageResize);

const BlockEmbed = Quill.import("blots/block/embed");
class VideoBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute("src", value.url);
    node.setAttribute("controls", value.controls);
    node.setAttribute("width", value.width);
    node.setAttribute("height", value.height);
    node.setAttribute("webkit-playsinline", true);
    node.setAttribute("playsinline", true);
    node.setAttribute("x5-playsinline", true);
    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute("src"),
      controls: node.getAttribute("controls"),
      width: node.getAttribute("width"),
      height: node.getAttribute("height"),
    };
  }
}

VideoBlot.blotName = "simpleVideo";
VideoBlot.tagName = "video";
Quill.register(VideoBlot);

const MyRichEditor = (props) => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await API.getRichEditorByIdAPI(props.id);
      if (response.data) {
        setValue(replaceIP(response.data.content));
        setTitle(response.data.title);
      }
    } catch (e) {
      console.log(e);
    }
  }, [props.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const uploadImageHandler = () => {
    const input = document.querySelector("#uploadImg");
    input.value = "";
    input.click();
  };
  const uploadVideoHandler = () => {
    const input = document.querySelector("#uploadVideo");
    input.value = "";
    input.click();
  };

  const quillRef = useRef();
  quillRef.current
    ?.getEditor()
    .getModule("toolbar")
    .addHandler("image", uploadImageHandler);
  quillRef.current
    ?.getEditor()
    .getModule("toolbar")
    .addHandler("video", uploadVideoHandler);

  const uploadImage = async (event) => {
    const form = new FormData();
    form.append("file", event.target.files[0]);
    // console.log(form);
    const response = await API.uploadFileAPI(form);
    // console.log(response.data);
    const url = response.data;
    const quill = quillRef.current.getEditor();
    const addImageRange = quill.getSelection();
    const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0);
    quill.insertEmbed(newRange, "image", url);
    quill.setSelection(1 + newRange);
  };

  const uploadVideo = async (event) => {
    const form = new FormData();
    form.append("file", event.target.files[0]);
    // console.log(form);
    const response = await API.uploadFileAPI(form);
    // console.log(response.data);
    const url = response.data;
    const quill = quillRef.current.getEditor();
    const addImageRange = quill.getSelection();
    const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0);
    // quill.insertEmbed(newRange, "video", url);
    quill.insertEmbed(newRange, "simpleVideo", {
      url,
      controls: "controls",
      width: "100%",
      height: "100%",
    });
    quill.setSelection(1 + newRange);
  };

  const saveRichText = async () => {
    try {
      await API.updateRichEditorByIdAPI(props.id, {
        title: title,
        content: value,
      });
      props.messageApi.success("保存成功");
    } catch (e) {
      console.log(e);
      props.messageApi.error("保存失败");
    }
  };

  const modules = {
    // 方式1: 可以是简单的一维数组配置
    // toolbar: ["bold", "italic", "underline", "strike", "blockquote"]
    // 方式2: 可以配置二维数组，进行多个选项的配置
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        // 或者针对某一个配置项的key值，进行配置
        [{ header: [1, 2, false] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["image", "video"],
        ["clean"],
        [{ size: ["small", false, "large", "huge"] }],
        [{ color: [] }, { background: [] }],
      ],
      // handlers: {
      //   image:
      // },
    },
    // 方式3: 可以自己指定工具栏的容器
    // toolbar: "#rq-toolbar"
    ImageResize: {},
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        paddingTop: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: 30,
        }}
      >
        {title}
      </div>
      <Button
        type="primary"
        style={{ margin: "5% 0 0 5%" }}
        onClick={saveRichText}
      >
        保存
      </Button>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        style={{
          width: "90%",
          height: "50%",
          margin: "auto",
          marginTop: "2%",
        }}
        ref={quillRef}
      />
      <input
        id="uploadImg"
        type="file"
        style={{ display: "none" }}
        accept="image/png, image/jpeg, image/gif"
        onChange={uploadImage}
      />
      <input
        id="uploadVideo"
        type="file"
        style={{ display: "none" }}
        accept="video/*"
        onChange={uploadVideo}
      />
    </div>
  );
};

export default MyRichEditor;
