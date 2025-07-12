function generateSeededRandom(seed) {
  let state = seed;
  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function generateRandomCoordinates(seed, count) {
  const minLon = 73.66; // 中国最西端经度
  const maxLon = 135.05; // 中国最东端经度
  const minLat = 3.86; // 中国最南端纬度
  const maxLat = 53.55; // 中国最北端纬度

  const rand = generateSeededRandom(seed);
  const coordinates: Array<number>[] = [];

  for (let i = 0; i < count; i++) {
    const lon = minLon + rand() * (maxLon - minLon);
    const lat = minLat + rand() * (maxLat - minLat);
    coordinates.push([lon, lat]);
  }

  return coordinates;
}

export default generateRandomCoordinates;
