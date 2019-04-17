let versions = Math.floor((new Date()).getTime()/1000);
let config = {
  "outputName": "dist",
  "outputNameTest": "dist_test",
  "apiBase": "dist",
  "apiBaseTest": "dist_test",
  "staticName": versions,
  "templateName": "",
  "publicPath": "/",
  "cdnPublicPath": "https://xmcdn.oss-cn-shanghai.aliyuncs.com/xm_teach_pc/",
  "hashLength": 7,
  "includePage": [],
  "vendor": ["jquery", "swiper"],
  "host": "0.0.0.0",
  "port": 8001,
  "openStandardJs": false,
  "reInstallOnPkgChange": true,
  "notReInstallOnPkgChangeFeatures": []
}

module.exports = config
