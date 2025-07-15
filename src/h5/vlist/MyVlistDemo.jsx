import MyVlistItem from "./components/MyVlistItem";
import "./MyVlistDemo.css";
import { SideBar } from "antd-mobile";
import tabs from "./data";
import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
import {FpsView} from "react-fps";

const MyVlistDemo = () => {
  const [activeKey, setActiveKey] = useState(tabs[0].id);

  const currentKeyRef = useRef(tabs[0].id);

  const mainElementRef = useRef(null);


  useEffect(() => {
    const handleScroll = throttle(() => {
      let currentKey = tabs[0].id;

      for (const item of tabs) {
        const element = document.getElementById(`anchor-${item.id}`);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 10) {
          //这是一个难点，暂时写成10跳过，符合体验
          currentKey = item.id;
        } else {
          break;
        }
      }
      if (currentKeyRef.current !== currentKey) {
        setActiveKey(currentKey);
        currentKeyRef.current = currentKey;
        setTimeout(() => {
          const container = document.querySelector(".detail-list-side");
          const element = document.querySelector(".adm-side-bar-item-active");
          container.scrollTo({
            top: element.offsetTop,
          });
        }, 0); //先这么做了
      }
    }, 100);
    const mainElement = mainElementRef.current;
    if (!mainElement) return;
    mainElement.addEventListener("scroll", handleScroll);

    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="vlist-container" ref={mainElementRef}>
        <FpsView top="70vh"/>
      <div className="vlist-placeholder">
        <p className="vlist-placeholder-text">假装这里有300px高的内容</p>
      </div>
      <div className="detail-list-container">
        <div className="detail-list-side">
          <SideBar
            className="detail-list-side-bar"
            activeKey={String(activeKey)}
            onChange={(key) => {
              document.getElementById(`anchor-${key}`)?.scrollIntoView();
            }}
            style={{
              minHeight:
                String(Math.max(100 + (tabs.length - 10) * 5, 100)) + "vh",
            }}
          >
            {tabs.map((item) => (
              <SideBar.Item key={item.id} title={item.title} />
            ))}
          </SideBar>
        </div>

        <div className="detail-list-main">
          {tabs.map((item) => (
            <div id={`anchor-${item.id}`} key={item.id}>
              <strong className="detail-list-title">{item.title}</strong>
              {item.sub.map((subItem) => (
                <MyVlistItem key={subItem.id} title={subItem.title} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyVlistDemo;
