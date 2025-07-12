import { useParams } from "react-router-dom";
import MyRichEditor from "../../myComponent/MyRichEditor";
import { message } from "antd";

const RichEditorDetail = () => {
  const params = useParams();

  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      <MyRichEditor id={params.detailId} messageApi={messageApi} />
    </>
  );
};

export default RichEditorDetail;
