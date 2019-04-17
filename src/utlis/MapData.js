const CITYS = {
  hangzhou: {
    center: [120.23048, 30.312951],
    zoom: 11,
    schools: [
      {
        index: 0,
        name: "银泰校区",
        lnglats: [120.154949, 30.323621]
      },
      { index: 1, name: "中大银泰校区", lnglats: [120.190655, 30.329547] },
      { index: 2, name: "滨江校区", lnglats: [120.24284, 30.222809] },
      { index: 3, name: "西湖", lnglats: [120.165936, 30.246539] }
    ]
  },
  beijing: {
    center: [116.382122, 39.921176],
    zoom: 12,
    schools: [
      { index: 0, name: "北京校区0", lnglats: [116.368904, 39.923423] },
      { index: 1, name: "北京校区1", lnglats: [116.382122, 39.921176] },
      { index: 2, name: "北京校区2", lnglats: [116.387271, 39.922501] },
      { index: 3, name: "北京校区3", lnglats: [116.398258, 39.9146] }
    ]
  }
};

export function getCitys(city) {
  return CITYS[city];
}

export function getSchools(city, index) {
  return CITYS[city] && CITYS[city].schools[index];
}
