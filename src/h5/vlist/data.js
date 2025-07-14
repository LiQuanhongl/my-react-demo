const generateData = () => {
  const dataArray = [];
  for (let i = 0; i < 15; i++) {
    const subData = [];
    for (let j = 0; j < 100; j++) {
      subData.push({ id: j, title: `品类${i}的第${j}项` });
    }
    dataArray.push({ id: i, title: "品类" + i, sub: subData });
  }
  return dataArray;
};

const data = generateData();

// const dataReferance = [
//   { key: 1, title: "品类1" },
//   { key: 2, title: "品类2" },
//   { key: 3, title: "品类3" },
//   { key: 4, title: "品类4" },
//   { key: 5, title: "品类5" },
//   { key: 6, title: "品类6" },
//   { key: 7, title: "品类7" },
//   { key: 8, title: "品类8" },
//   { key: 9, title: "品类9" },
//   { key: 10, title: "品类10" },
//   { key: 11, title: "品类11" },
//   { key: 12, title: "品类12" },
//   { key: 13, title: "品类13" },
//   { key: 14, title: "品类14" },
//   { key: 15, title: "品类15" },
// ];

export default data;
