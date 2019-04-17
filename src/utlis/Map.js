let map;
let infoWindow;

function markerClick(e) {
  infoWindow.setContent(e.target.content);
  infoWindow.open(map, e.target.getPosition());
}

const init = (id, mapDatas) => {
  map = new window.AMap.Map(id, {
    resizeEnable: true,
    center: mapDatas.center || mapDatas.lnglats,
    zoom: mapDatas.zoom || 14
  });
  map.setFitView();

  infoWindow = new window.AMap.InfoWindow({
    offset: new window.AMap.Pixel(0, -30)
  });

  let lnglats = mapDatas.schools || [mapDatas];

  for (let i = 0; i < lnglats.length; i += 1) {
    let marker = new window.AMap.Marker({
      position: lnglats[i].lnglats,
      map: map
    });
    marker.content = lnglats[i].name;
    marker.on("click", markerClick);
  }
};

export default {
  init
};
