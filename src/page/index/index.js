import "@/assets/css/base.less";
// import "@/assets/css/header.less";
// import "@/assets/css/footer.less";
import "./index.less";

import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import $ from "jquery";
import Game from "@/components/game";

import("@/utlis/common").then(() => {});

$(() => {
  Game({
    id: "SquirrelGame"
  });

  const mySwiper = new Swiper(".swiper01", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    loop: true
    // autoplay: {
    //   delay: 2000
    // }
  });

  console.log("mySwiper...", mySwiper);
});
