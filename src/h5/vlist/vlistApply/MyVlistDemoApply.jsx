import MyVlistItem from "../components/MyVlistItem";
import "./MyVlistDemoApply.css";
import { SideBar } from "antd-mobile";
import tabs from "../data";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FpsView } from "react-fps";

const MyVlistDemoApply = () => {
  const [activeKey, setActiveKey] = useState(tabs[0]?.id || 0);

  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);

  //监听
  useEffect(() => {
    //绑定事件
    window.addEventListener("resize", onResize);
    //优化 卸载事件
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  const [dataList, setDataList] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    setDataList(tabs);
  }, []);

  const itemsInfo = useMemo(() => {
    //多赋予一个vlist-index，vlist-type属性
    let vlistIndex = 0;
    let offset = 0;
    const itemsArrayInfo = [
      { vlistIndex, vlistType: "placeHolder", offset, height: 300 },
    ];
    offset += itemsArrayInfo[vlistIndex].height;
    vlistIndex += 1;
    dataList.forEach((item) => {
      itemsArrayInfo.push({
        data: item,
        vlistIndex,
        vlistType: "title",
        offset,
        height: 41,
      });
      offset += itemsArrayInfo[vlistIndex].height;
      vlistIndex += 1;
      item.sub.forEach((subItem) => {
        itemsArrayInfo.push({
          data: subItem,
          vlistIndex,
          vlistType: "dish",
          offset,
          height: 101,
        });
        offset += itemsArrayInfo[vlistIndex].height;
        vlistIndex += 1;
      });
    });
    return itemsArrayInfo;
  }, [dataList]);

  const titlePosArray = useMemo(() => {
    const titlePos = [];
    itemsInfo.forEach((item, index) => {
      if (item.vlistType === "title") {
        titlePos.push({ offset: item.offset, titleIndex: index });
      }
    });
    return titlePos;
  }, [itemsInfo]);

  const getStartIndex = () => {
    for (let i = 0, len = itemsInfo.length; i < len; i++) {
      if (itemsInfo[i].offset >= scrollTop) {
        return i;
      }
    }
    return itemsInfo.length - 1;
  };

  const getEndIndex = () => {
    const startIndex = getStartIndex();
    const startOffset = itemsInfo[startIndex].offset;
    const endOffset = startOffset + size.height;
    for (let i = startIndex, len = itemsInfo.length; i < len; i++) {
      if (itemsInfo[i].offset + itemsInfo[i].height >= endOffset) {
        return i;
      }
    }
    return itemsInfo.length - 1;
  };

  const renderItems = () => {
    const start = Math.max(getStartIndex() - 3, 0);
    const end = Math.min(getEndIndex() + 3, itemsInfo.length - 1);
    const itemsToRender = [];
    let stickyTitleIndex = -1;
    if (scrollTop > 300) {
      let i = 0;
      while (i < titlePosArray.length && titlePosArray[i].offset < scrollTop) {
        i++;
      }
      stickyTitleIndex = titlePosArray[i - 1].titleIndex;
    }

    let IsStickyTitleAdd = false;
    let partContainer = [];
    let partContainerKey = -1;
    let partContainerPos = -1;
    let IsPartContainerFirst = true;

    //渲染标题，如果本来不打算渲染的话就把它压回去，如果打算渲染那就正常的偏移
    for (let i = start; i <= end; i++) {
      if (i === 0) {
        //有300px那部分
        itemsToRender.push(
          <div
            className="vlist-placeholder-apply"
            key={itemsInfo[0].vlistIndex}
          >
            <p className="vlist-placeholder-text-apply">
              假装这里有300px高的内容
            </p>
          </div>
        );
        continue;
      }
      const item = itemsInfo[i];

      if (item.vlistIndex >= stickyTitleIndex) {
        if (!IsStickyTitleAdd && stickyTitleIndex !== -1) {
          IsStickyTitleAdd = true;
          itemsToRender.push(
            <div
              key={partContainerKey}
              style={{
                position: "absolute",
                top: partContainerPos,
              }}
              className="vlist-part-container"
            >
              {partContainer}
            </div>
          );
          partContainer = [];
          partContainerKey = -1;
          partContainerPos = -1;
          partContainer.push(
            <strong className="detail-list-title-apply" key={stickyTitleIndex}>
              {itemsInfo[stickyTitleIndex].data.title}
            </strong>
          );
          partContainerKey = stickyTitleIndex;
        }
      }

      if (item.vlistIndex === stickyTitleIndex) {
        //已被渲染，且不需要压回去
        partContainerPos = item.offset;
        continue;
      }

      switch (item.vlistType) {
        case "title":
          //说明上一个container结束了
          itemsToRender.push(
            <div
              key={partContainerKey}
              style={{
                position: "absolute",
                top: partContainerPos,
              }}
              className="vlist-part-container"
            >
              {partContainer}
            </div>
          );
          partContainerKey = item.vlistIndex;
          partContainer = [];
          partContainerPos = -1;
          partContainer.push(
            <strong className="detail-list-title-apply" key={item.vlistIndex}>
              {item.data.title}
            </strong>
          );
          partContainerPos = item.offset;
          break;
        case "dish":
          if (IsPartContainerFirst && item.vlistIndex >= stickyTitleIndex) {
            IsPartContainerFirst = false;
            if (partContainerPos === -1) {
              partContainerPos = item.offset - 41;
            }
          }
          if (
            item.vlistIndex < stickyTitleIndex &&
            partContainer.length === 0
          ) {
            partContainerKey = item.vlistIndex;
            partContainerPos = item.offset;
          }
          partContainer.push(
            <MyVlistItem key={item.vlistIndex} title={item.data.title} />
          );
          break;
      }
    }
    itemsToRender.push(
      <div
        key={partContainerKey}
        style={{ position: "absolute", top: partContainerPos }}
        className="vlist-part-container"
      >
        {partContainer}
      </div>
    );

    const totalHeight =
      start === 0
        ? itemsInfo[itemsInfo.length - 1].offset +
          itemsInfo[itemsInfo.length - 1].height -
          300
        : itemsInfo[itemsInfo.length - 1].offset +
          itemsInfo[itemsInfo.length - 1].height;
    const itemsToRenderAddBar = [];

    start === 0 && itemsToRenderAddBar.push(itemsToRender.splice(0, 1));

    const currentActiveKey =
      itemsInfo[stickyTitleIndex === -1 ? 1 : stickyTitleIndex]?.data.id;
    if (currentActiveKey !== activeKey) {
      setActiveKey(currentActiveKey);
      setTimeout(() => {
        const container = document.querySelector(".detail-list-side-apply");
        const element = document.querySelector(".adm-side-bar-item-active");
        element &&
          container.scrollTo({
            top: element.offsetTop,
          });
      }, 0);
    }
    itemsToRenderAddBar.push(
      <div
        className="detail-list-container-apply"
        key="detail-list-container-apply"
      >
        <div className="detail-list-side-apply">
          <SideBar
            className="detail-list-side-bar-apply"
            activeKey={String(activeKey)}
            onChange={(key) => {
              const container = document.querySelector(
                ".vlist-container-apply"
              );
              container.scrollTop = titlePosArray[key].offset + 3;
            }}
            style={{
              minHeight:
                String(Math.max(100 + (dataList.length - 10) * 5, 100)) + "vh",
            }}
          >
            {dataList.map((item) => (
              <SideBar.Item key={item.id} title={item.title} />
            ))}
          </SideBar>
        </div>
        <div
          className="detail-list-main-apply"
          style={{
            height: totalHeight,
          }}
        >
          {itemsToRender}
        </div>
      </div>
    );

    return itemsToRenderAddBar;
  };

  const handleScroll = (event) => {
    const { scrollTop } = event.currentTarget;
    setScrollTop(scrollTop);
  };
  return (
    <div className="vlist-container-apply" onScroll={handleScroll}>
      <FpsView top="70vh" />
      {renderItems()}
    </div>
  );
};

export default MyVlistDemoApply;
