import "./index.less";
import $ from "jquery";
import Map from "@/utlis/Map";
import { getCitys, getSchools } from "@/utlis/MapData";

$(() => {
  Map.init("container", getSchools("hangzhou", 0));

  $(".btnHangzhou").on("click", function() {
    Map.init("container", getCitys("hangzhou"));
  });
  $(".btnyintai").on("click", function() {
    Map.init("container", getSchools("hangzhou", 0));
  });

  $(".btnBeijing").on("click", function() {
    Map.init("container", getCitys("beijing"));
  });
});
