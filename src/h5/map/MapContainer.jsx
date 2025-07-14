import { useEffect, useRef, useState } from "react";
import "./MapContainer.css";
import AMapLoader from "@amap/amap-jsapi-loader";
import { Toast } from "antd-mobile";
import generateRandomCoordinates from "../../utils/randoPoints";
import { Button } from "antd";
// import { createRoot } from "react-dom/client";
// const content = document.createElement("div");
// const root = createRoot(content);
// const ContentDom = () => (
//   <div style={{ background: "yellow" }}>React 18 渲染的内容</div>
// );
// root.render(<ContentDom />);

export default function MapContainer() {
  // 使用示例：生成400个固定种子的经纬度
  const seed = 12345; // 可修改为任意整数种子
  const randomCoordinates = generateRandomCoordinates(seed, 400);

  console.log(randomCoordinates); // 输出400个[经度, 纬度]数组
  const mapRef = useRef({});
  // const [count, setCount] = useState(0);
  // let s = 0;

  // const tmp = (e) => {
  //   console.log(666, e);
  //   s += 1;
  //   Toast.show({
  //     content: s,
  //   });
  // };

  const set = useRef(new Set());
  let show = false;

  const hide = () => {
    console.log(mapRef.current);
    show = !show;
    set.current.forEach((marker) => {
      if (show) {
        if (marker.someInfo > 0.5) {
          marker.setMap(null);
        } else {
          marker.setMap(mapRef.current);
        }
      } else {
        if (marker.someInfo > 0.5) {
          marker.setMap(mapRef.current);
        } else {
          marker.setMap(null);
        }
      }
    });
  };

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "d1a0520b7d5a08f57f13d1a799190814",
    };
    AMapLoader.load({
      key: "167ffe73874dc08085d8037899ac4438", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale", "AMap.ToolBar"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then((AMap) => {
        mapRef.current = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "2D", // 是否为3D地图模式
          zoom: 6, // 初始化地图级别
          center: [116.397428, 39.90923], // 初始化地图中心点位置
        });
        set.current.clear();
        const scale = new AMap.Scale();
        mapRef.current.addControl(scale);
        const toolbar = new AMap.ToolBar(); //缩放工具条实例化
        mapRef.current.addControl(toolbar); //添加控件

        const marker_arr = [
          [116.397428, 39.90923],
          [116.297428, 39.90923],
          [116.197428, 39.90923],
        ];

        const content_old = `<div class="custom-content-marker">
        <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">
        </div>`;
        randomCoordinates.forEach((item) => {
          const marker = new AMap.Marker({
            content: content_old,
            position: item,
            offset: new AMap.Pixel(-13, -30),
          });
          marker.someInfo = Math.random();

          const content = `<div>
            ${marker.someInfo} 
            <a href='/detail/${item}'>查看详情</a>       
          </div>`;
          AMap.Event.addListener(marker, "click", function (e) {
            new AMap.InfoWindow({
              content: content,
              offset: new AMap.Pixel(0, -30),
            }).open(mapRef.current, marker.getPosition());
          });
          console.log(1);
          set.current.add(marker);
          mapRef.current.add(marker);
        });
        // const marker = new AMap.Marker({
        //   content: content_old, //自定义点标记覆盖物内容
        //   position: [116.397428, 39.90923], //基点位置
        //   offset: new AMap.Pixel(-13, -30), //相对于基点的偏移位置
        //   title: "6666",
        // });
        //将创建的点标记添加到已有的地图实例：
        // marker.on("touchstart", tmp);

        //     function (e) {
        //   new AMap.InfoWindow({
        //     content: content,
        //     offset: new AMap.Pixel(0, -30),
        //   }).open(map, markerCommon.getPosition());
        // }
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      mapRef.current?.destroy?.();
      mapRef.current = {};
    };
  }, []);

  return (
    <>
      <div id="container" className="map-container"></div>{" "}
      <Button
        onClick={hide}
        type="primary"
        style={{ position: "fixed", top: 50, left: 50 }}
      >
        测试
      </Button>
    </>
  );
}
