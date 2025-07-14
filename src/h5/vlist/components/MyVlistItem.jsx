import dishImg from "../../../assets/dish.jpg";
import "./MyVlistItem.css";
import { Tag } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";

const MyVlistItem = ({ title }) => {
  return (
    <div className="vlist-item-container">
      <div className="vlist-item-img">
        <img
          alt="菜单图片"
          src={dishImg}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "2.4vw",
          }}
        ></img>
      </div>
      <div className="vlist-item-info">
        <strong className="vlist-item-title">{title}</strong>
        <div className="vlist-item-tag">
          <Tag
            round
            color="#f5f5f5"
            style={{
              "--text-color": "#616161",
              "--border-radius": "1px",
              marginRight: 4,
            }}
          >
            咸鲜口
          </Tag>
          <Tag
            round
            color="#f5f5f5"
            style={{ "--text-color": "#616161", "--border-radius": "1px" }}
          >
            咸鲜
          </Tag>
        </div>
        <div className="vlist-item-sale">月售 100+ 好评率 100%</div>
        <div className="vlist-item-bottom">
          <div className="vlist-item-price">
            <span className="vlist-item-price-char">￥</span>
            <span className="vlist-item-price-text">50</span>
          </div>
          <div className="vlist-item-add-btn">
            <AddCircleOutline
              color="#fff"
              fontSize="26px"
              style={{ flex: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVlistItem;
